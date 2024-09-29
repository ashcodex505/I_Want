CREATE TABLE IF NOT EXISTS nutrition_facts (
    nutrition_facts_id SERIAL PRIMARY KEY,                     -- Unique identifier for each entry
    item VARCHAR(100),                         -- Name of the item
    restaurant_name VARCHAR(100),
--     serving_size_oz DECIMAL(5, 2),             -- Serving size in ounces
--     serving_size_g INTEGER,                    -- Serving size in grams
    calories INTEGER,                          -- Total calories
--     calories_from_fat INTEGER,                 -- Calories from fat
--     total_fat_g DECIMAL(5, 2),                 -- Total fat in grams
--     saturated_fat_g DECIMAL(5, 2),             -- Saturated fat in grams
--     trans_fat_g DECIMAL(5, 2),                 -- Trans fat in grams
--     cholesterol_mg INTEGER,                    -- Cholesterol in milligrams
--     sodium_mg INTEGER,                         -- Sodium in milligrams
    carbohydrates_g INTEGER,                      -- Total carbohydrates in grams
    dietary_fiber_g DECIMAL(5, 2),               -- Dietary fiber in grams
--     sugars_g DECIMAL(5, 2),                      -- Sugars in grams
    protein_g INTEGER                           -- Protein in grams
--     vitamin_a_percent INTEGER,                 -- Vitamin A (% Daily Value)
--     vitamin_c_percent INTEGER,                 -- Vitamin C (% Daily Value)
--     calcium_percent INTEGER,                   -- Calcium (% Daily Value)
--     iron_percent INTEGER                       -- Iron (% Daily Value)
);

CREATE TABLE IF NOT EXISTS restaurant_information (
    nutrition_id SERIAL PRIMARY KEY,         -- Unique identifier for each nutrition entry
    restaurant_id INTEGER NOT NULL,          -- Foreign key referencing the restaurant
    restaurant_name VARCHAR(100) NOT NULL,   -- Name of the restaurant (copied from restaurants table)
    calories_per_dollar DECIMAL(5, 2),       -- Calories per dollar
    carbs_g INTEGER,                         -- Carbohydrates in grams
    protein_g INTEGER,                       -- Protein in grams
    fiber_g DECIMAL(5, 2),                   -- Fiber in grams
    FOREIGN KEY (restaurant_id) REFERENCES nutrition_facts (nutrition_facts_id)
);




-- Inserting additional test data for 'mcdonalds' and 'burger king' into 'nutrition_facts' table
INSERT INTO nutrition_facts (item, restaurant_name, calories, carbohydrates_g, dietary_fiber_g, protein_g)
VALUES ('McChicken', 'McDonalds', 400, 40, 2.5, 15),
       ('Filet-O-Fish', 'McDonalds', 379, 38, 1.5, 14),
       ('Quarter Pounder', 'McDonalds', 520, 42, 2.0, 30),
       ('Chicken Nuggets', 'McDonalds', 480, 40, 2.0, 25),
       ('McDouble', 'McDonalds', 390, 34, 1.5, 22),
       ('Hotcakes', 'McDonalds', 350, 40, 1.5, 8),
       ('Egg McMuffin', 'McDonalds', 300, 30, 3.0, 17),
       ('Bacon McDouble', 'McDonalds', 450, 42, 1.8, 26),
       ('McWrap', 'McDonalds', 600, 50, 4.0, 27),
       ('Apple Pie', 'McDonalds', 240, 32, 2.0, 2),
       ('Chicken Sandwich', 'Burger King', 660, 50, 2.5, 28),
       ('Cheeseburger', 'Burger King', 303, 30, 1.5, 15),
       ('Double Whopper', 'Burger King', 916, 60, 3.5, 38),
       ('Crispy Chicken', 'Burger King', 670, 52, 2.5, 29),
       ('BK Chicken Nuggets', 'Burger King', 480, 40, 2.0, 25),
       ('King Fries', 'Burger King', 320, 45, 2.5, 4),
       ('Fish Sandwich', 'Burger King', 520, 55, 2.5, 15),
       ('Veggie Burger', 'Burger King', 390, 39, 1.8, 21),
       ('Bacon King', 'Burger King', 1150, 67, 4.2, 49),
       ('Impossible Whopper', 'Burger King', 630, 58, 2.1, 25);
--
-- Insert data for McDonald's
INSERT INTO restaurant_information (restaurant_id, restaurant_name, calories_per_dollar, carbs_g, protein_g, fiber_g) VALUES
    (1, 'McDonald', 150.50, 45, 12, 3.5);

-- Insert data for Burger King
INSERT INTO restaurant_information (restaurant_id, restaurant_name, calories_per_dollar, carbs_g, protein_g, fiber_g) VALUES
(2, 'Burger King', 140.30, 50, 10, 4.0);
