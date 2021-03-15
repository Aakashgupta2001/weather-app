window.addEventListener("load", () => {
  let longitude;
  let latitude;

  const displayTemp = document.querySelector(".container .temp h1");
  const Displaysummary = document.querySelector(".container .summary h3");
  const DisplayLocation = document.querySelector(".container .timezone h2");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      console.log(`${longitude}, ${latitude}`);

      //proxy = `https://cors-anywhere.herokuapp.com/`;
      api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=bd6030007357a2759e054c3d6cb8259d`;

      //fetching data from api and converting it into json
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const temperature = data.main.temp;
          const summary = data.weather[0].description;
          const timezone = data.name;
          console.log(timezone);

          displayTemp.textContent = Math.round(temperature - 273.15);
          Displaysummary.textContent = summary;
          DisplayLocation.textContent = timezone;
        });
    });
  } else {
    Displaysummary.textContent = "please allow location access";
  }
});

//dark mode / light mode switch...
function darkmode() {
  const darkSwitch = document.querySelector(".dark-mode");
  const body = document.querySelector("body");
  const lightBulb = document.querySelector(".light-bulb");
  const darkBulb = document.querySelector(".dark-bulb");

  console.log("darkmode func. launched");

  darkSwitch.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    darkBulb.classList.toggle("display-bulb");

    console.log("light bulb clicked");
  });
}

function changeBulb() {}

darkmode();
