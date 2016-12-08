const Url = require("./url");

class Title {
  constructor() {
    this.getVideoUrl();
    this.artist = "";
    this.title = "";
    this.bindEvents();
  }

  bindEvents() {
    let infoButton = document.getElementById("info");
    infoButton.addEventListener("click", () => {
      this.directionsPage();
    });

    let checkbox = document.getElementById("checkbox");
    checkbox.addEventListener("change", () => {
      const artist = this.artist;
      this.artist = this.title;
      this.title = artist;
      artistName.value = this.artist;
      titleName.value = this.title;
      this.buttonStatus();
    });

    let artistName = document.getElementById("artist-name");
    artistName.addEventListener("keyup", () => {
      this.artist = artistName.value;
      this.buttonStatus();
    });

    let titleName = document.getElementById("title-name");
    titleName.addEventListener("keyup", () => {
      this.title = titleName.value;
      this.buttonStatus();
    });
  }

  directionsPage() {
    document.getElementById("directions").style.display = "flex";
    document.getElementById("body").style.width = "300px";
    document.getElementById("body").style.height = "266px";
    document.getElementById("footer").style.display = "flex";
    let link = document.getElementById("link");
    link.addEventListener("click", () => {
      chrome.tabs.create({ url: "https://www.ultimate-guitar.com/lessons/for_beginners/how_to_read_tabs.html" });
    });
    let sampleLink = document.getElementById("sample");
    sampleLink.addEventListener("click", () => {
      chrome.tabs.create({ url: "https://www.youtube.com/watch?v=vabnZ9-ex7o" });
    });

    let close = document.getElementById("close-directions");
    close.addEventListener("click", () => {
      document.getElementById("directions").style.display = "none";
      document.getElementById("body").style.width = "150px";
      document.getElementById("body").style.height = "251px";
      document.getElementById("footer").style.display = "none";
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
    button.addEventListener("click", () => {
      url.openNewTab();
    });
  }

  inactiveButton(type) {
    const button = document.getElementById(type);
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
