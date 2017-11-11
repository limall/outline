'use strict';

const Electron = require('electron');

module.exports = {
  load () {
    Editor.Metrics.trackEvent({
        category: 'Packages',
        label: 'download-all',
        action: 'Load package'
    }, null);
  },

  unload () {
  },

  messages: {
    'open' () {
      Editor.Panel.open('download-all');
      
      Editor.Metrics.trackEvent({
        category: 'Packages',
        label: 'download-all',
        action: 'Panel Open'
      }, null);
    }
  }
};
