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
	  debugger
	  const title = new Title();
	});
	window.Title = Title;
	window.num = 1;


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	class Title {
	  constructor() {
	    this.title = this.getVideoInfo();
	  }
	
	  getVideoId() {
	    const videoId = "";
	  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
	   function(tabs){
	      videoId = tabs[0].url.split("v=")[1];
	   }
	);
	    console.log(videoId);
	    const ampersandPosition = videoId.indexOf('&');
	    if(ampersandPosition !== -1) {
	      return videoId.substring(0, ampersandPosition);
	    } else {
	      return videoId;
	    }
	  }
	
	  getVideoInfo() {
	    const vidId = this.getVideoId();
	    $.get(`http://gdata.youtube.com/feeds/api/videos/${vidId}?v=2&alt=json`,
	      function(data) {
	        const title=data.entry.title.$t;
	        console.log(title);
	      }
	    );
	  }
	
	  parseTitle() {
	    const title = this.title;
	    const artist = title.split(" - ")[0];
	    return [artist, title];
	  }
	}
	
	module.exports = Title;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const createUrl = (title, artist, type) => {
	  const titleUnderscore = title.split(" ").join("_");
	  const artistUnderscore = artist.split(" ").join("_");
	  const urlLetter = artist.charAt(0);
	
	  if (type === "tab") {
	    return `https://tabs.ultimate-guitar.com/${urlLetter}/${artistUnderscore}/${titleUnderscore}_tab.htm`;
	  } else if (type === "chord") {
	    return `https://tabs.ultimate-guitar.com/${urlLetter}/${artistUnderscore}/${titleUnderscore}_crd.htm`;
	  } else if (type === "uke") {
	    return `https://tabs.ultimate-guitar.com/${urlLetter}/${artistUnderscore}/${titleUnderscore}_ukulele_crd.htm`;
	  } else if (type === "bass") {
	    return `https://tabs.ultimate-guitar.com/${urlLetter}/${artistUnderscore}/${titleUnderscore}_btab.htm`;
	  } else {
	    return `https://www.ultimate-guitar.com/tabs/${artistUnderscore}_tabs.htm`;
	  }
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map