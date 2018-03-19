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
                clips.forEach(function(clip){
                    var clipName=clip.name;
                    that.anims.push(new Anim(node,clipName,clip));
                });
            }
        }

        this.i=-1;
        this.getData();
    },
    getData:function(anim){
        if(this.i>=0){
            this.anims[this.i].animNodes=anim.animNodes;
            this.anims[this.i].independent=anim.independent;
            this.anims[this.i].namespace=anim.namespace;
        }
        this.i=this.i+1;
        if(this.i<this.anims.length){
            var anim=this.anims[this.i];
            var node=anim.node;
            var clip=anim.clip;
            delete anim.clip;
            delete anim.node;
            var animationRecorder=node.getComponent('AnimationRecorder');
            animationRecorder.startRecord(clip,this);
        }else if(this.anims.length>0){
            var obj={};
            obj.anims=this.anims;
            ws.send(JSON.stringify(obj));
        }
    },
});
function Anim(node,clipName,clip){
    this.node=node;
    this.clipName=clipName;
    this.clip=clip;
}
