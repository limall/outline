function walkOneNode(array,node){
    if(node){
        var exportRules=node.getComponents('ExportRule');
        if(exportRules)
            exportRules.forEach(function(exportRule){
                array.push(exportRule);
            });
        var children=node.children;
        for(var i=0;i<children.length;i++){
            var child=children[i];
            walkOneNode(array,child);
        }
    }
}

module.exports=function(canvas){
    var exportRules=[];
    walkOneNode(exportRules,canvas);
    return exportRules;
}