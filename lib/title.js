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
