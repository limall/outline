cc.Class({
    extends: cc.Animation,
    properties: {
        project_node:{
            default:null,
            type:cc.Node
        }
    },
    onLoad:function(){
        this.Status=require('status');
        var that=this;
        this.on('play',function(){
            that.statuses=[];
            that.increments=[];
            that.recordAble=true;
        });
        this.on('finished',function(){
            that.recordAble=false;
            that.project_node.getComponent('outline').addAnimation(that.defaultClip.name,that.increments);
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
                if(preProp&&prop&&preProp!==prop)
                    increment[propName]=propName==='spriteFrame'?prop:prop-preProp;
            }
            this.increments.push(increment);
        }
        this.statuses.push(status);
    },
    recordAble:false,
    statuses:Array,
    increments:Array, 
});