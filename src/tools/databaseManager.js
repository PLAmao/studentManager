'use strict'
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
// Connection URL 
const url = 'mongodb://localhost:27017/studentManager';
//获取数据库对象db
const getDb = (callback)=>{
     // Use connect method to connect to the Server 
    MongoClient.connect(url, function (err, db) {
        err && console.log('err')
        callback(db)
    });
}
//_id的包装类
exports.ObjectID = ObjectID
/**
 * 获取多条记录
 * @param {String} collection 要查询的表
 * @param {Object} condition 查询条件
 * @param {Function} callback 回到函数
 */
exports.find = (collection,condition,callback)=>{
    getDb((db)=>{
        db.collection(collection).find(condition).toArray((err,docs)=>{
            db.close()
            callback(err,docs)
        })
    })
}
/**
 * 获取单条记录
 * @param {String} collection 要查询的表
 * @param {Object} condition 查询条件
 * @param {Function} callback 回到函数
 */
exports.findOne = (collection,condition,callback)=>{
    getDb((db)=>{
        db.collection(collection).findOne(condition,(err,doc)=>{
            db.close()
            callback(err,doc)
        })
    })
}
/**
 * 插入单条记录
 * @param {String} collection 要查询的表
 * @param {Object} condition 查询条件
 * @param {Function} callback 回到函数
 */
exports.insertOne = (collection,condition,callback)=>{
    getDb((db)=>{
        db.collection(collection).insertOne(condition,(err,doc)=>{
            db.close()
            callback(err,doc)
        })
    })
}
/**
 * 更新单条记录
 * @param {String} collection 要查询的表
 * @param {Object} condition 查询条件
 * @param {Object} data 更新后的值
 * @param {Function} callback 回到函数
 */
exports.updateOne = (collection,condition,data,callback)=>{
    getDb((db)=>{
        db.collection(collection).updateOne(condition,{$set:data},(err,doc)=>{
            db.close()
            callback(err,doc)
        })
    })
}
/**
 * 删除单条记录
 * @param {String} collection 要查询的表
 * @param {Object} condition 查询条件
 * @param {Function} callback 回到函数
 */
exports.deleteOne = (collection,condition,callback)=>{
    getDb((db)=>{
        db.collection(collection).deleteOne(condition,(err,doc)=>{
            db.close()
            callback(err,doc)
        })
    })
}