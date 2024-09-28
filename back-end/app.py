from flask import Flask, request, jsonify
import places

app = Flask(__name__)

macro = None

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/set_macro', methods=["POST"])
def set_macro():
    data = request.get_json().get('macro')

    if data not in ["protein", "carbs", "fiber", "calories"]:
        return jsonify({"message": "Invalid macro choice"}), 400
    
    global macro
    macro = data
    
    return jsonify({"message": f"Set macro to: {macro}"}), 201

# POST method: get restaurants
# Takes in Latitude, Longitude
# Surveys Google Places API for restaurants in 1 mile radius
@app.route('/restaurants', methods=["POST"])
def get_nearby_restaurants():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    radius = data.get('radius') * 1609.34 # miles to meters
    
    # Survey Google Places API for restaurants in radius
    response = places.get_nearby_restaurants(latitude=latitude, longitude=longitude, radius=radius)

    # Get top 15 restaurants according to macro

    # Survery Google Distance Matrix API to get distances from user location

    # Return top 15 restaurants with distances 

    return response

if __name__ == '__main__':
    app.run(port=5000, debug=True)