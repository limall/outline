var ws = new WebSocket("ws://localhost:20383");
ws.onopen = function (event) {
    console.log("Send Text WS was opened.");
};
ws.onmessage = function (event) {
    console.log("response text msg: " + event.data);
};
ws.onerror = function (event) {
    console.log("Send Text fired an error");
};
ws.onclose = function (event) {
    console.log("WebSocket instance closed.");
};

cc.Class({
    extends: cc.Component,

    properties: {
        dst_path:'',
        exportNodes:[cc.Node],
    },

    onLoad () {
        this.anims=[];
        var that=this;
        var exportNodes=this.exportNodes;
        for (var i=0;i<exportNodes.length;i++){
            var node=exportNodes[i];
            var animation=node.getComponent('AnimationRecorder');
            if(animation){
                var clips=animation.getClips();
                for(var i=0;i<clips.length;i++){
                    var clipName=clips[i].name;
                    that.anims.push(new Anim(node,clipName));
                }
            }
        }

        this.i=-1;
        this.getData();
    },
    getData:function(increments){
        if(this.i>=0){
            this.anims[this.i].increments=increments;
        }
        this.i=this.i+1;
        if(this.i<this.anims.length){
            var anim=this.anims[this.i];
            var node=anim.node;
            delete anim.node;
            var clipName=anim.clipName;
            var animationRecorder=node.getComponent('AnimationRecorder');
            animationRecorder.startRecord(clipName,this);
        }else if(this.anims.length>0){
            var obj={};
            obj.anims=this.anims;
            obj.dst=this.dst_path;
            ws.send(JSON.stringify(obj));
        }
    },
});
function Anim(node,clipName,increments){
    this.node=node;
    this.clipName=clipName;
    this.increments=increments;
}
