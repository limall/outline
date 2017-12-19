//根据值推断类型，目前支持int float string bool类型
var numChars=['0','1','2','3','4','5','6','7','8','9','.','-'];
function getType(value){
    var valueStr=''+value;
    if(valueStr==='true'||valueStr==='false')
        return 'bool'
    var dotNum=0;
    var fuNum=0;
    var isNum=true;
    for(var i=0;i<valueStr.length;i++){
        var char=valueStr.charAt(i);
        if(char==numChars[10])
            dotNum++;
        if(char==numChars[11])
            fuNum++;
        var charIsNum=false;
        for(var j=0;j<numChars.length;j++){
            if(numChars[j]===char)
                charIsNum=true;
        }
        if(!charIsNum)
            isNum=false;
    }
    if(fuNum>0){
        if(valueStr.indexOf('-')!==0||fuNum!==1)
            isNum=false;
    }
    if(isNum){
        if(dotNum===0)
            return 'int';
        else if(dotNum===1)
            return 'float';
    }
    return 'string';
}

//存放每个属性
function ExtraData(name,value,type){
    if(type==='string')
        value='"'+value+'"';
    var obj={
        name:name,
        value:value,
        type:type
    }
    return obj;
}

//获取node上所有需要导出的数据
module.exports=function(node){
    var components=node._components;
    var extradata={};
    var sprite=node.getComponent(cc.Sprite);
    if(sprite){
        var fullPath=sprite.spriteFrame._textureFilename;
        extradata.isSprite=true;
        extradata.imageFile='"'+fullPath.substring(fullPath.indexOf('/assets/')+8)+'"';
    }
    var label=node.getComponent(cc.Label);
    if(label){
        extradata.isLabel=true;
        extradata.string='"'+label.string+'"';
        extradata.fontSize=label.fontSize;
    }
    var componentNames={};
    function getComponentName(name){
        name=name.substring(name.indexOf('<')+1,name.indexOf('>'));
        if(componentNames[name]){
            componentNames[name]++;
            name=name+componentNames[name];
            return name;
        }else{
            componentNames[name]=1;
            return name;
        }
    }
    var mapAble='';
    for(var i=0;i<components.length;i++){
        var component=components[i];
        var componentName=getComponentName(component.name);
        var props=[];
        for(var propName in component){
            if(!component[propName])
                continue;
            if(propName.indexOf('o__')===0){
                var name=propName.substring(3);
                var value=component[propName];
                if(value instanceof cc.SpriteFrame){
                    var fullPath=value._textureFilename;
                    value=fullPath.substring(fullPath.indexOf('/assets/')+8);
                }
                mapAble+=name+':'+value+'%o__%';
            }else if(propName.indexOf('o_')===0){
                var name=propName.substring(2);
                var value=component[propName];
                if(value instanceof cc.SpriteFrame){
                    var fullPath=value._textureFilename;
                    value=fullPath.substring(fullPath.indexOf('/assets/')+8);
                }
                var type=getType(value);
                if(type){
                    props.push(ExtraData(name,value,type));
                }
            }
        }
        if(props.length>0)
            extradata[componentName]=props;
    }
    if(mapAble!='')
        extradata.mapAble=mapAble;
    return extradata;
}
