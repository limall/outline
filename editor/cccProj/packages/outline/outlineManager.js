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
    getDataByNode:(node,isZero)=>{
        var root={};
        function walkOneNode(obj,node){
            if(node.outline){
                node.outline.toJson(obj);
                obj.children=[];
                for(var i=0;i<node.children.length;i++){
                    var childObj={};
                    walkOneNode(childObj,node.children[i]);
                    obj.children.push(childObj);
                }
            }
        }
        walkOneNode(root,node);
        if(isZero){
            root.x=root.y=0;
        }else {
            var parent=node.parent;
            if(parent)
                if(parent.name!=='Canvas'){
                    parent=parent.parent;
                    while(parent){
                        Editor.log(root.x+','+root.y);
                        Editor.log(parent.name);
                        root.x+=parent.x;
                        root.y+=parent.y;
                        if(parent.name==='Canvas')
                            break;
                        parent=parent.parent;
                    }
                }
        }
        return JSON.stringify(root);
    },
};
module.exports=outlineManager;
