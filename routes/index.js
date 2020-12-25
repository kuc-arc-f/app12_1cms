var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

//
import LibMongo from "../libs/LibMongo"
import LibAuth from "../libs/LibAuth"

//  res.send('respond with a resource-1234');
/******************************** 
* 
*********************************/
router.get('/', function(req, res, next) {
    try{
        var query = req.query;
        var page = 1;
        if(query.page != null){
            page = query.page
            console.log( "page=", page )
        }  
        res.render('index', { 
            "page": page,
            view_group_user: true,
        });
    } catch (e) {
        console.log(e);
    }    
});
/******************************** 
* 
*********************************/
router.get('/show/:id',async function(req, res, next) {
    try{
//console.log(req.params.id  );
        const collection = await LibMongo.get_collection("posts" )
        var where = { _id: new ObjectID(req.params.id) }
        var item = await collection.findOne(where) 
        var title = item.title
// console.log(title );
        res.render('show', { 
            "params_id": req.params.id,
            view_group_user: true,
            title: title,
        });
    } catch (e) {
        console.log(e);
    }    
});
/******************************** 
* 
*********************************/
router.get('/pages/:id',async function(req, res, next) {
    try{
        const collection = await LibMongo.get_collection("pages" )
        var where = { _id: new ObjectID(req.params.id) }
        var item = await collection.findOne(where) 
        var title = item.title
// console.log("title:", title );
        res.render('page', {
            "params_id": req.params.id, 
            view_group_user: true,
            title: title,
        });
    } catch (e) {
        console.log(e);
    }    
});
/******************************** 
* 
*********************************/
router.get('/logout', function(req, res) {
    res.clearCookie('user');
    res.redirect('/login');
});


module.exports = router;
