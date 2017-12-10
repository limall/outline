cc.Class({
    extends: cc.Animation,
    properties: {
    },
    onLoad:function(){
        this.isFirstClip=true;
        this.Status=require('status');
        var that=this;
        this.on('finished',function(){
            that.recordAble=false;
            if(that.autoRecorder)
                that.autoRecorder.getData(that.increments);
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
                if(propName==='rotation')
                    cc.log('pre:'+preProp+',this:'+prop);
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
    },
    startRecord:function(clipName,autoRecorder){
        this.statuses=[];
        this.increments=[];
        this.recordAble=true;
        this.autoRecorder=autoRecorder;
        this.clipName=clipName;
        this.play(clipName);
    },
    autoRecorder:null,
    recordAble:false,
    statuses:Array,
    increments:Array, 
});