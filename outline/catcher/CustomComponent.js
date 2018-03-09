/**
 * 本文件用来获取用户自定义组件。
 * 包括以'o_'作开头的属性（需要生成组件名）
 * 以及'o__'作开头的属性（TypeInfo类在ExtraData.js中定义）
 */

var getValueStr=require('./ValueStr');

function UserData(){
    var obj=this.obj={};
    this.setName=function(name){
        this.name=name;
    };
    this.setUserDataName=function(name){
        obj.UserDataName=name;
    };
    this.add=function(key,value){
        if(key.indexOf('o_')===0&&key.indexOf('o__')!==0){
            key=key.substring(2);
            value=getValueStr(value);
            if(value)
                obj[key]=value
        }
    };
    this.isEffective=function(){
        var isEffective=false;
        for(var prop in obj){
            isEffective=true;
        }
        return isEffective;
    };
    this.getData=function(){
        return obj;
    };
}

var componentNames;
function getComponentName(userDatas){
    componentNames={};
    for(var i=0;i<userDatas.length;i++){
        var userData=userDatas[i];
        var name=userData.name;
        name=name.substring(name.indexOf('<')+1,name.indexOf('>'));
        if(componentNames[name]!==undefined){
            componentNames[name+'_userData'].setUserDataName(name+'0');
            componentNames[name]++;
            name=name+componentNames[name];
            userData.setUserDataName(name);
        }else{
            componentNames[name]=0;
            componentNames[name+'_userData']=userData;
            userData.setUserDataName(name);
        }
    }
}

module.exports=function(node,typeInfo){
    var components=node._components;

    //get typeInfo
    for(var i=0;i<components.length;i++){
        var component=components[i];
        for(var propName in component){
            typeInfo.addCustom(propName,component[propName]);
        }
    }

    //get userData
    var userDatas=[];
    for(var i=0;i<components.length;i++){
        var component=components[i];
        var userData=new UserData();
        for(var propName in component){
            userData.add(propName,component[propName]);
        }
        if(userData.isEffective()){
            userData.setName(component.name);
            userDatas.push(userData);
        }
    }
    getComponentName(userDatas);

    return userDatas;
}