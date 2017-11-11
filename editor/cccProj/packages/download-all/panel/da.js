'use strict';

const Request = require('request');
const Fs = require('fire-fs');
const Path = require('fire-path');
const Electron = require('electron');
const Url = require('url');
const Async = require('async');

const DecodeUrl = require(Editor.url('packages://download-all/node_modules/decodeurl/decodeurl.js'));

function deepCopyObject (source, dist, excludes) {
    dist = dist || {};
    var keys = Object.keys(source);
    keys.forEach((key) => {
        if (excludes && excludes.indexOf(key) !== -1) return;
        var item = source[key];
        if (typeof item === 'object' && !Array.isArray(item)) {
            dist[key] = deepCopyObject(item);
        } else {
            dist[key] = item;
        }
    });
    return dist;
}
   

let style = `
  :host {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  #view {
    margin-top: 5px;
    background: #232323;
  }

  #progress-wrapper {
    position: absolute;
    background: rgba(0,0,0,0.6);
  }

  #progress {
    width: 80%;
    height: 30px;
  }
`;

let template = `
  <div id="content" class="flex layout vertical">
    <div class="layout horizontal center">
        <ui-input class="flex-3" v-value="data.url" placeholder="http://baidu.com/"></ui-input>
        <div class="flex-1 layout horizontal">
          <ui-button
            class="flex"
            v-on:confirm="_onDownload"
          >
            download
          </ui-button>
        </div>
    </div>
    <div class="layout horizontal center">
        <ui-input class="flex-3" v-value="data.dest"></ui-input>
        <div class="flex-1 layout horizontal">
          <ui-button class="small flex" v-on:confirm="_onChooseDest">
              ···
          </ui-button>
          <ui-button class="small flex" v-on:confirm="_onShowInFinder">
              ${Editor.T('SHARED.open')}
          </ui-button>
        </div>
    </div>
    <webview id="view" class="flex" v-bind:src="data.url" disablewebsecurity></webview>

    <div id="progress-wrapper" class="layout vertical center center-justified fit" v-if="downloading">
      <div>{{downloadingItem}}</div>
      <ui-progress 
        id="progress" 
        class="blue small"
        v-value="downloadProgress"
      >
      </ui-progress>
    </div>
  </div>
`;

Editor.Panel.extend({
  style: style,
  template: template,

  ready () {
    let view = this.view = this.queryID('view');
    view.preload = Editor.url('packages://download-all/panel/preload.js');
    view.addEventListener('ipc-message', event => {
      this[event.channel].apply(this, event.args);
    });
    view.addEventListener('dom-ready', () => {
      // view.openDevTools();
    });

    let profilesLocal = this.profiles.local;
    let data = profilesLocal.data;

    let vm = this._vm = new window.Vue({
      el: this.shadowRoot,
      data: {
        downloadProgress: 0,
        downloading: false,
        downloadingItem: '',

        data: data,
      },

      watch: {
        data: {
          handler (val) {
            if (!profilesLocal.save) return;
            deepCopyObject(val, profilesLocal.data, ['save']);
            profilesLocal.save();
          },
          deep: true
        }
      },

      methods: {
        _onDownload () {
          view.send('get-entries');
        },

        _onChooseDest (event) {
          event.stopPropagation();

          let res = Editor.Dialog.openFile({
              defaultPath: data.dest,
              properties: ['openDirectory']
          });

          if (res && res[0]) {
            this.data.dest = res[0];
          }
        },

        _onShowInFinder (event) {
          event.stopPropagation();

          let dest = data.dest;

          if (!Fs.existsSync(dest)) {
              Editor.warn('%s not exists!', dest);
              return;
          }

          Electron.shell.showItemInFolder(dest);
          Electron.shell.beep();
        }
      }
    });

    
  },

  'reply-get-entries' (entries) {
    let data = this.profiles.local.data;
    let view = this.view;
    let url = Url.parse(view.src);

    if (typeof entries === 'string') {
      entries = JSON.parse(entries);
    }

    entries.push({
      name: view.src
    });

    this._vm.downloading = true;
    this._vm.downloadProgress = 0;

    let downloaded = 0;
    let total = entries.length;

    Async.each(entries, (entry, done) => {
      let entryUrl = Url.parse( entry.name );

      let path = entryUrl.pathname;
      path = DecodeUrl(path);
      path = Path.join(data.dest, entryUrl.host, path);
      
      if (path[path.length-1] === '/') {
        path = Path.join(path, 'index.html');
      }

      try {
        Fs.ensureDirSync(Path.dirname(path));

        if (Fs.isDirSync(path)) {
          return done();
        }

        Fs.ensureFileSync(path);
      }
      catch (err) {
        Editor.warn(`[${entryUrl.href}] : ${err}`);
        downloaded ++;
        this._vm.downloadProgress = downloaded / total;
        done();
        return;
      }

      Request(entryUrl.href, (err) => {
        if (err) {
          Editor.warn(`[${entryUrl.href}] : ${err}`);
        }

        downloaded ++;

        this._vm.downloadingItem = entryUrl.href;
        this._vm.downloadProgress = downloaded / total * 100;

        done();
      }).pipe(Fs.createWriteStream(path));

    }, err => {
      if (err) {
        Editor.error(err);
      }

      this._vm.downloading = false;
      this._vm.downloadingItem = '';
      this._vm.downloadProgress = 0;
    });
  }
});
