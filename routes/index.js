var express = require('express');
var router = express.Router();

const collectionName = 'tasks';

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
        var user = LibAuth.get_user(req)
        var mail = null
        var valid_login = false
        if(user != null){
            valid_login = true
            mail = user.mail
//            console.log(user.password );
        }
//        var view_group_user = true
        var base_items = { valid_login: valid_login }
        res.render('index', { 
            mail: mail ,
            base_items: base_items,
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
router.get('/show/:id', function(req, res, next) {
    try{
        console.log(req.params.id  );
        var user = LibAuth.get_user(req)
        var mail = null
        var valid_login = false
        if(user != null){
            valid_login = true
            mail = user.mail
//            console.log(user.password );
        }
//        res.render('cms/posts/show', {"params_id": req.params.id });        
        var base_items = { valid_login: valid_login }
        res.render('show', { 
            "params_id": req.params.id,
            mail: mail ,
            base_items: base_items,
            view_group_user: true,
        });
    } catch (e) {
        console.log(e);
    }    
});
/******************************** 
* 
*********************************/
router.get('/pages/:id', function(req, res, next) {
    try{
        var user = LibAuth.get_user(req)
        var mail = null
        var valid_login = false
        if(user != null){
            valid_login = true
            mail = user.mail
//            console.log(user.password );
        }
        var base_items = { valid_login: valid_login }
        res.render('page', {
            "params_id": req.params.id, 
            mail: mail ,
            base_items: base_items,
            view_group_user: true,
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
    res.redirect('/');
});


module.exports = router;
