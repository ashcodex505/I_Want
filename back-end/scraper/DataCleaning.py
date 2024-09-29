import re

# Sample text line (assume this is extracted from the PDF)
sample_line = "Red Curry 246 330 260 29 21 0 0 820 19 4 11 5"

# Regular expression to extract relevant fields (protein, calories, carbs, fibers)
pattern = r"(?P<name>[A-Za-z\s&®-]+)\s+\d+\s+(?P<calories>\d+)\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+(?P<carbs>\d+)\s+(?P<fibers>\d+)\s+\d+\s+(?P<protein>\d+)"
match = re.match(pattern, sample_line)

if match:
    food_item = {
        "name": match.group("name").strip(),
        "calories": int(match.group("calories")),
        "carbs": int(match.group("carbs")),
        "fibers": int(match.group("fibers")),
        "protein": int(match.group("protein"))
    }
    print(food_item)
