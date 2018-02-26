var getValueStr=require('./ValueStr');
var getSprite=require('./Sprite');
var getProgressBar=require('./ProgressBar');
var getEditBox=require('./EditBox');
var getParticleSystem=require('./ParticleSystem');
var getLabel=require('./Label');
var getWidget=require('./Widget');
var getCustomComponent=require('./CustomComponent');

function TypeInfo(){
    var map=this.map={};
    this.add=function(key,value){
        map[key]=value;
    };
    this.delete=function(key){
        delete map[key];
    };
    this.addCustom=function(key,value){
        if(key.indexOf('o__')===0){
            key=key.substring(3);
            value=getValueStr(value);
            if(value)
                map[key]=value
        }
    };
    this.toString=function(){
        var str='';
        for(var key in map){
            var value=map[key];
            str+=key+':'+value+'%o__%';
        }
        if(str==='')
            return null;
        else
            return str;
    };
    this.getData=function(){
        return map;
    };
}

module.exports=function(node){
    var typeInfo=new TypeInfo();

    var sprite=node.getComponent(cc.Sprite);
    if(sprite){
        var progressbar=node.getComponent(cc.ProgressBar);
        if(!progressbar){
            getSprite(sprite,typeInfo);
        }else{
            getProgressBar(progressbar,typeInfo);
        }
    }

    var editBox=node.getComponent(cc.EditBox);
    if(editBox){
        getEditBox(editBox,typeInfo);
    }

    var ps=node.getComponent(cc.ParticleSystem);
    if(ps){
        getParticleSystem(ps,typeInfo);
    }

    var label=node.getComponent(cc.Label);
    if(label){
        getLabel(label,typeInfo);
    }

    var button=node.getComponent(cc.Button);
    if(button)
        typeInfo.add('buttonType',getValueStr(1));
    
    getWidget(node,typeInfo);
    
    var userDatas=getCustomComponent(node,typeInfo);

    var obj={
        typeInfo:typeInfo.getData(),
    };
    obj.userDatas=[];
    userDatas.forEach(function(userData){
        obj.userDatas.push(userData.getData());
    });
    return obj;
}