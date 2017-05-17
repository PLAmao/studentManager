'use strict'
//引入模块
const express = require('express')
const path = require('path')
const session = require('express-session')
const accountRouter = require(path.join(__dirname,'./router/accountRouter.js'))
const studentManagerRouter = require(path.join(__dirname,'./router/studentManagerRouter.js'))
const bodyParser = require('body-parser')
//创建app
const app = express()
// 使用session的中间件
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
//使用body-parse中间件获取post请求的请求体
app.use(bodyParser.urlencoded({ extended: false }))
//设置静态文件
app.use(express.static('./static'))
//出了登录和注册页面，判断用户是否，没有就跳转到登录页面
app.all('/*',(req,res,next)=>{
    if(req.url.includes('account')){
        next()
    }else {
        if(!req.session.loginedName){
            res.setHeader('Content-Type', 'text/html;charset=utf8')
            res.end(`<script>alert('请先登录！');window.location='/account/login';</script>`)
        }else {
            next()
        }
    }
})
//使用路由中间件
app.use('/account',accountRouter)
app.use('/studentmanager',studentManagerRouter)
//启动服务器、
app.listen(3000,'127.0.0.1',(err)=>{
    err && console.log(err)
    console.log('服务器启动成功')
})