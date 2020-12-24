var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const { performance } = require('perf_hooks');
var multer = require("multer");
const fs = require('fs');
import moment from 'moment'

import LibMongo from "../libs/LibMongo"
import LibPagenate from "../libs/LibPagenate"
import LibCmsPosts from "../libs/LibCmsPosts"
import LibConst from "../libs/LibConst"

/******************************** 
* 
*********************************/
router.get('/index', async function(req, res) {
    try{
        const collection = await LibMongo.get_collection("posts" )
        var page = req.query.page;
        LibPagenate.init();
        var page_info = LibPagenate.get_page_start(page);       
console.log( "page=",  page, page_info ); 
        var limit = {skip: page_info.start , limit: page_info.limit }
        var posts = await collection.find({} , limit ).sort({created_at: -1}).toArray()
        var post_ids = LibCmsPosts.get_bread_ids(posts)
//console.log(post_ids)
        var category_items = await LibCmsPosts.get_category_items(post_ids)
// console.log(category_items )
        var items = LibCmsPosts.get_post_items(posts , category_items)
        var param = LibPagenate.get_page_items(items )
        res.json(param);
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }   
});
/******************************** 
* 
*********************************/
router.get('/show/:id', async function(req, res) {
console.log(req.params.id  );
    var item = []
    try{
        const collection = await LibMongo.get_collection("posts" )
        var item = await collection.aggregate([
            { $match: { "_id": new ObjectID(req.params.id) } },
            {
                $lookup: {
                    from: "category",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            }]).toArray()        
//        console.log(item)
        var param = {"docs": item[0] };
        res.json(param);        
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }    
});
/******************************** 
* 
*********************************/
router.post('/tasks_update', async function(req, res){
    try{
        const collection = await LibMongo.get_collection("tasks" )
        var item = { 
            "title": req.body.title ,
            "content": req.body.content
        };           
        var where = {"_id": new ObjectID( req.body.id )};
        await collection.updateOne(where, { $set: item })
        res.json(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }    
});
/******************************** 
* 
*********************************/
router.get('/tasks_delete/:id',async function(req, res) {
    try{
        const collection = await LibMongo.get_collection("tasks" )
        var where = { "_id": new ObjectID( req.params.id ) };
        await collection.deleteOne(where)
        res.json({id: req.params.id });
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }    
});
/******************************** 
* 
*********************************/
router.post('/file_upload', multer({dest: '/tmp/samplefup/'}).single('file1'), 
 async function(req, res) {
    try{ 
        var sys_const = LibConst.get_const()
//console.log( sys_const.upload_img_dir )        
//console.log(req.file.path, req.file.originalname);
//console.log("originalname=", req.file.originalname);
        var s = moment().format("YYYYMMDDHHmmss")
        var fname = req.file.originalname
        fname = s + "_" +fname
        fs.rename(req.file.path, sys_const.upload_img_dir + fname, (err) => {
            if (err) throw err;
//            console.log('ファイルを移動しました');
        });
        var params ={
            ret: 1,
            fname: fname,
            img_url: sys_const.url_root + "/img/" + fname ,
        }
        res.json(params);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }        
});
/******************************** 
* 
*********************************/
router.get('/tasks_test', function(req, res) {
});


module.exports = router;
