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

      proxy = `https://cors-anywhere.herokuapp.com/`;
      api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4a5b1aa65da8baa5bc9de8c2c08c5647`;

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

          displayTemp.textContent = temperature - 273.15;
          Displaysummary.textContent = summary;
          DisplayLocation.textContent = timezone;
        });
    });
  } else {
    Displaysummary.textContent = "please allow location access";
  }
});
