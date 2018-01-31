var fs=require('fs');

function createDir(path){
    var dirs=path.split(global.sep);
    var dir=dirs[0];
    for(var i=1;i<dirs.length-1;i++){
        dir=dir+global.sep+dirs[i];
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    }
}
module.exports.setFolder=function(path,projectPath){
    global.sep='\\';
    if(path.indexOf(sep)<0)
        global.sep='/';
    global.assetsExportor={};
    global.assetsExportor.folder=path+global.sep;
    Editor.projectPath=projectPath;
}
module.exports.addFile=function (path) {
    if(!global.assetsExportor)
        return;
    var src=Editor.projectPath+global.sep+'assets'+global.sep+path;
    path=global.assetsExportor.folder+path;
    var name=path.replace(/\//g,'_');
    name=name.replace(/\./,'_');
    name=name.replace(/\\/g,'_');
    name=name.replace(/\:/,'_');
    if(!global.assetsExportor[name])
        global.assetsExportor[name]={
            src:src,
            dst:path
        };
};
module.exports.startCopy=function(){
    var tasks=global.assetsExportor;
    global.assetsExportor=null;
    for(var name in tasks){
        if(name!='folder'){
            var task=tasks[name];
            var readable = fs.createReadStream( task.src );
            createDir(task.dst);
            var writable = fs.createWriteStream( task.dst ); 
            readable.pipe( writable );
        }
    }
}