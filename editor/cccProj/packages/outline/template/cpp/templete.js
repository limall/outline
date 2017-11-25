var path=Editor.projectPath+'/packages/outline/template/cpp/';

var fs=require('fs');

var templete_origin_path=path+'template_hpp.hpp';

module.exports.getContentTemplate=function(){
    var text=fs.readFileSync(templete_origin_path).toString();
    var marker_start='//auto generate begin';
    var startIndex=text.indexOf(marker_start)+marker_start.length;
    var marker_end='//auto generate end';
    var endIndex=text.indexOf(marker_end);
    var content=text.substring(startIndex,endIndex);
    return content;
};

module.exports.setContent=function(nodeName,content,filepath){
    if(filepath==='out'){
        filepath=Editor.projectPath+'/out';
        if(!fs.existsSync(filepath))
            fs.mkdirSync(filepath);
        filepath+='/'+nodeName+'.hpp';
    }else if(filepath===''){
        Editor.log('please input your dst hpp path');
    }
    var isFirst=!fs.existsSync(filepath);
    if(isFirst){
        var textOrigin=fs.readFileSync(templete_origin_path).toString();
        fs.writeFile(filepath,textOrigin,(err)=>{
            if(err){
                Editor.error('dst hpp path is error\n'+err);
            }else{
                write();
            }
        });
    }else
        write();
    function write(){
        Editor.log(filepath);
        var text=fs.readFileSync(filepath).toString();
        var marker_start='//auto generate begin';
        var head=text.substring(0,text.indexOf(marker_start));
        var marker_end='//auto generate end';
        var tail=text.substring(text.indexOf(marker_end)+marker_end.length);
        var newText=head+content+tail;
        fs.writeFile(filepath,newText,(err)=>{
            if(err)
                console.log(err);
        });
    }
};

module.exports.insertStructDefinition=function(content,structDefinition){
    var newContent=content.replace(/\/\*struct_definition\*\//,structDefinition);
    return newContent;
};

module.exports.insertRootDeclare=function(content,rootDeclare1,rootDeclare2){
    var newContent=content.replace(/\/\*root_declare1\*\//,rootDeclare1);
    newContent=newContent.replace(/\/\*root_declare2\*\//,rootDeclare2);
    return newContent;
};

module.exports.insertInstanceInit=function(content,instanceInit){
    var newContent=content.replace(/\/\*initInstance\*\//,instanceInit);
    return newContent;
};

module.exports.insertRelation=function(content,outlineInit){
    var newContent=content.replace(/\/\*initRelation\*\//,outlineInit);
    return newContent;
};

