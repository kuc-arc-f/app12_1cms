var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const { performance } = require('perf_hooks');

import LibMongo from "../libs/LibMongo"
import LibPagenate from "../libs/LibPagenate"
import LibCmsPosts from "../libs/LibCmsPosts"
import LibTop from "../libs/LibTop"
import LibConst from "../libs/LibConst"
import LibCommon from "../libs/LibCommon"

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
        var pages =await LibTop.get_pages_items()
        posts = LibCommon.string_to_date(posts)
// console.log(posts)
        var items = LibCmsPosts.get_post_items(posts , category_items)
        var param = LibPagenate.get_page_items(items )
        param.pages = pages
        param.category = category_items
        res.json(param);
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }   
});

/******************************** 
* 
*********************************/
router.get('/search_category', async function(req, res) {
    try{
        const collection = await LibMongo.get_collection("posts" )
        var category_id = req.query.category_id;
console.log( "#category_id:",category_id)
        var page = req.query.page;
        LibPagenate.init();
        var page_info = LibPagenate.get_page_start(page);       
//console.log( "page=",  page, page_info ); 
        var limit = {skip: page_info.start , limit: 1000 }
        // new ObjectID(category_id)
        var posts = await collection.find(
            { category_id: new ObjectID(category_id) } , limit 
            ).sort({created_at: -1}).toArray()
        var post_ids = LibCmsPosts.get_bread_ids(posts)
// console.log(posts)
        var category_items = await LibCmsPosts.get_category_items(post_ids)
        var pages =await LibTop.get_pages_items()
// console.log(pages)
        var items = LibCmsPosts.get_post_items(posts , category_items)
        var param = LibPagenate.get_page_items(items )
        param.pages = pages
        param.category = category_items
        res.json(param);
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }   
});
module.exports = router;
