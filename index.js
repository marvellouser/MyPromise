/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 08:43:03
 * @LastEditTime: 2019-08-13 12:18:36
 * @LastEditors: Please set LastEditors
 */

const express = require('express');
const request = require('request');
const fs = require('fs');
const app = express();
app.use(express.static('src'));

app.get('/logo', function (req, res) {
    request('http://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=%E9%A3%8E%E6%99%AF&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=&z=&ic=&hd=&latest=&copyright=&word=%E9%A3%8E%E6%99%AF&s=&se=&tab=&width=&height=&face=&istype=&qc=&nc=1&fr=&expermode=&force=&pn=30&rn=30&gsm=1e&1565668572320=', function (error, response, body) {
        res.send(body);
    })
})
app.listen(12306, function () {
    console.log('服务开启');
})



