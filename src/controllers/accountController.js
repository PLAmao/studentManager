'use strict'
//引入模块
const path = require('path')
const fs = require('fs')
const captchapng = require('captchapng')
const databaseManager = require(path.join(__dirname, '../tools/databaseManager.js'))
//返回登录页面
exports.getLoginPage = (req, res) => {
    fs.readFile(path.join(__dirname, '../views/login.html'), (err, data) => {
        err && console.log(err)
        res.setHeader('Content-Type', 'text/html;charset=utf8')
        res.end(data)
    })
}
//返回验证码图片
exports.getVodeImage = (req, res) => {
    fs.readFile(path.join(__dirname, '../views/login.html'), (err, data) => {
        err && console.log(err)
        const vcode = parseInt(Math.random() * 9000 + 1000)
        req.session.vcode = vcode
        const p = new captchapng(80, 30, vcode); // width,height,numeric captcha 
        p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha) 
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

        const img = p.getBase64();
        const imgbase64 = new Buffer(img, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
    })
}
//登录验证
exports.login = (req, res) => {
    const result = {
        status: 1,
        message: '登录成功'
    }
    const vcode = parseInt(req.body.vcode || '')
    //验证码验证
    if (req.session.vcode != vcode) {
        result.status = 2
        result.message = '验证码错误'
        res.json(result)
        return
    }
    //访问数据库，判断用户名和密码

    databaseManager.findOne('account', {
        username: req.body.username,
        password: req.body.password
    }, (err, doc) => {
        err && console.log(err)
        if (doc == null) {
            result.status = 3
            result.message = '用户名或密码错误'
        } else {
            req.session.loginedName = doc.username
        }
        res.json(result)
    })
}
//退出登录
exports.logout = (req, res) => {
    req.session.loginedName = null
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    res.end(`<script>window.location='/account/login'</script>`)
}
//获取注册页面
exports.getRegisterPage = (req, res) => {
    fs.readFile(path.join(__dirname, '../views/register.html'), (err, data) => {
        res.setHeader('Content-Type', 'text/html;charset=utf8')
        res.end(data)
    })
}
//注册用户
exports.register = (req, res) => {
    databaseManager.insertOne('account', req.body, (err, doc) => {
        const result = {
            status: 0,
            message: '注册成功'
        }
        if (doc == null) {
            result.status = 1
            result.message = '注册失败'
        }
        res.json(result)
    })
}