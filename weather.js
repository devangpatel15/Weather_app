const input = document.querySelector("#input");
const searchIcon = document.querySelector("#search-icon");

const outputDisplay = document.querySelector(".all-div-container");

const imageContainer = document.querySelector("#img");
const celsius = document.querySelector("#celsius");
const humidityPerCent = document.querySelector("#humidity-percent");
const windSpeed = document.querySelector("#wind-spd");
const weatherType = document.querySelector("#desc");

const notFound = document.querySelector(".not-found");



searchIcon.addEventListener("click", () => {
  if (input.value === "") {
    alert("Please Enter City");
  } else {
    getWeather();
    outputDisplay.style.display = "block";
  }
});
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  const api_key = "f5ae4d869b36398e424c5499ba3aa817";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${api_key}`;

  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result.cod === "404") {
        notFound.style.display = "block";
        outputDisplay.style.display = "none";
      } else {
        renderWeather(result);
        notFound.style.display = "none";
        outputDisplay.style.display = "block";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderWeather(response) {
  console.log(response.main.temp);

  celsius.innerText = Math.round(response.main.temp - 273.15) + "°C";

  const weatherArray = response.weather;

  for (const description of weatherArray) {
    console.log(description.description);

    weatherType.innerText = description.description;
  }

  humidityPerCent.innerText = response.main.humidity + "%";

  windSpeed.innerText = response.wind.speed + "KM/H";

  for (const img of weatherArray) {
    console.log(img.main);
    if (img.main === "Clouds") {
      imageContainer.src = "./img/cloud.png";
    } else if (img.main === "rain") {
      imageContainer.src = "./img/rain.png";
    } else if (img.main === "mist") {
      imageContainer.src = "./img/mist.png";
    } else if (img.main === "Clear") {
      imageContainer.src = "./img/clear.png";
    } else if (img.main === "snow") {
      imageContainer.src = "./img/snow.png";
    } else if (img.main === "Haze") {
      imageContainer.src = "./img/haze.png";
    }
  }
}

// if (response.cod === "404") {
//   image.src = "./img/404.png";
// }
