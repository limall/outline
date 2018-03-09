function Status(node){
    this.x=node.x;
    this.y=node.y;
    this.scaleX=node.scaleX;
    this.scaleY=node.scaleY;
    this.rotation=node.rotation;
    this.width=node.width;
    this.height=node.height;
    this.colorR=node.color.getR();
    this.colorG=node.color.getG();
    this.colorB=node.color.getB();
    this.opacity=node.opacity;
    this.anchorX=node.anchorX;
    this.anchorY=node.anchorY;
    this.skewX=node.skewX;
    this.skewY=node.skewY;
    var sprite=node.getComponent(cc.Sprite);
    if(sprite){
        this.spriteFrame=sprite.spriteFrame;
    }
}

cc.Class({
    extends: cc.Animation,
    properties: {
    },
    onLoad:function(){
        var that=this;
        this.on('finished',function(){
            that.last=true;
        });
    },
    update:function(dt){
        if(!this.recordAble)
            return;
        
        if(this.frameIndex>0){
            for(var i=0;i<this.animNodes.length;i++){
                var node=this.animNodes[i].node;
                var status=new Status(node);
                this.animNodes[i].statuses.push(status);
            }
        }

        this.frameIndex++;

        //动画播完后处理录制的数据
        if(this.last){
            this.recordAble=false;

            for(var i=0;i<this.animNodes.length;i++){
                var node=this.animNodes[i].node;
                var statuses=this.animNodes[i].statuses;
                var haveSpriteFrame=false;
                for(var j=1;j<statuses.length;j++){
                    var status=statuses[j];
                    var preStatus=statuses[j-1];
                    var increment={};
                    for(var propName in preStatus){
                        var preProp=preStatus[propName];
                        var prop=status[propName];
                        if(preProp!=prop){
                            if(propName==='spriteFrame'){
                                haveSpriteFrame=true;
                                increment[propName]=prop;
                            }else{
                                var value;
                                var temp=value=prop-preProp;
                                if(temp<0)temp=-temp;
                                if(temp>0.00005)
                                    increment[propName]=value;
                            }
                        }
                    }
                    this.animNodes[i].increments.push(increment);
                }
                if(haveSpriteFrame){
                    var increment={
                        spriteFrame:statuses[0].spriteFrame
                    };
                    this.animNodes[i].increments.splice(0, 0, increment);
                }
            }

            for(var i=0;i<this.animNodes.length;i++){
                delete this.animNodes[i].node;
                delete this.animNodes[i].statuses;
            }
            if(this.autoRecorder)
                this.autoRecorder.getData(this.animNodes);
        }
    },
    startRecord:function(clip,autoRecorder){
        var clipName=clip.name;
        this.recordAble=true;
        this.last=false;
        this.autoRecorder=autoRecorder;
        this.animNodes=[new AnimNode(this.node,'/')];
        this.frameIndex=0;

        var paths=clip.curveData.paths;
        if(paths){
            for(var propName in paths){
                var prop=paths[propName];
                var node=cc.find(propName,this.node);
                if(node)
                    this.animNodes.push(new AnimNode(node,propName));
            }
        }

        this.play(clipName);
    },
    autoRecorder:null,
    recordAble:false,
    last:false,
    frameIndex:0, 
});

function AnimNode(node,nodePath){
    this.name=nodePath;
    this.node=node;
    this.statuses=[];
    this.increments=[];
}
