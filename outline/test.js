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
    return 'that:addOpacity(that.'+name+','+value+');';
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
function addTexture(name,value){
    return 'that.'+name+':setTexture('+value+');';
}

console.log(addX('node1',2.13));
console.log(addY('node1',2.13));
console.log(addScaleX('node1',2.13));
console.log(addScaleY('node1',2.13));
console.log(addWidth('node1',300));
console.log(addHeight('node1',221.5));
console.log(addAnchorX('node1',0.1));
console.log(addAnchorY('node1',0.1));
console.log(addRotation('node1',90));
console.log(addOpacity('node1',223));
console.log(addColorR('node1',4));
console.log(addColorG('node1',8));
console.log(addColorB('node1',7));
console.log(addTexture('node1','"a.png"'));
console.log(addZOrder('node1',20));