'use strict';
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
          Editor.log('success');
          Editor.log(data);
        }
      });
    }
  },
};