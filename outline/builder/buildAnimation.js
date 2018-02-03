var util=require ('./util')

function addX(name,value){
    return 'that.'+name+':setPositionX(that.'+name+':getPositionX()+'+value+');';
}
function addY(name,value){
    return 'that.'+name+':setPositionY(that.'+name+':getPositionY()+'+value+');';
}
function addScaleX(name,value){
    return 'that.'+name+':setScaleX(that.'+name+':getScaleX()+'+value+');';
}
function addScaleY(name,value){
    return 'that.'+name+':setScaleY(that.'+name+':getScaleY()+'+value+');';
}
function addWidth(name,value){
    var luaCode='local sizeForW=that.'+name+':getContentSize();';
    luaCode+='sizeForW.width=sizeForW.width+'+value+';';
    luaCode+='that.'+name+':setContentSize(sizeForW);';
    return luaCode;
}
function addHeight(name,value){
    var luaCode='local sizeForH=that.'+name+':getContentSize();';
    luaCode+='sizeForH.height=sizeForH.height+'+value+';';
    luaCode+='that.'+name+':setContentSize(sizeForH);';
    return luaCode;
}
function addAnchorX(name,value){
    var luaCode='local pForX=that.'+name+':getAnchorPoint();';
    luaCode+='pForX.x=pForX.x+'+value+';';
    luaCode+='that.'+name+':setAnchorPoint(pForX);';
    return luaCode;
}
function addAnchorY(name,value){
    var luaCode='local pForY=that.'+name+':getAnchorPoint();';
    luaCode+='pForY.y=pForY.y+'+value+';';
    luaCode+='that.'+name+':setAnchorPoint(pForY);';
    return luaCode;
}
function addRotation(name,value){
    return 'that.'+name+':setRotation(that.'+name+':getRotation()+'+value+');';
}
function addOpacity(name,value){
    return 'that:addOpacity(that.'+name+','+value+','+name+');';
}
function addZOrder(name,value){
    return 'that.'+name+':setLocalZOrder(that.'+name+':getLocalZOrder()+'+value+');';    
}
function addColorR(name,value){
    var luaCode='local colorForR=that.'+name+':getColor();';
    luaCode+='colorForR.r=colorForR.r+'+value+';';
    luaCode+='that.'+name+':setColor(colorForR);';
    return luaCode;
}
function addColorG(name,value){
    var luaCode='local colorForG=that.'+name+':getColor();';
    luaCode+='colorForG.g=colorForG.g+'+value+';';
    luaCode+='that.'+name+':setColor(colorForG);';
    return luaCode;
}
function addColorB(name,value){
    var luaCode='local colorForB=that.'+name+':getColor();';
    luaCode+='colorForB.b=colorForB.b+'+value+';';
    luaCode+='that.'+name+':setColor(colorForB);';
    return luaCode;
}
function addSpriteFrame(name,value){
    var luaCode='local frame=getFrame("'+value+'");';
    luaCode+='that.'+name+':setSpriteFrame(frame);';
    return luaCode;
}

function buildOneIncrement(increment,nodeName){
    var luaCode='';
    for(var name in increment){
        switch (name){
        case 'spriteFrame':
            luaCode+=addSpriteFrame(nodeName,increment[name]);
            break;
        case 'x':
            luaCode+=addX(nodeName,increment[name]);
            break;
        case 'y':
            luaCode+=addY(nodeName,increment[name]);
            break;
        case 'scaleX':
            luaCode+=addScaleX(nodeName,increment[name]);
            break;
        case 'scaleY':
            luaCode+=addScaleY(nodeName,increment[name]);
            break;
        case 'rotation':
            luaCode+=addRotation(nodeName,increment[name]);
            break;
        case 'opacity':
            luaCode+=addOpacity(nodeName,increment[name]);
            break;
        case 'anchorX':
            luaCode+=addAnchorX(nodeName,increment[name]);
            break;
        case 'anchorY':
            luaCode+=addAnchorY(nodeName,increment[name]);
            break;
        case 'width':
            luaCode+=addWidth(nodeName,increment[name]);
            break;
        case 'height':
            luaCode+=addHeight(nodeName,increment[name]);
            break;
        case 'colorR':
            luaCode+=addColorR(nodeName,increment[name]);
            break;
        case 'colorG':
            luaCode+=addColorG(nodeName,increment[name]);
            break;
        case 'colorB':
            luaCode+=addColorB(nodeName,increment[name]);
            break;
        case 'zOrder':
            luaCode+=addZOrder(nodeName,increment[name]);
            break;
        }
    }
    if(luaCode==='')
        return null;
    else
        luaCode='            if(that.'+nodeName+')then '+luaCode+' end\n';
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
            luaCode='        if(that.frameIndex=='+frameIndex+')then\n'+luaCode;
            newAnim=false;
        }
        else
            luaCode='        elseif(that.frameIndex=='+frameIndex+')then\n'+luaCode;
    }
    return luaCode;
}

function buildDefine(name){
    name=util.firstCaseUp(name);
    var luaCode='local Base=require "outline.outline"\n';
    luaCode+='local '+name+'={}\n';
    luaCode+='Anims.'+name+'='+name+'\n';
    return luaCode;
}

function buildContent(anim){
    var luaCode='local function resume(self)\n';

    var childFullNames=[];
    var animNodes=anim.animNodes;
    animNodes.forEach(function(animNode){
        childFullNames.push(animNode.name);
    });

    for(var i=0;i<childFullNames.length;i++){
        var childName=childFullNames[i].replace(/\//g,'.');
        if(childName==='.'){
            childName='node';
        }else{
            var path=childName.split('.');
            for(var j=0;j<path.length;j++){
                path[j]='"'+path[j]+'"';
            }
            path=path.join(',');
            luaCode+='    self.'+childName+'=self.getChild(self.node,'+path+')\n';
        }
        luaCode+='    self.offsets_opacity["'+childName+'"]=0\n\n';
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

    luaCode+='        elseif(that.frameIndex=='+frameLength+')then\n';
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

module.exports=function(anim){
    var clipName=util.firstCaseUp(anim.clipName);
    var luaCode=buildDefine(clipName);
    luaCode+=buildContent(anim);
    luaCode+=buildCreate(clipName);
    return luaCode;
}