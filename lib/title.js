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
