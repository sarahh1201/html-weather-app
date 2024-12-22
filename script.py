import requests
from pyscript import display, Element

def get_weather(api_key, city):
    url = f"http://api.weatherapi.com/v1/forecast.json?key={api_key}&q={city}" 
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: Unable to fetch data for {city}. HTTP Status code: {response.status_code}")
        return None
    
def display_weather(weather_data, temp_units):
    if 'error' in weather_data:
        print("City not found!")
    else:
        location = weather_data['location']
        current = weather_data['current']
        forecast = weather_data['forecast']['forecastday'][0]['day']

        # Temperature conversion
        if temp_units == 'k':
            temp = f"\nTemperature: {current['temp_c'] + 273.15:.2f} K \nFeels Like:: {current['feelslike_f']+273.15:.2f} K \nHigh: {forecast['maxtemp_c']+273.15:.2f} K \nLow: {forecast['mintemp_c']+273.15:.2f} K\n"
            wind = f"\nWind: {current['wind_kph']} kph"
            precip = f"\nPrecipitation: {current['precip_mm']} mm"
        elif temp_units == 'i' or temp_units == 'f':
            temp = f"\nTemperature: {current['temp_f']}°F \nFeels Like:: {current['feelslike_f']}°F \nHigh: {forecast['maxtemp_f']}°F \nLow: {forecast['mintemp_f']}°F\n"
            wind = f"\nWind: {current['wind_mph']} mph"
            precip = f"\nPrecipitation: {current['precip_in']} in"
        else:  # default to metric
            temp = f"\nTemperature: {current['temp_c']}°C \nFeels Like: {current['feelslike_c']}°C \nHigh: {forecast['maxtemp_c']}°C \nLow: {forecast['mintemp_c']}°C\n"
            wind = f"\nWind: {current['wind_kph']} kph"
            precip = f"\nPrecipitation: {current['precip_mm']} mm"
            
        loc = f"\n{location['name']} - {location['region']} - {location['country']}"
        cond = f"\nCondition: {current['condition']['text']} \nHumidity: {current['humidity']}%"
        update = f"\nLast updated: {current['last_updated']}\n"
        icon = f"http:{current['condition']['icon']}"
    

        print(loc, temp, wind, precip, cond, update)
              
def get_city():
    #input("Enter city name: ")
    city = Element("city").element.value
    
def get_units():
    input("Metric (m), imperial (i) or kelvin (k): ")

def main():
        api_key = 'b2273b21514c4decb2b45606240806'  # API key from weatherapi.com
        city = get_city()
        temp_units = get_units()
        weather_data = get_weather(api_key, city)
        
        if weather_data:
            display_weather(weather_data, temp_units)
        else:
            print(f"Failed to retrieve weather data for {city}.")

if __name__ == "__main__":
    main()