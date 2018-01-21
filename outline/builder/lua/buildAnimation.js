var util=require ('../util')

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
    return 'that.'+name+':setTexture('+value+');';
}

function buildOneIncrement(increment,nodeName){
    var luaCode='';
    var haveProp=false;
    for(var name in increment){
        switch (name){
        case 'spriteFrame':
            luaCode+=addSpriteFrame(nodeName,increment[name]);
            haveProp=true;
            break;
        case 'x':
            luaCode+=addX(nodeName,increment[name]);
            haveProp=true;
            break;
        case 'y':
            luaCode+=addY(nodeName,increment[name]);
            haveProp=true;
            break;
        case 'scaleX':
            luaCode+=addScaleX(nodeName,increment[name]);
            haveProp=true;
            break;
        case 'scaleY':
            luaCode+=addScaleY(nodeName,increment[name]);
            haveProp=true;
            break;
        case 'rotation':
            luaCode+=addRotation(nodeName,increment[name]);
            haveProp=true;
            break;
        }
    }
}

module.exports.buildDefine=function(name){
    var luaCode='local Base=require "outline.outline"\n';
    luaCode+='local '+name+'={}\n';
    luaCode+='Anims.'+name+'='+name+'\n';
    return luaCode;
}

module.exports.buildContent=function(anim){
    var luaCode='local function resume(self)\n';

    var childFullNames=[];
    var animNodes=anim.animNodes;
    animNodes.forEach(function(animNode){
        childFullNames.push(animNode.name);
    });

    for(var i=0;i<childFullNames.length;i++){
        var childName=childFullNames[i].replace(/\//g,'_');
        if(childFullNames[i]==='_'){
            childName='node';
        }else{
            var path=childName.split('_');
            for(var j=0;j<path.length;j++){
                path[j]='"'+path[j]+'"';
            }
            path=path.join(',');
            luaCode+='    self.'+childName+'=self.getChild(self.node,'+path+')\n';
        }
        luaCode+='    self.offsets_opacity["'+childName+'"]=0\n';
    }
    luaCode+='    local that=self\n';
    luaCode+='    function update(dt)\n';

    var frameLength=animNodes[0].increments.length;
    if(frameLength>0){
        animNodes.forEach(function(animNode){
            var nodeName;
            if(animNode.name==='/')
                nodeName='node';
            else
                nodeName=animNode.name.replace(/\//g,'_');
        });
    }
}