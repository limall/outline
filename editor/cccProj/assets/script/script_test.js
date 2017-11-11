cc.Class({
    extends: cc.Component,
    properties: {
        text: 'Hello, World!',
        beauty:{
            default: null,
            type: cc.Sprite
        }
    },
    onLoad: function () {
        console.log('test Scene loaded');
        var AnimationRecorder=require('AnimationRecorder');
    },
    update:(dt)=>{
    }
});
