cc.Class({
    extends: cc.Animation,
    properties: {
    },
    onLoad:function(){
        this.isFirst=true;
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
            var statuses=this.animNodes[i].statuses;
            var increments=this.animNodes[i].increments;

            var status=new this.Status(node);

            if(statuses>0){
                var preStatus=statuses[statuses.length-1];
                var increment={};
                for(var propName in preStatus){
                    var preProp=preStatus[propName];
                    var prop=status[propName];
                    if(preProp!=prop){
                        increment[propName]=propName==='spriteFrame'?prop:prop-preProp;
                    }
                }
                increments.push(increment);
            }

            if(this.isFirst){
                this.isFirst=false;
            }else
                statuses.push(status);
        }
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
        this.clipName=clip.name;
        this.recordAble=true;
        this.last=false;
        this.autoRecorder=autoRecorder;
        this.animNodes=[new AnimNode(this.node)];

        var paths=clip.curveData;
        if(paths){
            for(var propName in paths){
                var prop=paths[propName];
                var node=cc.find(propName,this.node);
                this.animNodes.push(new AnimNode(node));
            }
        }

        this.play(clipName);
    },
    autoRecorder:null,
    recordAble:false,
    last:false,
});

function AnimNode(node){
    this.name=node.name;
    this.node=node;
    this.statuses=[];
    this.increments=[];
}
