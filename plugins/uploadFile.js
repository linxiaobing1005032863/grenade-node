var fs = require('fs');
module.exports = function () {
    var file = arguments[0];
    var files = [];
        if(file instanceof Array){
            for(var i =0;i<file.length;i++){
                var f = file[i];
                var oo = {
                    value:fs.createReadStream(f.path),
                    options: {
                        filename: f.name
                    }
                };
                files.push(oo);
            }
        }else{
            var oo = {
                value:fs.createReadStream(file.path),
                options: {
                    filename: file.name
                }
            };
            files.push(oo);
        }
    return files;
}