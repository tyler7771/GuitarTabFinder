/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Title = __webpack_require__(3);
	const Tuner = __webpack_require__(8);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const title = new Title();
	  const tuner = new Tuner();
	
	  window.title = title;
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Url = __webpack_require__(4);
	
	class Title {
	  constructor() {
	    this.getVideoUrl();
	    this.artist = "";
	    this.title = "";
	    this.bindEvents();
	  }
	
	  bindEvents() {
	    let checkbox = document.getElementById("checkbox");
	    checkbox.addEventListener("change", () => {
	      const artist = this.artist;
	      this.artist = this.title;
	      this.title = artist;
	      artistName.value = this.artist;
	      titleName.value = this.title;
	      this.buttonStatus();
	    });
	
	    let link = document.getElementById("link");
	    link.addEventListener("click", () => {
	      chrome.tabs.create({ url: "https://www.ultimate-guitar.com/lessons/for_beginners/how_to_read_tabs.html" });
	    });
	
	    let artistName = document.getElementById("artist-name");
	    artistName.addEventListener("keyup", () => {
	      console.log(this.artist);
	      this.artist = artistName.value;
	      this.buttonStatus();
	    });
	
	    let titleName = document.getElementById("title-name");
	    titleName.addEventListener("keyup", () => {
	      this.title = titleName.value;
	      this.buttonStatus();
	    });
	  }
	
	  buttonStatus() {
	    const buttons = ["tab", "chord", "uke", "bass", "all"];
	
	    for (let i = 0; i < buttons.length; i++) {
	      if (buttons[i] !== "all" &&
	        (this.artist === "" ||
	        this.title === "")) {
	        this.inactiveButton(buttons[i]);
	      } else if (buttons[i] === "all" && this.artist === ""){
	        this.inactiveButton(buttons[i]);
	      } else {
	        let url = new Url(buttons[i], this.artist, this.title);
	        url = url.url;
	        $.ajax({
	          url: url,
	          type: 'get',
	          success: () => this.buttonEvent(buttons[i]),
	          error: () => this.inactiveButton(buttons[i])
	        });
	      }
	    }
	  }
	
	  buttonEvent(type) {
	    let url = new Url(type, this.artist, this.title);
	    let button = document.getElementById(type);
	    button.disabled = false;
	    button.style.background = "linear-gradient(#e52d27, #b31217)";
	    button.addEventListener("click", () => {
	      url.openNewTab();
	    });
	  }
	
	  inactiveButton(type) {
	    const button = document.getElementById(type);
	    button.style.background = "#DCDCDC";
	    button.disabled = true;
	  }
	
	  getVideoUrl() {
	    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
	      (tabs) => {
	        const videoUrl = tabs[0].url.split("v=")[1];
	        this.getVideoId(videoUrl);
	      }
	    );
	  }
	
	  getVideoId(url) {
	    if (url === undefined) {
	      this.buttonStatus();
	    } else {
	      const ampersandPosition = url.indexOf('&');
	      if(ampersandPosition !== -1) {
	        url =  url.substring(0, ampersandPosition);
	      }
	      this.getVideoInfo(url);
	    }
	  }
	
	  getVideoInfo(vidId) {
	    $.get(`https://www.googleapis.com/youtube/v3/videos?id=${vidId}&key=AIzaSyAdg1DdfSfWGLZHtBVINMVRNDHb1lKoAZI&part=snippet`,
	      (data) => {
	        const info = data.items[0].snippet.title;
	        this.getArtist(info);
	        this.getTitle(info);
	        this.buttonStatus();
	      }
	    );
	  }
	
	  getArtist(info) {
	    this.artist = info.split(" - ")[0];
	    let artistName = document.getElementById("artist-name");
	    artistName.value = this.artist;
	  }
	
	  getTitle(info) {
	    const infoSplit = info.split(" - ")[1];
	    if (infoSplit === undefined) {
	      this.buttonStatus();
	    } else if (infoSplit[0] === '"'){
	      this.title = info.split(/^[^\"]*\"([a-z0-9\ \-\'\.]{1,})/i)[1];
	    } else {
	      this.title = info.split(/^[^\-]*\-([a-z0-9\ \-\'\.]{1,})/i)[1].trim();
	    }
	    let titleName = document.getElementById("title-name");
	    titleName.value = this.title;
	  }
	}
	
	module.exports = Title;


/***/ },
/* 4 */
/***/ function(module, exports) {

	class Url {
	  constructor(type, artist, title) {
	    this.url = "";
	    this.createUrl(type, artist, title);
	  }
	
	  createUrl(type, artist, title) {
	    title = title.replace("'", "");
	    artist = artist.replace("'", "");
	    const titleUnderscore = title.split(" ").join("_");
	    const artistUnderscore = artist.split(" ").join("_");
	    const urlLetter = artist.charAt(0);
	
	    if (type === "tab") {
	      this.url = `https://tabs.ultimate-guitar.com/${urlLetter}/${artistUnderscore}/${titleUnderscore}_tab.htm`;
	    } else if (type === "chord") {
	      this.url = `https://tabs.ultimate-guitar.com/${urlLetter}/${artistUnderscore}/${titleUnderscore}_crd.htm`;
	    } else if (type === "uke") {
	      this.url = `https://tabs.ultimate-guitar.com/${urlLetter}/${artistUnderscore}/${titleUnderscore}_ukulele_crd.htm`;
	    } else if (type === "bass") {
	      this.url = `https://tabs.ultimate-guitar.com/${urlLetter}/${artistUnderscore}/${titleUnderscore}_btab.htm`;
	    } else {
	      this.url = `https://www.ultimate-guitar.com/tabs/${artistUnderscore}_tabs.htm`;
	    }
	  }
	
	  openNewTab() {
	    chrome.tabs.create({ url: this.url });
	  }
	}
	
	module.exports = Url;


/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const NOTE = __webpack_require__(10);
	
	const TONES = {
	  'E': 82.41,
	  'A': 110.00,
	  'D': 146.83,
	  'G': 196.00,
	  'B': 246.94,
	  'e': 329.63,
	};
	
	class Tuner {
	  constructor() {
	    this.note = "";
	    this.bindEvents();
	  }
	
	  bindEvents() {
	    let tuner = document.getElementById("tuner");
	    tuner.addEventListener("change", () => {
	      this.note = tuner.value;
	    });
	
	    let tunerButton = document.getElementById("tune-button");
	    tunerButton.addEventListener("click", () => {
	      this.playNote();
	    });
	  }
	
	  playNote() {
	    const note = new NOTE(TONES[this.note]);
	    note.start();
	    setTimeout(note.stop.bind(note), 3000);
	  }
	}
	
	
	module.exports = Tuner;


/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	const ctx = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext();
	
	const createOscillator = (freq) => {
	  const osc = ctx.createOscillator();
	  osc.type = "triangle";
	  osc.frequency.value = freq;
	  osc.detune.value = 0;
	  osc.start(ctx.currentTime);
	  return osc;
	};
	
	const createGainNode = () => {
	  const gainNode = ctx.createGain();
	  gainNode.gain.value = 0;
	  gainNode.connect(ctx.destination);
	  return gainNode;
	};
	
	class Note {
	  constructor(freq) {
	    this.oscillatorNode = createOscillator(freq);
	    this.gainNode = createGainNode();
	    this.oscillatorNode.connect(this.gainNode);
	  }
	
	  start() {
	    this.gainNode.gain.value = 3;
	  }
	
	  stop() {
	    this.gainNode.gain.value = 0;
	  }
	}
	
	module.exports = Note;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map