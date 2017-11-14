var outlineManager=require('./outlineManager');
module.exports = {
    'getCanvas': function (event) {
        var canvas = cc.find('Canvas');
        if(canvas){
            outlineManager.init(canvas);
            var data=outlineManager.getDataByNode(canvas);
            if (event.reply) {
                event.reply(data);
            }
        }
    }
};