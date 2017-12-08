var path=Editor.projectPath+'/packages/outline/template/cpp/';  //该文件夹的绝对路径
var fs=require('fs');
var templete_origin_path=path+'templete_animation.hpp';               //模板文件的路径

function addX(x){
    return 'that->node->setPositionX(node->getPositionX()+'+x+');';
}
  
function addY(y){
    return 'that->node->setPositionY(node->getPositionY()+'+y+');';
}
  
function addScaleX(scaleX){
    return 'that->node->setScaleX(node->getScaleX()+'+scaleX+');';
}
  
function addScaleY(scaleY){
    return 'that->node->setScaleY(node->getScaleY()+'+scaleY+');';
}
  
function addRotation(rotation){
    return 'that->node->setRotation(node->getRotation()+'+rotation+');';
}
  
function addOpacity(opacity){
    return 'addOpacity(node,'+opacity+');';
}
  
function addSpriteFrame(file){
    var p1='        temp=Sprite::create("'+file+'");\n';
    var p2='        Size size=temp->getContentSize();\n';
    var p3='        Rect rect=Rect(0,0,size.width,size.height);\n';
    var p4='        frame["'+file+'"]=SpriteFrame::create("'+file+'",rect);\n';
    return p1+p2+p3+p4;
}
  
function addSprite(file){
    var p1='auto sprite=dynamic_cast<Sprite*>(that->node);';
    var p2='sprite->setSpriteFrame(frame["'+file+'"]);';
    return p1+p2;
}
  
function addFrame(frameIndex,content){
    return '                case '+frameIndex+':'+content+'break;\n';
}

module.exports.write=function(anims,dst){
    var textOrigin=fs.readFileSync(templete_origin_path).toString();
    for(var i=0;i<anims.length;i++){
        var anim=anims[i];
        var filepath;
        if(dst==='out'){
            filepath=Editor.projectPath+'/out';
            if(!fs.existsSync(filepath))
                fs.mkdirSync(filepath);
            filepath+='/clip_'+anim.clipName+'.hpp';
        }else{
            filepath=dst+'/clip_'+anim.clipName+'.hpp';
            if(!fs.existsSync(filepath))
                Editor.error("can not find the path:"+dst);
        }
        var structName=anim.clipName.substring(0,1).toUpperCase()+anim.clipName.substring(1);
        var spriteFrameInit='';
        var content='';
        var increments=anim.increments;
        for(var j=0;j<increments.length;j++){
            var increment=increments[j];
            var oneFrameContent='';
            for(var name in increment){
                if(name==='spriteFrame'){
                    spriteFrameInit+=addSpriteFrame(increment[name]);
                    oneFrameContent+=addSprite(increment[name]);
                }
                else if(name==='x')
                    oneFrameContent+=addX(increment[name]);
                else if(name==='y')
                    oneFrameContent+=addY(increment[name]);
                else if(name==='scaleX')
                    oneFrameContent+=addScaleX(increment[name]);
                else if(name==='scaleY')
                    oneFrameContent+=addScaleY(increment[name]);
                else if(name==='rotation')
                    oneFrameContent+=addRotation(increment[name]);
                else if(name==='opacity')
                    oneFrameContent+=addOpacity(increment[name]);
            }
            if(oneFrameContent);
                content+=addFrame(j,oneFrameContent);
        }
        var text=textOrigin.replace(/\/\*Anim\*\//g,structName);
        text=text.replace(/\/\*define_h\*\//g,structName.toUpperCase()+'_H');
        text=text.replace(/\/\*frame\*\//,spriteFrameInit);
        text=text.replace(/\/\*content\*\//,content);
        text=text.replace(/\/\*max\*\//,increments.length);
        fs.writeFile(filepath,text,function(err){
            if(err)
                Editor.log(err);
            else
                Editor.log('export clip successfully');
        });
    }
}