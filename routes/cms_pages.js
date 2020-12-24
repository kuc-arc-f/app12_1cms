var express = require('express');
var router = express.Router();

import LibCommon from "../libs/LibCommon"
import LibCsrf from "../libs/LibCsrf"
import LibMongo from "../libs/LibMongo"
var ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
    var query = req.query;
    var page = 1;
    if(query.page != null){
        page = query.page
        console.log( "page=", page )
    }  
    res.render('cms/pages/index', {"page": page } 
    );  
});
/******************************** 
* 
*********************************/
router.get('/add',async function(req, res, next) {
    LibCsrf.set_token(req, res) 
    const collection = await LibMongo.get_collection("pages" )
    var result = await collection.find({} ).toArray();
    //  console.log(result);
    res.render('cms/pages/new', { category: result });
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
            created_at: new Date(),
        };
        const collection = await LibMongo.get_collection("pages" )
        await collection.insertOne(item);       
        req.flash('success', 'Complete, save item');
        res.redirect('/cms_pages')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save item');
        res.redirect('/cms_pages')
    }        
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
console.log(req.params.id  );
    res.render('cms/pages/show', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.get('/edit/:id',async function(req, res) {
console.log(req.params.id  );
    LibCsrf.set_token(req, res) 
    const collection = await LibMongo.get_collection("pages" )
    var where = { _id: new ObjectID(req.params.id) }
    var item = await collection.findOne(where)
    res.render('cms/pages/edit', { item: item });
});
/******************************** 
* 
*********************************/
router.post('/update', async function(req, res, next) {
    try{
        if(LibCsrf.valid_token(req, res)== false){ return false; }
        var data = req.body
console.log(data )
        const collection = await LibMongo.get_collection("pages" )
        var item = { 
            "title": req.body.title ,
            "content": req.body.content
        };           
        var where = {"_id": new ObjectID( req.body.id )};
        await collection.updateOne(where, { $set: item })
        req.flash('success', 'Complete, save item');
        return res.redirect('/cms_pages')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save item');
        res.redirect('/cms_pages')
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
        const collection = await LibMongo.get_collection("pages" )
        var where = { "_id": new ObjectID( id ) };
        await collection.deleteOne(where)
       req.flash('success', 'Complete, delete item');
       res.redirect('/cms_pages')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save task');
        res.redirect('/cms_pages')
    }        
});

/******************************** 
* 
*********************************/
router.get('/test', function(req, res, next) {
    res.render('cms/posts/test', {});
  });
  
module.exports = router;
