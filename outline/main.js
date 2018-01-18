var luaBuilder=require('./template/buildlua');

var LANGUAGE_CPP=1;
var LANGUAGE_LUA=2;

var path=Editor.projectPath+'/packages/outline/';
let wss=new (require('ws').Server)({port:20383});
var preMsg;
module.exports = {
  load () {
    wss.on('connection',(ws)=>{
      ws.on('message',(msg)=>{
        if(preMsg!=msg){
          var obj=JSON.parse(msg);
          animationBuilder.write(obj.anims,obj.dst);
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
      Editor.Scene.callSceneScript('outline', 'getNode',ruleNames,function (data) {
        var dataObj=JSON.parse(data);
        for(var i=0;i<dataObj.length;i++){
          var obj=dataObj[i];
          var nodeDataObj=JSON.parse(obj.nodeData);
          exportNode(nodeDataObj,obj.dstPath,obj.language);
        }
      });
    }
  },
};

/**
 * @method exportNode 执行导出数据
 * @param {"Object"} nodeDataObj 节点的数据 
 * @param {String} dstPath 导出文件路径
 * @param {Integer} language 导出的语言
 */
function exportNode(nodeDataObj,dstPath,language){
  if(language===LANGUAGE_LUA){
    luaBuilder.build(nodeDataObj,dstPath);
  }
}
