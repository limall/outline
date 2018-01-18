var util=require('../util');

module.exports.buildCreatorRelationship=function(outlines){
    var luaCode='--relationship\n';
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
}