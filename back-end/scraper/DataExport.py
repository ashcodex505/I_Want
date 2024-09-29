import json

# Convert the food data list to JSON
json_data = json.dumps(food_data, indent=4)

# Save to a JSON file
with open("nutritional_facts.json", "w") as json_file:
    json_file.write(json_data)

print("Data saved as nutritional_facts.json")
