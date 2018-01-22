cc.Class({
    extends: cc.Animation,
    properties: {
    },
    onLoad:function(){
        this.Status=require('status');
        var that=this;
        this.on('finished',function(){
            that.last=true;
        });
    },
    update:function(dt){
        if(!this.recordAble)
            return;
        
        for(var i=0;i<this.animNodes.length;i++){
            var node=this.animNodes[i].node;
            var status=new this.Status(node);

            if(this.animNodes[i].statuses.length>0){
                var preStatus=this.animNodes[i].statuses[this.animNodes[i].statuses.length-1];
                var increment={};
                for(var propName in preStatus){
                    var preProp=preStatus[propName];
                    var prop=status[propName];
                    if(preProp!=prop){
                        increment[propName]=propName==='spriteFrame'?prop:prop-preProp;
                    }
                }
                this.animNodes[i].increments.push(increment);
            }
            if(this.frameIndex!==0)
                this.animNodes[i].statuses.push(status);
        }
        this.frameIndex++;
        if(this.last){
            this.recordAble=false;
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
