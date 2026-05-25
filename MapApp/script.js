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

const addTo = document.querySelector(".liWorkouts");

let idCount = -1;
let lats = [];
let longs = [];
let canInput = 1;
let info = [];

const map = L.map("map").setView([0, 0], 15);

const data = localStorage.getItem("info");
if (data) {
  localStorage.setItem("pastInfo", data);
}

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position);
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(`https://www.google.ca/maps/@${lat},${long},16.05z`);

    map.setView([lat, long], 15);

    L.marker([lat, long]).addTo(map).bindPopup("Your location").openPopup();

    map.on("click", function (mapEvent) {
      if (canInput == 1) {
        canInput = 0;
        console.log(containerWorkouts);
        form.classList.remove("hidden");

        const mapLat = mapEvent.latlng.lat;
        const mapLong = mapEvent.latlng.lng;

        lats.push(mapLat);
        longs.push(mapLong);
        idCount++;

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
      }
    });
  },
  function () {
    alert("Could not get position.");
  }
);

function addHtml() {
  let date = new Date();
  let emo1, emo2, unit, value;
  form.classList.add("hidden");
  if (inputType.value == "running") {
    emo1 = "🏃‍♂";
    emo2 = "🦶🏼";
    unit = "spm";
    value = inputCadence.value;
  } else {
    emo1 = "🚴‍♀️";
    emo2 = "⛰";
    unit = "m";
    value = inputElevation.value;
  }
  addTo.insertAdjacentHTML(
    "afterbegin",
    `<li class="workout workout--running" onclick='map.flyTo([lats[${idCount}],longs[${idCount}]], 15, {duration:1})'>
      <h2 class="workout__title"> Your ${inputType.value} on ${
      months[date.getMonth()]
    } ${date.getDate()}</h2>
      <div class="workout__details">
        <span class="workout__icon">${emo1}</span>
        <span class="workout__value">${inputDistance.value}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${inputDuration.value}</span>
        <span class="workout__unit">min</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${(
          (inputDistance.value / inputDuration.value) *
          60
        ).toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">${emo2}</span>
        <span class="workout__value">${value}</span>
        <span class="workout__unit">${unit}</span>
      </div>
    </li>
  `
  );
  info.push([
    lats[idCount],
    longs[idCount],
    inputType.value,
    date.getMonth(),
    date.getDate(),
    inputDistance.value,
    inputDuration.value,
    value,
  ]);
  localStorage.setItem("info", JSON.stringify(info));
  form.reset();
  canInput = 1;
}

function summon() {
  const data = JSON.parse(localStorage.getItem("pastInfo"));

  if (data) {
    const rev = data.toReversed();

    for (const thing of rev) {
      info.unshift(thing);
      console.log(thing, rev);
      let emo1, emo2, unit;
      form.classList.add("hidden");
      if (thing[2] == "running") {
        emo1 = "🏃‍♂";
        emo2 = "🦶🏼";
        unit = "spm";
      } else {
        emo1 = "🚴‍♀️";
        emo2 = "⛰";
        unit = "m";
      }
      addTo.insertAdjacentHTML(
        "beforeend",
        `<li class="workout workout--running" onclick='map.flyTo([${thing[0]},${
          thing[1]
        }], 15, {duration:1})'>
      <h2 class="workout__title"> Your ${thing[2]} on ${months[thing[3]]} ${
          thing[4]
        }</h2>
      <div class="workout__details">
        <span class="workout__icon">${emo1}</span>
        <span class="workout__value">${thing[5]}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${thing[6]}</span>
        <span class="workout__unit">min</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${((thing[5] / thing[6]) * 60).toFixed(
          1
        )}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">${emo2}</span>
        <span class="workout__value">${thing[7]}</span>
        <span class="workout__unit">${unit}</span>
      </div>
    </li>
  `
      );
      L.marker([thing[0], thing[1]])
        .addTo(map)
        .bindPopup("Workout")
        .openPopup();
    }
    localStorage.setItem("info", JSON.stringify(info));
  }
}
