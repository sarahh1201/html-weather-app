function get_weather()
{
    var city = document.getElementById("my_city").value;
    const select_units = document.getElementById("units");
    let units = select_units.value;
    
    const api_key = 'b2273b21514c4decb2b45606240806';  // API key from weatherapi.com
    const url = "http://api.weatherapi.com/v1/forecast.json?key="+api_key+"&q="+city; 

    fetch(url)
    .then(function(response) {
        return response.json(); // Parse the response body as JSON
    })
    .then(function(data) {
        console.log(data);  // Log the data to check it in the console

        // Display the data on the webpage using backticks for template literals
        let output = document.getElementById("weather_output");

        let loc = data.location.name+", "+data.location.region+", "+data.location.country;
        let locTime = data.location.localtime;
        let cond = data.forecast.forecastday[0].day.condition.text+"<br>";

        switch(units)
            {
            case 'i':
                temp = ("Temperature: "+data.current.temp_f+"°F <br>"
                    + "Feels Like: "+data.current.feelslike_f+"°F <br>"
                    + "Wind Chill: "+data.current.windchill_f+"°F <br>"
                    + "High: "+data.forecast.forecastday[0].day.maxtemp_f+"°F <br>"
                    + "Low: "+data.forecast.forecastday[0].day.mintemp_f+"°F <br>"
                    + "Average: "+data.forecast.forecastday[0].day.avgtemp_f+"°F <br>");
                break;
            case 'k':
                temp = ("Temperature: "+((273.15+data.current.temp_c).toFixed(2))+"K <br>"
                    + "Feels Like: "+((273.15+data.current.feelslike_c).toFixed(2))+"K <br>"
                    + "Wind Chill: "+((273.15+data.current.windchill_c).toFixed(2))+"K <br>"
                    + "High: "+((273.15+data.forecast.forecastday[0].day.maxtemp_c).toFixed(2))+"K <br>"
                    + "Low: "+((273.15+data.forecast.forecastday[0].day.mintemp_c).toFixed(2))+"K <br>"
                    + "Average: "+((273.15+data.forecast.forecastday[0].day.avgtemp_c).toFixed(2))+"K <br>");
                break;
            default:
                temp = ("Temperature: "+data.current.temp_c+"°C <br>"
                    + "Feels Like: "+data.current.feelslike_c+"°C <br>"
                    + "Wind Chill: "+data.current.windchill_c+"°C <br>"
                    + "High: "+data.forecast.forecastday[0].day.maxtemp_c+"°C <br>"
                    + "Low: "+data.forecast.forecastday[0].day.mintemp_c+"°C <br>"
                    + "Average: "+data.forecast.forecastday[0].day.avgtemp_c+"°C <br>");
                break;
            }


        let precipWind_m = ("Precipication: "+data.current.precip_mm+" mm <br>"
                        + "Wind: "+data.current.wind_kph+" kph <br>");
    
        let humid = ("Humitidy: "+data.current.humidity+"%<br>");


        let lastUpdate = ("Last Updated: "+data.current.last_updated+"<br>");

        output.innerHTML = `<b>${loc} </b><br>
                            <i>${locTime} </i><br>
                            ${cond} <br>
                            ${temp} <br>
                            ${precipWind_m} <br>
                            ${humid}<br>
                            ${lastUpdate} <br>`; 
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
        let output = document.getElementById("weather_output");
        output.innerHTML = "Error: Unable to fetch weather data."; // Display an error message
    });
}

