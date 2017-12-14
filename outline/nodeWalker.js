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
    getDataByNode:(node,excludeNodes)=>{
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
        //由于2dx和creator的坐标原点可能不同，这里需要转换坐标
        var parent=node.parent;
        if(parent)
            if(parent.name!=='Canvas'){
                parent=parent.parent;
                while(parent){
                    root.x+=parent.x;
                    root.y+=parent.y;
                    if(parent.name==='Canvas')
                        break;
                    parent=parent.parent;
                }
            }
        return JSON.stringify(root);
    },
};
module.exports=nodeWalker;
