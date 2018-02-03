var path=Editor.projectPath+'/packages/outline/builder/cpp/';  //该文件夹的绝对路径

var fs=require('fs');

var templete_origin_path=path+'template_hpp.hpp';               //模板文件的路径

//获取模板文件的auto generate内的内容
module.exports.getContentTemplate=function(){                   
    var text=fs.readFileSync(templete_origin_path).toString();
    var marker_start='//auto generate begin';
    var startIndex=text.indexOf(marker_start)+marker_start.length;
    var marker_end='//auto generate end';
    var endIndex=text.indexOf(marker_end);
    var content=text.substring(startIndex,endIndex);
    return content;
};


//更新auto generate内的内容，若未创建，则创建
module.exports.updateContent=function(nodeName,content,filepath){
    //若直接使用out作为路径，则导出文件将位于项目out文件夹内
    if(filepath==='out'){
        filepath=Editor.projectPath+'/out';
        if(!fs.existsSync(filepath))
            fs.mkdirSync(filepath);
        filepath+='/'+nodeName+'.hpp';
    }else if(filepath===''){
        Editor.log('please input your dst hpp path');
    }

    //若文件未创建则创建
    var isFirst=!fs.existsSync(filepath);
    if(isFirst){
        nodeName=nodeName.toUpperCase()+'_H';
        var textOrigin=fs.readFileSync(templete_origin_path).toString();
        textOrigin=textOrigin.replace(/\/\*define_h\*\//g,nodeName);
        fs.writeFile(filepath,textOrigin,(err)=>{
            if(err){
                Editor.error('dst hpp path is error\n'+err);
            }else{
                write();
            }
        });
    }else
        write();//若已经创建了则更新（只更改auto generate的内容）

    //执行写入操作的函数    
    function write(){
        var text=fs.readFileSync(filepath).toString();
        var marker_start='//auto generate begin';
        var head=text.substring(0,text.indexOf(marker_start)+marker_start.length+1);
        var marker_end='//auto generate end';
        var tail=text.substring(text.indexOf(marker_end));
        var newText=head+content+tail;
        fs.writeFile(filepath,newText,(err)=>{
            if(err)
                Editor.error(err);
            else 
                Editor.success('export node '+nodeName+' successfully');
        });
    }
};

//添加每个节点的结构体定义
module.exports.insertStructDefinition=function(content,structDefinition1,structDefinition2){
    var newContent=content.replace(/\/\*struct_definition1\*\//,structDefinition1);
    newContent=newContent.replace(/\/\*struct_definition2\*\//,structDefinition2);
    return newContent;
};

//添加根节点初始化
module.exports.insertRootDeclare=function(content,rootDeclare){
    newContent=content.replace(/\/\*root_declare\*\//,rootDeclare);
    return newContent;
};

//添加每个节点的初始化
module.exports.insertInstanceInit=function(content,instanceInit){
    var newContent=content.replace(/\/\*initInstance\*\//,instanceInit);
    return newContent;
};

//添加每个节点的父子关系
module.exports.insertRelation=function(content,outlineInit){
    var newContent=content.replace(/\/\*initRelation\*\//,outlineInit);
    return newContent;
};

