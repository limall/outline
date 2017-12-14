function getStruct(componentName,extradatas){
    var text='\nstruct{\n';
    for(var i=0;i<extradatas.length;i++){
        var extradata=extradatas[i];
        var name=extradata.name;
        var type=extradata.type;
        var value=extradata.value;
        text+='    '+type+' '+name+'='+value+';\n';
    }
    text+='}'+componentName+';';
    return text;
}
module.exports=function(components){
    var text='';
    for(var propName in components){
        if(components[propName] instanceof Array){
            text+=getStruct(propName,components[propName]);
        }
    }
    return text;
}