import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the API key from the .env file
GOOGLE_PLACES_API_KEY = os.getenv('GOOGLE_PLACES_API_KEY')

# Function to get nearby restaurants
def get_nearby_restaurants(latitude, longitude, radius):
    # Define the base URL
    base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

    # Construct the request URL
    request_url = f"{base_url}?location={latitude},{longitude}&radius={radius}&type=restaurant&key={GOOGLE_PLACES_API_KEY}"

    # Send the request
    response = requests.get(request_url)

    # Check if the request was successful
    if response.status_code == 200:
        # Return the JSON body of the response
        return response.json()
    else:
        # Return an error message if the request failed
        return {'error': 'Failed to fetch data', 'status_code': response.status_code}