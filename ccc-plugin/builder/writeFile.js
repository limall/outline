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

        //保留文尾用户自定义的内容
        const isUpdate=fs.existsSync(filepath);
        if(isUpdate){
            const oldText=fs.readFileSync(filepath).toString();
            const customIndex=oldText.indexOf('--outline-custom');
            if(customIndex>0){
                const customText=oldText.substring(customIndex);
                content+='\n'+customText;
            }
        }else{
            content+='\n--outline-custom';
        }

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