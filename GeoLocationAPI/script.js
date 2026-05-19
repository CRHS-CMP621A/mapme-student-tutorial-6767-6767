navigator.geolocation.getCurrentPosition(
  function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(`https://www.google.ca/maps/@${lat},${long},16.05z`);

    var map = L.map("map").setView([lat, long], 15);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([lat, long])
      .addTo(map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();
  },
  function () {
    alert("Could not get position.");
  }
);
