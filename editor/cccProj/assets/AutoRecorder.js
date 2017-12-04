// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.back=new cc.Node('animation_selector');
        var sprite=this.back.addComponent(cc.Sprite);
        sprite.spriteFrame=this.backFrame;
        this.back.scaleX=this.node.width/this.back.width;
        this.back.scaleY=this.node.height/this.back.height;
        this.back.parent=this.node;

        var children=this.node.children;
        var maxIndex=0;
        for(var i=0;i<children.length;i++){
            var child=children[i];
            if(child.zIndex>maxIndex)
                maxIndex=child.zIndex;
        }
        this.back.zIndex=maxIndex+1;

        this.anims=[];
        var that=this;
        function walkOneNode(parent){
            var animation=parent.getComponent('AnimationRecorder');
            if(animation){
                var clips=animation.getClips();
                for(var i=0;i<clips.length;i++){
                    var clipName=clips[i].name;
                    that.anims.push(new Anim(parent,clipName));
                }
            }
            var children=parent.children;
            for(var i=0;i<children.length;i++){
                walkOneNode(children[i]);
            }
        }
        walkOneNode(this.node);

        this.i=-1;
        this.getData();
    },
    back:cc.Node,
    getData:function(increments){
        if(this.i>=0){
            this.anims[this.i].increments=increments;
        }
        this.i=this.i+1;
        if(this.i<this.anims.length){
            var anim=this.anims[this.i];
            var node=anim.node;
            var clipName=anim.clipName;
            var animationRecorder=node.getComponent('AnimationRecorder');
            animationRecorder.startRecord(clipName,this);
        }else if(this.anims.length>0){
            cc.log(this.anims);
        }
    },
});
function Anim(node,clipName,increments){
    this.node=node;
    this.clipName=clipName;
    this.increments=increments;
}
