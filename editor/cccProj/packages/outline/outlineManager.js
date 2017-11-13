var Outline=require('./outline');
var outlineManager={
    canvas:null,
    init:(canvas)=>{
        function walkOneNode(parent){
            Outline.create(parent);
            var children=parent.children;
            for(var i=0;i<children.length;i++){
                walkOneNode(children[i]);
            }
        }
        walkOneNode(canvas);
        this.canvas=canvas;
    },
    addOutline:(node)=>{
        Outline.create(node);
    },
    getDataByNode:(node)=>{
        var root={};
        function walkOneNode(obj,node){
            if(node.outline){
                node.outline.toJson(obj);
                obj.children=[];
                for(var i=0;i<node.children;i++){
                    var childObj={};
                    walkOneNode(childObj,node.children[i]);
                    obj.children.push(childObj);
                }
            }
        }
        walkOneNode(root,node);
        return JSON.stringify(root);
    },
};
module.exports=outlineManager;
