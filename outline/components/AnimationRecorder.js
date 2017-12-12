cc.Class({
    extends: cc.Animation,
    properties: {
    },
    onLoad:function(){
        this.isFirstClip=true;
        this.Status=require('status');
        var that=this;
        this.on('finished',function(){
            that.last=true;
        });
    },
    update:function(dt){
        if(!this.recordAble)
            return;
        var status=new this.Status(this.node);
        if(this.statuses.length>0){
            var preStatus=this.statuses[this.statuses.length-1];
            var increment={};
            for(var propName in preStatus){
                var preProp=preStatus[propName];
                var prop=status[propName];
                if(preProp!=prop){
                    increment[propName]=propName==='spriteFrame'?prop:prop-preProp;
                }
            }
            if(this.statuses.length===1){
                if(this.isFirstClip){
                    this.increments.push(increment);
                    this.isFirstClip=false;
                }
            }else 
                this.increments.push(increment);
        }
        this.statuses.push(status);
        if(this.last){
            this.recordAble=false;
            if(this.autoRecorder)
                this.autoRecorder.getData(this.increments);
        }
    },
    startRecord:function(clipName,autoRecorder){
        this.statuses=[];
        this.increments=[];
        this.recordAble=true;
        this.last=false;
        this.autoRecorder=autoRecorder;
        this.clipName=clipName;
        this.play(clipName);
    },
    autoRecorder:null,
    recordAble:false,
    last:false,
    statuses:Array,
    increments:Array, 
});
