var catcher=require('./catcher/Catcher');
var catchExportRules=catcher.catchExportRules;
var catchOutline=catcher.catchOutline;

var assetsExportor=require('./AssetsExportor');
module.exports = {
    //用于获取Canvas上所有export rule的信息
    'getExportRules':function(event){
        var canvas = cc.find('Canvas');
        if(canvas){
            var exportRules=[];
            var temp=catchExportRules(canvas);
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
    //用于获取所有选中的export rule指定的node的数据
    'getNode': function (event,exportRuleNames,projectPath) {
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
            var exportRules=catchExportRules(canvas);
            var nodes=[];

            var i=0;
            function syncExecute(){
                if(hasName(exportRules[i].ruleName)){
                    var exportRule=exportRules[i];
                    if(exportRule.resFolder&&exportRule.resFolder!='')
                        assetsExportor.setFolder(exportRule.resFolder,projectPath);
                    var obj=new Object();
                    catchOutline(exportRule,obj);
                    setTimeout(function(){
                        obj.dstPath=exportRule.dstPath;
                        obj.language=exportRule.language;
                        obj.export_independent_file=exportRule.export_independent_file;
                        obj.namespace=exportRule.namespace;
                        nodes.push(obj);
                        if(exportRule.resFolder&&exportRule.resFolder!='')
                            assetsExportor.startCopy();
                        if(i<exportRules.length)
                            syncExecute();
                        else{
                            event.reply(JSON.stringify(nodes));
                        }
                    },450);
                    i++;
                }else{
                    i++;
                    if(i<exportRules.length)
                        syncExecute();
                    else{
                        event.reply(JSON.stringify(nodes));
                    }
                }
            }
            syncExecute();
        }
    }
};