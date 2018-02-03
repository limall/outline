var luaBuilder=require('./builder/buildlua');

var assetsExportor=require('./assetsExportor');

var path=Editor.projectPath+'/packages/outline/';
let wss=new (require('ws').Server)({port:20383});
var preMsg;
module.exports = {
  load () {
    wss.on('connection',(ws)=>{
      ws.on('message',(msg)=>{
        if(preMsg!=msg){
          var obj=JSON.parse(msg);
          luaBuilder.buildAnimations(obj.anims,'out');
          preMsg=msg;
        }
      });
    }); 
  },

  unload () {
    // 当 package 被正确卸载的时候执行
  },
  messages: {
    //弹出选择export rule的界面
    'start-export-node' () {
      Editor.Panel.open('outline');
    },
    //获取Canvas上所有的export rule的名称
    'getRuleName' (event){
      Editor.Scene.callSceneScript('outline', 'getExportRules', function (data) {
        if(event.reply) {
          event.reply(data);
        }
      });
    },
    //按照选中的export rule导出node
    'export-node' (event,ruleNames){
      Editor.Scene.callSceneScript('outline', 'getNode',ruleNames,Editor.projectPath,function (data) {
        var dataObj=JSON.parse(data);
        for(var i=0;i<dataObj.length;i++){
          var obj=dataObj[i];
          var nodeDataObj=JSON.parse(obj.nodeData);
          luaBuilder.buildNode(nodeDataObj,obj.dstPath);
        }
      });
    }
  },
};
