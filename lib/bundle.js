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
	const Url = __webpack_require__(4);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const title = new Title();
	
	  let all = document.getElementById("all");
	  all.addEventListener("click", () => {
	    buttonEvent("all", title.artist, title.title);
	  });
	
	  let tab = document.getElementById("tab");
	  tab.addEventListener("click", () => {
	    buttonEvent("tab", title.artist, title.title);
	  });
	
	  let chord = document.getElementById("chord");
	  chord.addEventListener("click", () => {
	    buttonEvent("chord", title.artist, title.title);
	  });
	
	  let uke = document.getElementById("uke");
	  uke.addEventListener("click", () => {
	    buttonEvent("uke", title.artist, title.title);
	  });
	
	  let bass = document.getElementById("bass");
	  bass.addEventListener("click", () => {
	    buttonEvent("bass", title.artist, title.title);
	  });
	
	  window.title = title;
	});
	
	const buttonEvent = (type, artist, title) => {
	  const url = new Url(type, artist, title);
	};


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

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
	    });
	
	    let link = document.getElementById("link");
	    link.addEventListener("click", () => {
	      chrome.tabs.create({ url: "https://www.ultimate-guitar.com/lessons/for_beginners/how_to_read_tabs.html" });
	    });
	
	    let artistName = document.getElementById("artist-name");
	    artistName.addEventListener("change", () => {
	      this.artist = artistName.value;
	    });
	
	    let titleName = document.getElementById("title-name");
	    titleName.addEventListener("change", () => {
	      this.title = titleName.value;
	    });
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
	    const ampersandPosition = url.indexOf('&');
	    if(ampersandPosition !== -1) {
	      url =  url.substring(0, ampersandPosition);
	    }
	    this.getVideoInfo(url);
	  }
	
	  getVideoInfo(vidId) {
	    $.get(`https://www.googleapis.com/youtube/v3/videos?id=${vidId}&key=AIzaSyAdg1DdfSfWGLZHtBVINMVRNDHb1lKoAZI&part=snippet`,
	      (data) => {
	        const info = data.items[0].snippet.title;
	        this.getArtist(info);
	        this.getTitle(info);
	      }
	    );
	  }
	
	  getArtist(info) {
	    this.artist = info.split(" - ")[0];
	    let artistName = document.getElementById("artist-name");
	    artistName.value = this.artist;
	  }
	
	  getTitle(info) {
	    this.title = info.split(" - ")[1];
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
	    this.createUrl(type, artist, title);
	  }
	
	  createUrl(type, artist, title) {
	    const titleUnderscore = title.split(" ").join("_");
	    const artistUnderscore = artist.split(" ").join("_");
	    const urlLetter = artist.charAt(0);
	
	    if (type === "tab") {
	      chrome.tabs.create({ url: `https://tabs.ultimate-guitar.com/${urlLetter}/${artistUnderscore}/${titleUnderscore}_tab.htm` });
	    } else if (type === "chord") {
	      chrome.tabs.create({ url: `https://tabs.ultimate-guitar.com/${urlLetter}/${artistUnderscore}/${titleUnderscore}_crd.htm` });
	    } else if (type === "uke") {
	      chrome.tabs.create({ url: `https://tabs.ultimate-guitar.com/${urlLetter}/${artistUnderscore}/${titleUnderscore}_ukulele_crd.htm` });
	    } else if (type === "bass") {
	      chrome.tabs.create({ url: `https://tabs.ultimate-guitar.com/${urlLetter}/${artistUnderscore}/${titleUnderscore}_btab.htm` });
	    } else {
	      chrome.tabs.create({ url: `https://www.ultimate-guitar.com/tabs/${artistUnderscore}_tabs.htm` });
	    }
	  }
	}
	
	module.exports = Url;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map