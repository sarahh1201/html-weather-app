import requests
import panel as pn
#from pyscript import Element

pn.extension()

city = pn.widgets.TextInput(name='City', value="Vancouver") 
temp_units = pn.widgets.Select(name='Units', options=["Metric (C)", "Imperial (F)", "Kelvin (K)"], value="Metric (C)")

output = pn.pane.Markdown("Enter a city and select temperature units, then click 'Get Weather'.")

row = pn.Row(city, temp_units)
row.servable(target='controls')

'''
# Finding the data of the input city
def get_city(city):     
    api_key = 'b2273b21514c4decb2b45606240806'  # API key from weatherapi.com
    url = f"http://api.weatherapi.com/v1/forecast.json?key={api_key}&q={city}" 
    return url

def get_data(url):
    response = requests.get(url)

    temp_units = input("Metric (m), imperial (i) or kelvin (k): ")

    if response.status_code == 200:
        weather_data = response.json()
        location = weather_data['location']
        current = weather_data['current']
        forecast = weather_data['forecast']['forecastday'][0]['day']

        # Temperature conversions
        
        # Kelvins (K)
        if temp_units == 'k':
            temp = f"\nTemperature: {current['temp_c'] + 273.15:.2f} K \nFeels Like:: {current['feelslike_f']+273.15:.2f} K \nHigh: {forecast['maxtemp_c']+273.15:.2f} K \nLow: {forecast['mintemp_c']+273.15:.2f} K\n"
            wind = f"\nWind: {current['wind_kph']} kph"
            precip = f"\nPrecipitation: {current['precip_mm']} mm"
            
        # Imperial (F)
        elif temp_units == 'i' or temp_units == 'f':
            temp = f"\nTemperature: {current['temp_f']}°F \nFeels Like:: {current['feelslike_f']}°F \nHigh: {forecast['maxtemp_f']}°F \nLow: {forecast['mintemp_f']}°F\n"
            wind = f"\nWind: {current['wind_mph']} mph"
            precip = f"\nPrecipitation: {current['precip_in']} in"
            
        # Metric (C) - Defaults to metric   
        else: 
            temp = f"\nTemperature: {current['temp_c']}°C \nFeels Like: {current['feelslike_c']}°C \nHigh: {forecast['maxtemp_c']}°C \nLow: {forecast['mintemp_c']}°C\n"
            wind = f"\nWind: {current['wind_kph']} kph"
            precip = f"\nPrecipitation: {current['precip_mm']} mm"
                
        loc = f"\n{location['name']} - {location['region']} - {location['country']}"
        cond = f"\nCondition: {current['condition']['text']} \nHumidity: {current['humidity']}%"
        update = f"\nLast updated: {current['last_updated']}\n"
        icon = f"http:{current['condition']['icon']}"
        
        print(loc, temp, wind, precip, cond, update)
                
    else:
        print(f"Error: Unable to fetch data. HTTP Status code: {response.status_code}")
        
#def main():
#    city = input("Enter city name: ")
#    url = get_city(city)
#    get_data(url)
    
#if __name__ == "__main__":
#    main()
'''