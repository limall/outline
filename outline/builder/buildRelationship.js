var util=require('./util');

module.exports.buildCreatorRelationship=function(outlines){
    var luaCode='';
    outlines.forEach(function(outline){
        var parent=outline;
        var children=outline.children;
        if(children&&children.length>0){
            for(var i=0;i<children.length;i++){
                var parentName=util.firstCaseUp(util.getPName(parent));
                var childPName=util.firstCaseUp(util.getPName(children[i]));
                var childName=util.firstCaseUp(children[i].name);
                luaCode+=parentName+'.'+childName+'='+childPName+'\n';
            }
            luaCode+='\n';
        }
    });
    return luaCode;
}

module.exports.buildOutlineRelationship=function(outlines){
    var luaCode='';
    outlines.forEach(function(outline){
        var parent=outline;
        var children=outline.children;
        if(children&&children.length>0){
            var parentName='outline_'+util.getPName(parent);
            var code=parentName+'.children={';
            for(var i=0;i<children.length;i++){
                var childPName='outline_'+util.getPName(children[i]);
                code+=childPName+',';
            }
            code+='}\n';
            luaCode+=code;
        }
    });
    return luaCode;
}