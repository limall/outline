var fs=require('fs');

module.exports=function(content,path,nodeName,suffix){
    var filepath;
    if(path==='out'){
        filepath=Editor.projectPath+'/out';
        if(!fs.existsSync(filepath))
            fs.mkdirSync(filepath);
        filepath+='/'+nodeName+'.'+suffix;
    }else if(path===''){
        Editor.log('please input your dst hpp path');
    }else{
        filepath=path;
    }
    if(filepath){
        fs.writeFile(filepath,content,(err)=>{
            if(err){
                Editor.error('dst hpp path is error\n'+err);
            }else{
                Editor.success('export node '+nodeName+' successfully');
            }
        });
    }
}