# Assume 'text_data' is the full text extracted from the PDF
food_data = []

# Split the text into lines
lines = text_data.split('\n')

# Process each line
for line in lines:
    match = re.match(pattern, line)
    if match:
        food_item = {
            "name": match.group("name").strip(),
            "calories": int(match.group("calories")),
            "carbs": int(match.group("carbs")),
            "fibers": int(match.group("fibers")),
            "protein": int(match.group("protein"))
        }
        food_data.append(food_item)

# Now 'food_data' contains the structured data
print(food_data)
