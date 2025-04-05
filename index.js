const apiKey = "7639ff8be29676f722b4c7f26ac743d2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function updateDateTime() {
    const now = new Date();
  
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', optionsDate);
  
    const optionsTime = { hour: '2-digit', minute: '2-digit'};
    const formattedTime = now.toLocaleTimeString('en-US', optionsTime);
  
    document.getElementById('date-time').innerHTML = `${formattedDate} | ${formattedTime}`;
  }
  
  // Call once immediately
  updateDateTime();
  // Then update every second
  setInterval(updateDateTime, 1000);
  

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }else{
        var data = await response.json();


        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "imgs/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "imgs/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "imgs/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "imgs/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "imgs/mist.png";
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
    
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
