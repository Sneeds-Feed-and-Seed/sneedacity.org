var hamburger = document.getElementById("hamburger");
var menu = document.getElementById("navbar");
hamburger.addEventListener('click', function() {
  this.classList.toggle("change");
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
})