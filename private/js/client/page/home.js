document.addEventListener("DOMContentLoaded", initHomePage.call(document));

var homepage = {
  allow_click: true,
  total_clicks: 0,
  temp_clicks: 0,
  cooldown: false
}

function initHomePage (e) {
  var page = this;
      canvas = null,
      mod = page.querySelector("[data-role=mod]"),
      logo = page.querySelector("[data-role=logo]"),
      typeface = page.querySelector("[data-role=typeface]"),
      caption_opener = page.querySelectorAll("[data-role=caption_drawer_opener]"),
      caption_drawer = page.querySelector("[data-role=caption_drawer]");

  loadParticles();
  loadMasonry();
  logo.addEventListener("click", addWooHoo);
  typeface.addEventListener("click", cancelClick);
  caption_opener.addEventListener("click", openDrawer.bind(caption_opener, caption_drawer));
}

function openDrawer (drawer) {
  var self = this;
  drawer.classList.toggle("expanded");
  self.classList.toggle("expanded");
}

function loadMasonry () {
  // vanilla JS
  // init with element
  var grid = document.querySelector('.current-projects');
  var msnry = new Masonry( grid, {
    // options...
    itemSelector: '.project',
    columnWidth: '.project',
    fitWidth: true
  });

  imagesLoaded( grid ).on( 'progress', function() {
    // layout Masonry after each image loads
    msnry.layout();
  });
}

function cancelClick (e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
}

function coolDown () {
  if (homepage.cooldown) {return true};

  if (homepage.total_clicks >= 25) {
    console.log("Lots of clicking has happend, let's reset so you can click more");
    var canvas = document.querySelector(".particles-js-canvas-el");
    canvas.classList.remove("show");
    homepage.total_clicks = 0;
    _.delay(loadParticles, 400);
  }

  if (homepage.temp_clicks >= 10) {
    console.log("you've clicked an awful lot, let's cooldown for a bit");
    homepage.cooldown = true;

    _.delay(function() {
      console.log("Okay you can click again");
      homepage.cooldown = false;
      homepage.temp_clicks = 0;
    }, 5000);

  }

  return homepage.cooldown;
}

function controlClicks (event) {
  cooldown = coolDown();

  if (!homepage.allow_click || cooldown) {    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  } else {
    homepage.total_clicks++;
    homepage.temp_clicks++;
    homepage.allow_click = false;
  }

  _.delay(function() {
    homepage.allow_click = true;
  }, 800);
}

function addWooHoo (e) {
  cancelClick(e);

  var self = this;

  if (self.classList.contains("woo-hoo")) {
    return;
  }

  self.classList.toggle("woo-hoo");
  _.delay(function() {
    self.classList.toggle("woo-hoo");
  }, 500);
}

function loadParticles () {
  particlesJS.load('particles-js', '/js/utils/particlesjs-config-min.json', function(){
    var canvas = document.querySelector(".particles-js-canvas-el");
        canvas.addEventListener("click", controlClicks);
        canvas.classList.add("show");
  });
}