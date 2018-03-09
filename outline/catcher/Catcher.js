/**
 * 本文件着重于获取节点的数据
 * 包括如何获取单个节点的数据
 * 以及如何遍历整个节点树的数据（使用递归）
 */

var Outline=require('./Outline');

/**
 * 遍历节点树时，处理单个节点的函数
 * @param {cc.Node} node 待获取数据的节点
 * @param {function} catchOne 获取数据的函数(node,parentResult)，其中node为待获取数据的节点，parentResult为从父节点获取的数据
 * @param {any} parentResult 从父节点获取的数据
 */
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

/**
 * 遍历节点树，通过catchOne获取数据。注意它并不会返回数据，需要使用者在catchOne中自己获取并整理
 * @param {cc.Node} node 待遍历的根节点
 * @param {*} catchOne 获取数据的函数，同walkOneNode的catchOne参数
 */
function Catcher(node,catchOne){
    this.node=node;
    this.catchOne=catchOne;
    this.catchAll=function(){
        walkOneNode(node,catchOne);
    }
}

//遍历节点树，返回所有ExportRule
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

//遍历节点树，返回所有outline树的根outline
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