var nodeWalker=require('./nodeWalker');
module.exports = {
    'getExportRules':function(event){
        var canvas = cc.find('Canvas');
        if(canvas){
            var exportRules=[];
            var temp=canvas.getComponents('ExportRule');
            for(var i=0;i<temp.length;i++){
                exportRules.push(temp[i].ruleName);
            }
            var data=JSON.stringify(exportRules);
            if(event.reply) {
                event.reply(data);
            }
        }
    },
    'getNode': function (event,exportRuleName) {
        var canvas = cc.find('Canvas');
        if(canvas){
            var exportRules=canvas.getComponents('ExportRule');
            for(var i=0;i<exportRules.length;i++){
                var exportRule=exportRules[i];
                if(exportRuleName===exportRule.ruleName){
                    nodeWalker.init(exportRule.src_Node);
                    var obj=new Object();
                    obj.nodeData=nodeWalker.getDataByNode(exportRule.src_Node,exportRule.rootPosZero);
                    obj.dst_hppPath=exportRule.dst_hppPath;
                    if(event.reply) {
                        event.reply(JSON.stringify(obj));
                    }
                    break;
                }
            }
        }
    }
};