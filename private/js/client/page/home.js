document.addEventListener("DOMContentLoaded", initHomePage.call(document));

function initHomePage (e) {
  var page = this;
      logo = page.querySelector("[data-role=logo]");

  loadParticles();
  logo.addEventListener("click", addWooHoo);
}

function addWooHoo () {
  var self = this;

  // Prevent fast clicking
  if (self.classList.contains("woo-hoo")) {
    return;
  }

  self.classList.toggle("woo-hoo");
  _.delay(function() {
    self.classList.toggle("woo-hoo");
  }, 500);
}

function loadParticles () {
  particlesJS.load('particles-js', '/js/utils/particlesjs-config-min.json', function(){});
}