const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

// Pengecekan elemen
console.log("Container:", container);
console.log("Search button:", search);
console.log("Weather box:", weatherBox);
console.log("Weather details:", weatherDetails);
console.log("Error 404:", error404);

search.addEventListener("click", () => {
  console.log("Search button clicked");
  const APIKey = "dcf3a769d89b4d62b0945845241010"; // Pastikan ini sudah diganti
  const city = document.querySelector(".search-box input").value;
  console.log("Searching for city:", city);

  if (city === "") {
    console.log("City is empty, returning");
    return;
  }

  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      console.log("API Response:", json);

      if (json.error) {
        console.log("Error from API:", json.error.message);
        container.style.height = "590px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      console.log("Updating UI with weather data");
      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      // Log elemen-elemen yang akan diupdate
      console.log("Image element:", image);
      console.log("Temperature element:", temperature);
      console.log("Description element:", description);
      console.log("Humidity element:", humidity);
      console.log("Wind element:", wind);

      // Update gambar cuaca
      switch (json.current.condition.text) {
        case "Sunny":
        case "Clear":
          image.src = "img/clear.png";
          break;
        case "Partly cloudy":
        case "Cloudy":
        case "Overcast":
          image.src = "img/cloud.png";
          break;
        case "Light rain":
        case "Moderate rain":
        case "Heavy rain":
          image.src = "img/rain.png";
          break;
        case "Light snow":
        case "Moderate snow":
        case "Heavy snow":
          image.src = "img/snow.png";
          break;
        default:
          image.src = "";
      }
      console.log("Weather image updated:", image.src);

      // Update informasi cuaca
      temperature.innerHTML = `${parseInt(json.current.temp_c)}<span>°C</span>`;
      description.innerHTML = json.current.condition.text;
      humidity.innerHTML = `${json.current.humidity}%`;
      wind.innerHTML = `${parseInt(json.current.wind_kph)}Km/h`;

      console.log("Weather information updated");

      // Tampilkan elemen-elemen cuaca
      weatherBox.style.display = "block";
      weatherDetails.style.display = "block";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";

      console.log("Weather elements displayed");
    })
    .catch((e) => {
      console.error("There was a problem with the fetch operation:", e);
    });
});

console.log("Script loaded successfully");
