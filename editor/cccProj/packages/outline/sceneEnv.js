var outlineManager=require('./outlineManager');
var sort=require('./sort');
module.exports = {
    'getCanvas': function (event) {
        var canvas = cc.find('Canvas');
        if(canvas){
            outlineManager.init(canvas);
            var data=outlineManager.getDataByNode(canvas);
            var obj=JSON.parse(data);
            var sorted=sort.sort(obj);
            data=JSON.stringify(sorted);
            if (event.reply) {
                event.reply(data);
            }
        }
    }
};