(function () {
  var footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  var navToggle = document.querySelector(".nav-toggle");
  var navList = document.querySelector(".nav-list");
  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      var isOpen = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });
  }
})();
