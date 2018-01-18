var LanguageType=cc.Enum({
    cpp:1,
    lua:2
});
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
        language:{
            default:LanguageType.cpp,
            type:LanguageType
        }
        //exportRes:false,
        //dst_resolutionWidth:960,
        //dst_resolutionHeight:640,
    },

    // use this for initialization
    onLoad: function () {
    },
});
