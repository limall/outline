var Outline=require('./Outline');

function walkOneNode(node,catchOne,parentResult){
    if(node){
        var result=catchOne(node,parentResult);
        var children=node.children;
        for(var i=0;i<children.length;i++){
            var child=children[i];
            walkOneNode(child,catchOne,result);
        }
    }
}

function Catcher(node,catchOne){
    this.node=node;
    this.catchOne=catchOne;
    this.catchAll=function(){
        walkOneNode(node,catchOne);
    }
}

function catchExportRules(canvas){
    var array=[];
    var catcher=new Catcher(canvas,function(node){
        var exportRules=node.getComponents('ExportRule');
        if(exportRules){
            exportRules.forEach(function(exportRule){
                array.push(exportRule);
            });
        }
    });
    catcher.catchAll();
    return array;
}

function catchOutline(exportRule){
    var node=exportRule.src_Node;
    var excludeNodes=exportRule.excludeNodes;
    var use_world_pos=exportRule.use_world_position;
    
    var root;
    var catcher=new Catcher(node,function(node,parentResult){
        var outline=new Outline(node);
        outline=outline.toJsonObj();
        if(parentResult){
            var children=parentResult.children=parentResult.children||[];

            var exclude=false;
            excludeNodes.forEach(function(excludeNode){
                if(excludeNode===node)
                    exclude=true;
            });

            if(!exclude)
                children.push(outline);
        }else
            root=outline;
        return outline;
    });
    catcher.catchAll();

    //导出世界坐标还是节点坐标
    var parent=node.parent;
    if(use_world_pos){
        root.x=node.x;
        root.y=node.y;
        while(parent){
            root.x+=parent.x;
            root.y+=parent.y;
            if(parent.name==='Canvas')
                break;
            parent=parent.parent;
        }
    }

    return JSON.stringify(root);
}

module.exports.Catcher=Catcher;
module.exports.catchExportRules=catchExportRules;
module.exports.catchOutline=catchOutline;