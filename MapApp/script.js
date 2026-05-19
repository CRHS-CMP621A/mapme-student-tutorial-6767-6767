"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position);
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

    map.on("click", function (mapEvent) {
      console.log(mapEvent);
      const mapLat = mapEvent.latlng.lat;
      const mapLong = mapEvent.latlng.lng;
      L.marker([mapLat, mapLong]).addTo(map).bindPopup("Workout").openPopup();

      L.marker([mapLat, mapLong])
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: "running-popup",
          })
        )
        .setPopupContent("Workout")
        .openPopup();
    });
  },
  function () {
    alert("Could not get position.");
  }
);
