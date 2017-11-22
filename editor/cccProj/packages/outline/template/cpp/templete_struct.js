var path=Editor.projectPath+'/packages/outline/template/cpp/';

var fs=require('fs');

var textTemplete=fs.readFileSync(path+'templete_struct.hpp').toString();

function setName(text,name,PName){
    var newText=text.replace(/\/\*Poutline_nodeName\*\//g,PName);
    newText=newText.replace(/\/\*outline_nodeName\*\//g,name);
    return newText;
}

function setChildren(text,children){
    var childrenText='';
    if(children){
        children.forEach((child)=>{
            childrenText+='\n        Struct_'+child.PName+' *'+child.name+';';
        });
    }
    var newText=text.replace(/\/\*children\*\//g,childrenText);
    return newText;
};

module.exports.getStructDefinition=(defArr)=>{
    var text=''; 
    defArr.forEach((def)=>{
        var oneText=textTemplete;
        oneText=setName(oneText,def.name,def.PName);
        oneText=setChildren(oneText,def.children);
        text+=oneText+'\n';
    });
    return text;
};