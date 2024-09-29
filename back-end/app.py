from flask import Flask, request, jsonify
from flask_cors import CORS
import googlemaps

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

# POST method: get restaurants
# Takes in user specified macro, latitude, longitude
# Surveys Google Places API for restaurants in 1 mile radius
@app.route('/restaurants', methods=["POST"])
def get_restaurants():
    data = request.get_json()
    macro = data.get('macro')
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    radius = data.get('radius') * 1609.34 # miles to meters
    print(data)
    # Survey Google Places API for restaurants in radius
    response = googlemaps.get_nearby_restaurants(latitude=latitude, longitude=longitude, radius=radius)

    restaurants = [
                    {
                        'name': place['name'], 
                        'location': place['geometry']['location']
                    }
                    for place in response['results'] 
                    if not place.get('permanently_closed', False)
                ]
    
    # Get top 15 restaurants according to macro
    # SQL stuff
    # Rank restaurants by average of top 5 meals offered
    # Return the top 15 restaurants

    # Survey Google Distance Matrix API to get distances from user location
    # For each restaurant returned by ^^, call googlemaps.get_travel_distance(user coords, dest coords, mode of transport)
    # store restaurant names + distances + durations in JSON

    for i in range(len(restaurants)):
        info = googlemaps.get_travel_distance(user_lat=latitude, user_lng=longitude, dest_lat=restaurants[i]['location']['lat'], dest_lng=restaurants[i]['location']['lng'])
        restaurants[i] = {'name': restaurants[i]['name'], 'distance': info['distance'], 'duration': info['duration']}

    # Return top 15 restaurants with distances 

    return restaurants

@app.route('/dishes', methods=['POST'])
def get_dishes():
    data = request.get_json()
    macro = data.get('macro')
    restaurant = data.get('restaurant')

    # Get top 15 dishes ranked by macro in given restaurant

    # json object with dish name and amount of macro
    dishes = [
        {
            'dish': 'balls1',
            macro: '500'
        },
        {
            'dish': 'balls2',
            macro: '900'
        }
    ]

    return dishes

if __name__ == '__main__':
    app.run(port=5000, debug=True)