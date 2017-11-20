var fs=require('fs');

var textTemplete=fs.readFileSync('./templete_struct.hpp').toString();

function setName(text,name){
    var newText=text.replace(/\/\*outline_nodeName\*\//g,name);
    return newText;
}

function setChildren(text,children){
    var childrenText='';
    var first=true;
    children.forEach((child)=>{
        if(!first)
            childrenText+='\n        ';
        else
            first=false;
        childrenText+=child.struct+' *'+child.name+';';
    });
    var newText=text.replace(/\/\*children\*\//g,childrenText);
    return newText;
};

module.exports.getStructDefinition=(defArr)=>{
    var text=''; 
    defArr.forEach((def)=>{
        var oneText=textTemplete;
        oneText=setName(oneText,def.name);
        oneText=setChildren(oneText,def.children);
        text+=oneText+'\n';
    });
    return text;
};