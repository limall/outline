//获取Canvas中的ExportRule信息，及其选中的node的数据
var nodeWalker=require('./nodeWalker');
module.exports = {
    //用于获取Canvas上所有export rule的信息
    'getExportRules':function(event){
        var canvas = cc.find('Canvas');
        if(canvas){
            var exportRules=[];
            var temp=canvas.getComponents('ExportRule');
            for(var i=0;i<temp.length;i++){
                var obj={};
                obj.ruleName=temp[i].ruleName;
                obj.src=temp[i].src_Node.name;
                obj.dst=temp[i].dstPath;
                exportRules.push(obj);
            }
            var data=JSON.stringify(exportRules);
            if(event.reply) {
                event.reply(data);
            }
        }
    },
    //用于获取所有选中的export rule制定的node的数据
    'getNode': function (event,exportRuleNames) {
        exportRuleNames=JSON.parse(exportRuleNames);
        function hasName(name){
            for(var i=0;i<exportRuleNames.length;i++){
                if(exportRuleNames[i]===name)
                    return true;
            }
            return false;
        }
        var canvas = cc.find('Canvas');
        if(canvas){
            var exportRules=canvas.getComponents('ExportRule');
            var nodes=[];
            for(var i=0;i<exportRules.length;i++){
                var exportRule=exportRules[i];
                if(hasName(exportRule.ruleName)){
                    nodeWalker.init(canvas);
                    var obj=new Object();
                    obj.nodeData=nodeWalker.getDataByNode(exportRule.src_Node,exportRule.excludeNodes,exportRule.use_world_position);
                    obj.dstPath=exportRule.dstPath;
                    obj.language=exportRule.language;
                    nodes.push(obj);
                }
            }
            if(event.reply) {
                event.reply(JSON.stringify(nodes));
            }
        }
    }
};