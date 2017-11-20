var fs=require('fs');
module.exports.getInstanceInit=(instances)=>{
    var text='';
    var template=fs.readdirSync('./templete_initInstance.hpp');
    instances.forEach((instance)=>{
        var str=template.replace(/\/\*nodeName\*\//g,instance.name);
        str=str.replace(/\/\*parent\*\//,instance.parent);
        text+=str+'\n';
    });
    return text;
};