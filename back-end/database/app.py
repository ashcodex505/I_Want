from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

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
    data = request.get_json()

    # Insert nutrition facts with foreign key dependency
    nutrition_facts = NutritionFacts(
        item=data['item'],
        restaurant_name=data['restaurant_name'],
        calories=data['calories'],
        carbohydrates_g=data['carbohydrates_g'],
        dietary_fiber_g=data['dietary_fiber_g'],
        protein_g=data['protein_g']
    )

    db.session.add(nutrition_facts)
    db.session.commit()

    return jsonify({"message": "Nutrition Facts added successfully"}), 201

# @app.route('get_protein')


if __name__ == '__main__':
    app.run(debug=True)
