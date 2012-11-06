// Generated by CoffeeScript 1.3.3
(function() {
  var g, getAliasFirst, getCMapFirst, getEMapFirst, getIMapFirst, getNMapFirst, _ref;

  if ((_ref = this.vichrome) == null) {
    this.vichrome = {};
  }

  g = this.vichrome;

  getNMapFirst = function() {
    var map, myMap, nmap, pageMap, url, _ref1;
    nmap = g.object(this.getSetting("keyMappingNormal"));
    pageMap = this.getSetting("pageMap");
    if (!(((_ref1 = g.view.getHref()) != null ? _ref1.length : void 0) > 0)) {
      return nmap;
    }
    myMap = nmap;
    for (url in pageMap) {
      map = pageMap[url];
      if (this.isUrlMatched(g.view.getHref(), url)) {
        g.extend(map.nmap, myMap);
      }
    }
    this.getNMap = function() {
      return myMap;
    };
    return myMap;
  };

  getIMapFirst = function() {
    var imap, map, myMap, pageMap, url, _ref1;
    imap = g.object(this.getSetting("keyMappingInsert"));
    pageMap = this.getSetting("pageMap");
    if (!(((_ref1 = g.view.getHref()) != null ? _ref1.length : void 0) > 0)) {
      return imap;
    }
    myMap = imap;
    for (url in pageMap) {
      map = pageMap[url];
      if (this.isUrlMatched(g.view.getHref(), url)) {
        g.extend(map.imap, myMap);
      }
    }
    this.getIMap = function() {
      return myMap;
    };
    return myMap;
  };

  getCMapFirst = function() {
    var cmap, map, myMap, pageMap, url, _ref1;
    cmap = g.object(this.getSetting("keyMappingCommand"));
    pageMap = this.getSetting("pageMap");
    if (!(((_ref1 = g.view.getHref()) != null ? _ref1.length : void 0) > 0)) {
      return cmap;
    }
    myMap = cmap;
    for (url in pageMap) {
      map = pageMap[url];
      if (this.isUrlMatched(g.view.getHref(), url)) {
        g.extend(map.cmap, myMap);
      }
    }
    this.getCMap = function() {
      return myMap;
    };
    return myMap;
  };

  getEMapFirst = function() {
    var emap, map, myMap, pageMap, url, _ref1;
    emap = g.object(this.getSetting("keyMappingEmergency"));
    pageMap = this.getSetting("pageMap");
    if (!(((_ref1 = g.view.getHref()) != null ? _ref1.length : void 0) > 0)) {
      return emap;
    }
    myMap = emap;
    for (url in pageMap) {
      map = pageMap[url];
      if (this.isUrlMatched(g.view.getHref(), url)) {
        g.extend(map.emap, myMap);
      }
    }
    this.getEMap = function() {
      return myMap;
    };
    return myMap;
  };

  getAliasFirst = function() {
    var aliases, map, myAlias, pageMap, url, _ref1;
    aliases = g.object(this.getSetting("aliases"));
    pageMap = this.getSetting("pageMap");
    if (!(((_ref1 = g.view.getHref()) != null ? _ref1.length : void 0) > 0)) {
      return aliases;
    }
    myAlias = aliases;
    for (url in pageMap) {
      map = pageMap[url];
      if (this.isUrlMatched(g.view.getHref(), url)) {
        g.extend(map.alias, myAlias);
      }
    }
    this.getAlias = function() {
      return myAlias;
    };
    return myAlias;
  };

  g.model = {
    initEnabled: false,
    domReady: false,
    disAutoFocus: false,
    searcher: null,
    pmRegister: null,
    curMode: null,
    settings: null,
    frameID: 0,
    init: function(commandManager, pmRegister) {
      this.commandManager = commandManager != null ? commandManager : new g.CommandManager(this);
      return this.pmRegister = pmRegister != null ? pmRegister : new g.PageMarkRegister;
    },
    changeMode: function(newMode) {
      var _ref1;
      if (this.curMode != null) {
        this.curMode.exit();
      }
      this.curMode = newMode;
      this.curMode.enter();
      return (_ref1 = this.commandManager) != null ? _ref1.setUseNumPrefix(this.curMode.getUseNumPrefix()) : void 0;
    },
    isReady: function() {
      return this.initEnabled && this.domReady;
    },
    setPageMark: function(key) {
      var mark;
      mark = {
        top: window.pageYOffset,
        left: window.pageXOffset
      };
      return this.pmRegister.set(mark, key);
    },
    goPageMark: function(key) {
      var offset;
      offset = this.pmRegister.get(key);
      if (offset) {
        return g.view.scrollTo(offset.left, offset.top);
      }
    },
    setSearcher: function(searcher) {
      this.searcher = searcher;
    },
    cancelSearchHighlight: function() {
      var _ref1;
      return (_ref1 = this.searcher) != null ? _ref1.cancelHighlight() : void 0;
    },
    enterNormalMode: function() {
      g.logger.d("enterNormalMode");
      return this.changeMode(new g.NormalMode);
    },
    enterInsertMode: function() {
      g.logger.d("enterInsertMode");
      return this.changeMode(new g.InsertMode);
    },
    enterEmergencyMode: function() {
      g.logger.d("enterEmergencyMode");
      return this.changeMode(new g.EmergencyMode);
    },
    enterCommandMode: function(executer, sources) {
      var mode;
      mode = new g.CommandMode;
      mode.setExecuter(executer).setSources(sources);
      g.logger.d("enterCommandMode");
      this.cancelSearchHighlight();
      return this.changeMode(mode);
    },
    enterSearchMode: function(backward, searcher_) {
      this.searcher = searcher_ != null ? searcher_ : new g.NormalSearcher;
      g.logger.d("enterSearchMode");
      this.changeMode((new g.SearchMode).init(this.searcher, backward));
      return this.setPageMark();
    },
    enterFMode: function(opt) {
      g.logger.d("enterFMode");
      return this.changeMode((new g.FMode).setOption(opt));
    },
    isInNormalMode: function() {
      return this.curMode.getName() === "NormalMode";
    },
    isInInsertMode: function() {
      return this.curMode.getName() === "InsertMode";
    },
    isInSearchMode: function() {
      return this.curMode.getName() === "SearchMode";
    },
    isInCommandMode: function() {
      return this.curMode.getName() === "CommandMode";
    },
    isInFMode: function() {
      return this.curMode.getName() === "FMode";
    },
    isInEmergencyMode: function() {
      return this.curMode.getName() === "EmergencyMode";
    },
    goNextSearchResult: function(reverse) {
      if (this.searcher == null) {
        return;
      }
      this.setPageMark();
      return this.searcher.goNext(reverse);
    },
    getNMap: getNMapFirst,
    getIMap: getIMapFirst,
    getCMap: getCMapFirst,
    getEMap: getEMapFirst,
    getAlias: getAliasFirst,
    getSetting: function(name) {
      return this.settings[name];
    },
    escape: function() {
      this.commandManager.reset();
      g.view.hideStatusLine();
      if (!this.isInNormalMode()) {
        return this.enterNormalMode();
      }
    },
    onBlur: function(target) {
      return this.curMode.blur(target);
    },
    prePostKeyEvent: function(key, ctrl, alt, meta) {
      this.disAutoFocus = false;
      return this.curMode.prePostKeyEvent(key, ctrl, alt, meta);
    },
    isValidKeySeq: function(keySeq) {
      if (this.getKeyMapping()[keySeq]) {
        return true;
      } else {
        return false;
      }
    },
    isValidKeySeqAvailable: function(keySeq) {
      var cmpStr, command, keyMapping, length, pos, seq;
      keyMapping = this.getKeyMapping();
      length = keySeq.length;
      for (seq in keyMapping) {
        command = keyMapping[seq];
        cmpStr = seq.slice(0, length);
        pos = cmpStr.indexOf("<", 0);
        if (pos >= 0) {
          pos = seq.indexOf(">", pos);
          if (pos >= length) {
            cmpStr = seq.slice(0, pos + 1);
          }
        }
        if (keySeq === cmpStr) {
          return true;
        }
      }
      return false;
    },
    isUrlMatched: function(url, matchPattern) {
      var regexp, str;
      str = matchPattern.replace(/\*/g, ".*").replace(/\/$/g, "").replace(/\//g, "\\/");
      str = "^" + str + "$";
      url = url.replace(/\/$/g, "");
      regexp = new RegExp(str, "m");
      if (regexp.test(url)) {
        g.logger.d("URL pattern matched:" + url + ":" + matchPattern);
        return true;
      }
      return false;
    },
    isEnabled: function() {
      var url, urls, _i, _len;
      urls = this.getSetting("ignoredUrls");
      for (_i = 0, _len = urls.length; _i < _len; _i++) {
        url = urls[_i];
        if (this.isUrlMatched(g.view.getHref(), url)) {
          g.logger.d("matched ignored list");
          return false;
        }
      }
      return true;
    },
    handleKey: function(msg) {
      return this.commandManager.handleKey(msg, this.getKeyMapping());
    },
    triggerCommand: function(method, args, times, timesSpecified) {
      if (this.curMode[method] != null) {
        return this.curMode[method](args, times, timesSpecified);
      } else {
        return g.logger.e("INVALID command!:", method);
      }
    },
    onSettings: function(msg) {
      if (msg.name === "all") {
        this.settings = msg.value;
      } else {
        this.settings[msg.name] = msg.value;
      }
      if (!this.isEnabled()) {
        this.settings.keyMappingNormal = {};
        this.settings.keyMappingInsert = {};
      }
      switch (msg.name) {
        case "keyMappingNormal":
          return this.getNMap = getNMapFirst;
        case "keyMappingInsert":
          return this.getIMap = getIMapFirst;
        case "keyMappingCommand":
          return this.getCMap = getCMapFirst;
        case "keyMappingEmergency":
          return this.getEMap = getEMapFirst;
        case "aliases":
          return this.getAlias = getAliasFirst;
      }
    },
    onFocus: function(target) {
      var _this = this;
      if (this.isInCommandMode() || this.isInSearchMode() || this.isInEmergencyMode()) {
        g.logger.d("onFocus:nothing should be done in the cur mode");
        return;
      }
      if (this.disAutoFocus) {
        setTimeout((function() {
          return _this.disAutoFocus = false;
        }), 500);
        this.enterNormalMode();
        g.view.blurActiveElement();
        return;
      }
      if (g.util.isEmbededFlash(target)) {
        return this.enterEmergencyMode();
      } else if (g.util.isEditable(target)) {
        return this.enterInsertMode();
      } else {
        return this.enterNormalMode();
      }
    },
    onMouseDown: function(e) {
      return this.disAutoFocus = false;
    },
    getKeyMapping: function() {
      return this.curMode.getKeyMapping();
    },
    onInitEnabled: function(msg) {
      g.logger.d("onInitEnabled");
      this.onSettings(msg);
      this.disAutoFocus = this.getSetting("disableAutoFocus");
      this.commandManager.setTimeout(this.getSetting("commandWaitTimeOut"));
      this.enterNormalMode();
      this.frameID = msg.frameID;
      this.initEnabled = true;
      if (typeof top !== "undefined" && top !== null) {
        chrome.extension.sendRequest({
          command: "NotifyTopFrame",
          frameID: this.frameID
        });
      }
      if (this.domReady) {
        return this.onDomReady();
      }
    },
    onDomReady: function() {
      g.logger.d("onDomReady");
      this.domReady = true;
      if (!this.initEnabled) {
        g.logger.w("onDomReady is called before onInitEnabled");
        return;
      }
      g.view.init();
      g.logger.d("disAutoFocus", this.disAutoFocus);
      if (g.util.isEditable(document.activeElement) && !this.disAutoFocus) {
        return this.enterInsertMode();
      } else {
        g.view.blurActiveElement();
        return this.enterNormalMode();
      }
    },
    openCommandBox: function(param) {
      var _ref1, _ref2, _ref3;
      if (typeof top !== "undefined" && top !== null) {
        param.command = "SendToCommandBox";
        g.view.showCommandFrame();
      } else {
        param.command = "TopFrame";
      }
      param.innerCommand = 'OpenCommandBox';
      if ((_ref1 = param.sender) == null) {
        param.sender = this.frameID;
      }
      if ((_ref2 = param.keyMap) == null) {
        param.keyMap = g.extendDeep(this.getCMap());
      }
      if ((_ref3 = param.aliases) == null) {
        param.aliases = g.extendDeep(this.getAlias());
      }
      return chrome.extension.sendRequest(param, function(msg) {
        return g.handler.onCommandResponse(msg);
      });
    }
  };

}).call(this);
