CREATE TABLE nutrition_facts (
    id SERIAL PRIMARY KEY,                     -- Unique identifier for each entry
    item VARCHAR(100),                         -- Name of the item (Burger or Sandwich)
    serving_size_oz DECIMAL(5, 2),             -- Serving size in ounces
    serving_size_g INTEGER,                    -- Serving size in grams
    calories INTEGER,                          -- Total calories
    calories_from_fat INTEGER,                 -- Calories from fat
    total_fat_g DECIMAL(5, 2),                 -- Total fat in grams
    saturated_fat_g DECIMAL(5, 2),             -- Saturated fat in grams
    trans_fat_g DECIMAL(5, 2),                 -- Trans fat in grams
    cholesterol_mg INTEGER,                    -- Cholesterol in milligrams
    sodium_mg INTEGER,                         -- Sodium in milligrams
    carbohydrates_g INTEGER,                   -- Total carbohydrates in grams
    dietary_fiber_g DECIMAL(5, 2),             -- Dietary fiber in grams
    sugars_g DECIMAL(5, 2),                    -- Sugars in grams
    protein_g INTEGER,                         -- Protein in grams
    vitamin_a_percent INTEGER,                 -- Vitamin A (% Daily Value)
    vitamin_c_percent INTEGER,                 -- Vitamin C (% Daily Value)
    calcium_percent INTEGER,                   -- Calcium (% Daily Value)
    iron_percent INTEGER                       -- Iron (% Daily Value)
);
