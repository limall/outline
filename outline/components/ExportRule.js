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
        export_independent_file:{
            default:false,
            tooltip: '导出不依赖outline.lua的文件，拥有更高的兼容性'
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
