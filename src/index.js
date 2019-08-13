/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 09:15:02
 * @LastEditTime: 2019-08-13 12:24:27
 * @LastEditors: Please set LastEditors
 */


        const oWrap = document.getElementsByClassName('wrapper')[0];
        const oDiv = oWrap.getElementsByTagName('div');
        const left = oDiv[0];
        const center = oDiv[1];
        const right = oDiv[2];
        const oI = document.getElementsByTagName('i')[0];
        const imgArr = [
            {
                hoverURL: 'http://img0.imgtn.bdimg.com/it/u=2881282136,2486567174&fm=26&gp=0.jpg',
            },
            {
                hoverURL: 'http://img0.imgtn.bdimg.com/it/u=2075464220,4214683814&fm=26&gp=0.jpg',
            },
            {
                hoverURL: 'http://img1.imgtn.bdimg.com/it/u=500082218,3773965967&fm=26&gp=0.jpg',
            },
            {
                hoverURL: 'http://img4.imgtn.bdimg.com/it/u=2574684424,3638882398&fm=26&gp=0.jpg',
            },
            {
                hoverURL: 'http://img3.imgtn.bdimg.com/it/u=2870322368,453611869&fm=26&gp=0.jpg',
            },
            {
                hoverURL: 'http://img2.imgtn.bdimg.com/it/u=2054651772,1489112954&fm=26&gp=0.jpg',
            },
            {
                hoverURL: 'http://img2.imgtn.bdimg.com/it/u=2473394594,17779812&fm=26&gp=0.jpg',
            },
            {
                hoverURL: 'http://img4.imgtn.bdimg.com/it/u=2574684424,3638882398&fm=26&gp=0.jpg',
            },
            {
                hoverURL: 'http://img3.imgtn.bdimg.com/it/u=2870322368,453611869&fm=26&gp=0.jpg',
            },
            {
                hoverURL: 'http://img2.imgtn.bdimg.com/it/u=2054651772,1489112954&fm=26&gp=0.jpg',
            },
            {
                hoverURL: 'http://img2.imgtn.bdimg.com/it/u=2473394594,17779812&fm=26&gp=0.jpg',
            },
        ];
        

        let key = true;
        function init () {
            oWrap.onscroll = function (e) {
                if(key && this.scrollHeight - this.offsetHeight  == this.scrollTop) {
                    key = false;
                    loadMoreImg('/logo', "GET").then(res => {
                        oI.style.display = 'none';
                        addImg(res.data)
                        key = true;
                    })
                    oI.style.display = 'block';
                }
                if(this.scrollHeight - this.offsetHeight - this.scrollTop >= 20) {
                    oI.style.display = 'none';
                }
            }
            
            addImg(imgArr);
        }

        function compare(domList) {
            let min = domList[0].offsetHeight;
            let res = domList[0];
            for(let i = 1; i < domList.length; i ++) {
                if(domList[i].offsetHeight < min) {
                    min = domList[i].offsetHeight;
                    res = domList[i]
                }
            }
            return res;
        }

        function addImg (arr) {
            arr.forEach(ele => {
                if(ele.hoverURL) {
                    var img = document.createElement('img');
                    img.src = ele.hoverURL;
                    img.onload = function () {
                        compare(oDiv).appendChild(img);
                    }    
                }
            })
        }

        function ajax (url, method, callback) {
            var xmlHttp = new  XMLHttpRequest();
            xmlHttp.open(method, url);
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if(xmlHttp.readyState==4 && xmlHttp.status==200) {   
                    data = JSON.parse(xmlHttp.responseText);
                    callback(data);
                }
            }
        }

        function loadMoreImg (url, method) {
            return new Promise((resolve, reject) => {
                ajax(url, method, resolve);
            })
        }
        init();



        