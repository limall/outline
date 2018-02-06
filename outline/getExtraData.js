var spriteSource=require('./spriteSource');
var getWidget=require('./getWidget');
var assetsExportor=require('./assetsExportor');
var getEditBox=require('./getEditBox');
var getProgressBar=require('./getProgressbar');
//根据值推断类型，目前支持int float string bool类型
var numChars=['0','1','2','3','4','5','6','7','8','9','.','-'];
function getType(value){
    if(value instanceof cc.Vec2)
        return 'Vec2';

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
    if(type==='Vec2')
        value='Vec2'+value;
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
    var mapAble='';

    var button=node.getComponent(cc.Button);
    if(button)
        mapAble+='buttonType:1%o__%';

    var widget=getWidget(node);
    if(widget)
        mapAble+=widget;
    
    var sprite=node.getComponent(cc.Sprite);

    if(sprite){
        assetsExportor.addFile(spriteSource.getImageFile(sprite.spriteFrame));
        assetsExportor.addFile(spriteSource.getPList(sprite.spriteFrame));

        var progressbar=node.getComponent(cc.ProgressBar);
        if(progressbar){
            mapAble+=getProgressBar(progressbar);
        }else{
            extradata.isSprite=true;
            extradata.spriteFrame='"'+spriteSource.getSpriteFrame(sprite.spriteFrame)+'"';

            var insetTop=sprite.spriteFrame.insetTop;
            var insetBottom=sprite.spriteFrame.insetBottom;
            var insetLeft=sprite.spriteFrame.insetLeft;
            var insetRight=sprite.spriteFrame.insetRight;

            if(sprite.type===cc.Sprite.Type.SLICED){
                mapAble+='slice:true%o__%';
                mapAble+='insetTop:'+insetTop+'%o__%';
                mapAble+='insetBottom:'+insetBottom+'%o__%';
                mapAble+='insetLeft:'+insetLeft+'%o__%';
                mapAble+='insetRight:'+insetRight+'%o__%';
            }
        }
    }

    var editBox=node.getComponent(cc.EditBox);
    if(editBox){
        var str_editBox=getEditBox(editBox);
        mapAble+=str_editBox;
    }

    var partical=node.getComponent(cc.ParticleSystem);
    if(partical){
        mapAble+='particleSystem:true%o__%';

        var file=partical.file.substring(partical.file.indexOf('/assets/')+8)+'%o__%';
        assetsExportor.addFile(file);
        mapAble+='file:'+file;

        if(partical.custom){
            mapAble+='custom:true%o__%';
            var props=['duration','emissionRate','life','totalParticles','startColor','startColorVar','endColor','endColorVar','angle','startSize','endSize','startSpin','endSpin','angleVar','startSizeVar','endSizeVar','startSpinVar','endSpinVar','lifeVar','positionType','emitterMode','speed','speedVar','tangentialAccel','tangentialAccelVar','radialAccel','radialAccelVar','rotationIsDir','startRadius','startRadiusVar','endRadius','endRadiusVar','rotatePerS','rotatePerSVar'];
            props.forEach(function(propName){
                mapAble+=propName+':'+partical[propName]+'%o__%';
            });
            if(partical.texture!=''){
                var texture=partical.texture.substring(fullPath.indexOf('/assets/')+8)+'%o__%';
                assetsExportor.addFile(texture);
                mapAble+='texture:'+texture;
            }
            mapAble+='gravityX:'+partical.gravity.x+'%o__%';
            mapAble+='gravityY:'+partical.gravity.y+'%o__%';
            mapAble+='sourcePosY:'+partical.sourcePos.y+'%o__%';
            mapAble+='posVarX:'+partical.posVar.x+'%o__%';
            mapAble+='sourcePosX:'+partical.sourcePos.x+'%o__%';
            mapAble+='posVarY:'+partical.posVar.y+'%o__%';
        }
    }

    var label=node.getComponent(cc.Label);
    if(label){

        extradata.isLabel=true;
        extradata.label_string='"'+label.string+'"';
        var font=label.font;
        if(font){
            if(font instanceof cc.LabelAtlas){
                mapAble+='isLabelAtlas:true%o__%';
                mapAble+='labelAtlas_atlas:'+spriteSource.getSpriteFrame(font.spriteFrame)+'%o__%';
                var temp=font._fntConfig.fontDefDictionary;
                var isFirst=true;
                for(var propName in temp){
                    var prop=temp[propName];
                    if(prop.rect){
                        if(isFirst){
                            mapAble+='labelAtlas_startChar:'+propName+'%o__%';
                            mapAble+='labelAtlas_itemWidth:'+prop.rect.width+'%o__%';
                            mapAble+='labelAtlas_itemHeight:'+prop.rect.height+'%o__%';
                            isFirst=false
                        }
                    }
                }

            }
        }else
            extradata.label_fontSize=label.fontSize;
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
    extradata.components={};
    for(var i=0;i<components.length;i++){
        var component=components[i];
        var componentName=getComponentName(component.name);
        var props=[];
        for(var propName in component){
            if(propName.indexOf('o__')===0){
                var name=propName.substring(3);
                var value=component[propName];
                if(value instanceof cc.SpriteFrame){
                    assetsExportor.addFile(spriteSource.getImageFile(value));
                    assetsExportor.addFile(spriteSource.getPList(value));
                    value=spriteSource.getSpriteFrame(value);
                }
                mapAble+=name+':'+value+'%o__%';
            }else if(propName.indexOf('o_')===0){
                var name=propName.substring(2);
                var value=component[propName];
                if(value instanceof cc.SpriteFrame){
                    assetsExportor.addFile(spriteSource.getImageFile(value));
                    assetsExportor.addFile(spriteSource.getPList(value));
                    value=spriteSource.getSpriteFrame(value);
                }
                var type=getType(value);
                if(type){
                    props.push(ExtraData(name,value,type));
                }
            }
        }
        if(props.length>0)
            extradata.components[componentName]=props;
    }
    if(mapAble!='')
        extradata.mapAble='"'+mapAble+'"';
    return extradata;
}
