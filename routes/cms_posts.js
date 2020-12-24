var express = require('express');
var router = express.Router();
var multer = require("multer");
const fs = require('fs');
import moment from 'moment'

import LibCommon from "../libs/LibCommon"
import LibCsrf from "../libs/LibCsrf"
import LibMongo from "../libs/LibMongo"
var ObjectID = require('mongodb').ObjectID;
import LibConst from "../libs/LibConst"
import LibAuth from "../libs/LibAuth"

/******************************** 
* 
*********************************/
router.get('/', function(req, res, next) {
    LibAuth.cms_valid_user(req, res)
    var query = req.query;
    var page = 1;
    if(query.page != null){
        page = query.page
        console.log( "page=", page )
    }  
    res.render('cms/posts/index', {"page": page } 
    );  
});
/******************************** 
* 
*********************************/
router.get('/add',async function(req, res, next) {
    LibAuth.cms_valid_user(req, res)
    LibCsrf.set_token(req, res) 
    const collection = await LibMongo.get_collection("category" )
    var result = await collection.find({} ).toArray();
    //  console.log(result);
    res.render('cms/posts/new', { category: result });
});
/******************************** 
* 
*********************************/
router.post('/add', async function(req, res, next) {
    try{
        if(LibCsrf.valid_token(req, res)== false){ return false; }
        var data = req.body
console.log(data  )
        var item = {
            title: data.title ,  
            content: data.content ,
            category_id: new ObjectID( data.category_id) ,
            created_at: new Date(),
        };
        const collection = await LibMongo.get_collection("posts" )
        await collection.insertOne(item);       
        req.flash('success', 'Complete, save item');
        res.redirect('/cms_posts')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save item');
        res.redirect('/cms_posts')
    }        
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
console.log(req.params.id  );
    res.render('cms/posts/show', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.get('/edit/:id',async function(req, res) {
    LibAuth.cms_valid_user(req, res)
console.log(req.params.id  );
    LibCsrf.set_token(req, res)
    var collection = await LibMongo.get_collection("category" )
    var categry_items = await collection.find({} ).toArray();
console.log(categry_items);
    collection = await LibMongo.get_collection("posts" )
    var where = { _id: new ObjectID(req.params.id) }
    var item = await collection.findOne(where)
    res.render('cms/posts/edit', { 
        item: item ,category: categry_items 
    });
});
/******************************** 
* 
*********************************/
router.post('/update', async function(req, res, next) {
    try{
        if(LibCsrf.valid_token(req, res)== false){ return false; }
        var data = req.body
// console.log(data )
        const collection = await LibMongo.get_collection("posts" )
        var item = { 
            "title": req.body.title ,
            category_id: new ObjectID( data.category_id) ,
            "content": req.body.content
        };           
        var where = {"_id": new ObjectID( req.body.id )};
        await collection.updateOne(where, { $set: item })
        if(data.mode === "preview"){
            return res.redirect('/cms_posts/show/' + req.body.id)
        }else{
            req.flash('success', 'Complete, save item');
            return res.redirect('/cms_posts/edit/' + req.body.id)
//            return res.redirect('/cms_posts')
        }
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save item');
        res.redirect('/cms_posts')
    }        
});
/******************************** 
* 
*********************************/
router.post('/delete', async function(req, res, next) {
    try{ 
        if(LibCsrf.valid_token(req, res)== false){ return false; }
        var data = req.body
// console.log(data )  
        var id = data.id
        const collection = await LibMongo.get_collection("posts" )
        var where = { "_id": new ObjectID( id ) };
        await collection.deleteOne(where)
       req.flash('success', 'Complete, delete item');
       res.redirect('/cms_posts')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save task');
        res.redirect('/cms_posts')
    }        
});

/******************************** 
* 
*********************************/
router.get('/test', function(req, res, next) {
    var sys_const = LibConst.get_const()
//    console.log( sys_const.upload_img_dir )
    var dt = moment().format("YYYYMMDDHHmmss")
    console.log(dt)

    res.render('cms/posts/test2', {});
});
/*
router.post('/file_upload', multer({dest: '/tmp/samplefup/'}).single('file1'), 
 async function(req, res) {
    try{ 
        var sys_const = LibConst.get_const()
console.log( sys_const.upload_img_dir )        
console.log(req.file.path, req.file.originalname);
console.log("originalname=", req.file.originalname);
        var fname = req.file.originalname
        fs.rename(req.file.path, sys_const.upload_img_dir + fname, (err) => {
            if (err) throw err;
            console.log('ファイルを移動しました');
        });
        req.flash('success', 'Complete, file_upload');
       res.redirect('/cms_posts')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error , file_upload');
        res.redirect('/cms_posts')
    }        
});
*/


module.exports = router;
