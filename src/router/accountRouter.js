'use strict'
//引入模块
const express = require('express')
const path = require('path')
const accountController = require(path.join(__dirname,'../controllers/accountController.js'))
//创建路由
const accountRouter = express.Router()
//获取登录的html页面
accountRouter.get('/login', accountController.getLoginPage)
//获取验证码图片
accountRouter.get('/vcode', accountController.getVodeImage)
//登录
accountRouter.post('/login', accountController.login)
//退出登录
accountRouter.get('/logout', accountController.logout)
//注册页面
accountRouter.get('/register',accountController.getRegisterPage)
//注册
accountRouter.post('/register',accountController.register)
//返回接口
module.exports = accountRouter