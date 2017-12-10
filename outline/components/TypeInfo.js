var TypeName=cc.Enum({
    Button:0,
    Sprite9:1,
});
cc.Class({
    extends: cc.Component,

    properties: {
        type:{
            default:TypeName.Button,
            type:TypeName,
        },
        Button_autoPress:true,
        Button_pressed:cc.SpriteFrame,
        Button_disabled:cc.SpriteFrame,
        Sprite9_size:cc.Size,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
