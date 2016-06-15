document.addEventListener("DOMContentLoaded", initHomePage.call(document));

function initHomePage (e) {
  var page = this;

  loadParticles();
}


function loadParticles () {
  console.log('trying to load particles');
  particlesJS.load('particles-js', '/js/utils/particlesjs-config-min.json', function() {
    console.log('callback - particles.js config loaded');
  });
}