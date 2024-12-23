import requests
import panel as pn
#panel serve script.pyfrom pyscript import Element

# Initialize Panel extension
pn.extension()

print("Script loaded successfully.")
output = pn.pane.Markdown("Testing output display.")
output.servable(target="controls")

# Widgets
city = pn.widgets.TextInput(name='City', value="Vancouver")
temp_units = pn.widgets.Select(name='Units', options=["Metric (C)", "Imperial (F)", "Kelvin (K)"], value="Metric (C)")

# Output area for displaying results
output = pn.pane.Markdown("Enter a city and select temperature units, then click 'Get Weather'.")

# Function to fetch weather data
def fetch_weather(event=None):
    api_key = 'b2273b21514c4decb2b45606240806'
    selected_city = city.value
    unit = temp_units.value

    if not selected_city:
        output.object = "Please enter a city name."
        return

    url = f"http://api.weatherapi.com/v1/forecast.json?key={api_key}&q={selected_city}"
    response = requests.get(url)

    if response.status_code == 200:
        weather_data = response.json()
        location = weather_data['location']
        current = weather_data['current']
        forecast = weather_data['forecast']['forecastday'][0]['day']

        # Handle temperature units
        if unit == "Kelvin (K)":
            temp = f"{current['temp_c'] + 273.15:.2f} K"
        elif unit == "Imperial (F)":
            temp = f"{current['temp_f']} °F"
        else:
            temp = f"{current['temp_c']} °C"

        # Format weather data
        details = f"""
        ### Weather in {location['name']}, {location['region']}, {location['country']}
        - **Condition**: {current['condition']['text']}
        - **Temperature**: {temp}
        - **Humidity**: {current['humidity']}%
        - **Wind**: {current['wind_kph']} kph
        - **Last Updated**: {current['last_updated']}
        """
        output.object = details
    else:
        output.object = f"Error: Unable to fetch data for {selected_city}. (HTTP {response.status_code})"

# Button to trigger fetch_weather
get_weather_button = pn.widgets.Button(name="Get Weather", button_type="primary")
get_weather_button.on_click(fetch_weather)

# Layout
layout = pn.Column(
    pn.Row(city, temp_units),
    get_weather_button,
    output
)

layout.servable(target='controls')
