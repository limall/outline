cc.Class({
    extends: cc.Component,
    properties: {
        ruleName:'',
        src_Node:cc.Node,
        dst_hppPath:'',
        excludeNodes:[cc.Node],
        //exportRes:false,
        //dst_resolutionWidth:960,
        //dst_resolutionHeight:640,
    },

    // use this for initialization
    onLoad: function () {
    },
});
