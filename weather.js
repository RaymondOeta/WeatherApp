const cityName = document.querySelector(".city");
const iconClass = document.getElementsByClassName("icon");
const descriptionClass = document.getElementsByClassName("description");
const temperatureClass = document.getElementsByClassName("temp");
const humidityClass = document.getElementsByClassName("humidity");
const  searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search button");
// const API_KEY = "b5560bf797ba111ae2890b80b9da61a6"

function greeting(){

    const greetingText = document.getElementById("greeting");

    let date = new Date();
    let hour = date.getHours();
    if(hour>=6 && hour<12){
        greetingText.textContent = "Good Morning";
    }
    else if(hour>=12 && hour<18){
        greetingText.textContent = "Good Afternoon";
    }
    else{
        greetingText.textContent = "Good Evening";
    }
}

greeting()

let weather = {
    apiKey: "b5560bf797ba111ae2890b80b9da61a6",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
        .then(response => {
            if(!response.ok){
                alert("No weather data is found! Please try again later.");
                throw new Error("No weather data found.")
            }
            return response.json();
        })
        .then(data => this.displayWeather(data))
    },
    displayWeather: function(data){
        const {name } = data;
        const { icon, description } = data.weather[0];
        const { humidity, temp } = data.main;
        const { speed } = data.wind;

        cityName.textContent = `Weather in ${name}`;
        iconClass[0].src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        descriptionClass[0].textContent = description;
        temperatureClass[0].textContent = temp + "°C";
        humidityClass.textContent = `Humidity: ${humidity}%`;
        windClass.textContent = `Wind speed: ${speed} km/h`;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`
    },

    search: function (){
        this.fetchWeather(searchBar.value)
    },
}

searchButton.addEventListener("click", function(){
    weather.search();
})

searchBar.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        weather.search();
    }
})

weather.fetchWeather("Nairobi");

