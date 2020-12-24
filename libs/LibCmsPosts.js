
// LibTasks
//const {promisify} = require('util');
import LibMongo from "../libs/LibMongo"

//
export default {
    /*
    get_serach_items :function(items, key){
        try{
            var data =[]
            var max = 1000
            items.forEach(function(item){
                if ( item.title.indexOf(key) != -1 ) {
                    console.log(data.length)
                    if(data.length < max){
                        data.push(item)
                   }
                }
            });        
            return data            
        } catch (e) {
            console.log(e);
            return null;
        }      
    },
    */
    get_bread_ids :function(items){
        try{
            var ret = []
            items.forEach(async function (item) {
//                    console.log( item.breads[0]._id )
                ret.push( item.category_id )
            });
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_bread_ids');
        }         
     
    },
    get_category_items  :async function(ids){
        try{
            var ret = []
            const collection = await LibMongo.get_collection("category" )
            await collection.find(
                {
                    _id: {$in : ids }                
                }            
            ).toArray().then((docs) => {
                ret = docs
// console.log(docs);
            })            
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_category_items');
        }         
    },    
    get_post_items : function(posts , categories){
        try{
            var ret = []
            posts.forEach(function (item) {
                item.category = { name: ""}
                categories.forEach(function (category){
//console.log( order_item._id.toString() )
                    if( item.category_id.toString() === category._id.toString()){
//                        console.log( order_item )
                        item.category = category ;
                    }
                });
                ret.push(item)
            });
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_post_items');
        } 
    },
}
