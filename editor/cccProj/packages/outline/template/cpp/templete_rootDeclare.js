var fs=require('fs');
module.exports.getRootDeclare=(name)=>{
    var text=fs.readFileSync('./templete_rootDeclare.hpp').toString();
    var newText=text.replace(/\/\*outline_rootNodeName\*\//g,name);
    return newText;
};