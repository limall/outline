cc.Class({
    extends: cc.Component,
    properties: {
        ruleName:'',
        src_Node:cc.Node,
        dstPath:'',
        excludeNodes:[cc.Node],
        use_world_position:{
            default:false,
            tooltip: "是否将此节点的坐标转为世界坐标"
        },
        namespace:{
            default:'O',
            tooltip:'导出的Creator所挂载的全局变量名'
        },
        resFolder:{
            default:'',
            displayName:'res_dst'
        }
        //exportRes:false,
        //dst_resolutionWidth:960,
        //dst_resolutionHeight:640,
    },

    // use this for initialization
    onLoad: function () {
    },
});
