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
