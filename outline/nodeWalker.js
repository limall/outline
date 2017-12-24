var Outline=require('./outline');
var nodeWalker={
    //为传入节点及其所有子节点创建并添加一个Outline实例
    init:(node)=>{
        function walkOneNode(parent){
            Outline.create(parent);
            var children=parent.children;
            for(var i=0;i<children.length;i++){
                walkOneNode(children[i]);
            }
        }
        walkOneNode(node);
    },
    //获取传入节点及所有子节点的outline数据，并保持父子结构
    getDataByNode:(node,excludeNodes,use_world_pos)=>{
        var root={};
        function walkOneNode(obj,node){
            if(node.outline){
                node.outline.toJson(obj);
                obj.children=[];
                for(var i=0;i<node.children.length;i++){
                    var exclude=false;
                    for(var j=0;j<excludeNodes.length;j++){
                        if(excludeNodes[j]===node.children[i])
                            exclude=true;
                    }
                    if(exclude)
                        continue;
                    var childObj={};
                    walkOneNode(childObj,node.children[i]);
                    obj.children.push(childObj);
                }
            }
        }
        walkOneNode(root,node);
        //导出世界坐标还是节点坐标
        var parent=node.parent;
        if(use_world_pos)
            while(parent&&parent.name!=='Canvas'){
                root.x+=parent.outline.x;
                root.y+=parent.outline.y;
                parent=parent.parent;
            }
        return JSON.stringify(root);
    },
};
module.exports=nodeWalker;
