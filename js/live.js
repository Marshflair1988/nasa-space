(function () {
  var astronautsLoading = document.getElementById("astronauts-loading");
  var astronautsContent = document.getElementById("astronauts-content");
  var astronautsError = document.getElementById("astronauts-error");
  var issLoading = document.getElementById("iss-loading");
  var issContent = document.getElementById("iss-content");
  var issError = document.getElementById("iss-error");

  function fetchViaProxy(url) {
    var proxy = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);
    return fetch(proxy).then(function (res) {
      if (!res.ok) throw new Error("Could not load data");
      return res.json();
    });
  }

  fetchViaProxy("http://api.open-notify.org/astros.json")
    .then(function (data) {
      astronautsLoading.hidden = true;
      astronautsError.hidden = true;

      var list = data.people || [];
      var ul = document.createElement("ul");
      list.forEach(function (person) {
        var li = document.createElement("li");
        li.textContent = (person.name || "—") + (person.craft ? " (" + person.craft + ")" : "");
        ul.appendChild(li);
      });
      if (list.length === 0) {
        var li = document.createElement("li");
        li.textContent = "No data available.";
        ul.appendChild(li);
      }
      astronautsContent.appendChild(ul);
      astronautsContent.hidden = false;
    })
    .catch(function () {
      if (astronautsLoading) astronautsLoading.hidden = true;
      if (astronautsContent) astronautsContent.hidden = true;
      if (astronautsError) {
        astronautsError.textContent = "Unable to load astronauts. Try again later.";
        astronautsError.hidden = false;
      }
    });

  fetchViaProxy("http://api.open-notify.org/iss-now.json")
    .then(function (data) {
      issLoading.hidden = true;
      issError.hidden = true;

      var pos = data.iss_position || {};
      var lat = pos.latitude || "—";
      var lon = pos.longitude || "—";
      var p = document.createElement("p");
      p.className = "iss-coords";
      p.textContent = "Latitude: " + lat + " / Longitude: " + lon;
      issContent.appendChild(p);
      issContent.hidden = false;
    })
    .catch(function () {
      if (issLoading) issLoading.hidden = true;
      if (issContent) issContent.hidden = true;
      if (issError) {
        issError.textContent = "Unable to load ISS location. Try again later.";
        issError.hidden = false;
      }
    });
})();
