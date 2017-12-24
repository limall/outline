cc.Class({
    extends: cc.Component,
    properties: {
        ruleName:'',
        src_Node:cc.Node,
        dst_hppPath:'',
        excludeNodes:[cc.Node],
        use_world_position:{
            default:false,
            tooltip: "是否将此节点的坐标转为世界坐标"
        }
        //exportRes:false,
        //dst_resolutionWidth:960,
        //dst_resolutionHeight:640,
    },

    // use this for initialization
    onLoad: function () {
    },
});
