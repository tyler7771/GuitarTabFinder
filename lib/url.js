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
