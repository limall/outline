var ButtonType=cc.Enum({
    ScaleButton:1,
    ColorButton:2,
    SpriteButton:3,
    SelectButton:4,
    NoTransition:5
});
cc.Class({
    extends: cc.Component,
    properties: {
        o__btn_enableAutoGrayEffect:{
            displayName:'enable auto gray effect',
            default:false
        },
        o__btn_buttonType:{
            displayName:'buttonType',
            default:ButtonType.ScaleButton,
            type:ButtonType
        },
        o__btn_needSwallowTouch:{
            displayName:'needSwallowTouch',
            default:true
        },
        o__btn_cancelWhenScroll:{
            displayName:'cancelWhenScroll', 
            default:false
        },
        o__btn_image_normal:{
            default:null,
            type:cc.SpriteFrame,
            displayName:'normal'
        },
        o__btn_image_pressed:{
            default:null,
            type:cc.SpriteFrame,
            displayName:'pressed'
        },
        o__btn_image_disabled:{
            default:null,
            type:cc.SpriteFrame,
            displayName:'disabled'
        }
    },
});
