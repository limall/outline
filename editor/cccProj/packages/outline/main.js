'use strict';

var udpLog=require('./udplog');
udpLog.resetDst('127.0.0.1',20131,1);

var fileBuilder=require('./template/cpp/templete');
var structBuilder=require('./template/cpp/templete_struct');
var rootBuilder=require('./template/cpp/templete_rootDeclare');
var instanceBuilder=require('./template/cpp/templete_initInstance');
var reletionBuilder=require('./template/cpp/templete_initOutlineRelation');

module.exports = {
  load () {
    // 当 package 被正确加载的时候执行
  },

  unload () {
    // 当 package 被正确卸载的时候执行
  },
  messages: {
    'export-scene' () {
      Editor.Scene.callSceneScript('outline', 'getCanvas', function (data) {
        if(data){
          udpLog.i('data',data);
        }
      });
    }
  },
};