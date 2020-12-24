
// LibTop
import LibMongo from "../libs/LibMongo"

//
export default {
    get_pages_items :async function(){
        try{
            var ret = []
            const collection = await LibMongo.get_collection("pages" )
//            var limit = {skip: page_info.start , limit: page_info.limit }
            ret = await collection.find().sort({created_at: -1}).toArray()
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_pages_items');
        }         
     
    },
    // get_category_items


}
