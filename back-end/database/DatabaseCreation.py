from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configuring the SQLAlchemy part of the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/mydb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Creating the SQLAlchemy db instance
db = SQLAlchemy(app)

# Define the NutritionFacts model
class NutritionFacts(db.Model):
    __tablename__ = 'nutrition_facts'

    nutrition_facts_id = db.Column(db.Integer, primary_key=True)  # Unique identifier
    item = db.Column(db.String(100), nullable=False)  # Name of the item
    restaurant_name = db.Column(db.String(100), nullable=False)  # Name of the restaurant
    calories = db.Column(db.Integer, nullable=False)  # Total calories
    carbohydrates_g = db.Column(db.Integer, nullable=False)  # Total carbohydrates in grams
    dietary_fiber_g = db.Column(db.Numeric(5, 2), nullable=False)  # Dietary fiber in grams
    protein_g = db.Column(db.Integer, nullable=False)  # Protein in grams

# Define the RestaurantInformation model
class RestaurantInformation(db.Model):
    __tablename__ = 'restaurant_information'

    nutrition_id = db.Column(db.Integer, primary_key=True)  # Unique identifier
    restaurant_id = db.Column(db.Integer, db.ForeignKey('nutrition_facts.nutrition_facts_id'), nullable=False)  # Foreign key referencing nutrition_facts
    restaurant_name = db.Column(db.String(100), nullable=False)  # Name of the restaurant
    calories_per_dollar = db.Column(db.Numeric(5, 2), nullable=True)  # Calories per dollar
    carbs_g = db.Column(db.Integer, nullable=True)  # Carbohydrates in grams
    protein_g = db.Column(db.Integer, nullable=True)  # Protein in grams
    fiber_g = db.Column(db.Numeric(5, 2), nullable=True)  # Fiber in grams

# Create the tables in the database
with app.app_context():
    db.create_all()

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/nutrition_facts', methods=['GET'])
def get_nutrition_facts():
    print('Getting nutrition facts')

if __name__ == '__main__':
    app.run(debug=True)
