from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS
import googlemaps
from sqlalchemy import text

app = Flask(__name__)
CORS(app)

# Configuring the SQLAlchemy part of the app
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://example_user:example_password@flask_db:5432/example_db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Creating the SQLAlchemy db instance
db = SQLAlchemy(app)

# Define the NutritionFacts model without any foreign key relationships
class NutritionFacts(db.Model):
    __tablename__ = 'nutrition_facts'
    nutrition_facts_id = db.Column(db.Integer, primary_key=True)  # Unique identifier
    item = db.Column(db.String(100), nullable=False)  # Name of the item
    restaurant_name = db.Column(db.String(100), nullable=False)  # Name of the restaurant
    calories = db.Column(db.Integer, nullable=False)  # Total calories
    carbohydrates_g = db.Column(db.Integer, nullable=False)  # Total carbohydrates in grams
    dietary_fiber_g = db.Column(db.Numeric(5, 2), nullable=False)  # Dietary fiber in grams
    protein_g = db.Column(db.Integer, nullable=False)  # Protein in grams

# Define the RestaurantInformation model without any foreign key relationships
class RestaurantInformation(db.Model):
    __tablename__ = 'restaurant_information'
    restaurant_id = db.Column(db.Integer, primary_key=True)  # Unique identifier
    restaurant_name = db.Column(db.String(100), nullable=False)  # Name of the restaurant
    calories_per_dollar = db.Column(db.Numeric(5, 2), nullable=True)  # Calories per dollar
    carbs_g = db.Column(db.Integer, nullable=True)  # Carbohydrates in grams
    protein_g = db.Column(db.Integer, nullable=True)  # Protein in grams
    fiber_g = db.Column(db.Numeric(5, 2), nullable=True)  # Fiber in grams

# Create the tables in the database
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return 'Hello, world!'

@app.route('/nutrition_facts', methods=['GET'])
def get_nutrition_facts():
    return jsonify([{
        'item': 'test',
        'restaurant_name': 'test',
        'calories': 0,
        'carbohydrates_g': 0,
        'dietary_fiber_g': 0,
        'protein_g': 0
    }]), 200

@app.route('/load_restaurant', methods=['POST'])
def add_restaurant_information():
    data = request.get_json()

    # Insert restaurant information without foreign key dependency
    restaurant_info = RestaurantInformation(
        restaurant_name=data['restaurant_name'],
        calories_per_dollar=data.get('calories_per_dollar'),
        carbs_g=data.get('carbs_g'),
        protein_g=data.get('protein_g'),
        fiber_g=data.get('fiber_g')
    )

    db.session.add(restaurant_info)
    db.session.commit()

    return jsonify({"message": "Restaurant Information added successfully"}), 201

@app.route('/load_nutrition_information', methods=['POST'])
def add_nutrition_information():
    try:
        # Get the JSON data from the request body
        nutrition_data = request.get_json()

        # Iterate over the received data
        for item in nutrition_data:
            # Check if an entry with the same item name already exists
            existing_entry = NutritionFacts.query.filter_by(item=item['item'], restaurant_name=item['restaurant_name']).first()

            # If no such entry exists, add a new one
            if not existing_entry:
                new_entry = NutritionFacts(
                    item=item['item'],
                    restaurant_name=item['restaurant_name'],
                    calories=item['calories'],
                    carbohydrates_g=item['carbohydrates_g'],
                    dietary_fiber_g=item['dietary_fiber_g'],
                    protein_g=item['protein_g']
                )
                db.session.add(new_entry)

        # Commit the session to save all the new entries in the database
        db.session.commit()

        return jsonify({"message": "Data successfully inserted"}), 200

    except Exception as e:
        db.session.rollback()  # Rollback in case of any error
        return jsonify({"error": str(e)}), 400



