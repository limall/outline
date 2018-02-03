var path=Editor.projectPath+'/packages/outline/builder/cpp/';  //该文件夹的绝对路径
var fs=require('fs');
var templete_origin_path=path+'templete_animation.hpp';               //模板文件的路径

function addX(x,varName){
    return 'that->'+varName+'->setPositionX(that->'+varName+'->getPositionX()+'+x+');';
}
  
function addY(y,varName){
    return 'that->'+varName+'->setPositionY(that->'+varName+'->getPositionY()+'+y+');';
}
  
function addScaleX(scaleX,varName){
    return 'that->'+varName+'->setScaleX(that->'+varName+'->getScaleX()+'+scaleX+');';
}
  
function addScaleY(scaleY,varName){
    return 'that->'+varName+'->setScaleY(that->'+varName+'->getScaleY()+'+scaleY+');';
}
  
function addRotation(rotation,varName){
    return 'that->'+varName+'->setRotation(that->'+varName+'->getRotation()+'+rotation+');';
}
  
function addOpacity(opacity,varName){
    return 'addOpacity(that->'+varName+','+opacity+');';
}
  
function addSpriteFrame(file){
    var p1='        temp=Sprite::create("'+file+'");\n';
    var p2='        Size size=temp->getContentSize();\n';
    var p3='        Rect rect=Rect(0,0,size.width,size.height);\n';
    var p4='        frame["'+file+'"]=SpriteFrame::create("'+file+'",rect);\n';
    return p1+p2+p3+p4;
}
  
function addSprite(file,varName){
    var p0='if(that->'+varName+'){\n'
    var p1='auto sprite=dynamic_cast<Sprite*>(that->'+varName+');';
    var p2='sprite->setSpriteFrame(frame["'+file+'"]);\n}';
    return p1+p2;
}
  
function addFrame(frameIndex,content){
    return '                case '+frameIndex+':'+content+'                        break;\n';
}

module.exports.write=function(anims,dst){
    var textOrigin=fs.readFileSync(templete_origin_path).toString();

    for(var i=0;i<anims.length;i++){
        var anim=anims[i];
        //init children
        var childNames=[];
        var animNodes=anim.animNodes;
        animNodes.forEach(function(animNode){
            var name=animNode.name;
            if(name!=='/')
                childNames.push(name);
        });
        var childrenTxt='';
        var childrenInitTxt='';
        var offsetInit='';
        childNames.forEach(function(childName){
            var varName=childName.replace(/\//g,'_');
            offsetInit+='            offsets['+varName+']=0;\n';
            childrenTxt+='        Node* '+varName+';\n';
            childrenInitTxt+='            '+varName+'=getChild(pNode,"'+childName+'");\n';
        });
        var text=textOrigin.replace(/\/\*children\*\//,childrenTxt);
        text=text.replace(/\/\*childreninit\*\//,childrenInitTxt);
        text=text.replace(/\/\*initOffset\*\//,offsetInit);
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

        var frameLength=animNodes[0].increments.length;

        for(var k=0;k<frameLength;k++){
            var oneFrameContent='';
            var haveNode=false;
            animNodes.forEach(function(animNode){
                var varName;
                if(animNode.name==='/')
                    varName='node';
                else
                    varName=animNode.name.replace(/\//g,'_');

                var increment=animNode.increments[k];
                var haveprop=false;
                var oneNodeContent='';
                for(var name in increment){
                    if(name==='spriteFrame'){
                        spriteFrameInit+=addSpriteFrame(increment[name]);
                        oneNodeContent+=addSprite(increment[name],varName);
                        haveprop=true;
                    }
                    else if(name==='x'){
                        oneNodeContent+=addX(increment[name],varName);
                        haveprop=true;
                    }
                    else if(name==='y'){
                        oneNodeContent+=addY(increment[name],varName);
                        haveprop=true;
                    } 
                    else if(name==='scaleX'){
                        oneNodeContent+=addScaleX(increment[name],varName);
                        haveprop=true;
                    }
                    else if(name==='scaleY'){
                        oneNodeContent+=addScaleY(increment[name],varName);
                        haveprop=true;
                    }
                    else if(name==='rotation'){
                        oneNodeContent+=addRotation(increment[name],varName);
                        haveprop=true;
                    }
                    else if(name==='opacity'){
                        oneNodeContent+=addOpacity(increment[name],varName);
                        haveprop=true;
                    }
                }
                var empty=haveNode?'                        ':'';
                if(haveprop){
                    oneFrameContent+=empty+'if(that->'+varName+'){'+oneNodeContent+'}\n';
                    haveNode=true;
                }
            });
            if(oneFrameContent);
                content+=addFrame(k,oneFrameContent);
        }

        text=text.replace(/\/\*Anim\*\//g,structName);
        text=text.replace(/\/\*define_h\*\//g,structName.toUpperCase()+'_H');
        text=text.replace(/\/\*frame\*\//,spriteFrameInit);
        text=text.replace(/\/\*content\*\//,content);
        text=text.replace(/\/\*max\*\//,frameLength);

        fs.writeFile(filepath,text,function(err){
            if(err)
                Editor.log(err);
            else
                Editor.success('export clip '+anim.clipName+' successfully');
        });
    }
}