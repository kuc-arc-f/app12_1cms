// LibConst
const {promisify} = require('util');
// import moment from 'moment'

//
export default {
    get_const :function(){
        return {
//            upload_img_dir: "/tmp/",
            url_root: "http://localhost:3000",
            upload_img_dir: "/home/naka/work/node/express/app12/public/img/",
            p1: "param1",
        }
        console.log('#_func1aa')
    },
    /*
    string_to_date:function(items){
        var ret = [];
        items.forEach(function(item){
            if(typeof item.created_at !== 'undefined' ){
                item.created_at = new Date(item.created_at )
                var dt = moment(item.created_at )
                item.date_str = dt.format('YYYY-MM-DD HH:mm')
            }
            ret.push( item )
        });
        return ret;        
    },  
    */

}