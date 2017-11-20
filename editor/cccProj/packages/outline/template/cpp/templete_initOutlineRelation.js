var templete=require('fs').readFileSync('./templete_initOutlineRelation.hpp').toString();
function getOne(name,children){
    var text='';
    children.forEach((child)=>{
        var str=templete.replace(/\/\*nodeName\*\//,name);
        str=str.replace(/\/\*childName\*\//,child);
        text+=str+'\n';
    });
    return text;
}
module.exports.getRelation=(relations)=>{
    var text='';
    relations.forEach((relation)=>{
        text+=getOne(relation.name,relation.children)+'\n';
    });
    return text;
};