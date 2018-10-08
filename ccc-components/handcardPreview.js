cc.Class({
    extends: cc.Component,

    properties: {
        isMiddle:false,
        num:17,
        isX:true,
        increment:60
    },

    onLoad(){ 
    },

    start () {
        var node=this.node;
        var num=this.num;
        var start=node.getPosition();
        var isX=this.isX;
        var increment=this.increment;
        var addpos=isX?new cc.Vec2(increment,0):new cc.Vec2(0,increment);
        if(this.isMiddle){
            for(var i=0;i<num;i++){
                var pos=new cc.Vec2(start.x,start.y);
                pos.x+=(i-(num-1)/2)*addpos.x;
                pos.y+=(i-(num-1)/2)*addpos.y;
                var aNode=cc.instantiate(node);
                aNode.removeComponent('handcardPreview');
                aNode.setPosition(pos);
                aNode.parent=node.parent;
            }
        }else{
            for(var i=0;i<num-1;i++){
                var aNode=cc.instantiate(node);
                aNode.removeComponent('handcardPreview');
                aNode.setPosition(start.x+i*addpos.x,start.y+i*addpos.y);
                aNode.parent=node.parent;
            }
        }
    },

    // update (dt) {},
});
