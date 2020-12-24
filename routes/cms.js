var express = require('express');
var router = express.Router();

import LibCommon from "../libs/LibCommon"
import LibCsrf from "../libs/LibCsrf"
import LibMongo from "../libs/LibMongo"
import LibAuth from "../libs/LibAuth"
var ObjectID = require('mongodb').ObjectID;
/******************************** 
* 
*********************************/
router.get('/', function(req, res, next) {
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
        res.render('cms', { 
            mail: mail ,
            base_items: base_items,
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
