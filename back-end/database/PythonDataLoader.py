import requests
import json

# Example data with the updated format
nutrition_data = [
    {
        "item": "Little John 1",
        "restaurant_name": "Jimmy John's",
        "calories": 300,
        "carbohydrates_g": 25,
        "dietary_fiber_g": 2,
        "protein_g": int(0.05 * 300)  # Converted protein per calorie to total protein
    },
    {
        "item": "Little John 2",
        "restaurant_name": "Jimmy John's",
        "calories": 250,
        "carbohydrates_g": 24,
        "dietary_fiber_g": 2,
        "protein_g": int(0.052 * 250)
    },
    {
        "item": "Big John",
        "restaurant_name": "Jimmy John's",
        "calories": 1000,
        "carbohydrates_g": 94,
        "dietary_fiber_g": 8,
        "protein_g": int(0.052 * 1000)
    },
    {
        "item": "The Pepe",
        "restaurant_name": "Jimmy John's",
        "calories": 1190,
        "carbohydrates_g": 100,
        "dietary_fiber_g": 8,
        "protein_g": int(0.049 * 1190)
    },
    {
        "item": "Totally Tuna",
        "restaurant_name": "Jimmy John's",
        "calories": 1020,
        "carbohydrates_g": 103,
        "dietary_fiber_g": 10,
        "protein_g": int(0.040 * 1020)
    },
    {
        "item": "Turkey Tom",
        "restaurant_name": "Jimmy John's",
        "calories": 950,
        "carbohydrates_g": 96,
        "dietary_fiber_g": 8,
        "protein_g": int(0.049 * 950)
    },
    {
        "item": "Spicy East Coast Italian",
        "restaurant_name": "Jimmy John's",
        "calories": 1700,
        "carbohydrates_g": 107,
        "dietary_fiber_g": 10,
        "protein_g": int(0.053 * 1700)
    }
]

# URL of your backend API
url = "http://localhost:4000/load_nutrition_information"

# Function to send nutrition data to the backend
def send_nutrition_data():
    try:
        # Convert the data to JSON
        json_data = json.dumps(nutrition_data)

        # Send the POST request
        response = requests.post(url, data=json_data, headers={"Content-Type": "application/json"})

        # Check for success
        if response.status_code == 200:
            print("Data successfully sent to the backend.")
        else:
            print(f"Failed to send data. Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        print(f"Error occurred: {e}")

# Call the function to send data
if __name__ == "__main__":
    send_nutrition_data()