# @app.route('get_protein')

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
                        'location': place['geometry']['location'],
                        'address': place['vicinity']
                    }
                    for place in response['results']
                    if not place.get('permanently_closed', False)
                ]

    # Get top 15 restaurants according to macro
    # SQL stuff
    # Rank restaurants by average of top 5 meals offered
    # Return the top 15 restaurants

    # ranking_query = f"""
    # SELECT
    #     r.restaurant_name,
    #     AVG(n.{macro}) AS average_macro
    # FROM
    #     restaurant_information r
    # JOIN
    #     nutrition_facts n ON r.restaurant_name = n.restaurant_name
    # GROUP BY
    #     r.restaurant_name
    # ORDER BY
    #     average_macro DESC
    # LIMIT 15;
    # """

    # restaurants = db.session.execute(ranking_query).fetchall()

    # restaurant_list = [{'restaurant_name': row[0], 'average_macro': row[1]} for row in top_restaurants]
    # return jsonify(restaurant_list), 200


    # Survey Google Distance Matrix API to get distances from user location
    # For each restaurant returned by ^^, call googlemaps.get_travel_distance(user coords, dest coords, mode of transport)
    # store restaurant names + distances + durations in JSON

    for i in range(len(restaurants)):
        info = googlemaps.get_travel_distance(user_lat=latitude, user_lng=longitude, dest_lat=restaurants[i]['location']['lat'], dest_lng=restaurants[i]['location']['lng'])
        restaurants[i] = {'name': restaurants[i]['name'], 'address': restaurants[i]['address'], 'distance': info['distance'], 'duration': info['duration']}

    # Return top 15 restaurants with distances

    return restaurants

# @app.route('/restaurants', methods=["POST"])
# def get_restaurants():
#     data = request.get_json()
#     macro = data.get('macro')
#     latitude = data.get('latitude')
#     longitude = data.get('longitude')
#     radius = data.get('radius') * 1609.34  # miles to meters

#     # Survey Google Places API for restaurants in the specified radius
#     response = googlemaps.get_nearby_restaurants(latitude=latitude, longitude=longitude, radius=radius)

#     restaurants = [
#         {
#             'name': place['name'],
#             'location': place['geometry']['location'],
#             'address': place['vicinity']
#         }
#         for place in response['results']
#         if not place.get('permanently_closed', False)
#     ]

#     # Construct the ranking query dynamically using safe parameterization
#     ranking_query = text(f"""
#     SELECT
#         r.restaurant_name,
#         AVG(n.{macro}) AS average_macro
#     FROM
#         restaurant_information r
#     JOIN
#         nutrition_facts n ON r.restaurant_name = n.restaurant_name
#     GROUP BY
#         r.restaurant_name
#     ORDER BY
#         average_macro DESC
#     LIMIT 15;
#     """)

#     # Execute the query and fetch results
#     top_restaurants = db.session.execute(ranking_query).fetchall()

#     restaurant_list = [{'restaurant_name': row[0], 'average_macro': row[1]} for row in top_restaurants]

#     # Survey Google Distance Matrix API to get distances from user location
#     for i in range(len(restaurant_list)):
#         info = googlemaps.get_travel_distance(user_lat=latitude, user_lng=longitude, dest_lat=restaurants[i]['location']['lat'], dest_lng=restaurants[i]['location']['lng'])
#         restaurant_list[i].update({'distance': info['distance'], 'duration': info['duration']})

#     # Return top 15 restaurants with distances
#     return jsonify(restaurant_list), 200

@app.route('/dishes', methods=['POST'])
def get_dishes():
    data = request.get_json()
    macro = data.get('macro')
    restaurant = data.get('restaurant')

    # Get top 15 dishes ranked by macro in given restaurant

    # Get top 15 dishes ranked by macro in given restaurant
    # query = f"""
    #     SELECT
    #         item,
    #         {macro}
    #     FROM
    #         nutrition_facts,
    #     WHERE
    #         restaurant_name = :restaurant
    #     ORDER BY
    #         {macro} DESC
    #     LIMIT 15;
    #     """
    # result = db.session.execute(query, {"restaurant": restaurant}).fetchall()

    # dishes = [
    #     {
    #         'dish': row[0],
    #         macro: row[1]
    #     }
    #     for row in result
    # ]

    # return jsonify(dishes), 200

    # json object with dish name and amount of macro
    dishes = [
        {
            'dish': 'Beef Lasagna',
            macro: '872'
        },
        {
            'dish': 'Margherita Pizza',
            macro: '638'
        },
        {
            'dish': 'Breadsticks',
            macro: '578'
        },
        {
            'dish': 'Chicken Alfredo',
            macro: '568'
        },
    ]

    return dishes

if __name__ == '__main__':
    app.run(port=4000, debug=True)
