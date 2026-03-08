(function () {
  var grid = document.getElementById("launches-grid");
  var loading = document.getElementById("launches-loading");
  var errorEl = document.getElementById("launches-error");
  var pagination = document.getElementById("launches-pagination");
  var prevBtn = document.getElementById("launches-prev");
  var nextBtn = document.getElementById("launches-next");
  var paginationInfo = document.getElementById("launches-pagination-info");

  if (!grid) return;

  var PER_PAGE = 9;
  var allLaunches = [];
  var currentPage = 0;

  var url = "https://api.spacexdata.com/v5/launches/past?limit=50&order=desc";

  fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error("Could not load launches");
      return res.json();
    })
    .then(function (launches) {
      loading.hidden = true;
      errorEl.hidden = true;

      allLaunches = Array.isArray(launches) ? launches : [];
      if (allLaunches.length === 0) {
        grid.innerHTML = "<p class=\"launches-loading\">No launches available.</p>";
        return;
      }
      if (pagination) pagination.hidden = false;
      renderPage();
      if (prevBtn) prevBtn.addEventListener("click", goPrev);
      if (nextBtn) nextBtn.addEventListener("click", goNext);
    })
    .catch(function () {
      loading.hidden = true;
      errorEl.textContent = "Unable to load launches. Try again later.";
      errorEl.hidden = false;
    });

  function getTotalPages() {
    return Math.ceil(allLaunches.length / PER_PAGE) || 1;
  }

  function renderPage() {
    grid.innerHTML = "";
    var start = currentPage * PER_PAGE;
    var slice = allLaunches.slice(start, start + PER_PAGE);

    slice.forEach(function (launch) {
      var card = document.createElement("article");
      card.className = "launch-card";

      var name = launch.name || "Unnamed mission";
      var dateStr = launch.date_utc ? new Date(launch.date_utc).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }) : "TBD";
      var provider = "SpaceX";
      var details = launch.details && launch.details.trim() ? launch.details.trim() : "Mission completed. No further description available.";
      var patchUrl = (launch.links && launch.links.patch && (launch.links.patch.small || launch.links.patch.large)) ? (launch.links.patch.large || launch.links.patch.small) : null;
      var imgHtml = patchUrl ? "<img class=\"launch-card__img\" src=\"" + escapeAttr(patchUrl) + "\" alt=\"Mission patch: " + escapeAttr(name) + "\">" : "";

      card.innerHTML =
        imgHtml +
        "<h3>" + escapeHtml(name) + "</h3>" +
        "<p class=\"launch-meta\">" + escapeHtml(dateStr) + " &middot; " + escapeHtml(provider) + "</p>" +
        "<p class=\"launch-description\">" + escapeHtml(details) + "</p>";
      grid.appendChild(card);
    });

    if (paginationInfo) {
      var totalPages = getTotalPages();
      paginationInfo.textContent = "Page " + (currentPage + 1) + " of " + totalPages;
    }
    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = currentPage >= getTotalPages() - 1;
  }

  function goPrev() {
    if (currentPage > 0) {
      currentPage--;
      renderPage();
    }
  }

  function goNext() {
    if (currentPage < getTotalPages() - 1) {
      currentPage++;
      renderPage();
    }
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
  function escapeAttr(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML.replace(/"/g, "&quot;");
  }
})();
