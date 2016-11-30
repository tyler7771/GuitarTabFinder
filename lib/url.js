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
