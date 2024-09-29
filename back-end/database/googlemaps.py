import os
import requests
from dotenv import load_dotenv

load_dotenv()
GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')

# get_nearby_restauarants
# params: user latitude, user longitude, radius to search within
# returns body of Google Places API response
def get_nearby_restaurants(latitude, longitude, radius):
    base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

    request_url = f"{base_url}?location={latitude},{longitude}&radius={radius}&type=restaurant&key={GOOGLE_MAPS_API_KEY}"

    response = requests.get(request_url)

    if response.status_code == 200:
        return response.json()
    else:
        return {'error': 'Failed to fetch data', 'status_code': response.status_code}
    
# get_travel_distance
# params: user latitude, user longitude, destination latitude, destination longitude, mode = driving OR walking
# returns distance and duration from user to destination
def get_travel_distance(user_lat, user_lng, dest_lat, dest_lng, mode="driving"):    
    base_url = "https://maps.googleapis.com/maps/api/distancematrix/json"
    
    params = {
        "origins": f"{user_lat},{user_lng}",
        "destinations": f"{dest_lat},{dest_lng}",
        "mode": mode,
        "units": "imperial",
        "key": GOOGLE_MAPS_API_KEY
    }
    
    response = requests.get(base_url, params=params).json()

    distance = response['rows'][0]['elements'][0]['distance']['text']
    duration = response['rows'][0]['elements'][0]['duration']['text']
    
    return {"distance": distance, "duration": duration}