'use strict'
//引入模块
const path = require('path')
const fs = require('fs')
const xtpl = require('xtpl')
const databaseManager = require(path.join(__dirname, '../tools/databaseManager.js'))
//返回学生列表页面
exports.getStudentList = (req, res) => {
    const keyword = req.query.keyword || ''
    databaseManager.find('student', {
        name: {
            $regex: keyword
        }
    }, (err, docs) => {
        err && console.log(err)
        xtpl.renderFile(path.join(__dirname, '../views/studentlist.html'), {
            studentList: docs,
            keyword: keyword,
            loginedname: req.session.loginedName
        }, function (error, content) {
            res.setHeader('Content-Type', 'text/html;charset=utf8')
            res.end(content)
        });
    })
}
//返回新增学生页面
exports.getStudentAddPage = (req, res) => {
    xtpl.renderFile(path.join(__dirname, '../views/add.html'), {loginedname: req.session.loginedName}, function (error, content) {
        error && console.log(error)
        res.setHeader('Content-Type', 'text/html;charset=utf8')
        res.end(content)
    });
}
//新增学生
exports.addStudent = (req, res) => {
    databaseManager.insertOne('student', req.body, (err, doc) => {
        err && console.log(err)
        if (doc == null) {
            res.setHeader('Content-Type', 'text/html;charset=utf8')
            res.end(`<script>alert('新增失败')</script>`)
        } else {
            res.setHeader('Content-Type', 'text/html;charset=utf8')
            res.end(`<script>alert('新增成功');window.location.href='/studentmanager/list'</script>`)
        }
    })
}
//返回编辑学生页面
exports.getStudentEditPage = (req,res)=>{
    const studentId = req.params.studentId
    //根据id获取学生信息
    databaseManager.findOne('student',{_id:databaseManager.ObjectID(studentId)},(err,doc)=>{
        err && console.log(err)
        xtpl.renderFile(path.join(__dirname, '../views/edit.html'), {
            student: doc,
            loginedname: req.session.loginedName
        }, function (error, content) {
            res.setHeader('Content-Type', 'text/html;charset=utf8')
            res.end(content)
        });
    })
}
//编辑学生信息
exports.editStudent = (req,res)=>{
    const studentId = req.params.studentId
    databaseManager.updateOne('student',{_id:databaseManager.ObjectID(studentId)},req.body,(err,doc)=>{
        if (doc == null) {
            res.setHeader('Content-Type', 'text/html;charset=utf8')
            res.end(`<script>alert('修改失败')</script>`)
        } else {
            res.setHeader('Content-Type', 'text/html;charset=utf8')
            res.end(`<script>alert('修改成功');window.location.href='/studentmanager/list'</script>`)
        }
    })
}
//删除学生
exports.deleteStudent = (req,res)=>{
    const studentId = req.params.studentId
    databaseManager.deleteOne('student',{_id:databaseManager.ObjectID(studentId)},(err,doc)=>{
        const result = {status:0,message:'删除成功'}
        if (doc == null) {
            result.status =1
            result.message = '删除失败'
        } 
        res.json(result)
    })
}