var express = require('express');
var router = express.Router();

import LibCommon from "../libs/LibCommon"
import LibCsrf from "../libs/LibCsrf"
import LibMongo from "../libs/LibMongo"
var ObjectID = require('mongodb').ObjectID;
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
    res.render('cms/category/index', {"page": page } 
    );  
});
/******************************** 
* 
*********************************/
router.get('/add', function(req, res, next) {
    LibAuth.cms_valid_user(req, res)
    LibCsrf.set_token(req, res) 
    res.render('cms/category/new', {});
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
            name: data.name,  
            content: data.content ,
            user_id: "",
            created_at: new Date(),
        };
        const collection = await LibMongo.get_collection("category" )
        await collection.insertOne(item);       
        req.flash('success', 'Complete, save item');
        res.redirect('/cms_category')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save item');
        res.redirect('/cms_category')
    }        
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
console.log(req.params.id  );
    res.render('cms/category/show', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.get('/edit/:id',async function(req, res) {
    LibAuth.cms_valid_user(req, res)
console.log(req.params.id  );
    LibCsrf.set_token(req, res)
    const collection = await LibMongo.get_collection("category" )
    var where = { _id: new ObjectID(req.params.id) }
    var item = await collection.findOne(where)
console.log(item  );
//    res.render('cms/category/edit', {task: task });
    res.render('cms/category/edit', { item: item });
});
/******************************** 
* 
*********************************/
router.post('/update', async function(req, res, next) {
    try{
        var data = req.body
console.log(data )
        const collection = await LibMongo.get_collection("category" )
        var item = { 
            "name": req.body.name ,
            "content": req.body.content
        };           
        var where = {"_id": new ObjectID( req.body.id )};
        await collection.updateOne(where, { $set: item })
        req.flash('success', 'Complete, save item');
        return res.redirect('/cms_category')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save item');
        res.redirect('/cms_category')
    }        
});
/******************************** 
* 
*********************************/
router.post('/delete', async function(req, res, next) {
    try{
        var data = req.body
// console.log(data )  
        var id = data.id
        const collection = await LibMongo.get_collection("category" )
        var where = { "_id": new ObjectID( id ) };
        await collection.deleteOne(where)
       req.flash('success', 'Complete, delete item');
       res.redirect('/cms_category')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save task');
        res.redirect('/cms_category')
    }        
});

/******************************** 
* 
*********************************/
router.get('/test', function(req, res, next) {
    res.render('cms/posts/test', {});
  });
  
module.exports = router;
