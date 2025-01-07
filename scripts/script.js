const {get} = require("request");

const get_info = document.getElementById('my_city');

get_info.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      main(); // Call the main function when Enter is pressed
    }
  });

const change_units = document.getElementById('units');

change_units.addEventListener('change', () => {
    main(); // Call the main function when the selection changes
});

function get_time()
{   
    var city = document.getElementById("my_city").value;

    const api_key = 'b2273b21514c4decb2b45606240806';  // API key from weatherapi.com
    const url = "https://api.weatherapi.com/v1/forecast.json?key="+api_key+"&q="+city; 

    fetch(url)
    .then(function(response) {
        return response.json(); // Parse the response body as JSON
    })
    .then(function(data) {
        console.log(data);  // Log the data to check it in the console

        let loc = data.location.name+", "+data.location.region+", "+data.location.country;
        let cond = data.forecast.forecastday[0].day.condition.text+"<br>";

        // LOCAL TIME/DATE FUNCTION
        let timeLocalOutput = document.getElementById("local_time");
        const timezone = data.location.tz_id;
        const timezoneUrl = "https://worldtimeapi.org/api/timezone/"+timezone;
        function updateLocalTime(){
        fetch(timezoneUrl)
            .then(function(timeNow) {
                return timeNow.json(); // Parse the response body as JSON
            })
            .then(function(tData) {
                console.log(tData); 
                const lDatetime = new Date(tData.datetime);
                const fLocalTime = lDatetime.toLocaleTimeString('en-US', {
                    timeZone: timezone,
                    hour: '2-digit', 
                    minute: '2-digit', 
                    hour12: true
                });
                const fLocalDate = lDatetime.toLocaleDateString('en-US', {
                    timeZone: timezone,
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
                timeLocalOutput.innerHTML = `<h4>${loc}</h4>
                                            ${cond} <br>
                                            Local Date: ${fLocalDate} <br><i>
                                            Local Time: ${fLocalTime} </i>`;
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
                timeLocalOutput.innerHTML = "Error: Unable to fetch local time."; // Display an error message
            });
            }
            updateLocalTime();
            setInterval(updateLocalTime, 60000); // Refresh the time every 60 seconds (60000 milliseconds)

    })
}

function get_today()
{
    var city = document.getElementById("my_city").value;
    const select_units = document.getElementById("units");  
    let units = select_units.value;

    const api_key = 'b2273b21514c4decb2b45606240806';  // API key from weatherapi.com
    const url = "https://api.weatherapi.com/v1/forecast.json?key="+api_key+"&q="+city+"&days=3"; 
    
    fetch(url)
    .then(function(response) {
        return response.json(); // Parse the response body as JSON
    })
    .then(function(data) {
        console.log(data);  // Log the data to check it in the console

        // Display the data on the webpage using backticks for template literals
        let temp_output = document.getElementById("tempurature_output");
        let update = document.getElementById("update_output");
        let cond_icon = document.getElementById("cond_icon");

        // To be outputed 
        let icon = data.forecast.forecastday[0].day.condition.icon;

        switch(units)
            {
            case 'i':
                temp = ("<h3>TODAY</h3><hr><br>Temperature: "+data.current.temp_f+"°F <br>"
                    + "Feels Like: "+data.current.feelslike_f+"°F <br>"
                    + "Wind Chill: "+data.current.windchill_f+"°F <br>"
                    + "High: "+data.forecast.forecastday[0].day.maxtemp_f+"°F <br>"
                    + "Low: "+data.forecast.forecastday[0].day.mintemp_f+"°F <br>"
                    + "Average: "+data.forecast.forecastday[0].day.avgtemp_f+"°F <br>");

                precip = ("Precipication: "+data.current.precip_in+" in <br>"
                    + "Total Precipication: "+data.forecast.forecastday[0].day.totalprecip_in+" in <br>"
                    + "Humitidy: "+data.current.humidity+"%<br>"
                    + "<b>Rain</b><br>"
                    + "Chance of Rain: "+data.forecast.forecastday[0].day.daily_chance_of_rain+"% <br>"
                    + "<b>Snow</b><br>"
                    + "Chance of Snow: "+data.forecast.forecastday[0].day.daily_chance_of_snow+"% <br>");

                wind = ("<b>Wind</b><br>"
                    + "Wind: "+data.current.wind_mph+" mph <br>"
                    + "Wind Direction: "+data.current.wind_dir+"<br>"
                    + "Degree: "+data.current.wind_degree+ "<br>");
                
                break;

            case 'k':
                temp = ("<h3>TODAY</h3><hr><br>Temperature: "+((273.15+data.current.temp_c).toFixed(2))+"K <br>"
                    + "Feels Like: "+((273.15+data.current.feelslike_c).toFixed(2))+"K <br>"
                    + "Wind Chill: "+((273.15+data.current.windchill_c).toFixed(2))+"K <br>"
                    + "High: "+((273.15+data.forecast.forecastday[0].day.maxtemp_c).toFixed(2))+"K <br>"
                    + "Low: "+((273.15+data.forecast.forecastday[0].day.mintemp_c).toFixed(2))+"K <br>"
                    + "Average: "+((273.15+data.forecast.forecastday[0].day.avgtemp_c).toFixed(2))+"K <br>");

                precip = ("Precipication: "+data.current.precip_mm+" mm <br>"
                    + "Total Precipication: "+data.forecast.forecastday[0].day.totalprecip_mm+" mm <br>"
                    + "Humitidy: "+data.current.humidity+"%<br>"
                    + "<b>Rain</b><br>"
                    + "Chance of Rain: "+data.forecast.forecastday[0].day.daily_chance_of_rain+"% <br>"
                    + "<b>Snow</b><br>"
                    + "Chance of Snow: "+data.forecast.forecastday[0].day.daily_chance_of_snow+"% <br>");
                
                wind = ("<b>Wind</b><br>"
                    + "Wind: "+data.current.wind_kph+" kph <br>"
                    + "Wind Direction: "+data.current.wind_dir+"<br>"
                    + "Degree: "+data.current.wind_degree+ "<br>");
                    
                break;

            default:
                temp = ("<h3>TODAY</h3><hr><br>Temperature: "+data.current.temp_c+"°C <br>"
                    + "Feels Like: "+data.current.feelslike_c+"°C <br>"
                    + "Wind Chill: "+data.current.windchill_c+"°C <br>"
                    + "High: "+data.forecast.forecastday[0].day.maxtemp_c+"°C <br>"
                    + "Low: "+data.forecast.forecastday[0].day.mintemp_c+"°C <br>"
                    + "Average: "+data.forecast.forecastday[0].day.avgtemp_c+"°C <br>");

                precip = ("Precipication: "+data.current.precip_mm+" mm <br>"
                    + "Total Precipication: "+data.forecast.forecastday[0].day.totalprecip_mm+" mm <br>"
                    + "Humitidy: "+data.current.humidity+"%<br>"
                    + "<b>Rain</b><br>"
                    + "Chance of Rain: "+data.forecast.forecastday[0].day.daily_chance_of_rain+"% <br>"
                    + "<b>Snow</b><br>"
                    + "Chance of Snow: "+data.forecast.forecastday[0].day.daily_chance_of_snow+"% <br>");

                wind = ("<b>Wind</b><br>"
                    + "Wind: "+data.current.wind_kph+" kph <br>"
                    + "Wind Direction: "+data.current.wind_dir+"<br>"
                    + "Degree: "+data.current.wind_degree+ "<br>");

                break;
            }

        //OUTPUTS
        temp_output.innerHTML = `${temp}<br>${precip}<br>${wind}`; 
        update.innerHTML = `Last Updated: ${data.current.last_updated} in ${data.location.tz_id} timezone<br>`;
        cond_icon.src = `${icon}`;
    })

}

function get_tomorrow()
{
    var city = document.getElementById("my_city").value;
    const select_units = document.getElementById("units");
    let units = select_units.value;

    const api_key = 'b2273b21514c4decb2b45606240806';  // API key from weatherapi.com
    const url = "https://api.weatherapi.com/v1/forecast.json?key="+api_key+"&q="+city+"&days=3"; 

    fetch(url)
    .then(function(response) {
        return response.json(); // Parse the response body as JSON
    })
    .then(function(data) {
        console.log(data);  // Log the data to check it in the console

        // Display the data on the webpage using backticks for template literals
        let tomorrow_output = document.getElementById("tomorrow_output")
        let tomicon = document.getElementById("tomicon");

        // To be outputed 
        let icon = data.forecast.forecastday[1].day.condition.icon;

        // LOCAL TIME/DATE FUNCTION
        const forecastDay = new Date(data.forecast.forecastday[1].date);
        const nextDay = new Date(forecastDay);
        nextDay.setDate(forecastDay.getDate() + 1);
        const tomorrow = nextDay.toLocaleDateString('en-US', {
            weekday: 'short',
        });
        date = tomorrow.toUpperCase();
        
        switch(units)
            {
            case 'i':
                tempTomorrow = ("<h3>"+date+"</h3><hr><br>High: "+data.forecast.forecastday[1].day.maxtemp_f+"°F <br>"
                    + "Low: "+data.forecast.forecastday[1].day.mintemp_f+"°F <br>"
                    + "Average: "+data.forecast.forecastday[1].day.avgtemp_f+"°F <br>");
                break;

            case 'k':
                tempTomorrow = ("<h3>"+date+"</h3><hr><br>High: "+((273.15+data.forecast.forecastday[1].day.maxtemp_c).toFixed(2))+"K <br>"
                    + "Low: "+((273.15+data.forecast.forecastday[1].day.mintemp_c).toFixed(2))+"K <br>"
                    + "Average: "+((273.15+data.forecast.forecastday[1].day.avgtemp_c).toFixed(2))+"K <br>");
                break;

            default:
                tempTomorrow = ("<h3>"+date+"</h3><hr><br>High: "+data.forecast.forecastday[1].day.maxtemp_c+"°C <br>"
                    + "Low: "+data.forecast.forecastday[1].day.mintemp_c+"°C <br>"
                    + "Average: "+data.forecast.forecastday[1].day.avgtemp_c+"°C <br>");
                break;
            }

        //OUTPUTS
        tomorrow_output.innerHTML = tempTomorrow;
        tomicon.src = `${icon}`;
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
        let output = document.getElementById("tomorrow_output");
        output.innerHTML = "Error: Unable to fetch weather data."; // Display an error message
    });
}

function get_after()
{
    var city = document.getElementById("my_city").value;
    const select_units = document.getElementById("units");
    let units = select_units.value;

    const api_key = 'b2273b21514c4decb2b45606240806';  // API key from weatherapi.com
    const url = "https://api.weatherapi.com/v1/forecast.json?key="+api_key+"&q="+city+"&days=4"; 

    fetch(url)
    .then(function(response) {
        return response.json(); // Parse the response body as JSON
    })
    .then(function(data) {
        console.log(data);  // Log the data to check it in the console

        // Display the data on the webpage using backticks for template literals
        let day_after_output = document.getElementById("day_after_output")
        let aftericon = document.getElementById("aftericon");

        // To be outputed 
        let icon = data.forecast.forecastday[2].day.condition.icon;

        // LOCAL TIME/DATE FUNCTION
        const forecastDay = new Date(data.forecast.forecastday[2].date);
        const nextDay = new Date(forecastDay);
        nextDay.setDate(forecastDay.getDate() + 1);
        const afterDate = nextDay.toLocaleDateString('en-US', {
            weekday: 'short',
        });
        date = afterDate.toUpperCase();
        
        switch(units)
            {
            case 'i':
                tempDate = ("<h3>"+date+"</h3><hr><br>High: "+data.forecast.forecastday[2].day.maxtemp_f+"°F <br>"
                    + "Low: "+data.forecast.forecastday[2].day.mintemp_f+"°F <br>"
                    + "Average: "+data.forecast.forecastday[2].day.avgtemp_f+"°F <br>");
                break;

            case 'k':
                tempDate = ("<h3>"+date+"</h3><hr><br>High: "+((273.15+data.forecast.forecastday[2].day.maxtemp_c).toFixed(2))+"K <br>"
                    + "Low: "+((273.15+data.forecast.forecastday[2].day.mintemp_c).toFixed(2))+"K <br>"
                    + "Average: "+((273.15+data.forecast.forecastday[2].day.avgtemp_c).toFixed(2))+"K <br>");
                break;

            default:
                tempDate = ("<h3>"+date+"</h3><hr><br>High: "+data.forecast.forecastday[2].day.maxtemp_c+"°C <br>"
                    + "Low: "+data.forecast.forecastday[2].day.mintemp_c+"°C <br>"
                    + "Average: "+data.forecast.forecastday[2].day.avgtemp_c+"°C <br>");
                break;
            }

        //OUTPUTS
        day_after_output.innerHTML = tempDate;
        aftericon.src = `${icon}`;
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
        let output = document.getElementById("day_after_output");
        output.innerHTML = "Error: Unable to fetch weather data."; // Display an error message
    });
}

function get_hourly()
{
    var city = document.getElementById("my_city").value;
    const select_units = document.getElementById("units");  
    let units = select_units.value;

    const api_key = 'b2273b21514c4decb2b45606240806';  // API key from weatherapi.com
    const url = "https://api.weatherapi.com/v1/forecast.json?key="+api_key+"&q="+city+"&days=3"; 
    
    fetch(url)
    .then(function(response) {
        return response.json(); // Parse the response body as JSON
    })
    .then(function(data) {
        console.log(data);  // Log the data to check it in the console

        // Display the data on the webpage using backticks for template literals
        let nowTemp_output = document.getElementById("hourly")

        // To be outputed 
        let icon = data.forecast.forecastday[0].hour[0].condition.icon;

        const nowTime = new Date(data.forecast.forecastday[0].hour[0].time);
        const hourLater = new Date(nowTime);
        const formattedTime = hourLater.toLocaleTimeString('en-US', {
            hour: '2-digit',
        });

        time = formattedTime;

        switch(units)
            {
            case 'i':
                nowTemp = ("<b>NOW</b><br>Temperature: "+data.forecast.forecastday[0].hour[0].temp_f+"°F <br>"
                    + "Feels Like: "+data.forecast.forecastday[0].hour[0].feelslike_f+"°F <br>"
                    + "Wind Chill: "+data.forecast.forecastday[0].hour[0].windchill_f+"°F <br>");
                
                break;

            case 'k':
                nowTemp = ("<b>NOW</b><br>Temperature: "+((273.15+data.forecast.forecastday[0].hour[0].temp_c).toFixed(2))+"K <br>"
                    + "Feels Like: "+((273.15+data.forecast.forecastday[0].hour[0].feelslike_c).toFixed(2))+"K <br>"
                    + "Wind Chill: "+((273.15+data.forecast.forecastday[0].hour[0].windchill_c).toFixed(2))+"K <br>");
                break;

            default:
                nowTemp = ("<b>NOW</b><br>Temperature: "+data.forecast.forecastday[0].hour[0].temp_c+"°C <br>"
                    + "Feels Like: "+data.forecast.forecastday[0].hour[0].feelslike_c+"°C <br>"
                    + "Wind Chill: "+data.forecast.forecastday[0].hour[0].windchill_c+"°C <br>");

                break;
            }

        //OUTPUTS
        nowTemp_output.innerHTML = `${time}<br>${nowTemp}`; 
        cond_icon.src = `${icon}`;
    })

}

function get_astro()
{
    var city = document.getElementById("my_city").value;

    const api_key = 'b2273b21514c4decb2b45606240806';  // API key from weatherapi.com
    const url = "https://api.weatherapi.com/v1/forecast.json?key="+api_key+"&q="+city+"&days=3"; 
    
    fetch(url)
    .then(function(response) {
        return response.json(); // Parse the response body as JSON
    })
    .then(function(data) {
        console.log(data);  // Log the data to check it in the console

        // Display the data on the webpage using backticks for template literals
        let astro_output = document.getElementById("astro_output");

        // To be outputed 
        let sunrise = data.forecast.forecastday[0].astro.sunrise;
        let sunset = data.forecast.forecastday[0].astro.sunset;
        let moonrise = data.forecast.forecastday[0].astro.moonrise;
        let moonset = data.forecast.forecastday[0].astro.moonset;
        let moonphase = data.forecast.forecastday[0].astro.moon_phase;


        //OUTPUTS
        astro_output.innerHTML = `<b>ASTRONOMY</b><br>Sunrise: ${sunrise} <br> 
                                        Sunset: ${sunset} <br> 
                                        Moonrise: ${moonrise} <br> 
                                        Moonset: ${moonset} <br> 
                                        Moon Phase: ${moonphase} <br>`; 
    })

}

function main()
{
    get_time();
    get_astro();
    get_hourly();
    get_today();
    get_tomorrow();
    get_after();
}