document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".shadow__btn").addEventListener("click", () => {
    // Also add the functionality of when some presses the enter button it accepts it as a click

    const input = document.querySelector("#getValue");
    const inputValue = input.value;

    const apiKey = "e6a576257ab1111cd4e514f83fca7b84";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;

    //Protect your api key

    const date = new Date();

    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    async function getWeather() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        if (!data) {
          document.querySelector("#weather").innerText =
            "Invalid Input .. Please Enter a Valid Input.";
        } else {
          document.querySelector(
            "#weather"
          ).innerHTML = `<div class="background"> 
        <h1>Name:  ${data.name}</h1>         


            <div class="sec-back">

             <div class="third">
             <p>Country: ${data.sys.country}<p/>   <p>Temperature: ${data.main.temp} <p/> 
             </div> 


            <div class="fourth">
             <p>Wind speed: ${data.wind.speed} <p/>   <p>description: ${data.weather[0].description} <p/>
            </div>


          </div> 
        </div>
        
        <p class="time">Time: ${hours}:${min}:${sec}<p/>
        `;
        }

        // a bit of error in time section while at time 00:04 it shows 0:4:1.. lets solve it
      } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector("#weather").innerHTML =
          "<center>Failed to fetch weather data. Please try again later!</center>";
      }
    }
    getWeather();
    input.value = "";
  });
});
