var fs=require('fs');

module.exports=function(content,path,name,suffix,isAnimation){
    var filepath;
    if(path==='out'){
        filepath=Editor.projectPath+'/out';
        if(!fs.existsSync(filepath))
            fs.mkdirSync(filepath);
        filepath+='/'+name+'.'+suffix;
    }else if(path===''){
        Editor.log('please input your dst hpp path');
    }else{
        filepath=path;
    }
    if(filepath){
        fs.writeFile(filepath,content,(err)=>{
            if(err){
                Editor.error('dst path is error\n'+err);
            }else{
                if(isAnimation)
                    Editor.success('export animation '+name+' successfully');
                else
                    Editor.success('export node '+name+' successfully');
            }
        });
    }
}