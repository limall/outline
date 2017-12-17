function getStruct(componentName,extradatas){
    var text='\nstruct{\n';
    for(var i=0;i<extradatas.length;i++){
        var extradata=extradatas[i];
        var name=extradata.name;
        var type=extradata.type;
        var value=extradata.value;
        text+='    '+type+' '+name+';\n';
    }
    text+='}'+componentName+';';
    return text;
}

function getInstance(componentName,extradatas,isRoot){
    var text='';
    for(var i=0;i<extradatas.length;i++){
        var extradata=extradatas[i];
        var name=extradata.name;
        var type=extradata.type;
        var value=extradata.value;
        if(isRoot)
            text+='_pInstance->';
        else 
            text+='    ';
        text+=componentName+'.'+name+'='+value+';\n';
        if(isRoot)
            text+='            ';
    }
    return text;
}

module.exports=function(components,PName,isRoot){
    var text='';
    if(!isRoot){
        for(var propName in components){
            if(components[propName] instanceof Array){
                text+=getStruct(propName,components[propName]);
            }
        }
    }
    if(PName){
        if(!isRoot)
            text+='\n'+PName+'(){\n';
        for(var propName in components){
            if(components[propName] instanceof Array){
                text+=getInstance(propName,components[propName],isRoot);
            }
        }
        if(!isRoot)
            text+='}\n';
    }
    return text;
}
