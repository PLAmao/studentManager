'use strict'
//引入模块
const express = require('express')
const path = require('path')
const studentManagerController = require(path.join(__dirname,'../controllers/studentManagerController.js'))
//创建路由
const studentManagerRouter = express.Router()
//获取登录的html页面
studentManagerRouter.get('/list', studentManagerController.getStudentList)
//获取新增的html页面
studentManagerRouter.get('/add', studentManagerController.getStudentAddPage)
//提交新增的学生
studentManagerRouter.post('/add', studentManagerController.addStudent)
//获取修改的html页面
studentManagerRouter.get('/edit/:studentId', studentManagerController.getStudentEditPage)
//修改学生
studentManagerRouter.post('/edit/:studentId', studentManagerController.editStudent)
//删除学生
studentManagerRouter.post('/delete/:studentId', studentManagerController.deleteStudent)
//返回接口
module.exports = studentManagerRouter