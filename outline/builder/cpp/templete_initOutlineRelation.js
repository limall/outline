var path=Editor.projectPath+'/packages/outline/builder/cpp/';

var templete=require('fs').readFileSync(path+'templete_initOutlineRelation.hpp').toString();
function getOne(name,children){
    var text='';
    children.forEach((child)=>{
        var str=templete.replace(/\/\*PnodeName\*\//,name);
        str=str.replace(/\/\*childName\*\//,child);
        text+=str+'\n';
    });
    return text;
}
module.exports.getRelation=(relations)=>{
    var text='';
    relations.forEach((relation)=>{
        if(relation.children.length>0)
            text+=getOne(relation.name,relation.children)+'\n';
    });
    return text;
};