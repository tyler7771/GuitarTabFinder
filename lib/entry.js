const Title = require("./title");
const Url = require("./url");

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
