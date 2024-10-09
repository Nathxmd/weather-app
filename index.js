const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const eror404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  console.log("search button clicked");
  const APIKey = "6ffab46659c42bcadc104ba99d845f6d";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.cod === 404) {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        eror404.style.display = "block";
        eror404.classList.add("fadeIn");
        return;
      }

      eror404.style.display = "none";
      eror404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "img/clear.png";
          break;
        case "Clouds":
          image.src = "img/cloud.png";
          break;
        case "Rain":
          image.src = "img/rain.png";
          break;
        case "Snow":
          image.src = "img/snow.png";
          break;
        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "block"; // Pastikan elemen tampil
      weatherDetails.style.display = "block";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
