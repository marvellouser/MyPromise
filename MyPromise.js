


function MyPromise (executor) {

    var self = this;
    self.status = 'pending';
    self.resolveValue = null;
    self.rejectResponse = null;
    self.resolveList = [];
    self.rejectList = [];

    function resolve (value) {
        self.status = 'fulfilled';
        self.resolveValue = value;
        self.resolveList.forEach(ele => {
            ele();
        });
    }

    function reject (response) {
        self.status = 'rejected';
        self.rejectResponse = response;
        self.rejectList.forEach(ele => {
            ele();
        });
    }
    try {
        executor(resolve, reject);
    } catch(e) {
        reject(e);
    }

}

function resolutionReturnMyPromise (nextReturnVal, resolve, reject) {
    if(nextReturnVal instanceof MyPromise) {
        nextReturnVal.then(res => {
            resolve(res);
        }, rej => {
            reject(rej);
        });
    } else {
        resolve(nextReturnVal);
    }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    var onFulfilled = onFulfilled || function (value) {
        return value;
    }

    var onRejected = onRejected || function (response) {
        throw new Error(response);
    }

    var self = this;
    var nextMyPromise = new MyPromise((resolve, reject) => {
        if (self.status == 'fulfilled') {
            setTimeout(() => {
                try {
                    var nextResolveValue = onFulfilled(self.resolveValue);
                    resolutionReturnMyPromise(nextResolveValue, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            }, 0);
        }
    
        if (self.status == 'rejected') {
            setTimeout(() => {
                try {
                    var nextRejectedResponse = onRejected(self.rejectResponse);
                    resolutionReturnMyPromise(nextRejectedResponse, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            }, 0);
        }
    
        if (self.status == 'pending') {
            self.resolveList.push(() => {
                setTimeout(() => {
                    try {
                        var nextResolveValue = onFulfilled(self.resolveValue);
                        resolutionReturnMyPromise(nextResolveValue, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                }, 0);
            });
    
            self.rejectList.push(() => {
                setTimeout(() => {
                    try {
                        var nextRejectedResponse = onRejected(self.rejectResponse);
                        resolutionReturnMyPromise(nextRejectedResponse, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                }, 0);
            });
        }
    })
    return nextMyPromise;    

}