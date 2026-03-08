(function () {
  var apodContent = document.getElementById("apod-content");
  var apodLoading = document.getElementById("apod-loading");
  var apodError = document.getElementById("apod-error");

  if (!apodContent) return;

  var url = "https://api.nasa.gov/planetary/apod?api_key=Q7mc14huAiv1yDI3z6eJbaCW65bMbVXMvajOHxev";

  fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error("Could not load image");
      return res.json();
    })
    .then(function (data) {
      apodLoading.hidden = true;
      apodError.hidden = true;

      var wrap = document.createElement("div");
      var titleText = data.title || "NASA Image of the Day";
      if (data.media_type === "image" && data.url) {
        var img = document.createElement("img");
        img.src = data.url;
        img.alt = titleText;
        wrap.appendChild(img);
      } else if (data.media_type === "video" && data.url) {
        var p = document.createElement("p");
        p.className = "apod-explanation";
        p.textContent = "Today’s APOD is a video. ";
        var link = document.createElement("a");
        link.href = data.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Watch on NASA";
        p.appendChild(link);
        wrap.appendChild(p);
      }
      var title = document.createElement("p");
      title.className = "apod-title";
      title.textContent = titleText;
      wrap.appendChild(title);
      if (data.explanation) {
        var explanation = document.createElement("p");
        explanation.className = "apod-explanation";
        explanation.textContent = data.explanation;
        wrap.appendChild(explanation);
      }
      apodContent.appendChild(wrap);
      apodContent.hidden = false;
    })
    .catch(function () {
      apodLoading.hidden = true;
      apodContent.hidden = true;
      apodError.textContent = "Unable to load NASA Image of the Day. Try again later.";
      apodError.hidden = false;
    });
})();
