const apiKey = "5c768109fbb5c49461ae6188481776b0"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".city_search_input");
const searchBtn = document.getElementById("Enter");
const weatherIcon = document.querySelector(".weather_icon");

async function checkWeather(city) {
    if (!city) return;
    
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        alert("Invalid city name");
    } else {
        const data = await response.json();

        document.querySelector(".weather--city").innerHTML = data.name;
        document.querySelector(".weather--temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.getElementById("Humidty").innerHTML = data.main.humidity + "%";
        document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

        const condition = data.weather[0].main;
        if(condition == "Clouds") weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/1163/1163624.png";
        else if(condition == "Clear") weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
        else if(condition == "Rain") weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/4724/4724094.png";
        else if(condition == "Drizzle") weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/17189/17189587.png";
        else if(condition == "Mist") weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/2675/2675962.png";

        // Дата
        document.getElementById("date").innerHTML = new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric'});
    }
}

searchBtn.addEventListener("click", () => checkWeather(searchInput.value));
searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") checkWeather(searchInput.value); });