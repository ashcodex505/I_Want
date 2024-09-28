# make a default boilerplate for flask

from flask import Flask, request, jsonify
import places

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

# POST method: get restaurants
# Takes in Latitude, Longitude
# Surveys Google Places API for restaurants in 1 mile radius
@app.route('/restaurants', methods=["POST"])
def get_nearby_restaurants():
    data = request.get_json()

    # Extract latitude, longitude, and radius from the request body
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    radius = data.get('radius') * 1609.34
    
    response = places.get_nearby_restaurants(latitude=latitude, longitude=longitude, radius=radius)

    return response

if __name__ == '__main__':
    app.run(port=5000, debug=True)