const Title = require("./title");
const Tuner = require("./tuner");

document.addEventListener("DOMContentLoaded", function(){
  const title = new Title();
  const tuner = new Tuner();

  window.title = title;
});
