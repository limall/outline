var ws = new WebSocket("ws://localhost:30383");
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
var LanguageType=cc.Enum({
    cpp:1,
    lua:2
});
cc.Class({
    extends: cc.Component,

    properties: {
        language:{
            default:LanguageType.cpp,
            type:LanguageType
        },
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
    getData:function(animNodes){
        if(this.i>=0){
            this.anims[this.i].animNodes=animNodes;
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
            obj.language=this.language;
            cc.log(JSON.stringify(obj));
            ws.send(JSON.stringify(obj));
        }
    },
});
function Anim(node,clipName,clip){
    this.node=node;
    this.clipName=clipName;
    this.clip=clip;
}
