var util=require ('./util')
var getValueStr=require('../catcher/ValueStr');

function addX(name,value){
    return 'addX('+name+','+value+');';
}
function addY(name,value){
    return 'addY('+name+','+value+');';
}
function addScaleX(name,value){
    return 'addScaleX('+name+','+value+');';
}
function addScaleY(name,value){
    return 'addScaleY('+name+','+value+');';
}
function addSize(name,width,height){
    return 'addSize('+name+','+width+','+height+');';
}
function addAnchor(name,x,y){
    return 'addAnchor('+name+','+x+','+y+');';
}
function addRotation(name,value){
    return 'addRotation('+name+','+value+');';
}
function addOpacity(name,value){
    return 'addOpacity('+name+','+value+');';
}
function addZOrder(name,value){
    return name+':setLocalZOrder('+name+':getLocalZOrder()+'+value+');';    
}
function addColor(name,r,g,b){
    return 'addColor('+name+','+r+','+g+','+b+');';
}
function addSpriteFrame(name,value){
    value=getValueStr(value);
    return 'setSpriteFrame('+name+','+value+');';;
}

function buildOneIncrement(increment,nodeName){
    var luaCode='';
    if(increment.width||increment.height){
        var width=increment.width||0;
        var height=increment.height||0;
        increment.size={width:width,height:height};
    }
    if(increment.colorR||increment.colorG||increment.colorB){
        var r=increment.colorR||0;
        var g=increment.colorG||0;
        var b=increment.colorB||0;
        increment.color={r:r,g:g,b:b};
    }
    if(increment.anchorX||increment.anchorY){
        var x=increment.anchorX||0;
        var y=increment.anchorY||0;
        increment.anchor={x:x,y:y};
    }
    for(var name in increment){
        //须先排除静止帧
        var isStatic=false;
        var value=increment[name];
        if(name==='anchor'){
            isStatic=value.x===0&&value.y===0;
        }else if(name==='size'){
            isStatic=value.width===0&&value.height===0;
        }else if(name==='color'){
            isStatic=value.r===0&&value.g===0&&value.b===0;
        }else{
            isStatic=value===0;
        }
        if(!isStatic){
            switch (name){
                case 'spriteFrame':
                    luaCode+=addSpriteFrame(nodeName,value);
                    break;
                case 'x':
                    luaCode+=addX(nodeName,value);
                    break;
                case 'y':
                    luaCode+=addY(nodeName,value);
                    break;
                case 'scaleX':
                    luaCode+=addScaleX(nodeName,value);
                    break;
                case 'scaleY':
                    luaCode+=addScaleY(nodeName,value);
                    break;
                case 'rotation':
                    luaCode+=addRotation(nodeName,value);
                    break;
                case 'opacity':
                    luaCode+=addOpacity(nodeName,value);
                    break;
                case 'anchor':
                    luaCode+=addAnchor(nodeName,value.x,value.y);
                    break;
                case 'size':
                    luaCode+=addSize(nodeName,value.width,value.height);
                    break;
                case 'color':
                    luaCode+=addColor(nodeName,value.r,value.g,value.b);
                    break;
                case 'zOrder':
                    luaCode+=addZOrder(nodeName,value);
                    break;
                }
            }
        }
    if(luaCode==='')
        return null;
    else
        luaCode='            '+luaCode+'\n';
    return luaCode;
}

var newAnim=false;
function buildOneFrame(frameIndex,increments,nodeNames){
    var luaCode='';
    if(frameIndex===0)
        newAnim=true;

    var haveFrame=false;
    for(var i=0;i<increments.length;i++){
        var increment=increments[i];
        var nodeName=nodeNames[i];
        var oneIncrement=buildOneIncrement(increment,nodeName);
        if(oneIncrement){
            haveFrame=true;
            luaCode+=oneIncrement;
        }
    }
    
    if(haveFrame){
        if(newAnim){
            luaCode='        if(that.frameIndex=='+(frameIndex+1)+')then\n'+luaCode;
            newAnim=false;
        }
        else
            luaCode='        elseif(that.frameIndex=='+(frameIndex+1)+')then\n'+luaCode;
    }
    return luaCode;
}

function buildDefine(name,namespace){
    name=util.firstCaseUp(name);
    var luaCode=namespace+'='+namespace+' or {}\n';
    luaCode+='local Base=outline_global\n';
    luaCode+='local '+name+'={}\n';
    luaCode+=namespace+'.'+name+'='+name+'\n';
    return luaCode;
}

function buildContent(anim){
    var luaCode='local function resume(self)\n';

    var childFullNames=[];
    var animNodes=anim.animNodes;
    animNodes.forEach(function(animNode){
        childFullNames.push(animNode.name);
    });

    luaCode+='    local node=self.node\n'
    for(var i=0;i<childFullNames.length;i++){
        var childName=childFullNames[i].replace(/\//g,'.');
        if(childName==='.'){
            childName='node';
            rootNodeDefined=true;
        }else{
            var path=childName.split('.');
            for(var j=0;j<path.length;j++){
                path[j]='"'+path[j]+'"';
            }
            path=path.join(',');
            luaCode+='    local '+childName+'=self.getChild(self.node,'+path+')\n';
            luaCode+='    if(not '+childName+')then return end\n';
        }
    }
    luaCode+='    local that=self\n';
    luaCode+='    function update(dt)\n';

    var frameLength=animNodes[0].increments.length;

    var nodeNames=[];
    animNodes.forEach(function(animNode){
        var nodeName;
        if(animNode.name==='/')
            nodeName='node';
        else
            nodeName=animNode.name.replace(/\//g,'_');
        nodeNames.push(nodeName);
    });

    for(var i=0;i<frameLength;i++){
        var increments=[];
        animNodes.forEach(function(animNode){
            var increment=animNode.increments[i];
            increments.push(increment);
        });
        luaCode+=buildOneFrame(i,increments,nodeNames);
    }

    luaCode+='        elseif(that.frameIndex=='+(frameLength+1)+')then\n';
    luaCode+='            that:whenFrameEnd()\n';
    luaCode+='            return\n';
    luaCode+='        end\n';
    luaCode+='        that.frameIndex=that.frameIndex+1\n';
    luaCode+='    end\n';
    luaCode+='    self.scheduleId=cc.Director:getInstance():getScheduler():scheduleScriptFunc(update,0,false)\n';
    luaCode+='end\n';
    return luaCode;
}

function buildCreate(name){
    name=util.firstCaseUp(name);
    var luaCode='function '+name+':create()\n';
    luaCode+='    local anim=Base.createAnim()\n';
    luaCode+='    anim.resume=resume\n';
    luaCode+='    return anim\n';
    luaCode+='end';
    return luaCode;
}

module.exports=function(anim,namespace){
    var clipName=util.firstCaseUp(anim.clipName);
    var luaCode=buildDefine(clipName,namespace);
    luaCode+=buildContent(anim);
    luaCode+=buildCreate(clipName);
    return luaCode;
}
