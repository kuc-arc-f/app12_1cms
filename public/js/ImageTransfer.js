// ImageTransfer
var ImageTransfer = {
    upload : function(id_file){
        console.log("#upload");
        var files = window.document.getElementById(id_file).files;
        var fileObject = files[0];
        if (typeof fileObject === "undefined") {
            return;
        }
        var formData = new FormData();
        formData.append(id_file, fileObject );
        var xhr = new XMLHttpRequest();
        var self = this
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.response)
                    console.log("OK, up");
                    console.log(data);
                    self.upload_cb(data.img_url);
                } else {
                    console.log("NG, up");
                }
            }
        }
        xhr.open("POST", "/api_cms_posts/file_upload");
        xhr.send(formData);    
    },  
    upload_cb :function(img_url){
console.log("#upload_cb");
        var md_img = "![img](" + img_url + ")"
        var txt = $("#content").val()
        txt = txt + '\r\n' + '***\r\n' + md_img
    //console.log(txt);
        $("#content").val(txt)
    },
    /*
    bb: function(){
        console.log("#bb")

    }  ,
    */
}