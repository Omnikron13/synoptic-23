-- Clear tables
DELETE FROM locations_food_types;
DELETE FROM food_types;
DELETE FROM times;
DELETE FROM locations;

\i sql/schema.sql
\i sql/views.sql

-- Dummy data for locations/shops table
--INSERT INTO locations (name, description, lat, long) VALUES
--   ('Shop A', 'This is shop A', 55.863335210385820, -4.315243338367801),
--   ('Shop B', 'This is shop B', 55.863813962452355, -4.302852580455955),
--   ('Shop C', 'This is shop C', 55.859507108009105, -4.307653191840376),
--   ('Shop D', 'This is shop D', 55.864219200178430, -4.311974401759780),
--   ('Tesco', 'Its a Tescos', 55.849519200178430, -4.3017746401759780),
--   ('Shop E', 'This is shop E', 55.860234567890123, -4.301876543210987),
--   ('Shop F', 'This is shop F', 55.867345678901234, -4.310765432109876),
--   ('Shop G', 'This is shop G', 55.863456789012345, -4.304654321098765),
--   ('Shop H', 'This is shop H', 55.891067890123456, -4.206543210987654),
--   ('Shop I', 'This is shop I', 55.865678901234567, -4.309432109876543),
--   ('Shop J', 'This is shop J', 55.862789012345678, -4.302321098765432),
--   ('Shop K', 'This is shop K', 55.819290123456789, -4.303210987654321),
--   ('Shop L', 'This is shop L', 55.868901234567890, -4.202109876543210),
--   ('Shop M', 'This is shop M', 55.769012345678901, -4.305098765432109),
--   ('Shop N', 'This is shop N', 55.840123456789012, -4.312987654321098);


-- 'Realistic' data for locations/shops table, courtesy of ChatGPT
INSERT INTO locations (id, name, description, lat, long) VALUES
    (1, 'Mom''s Deli', 'A cozy corner shop offering homemade sandwiches and fresh pastries.', 55.863335210385820, -4.315243338367801),
    (2, 'Raja''s Spices', 'An immigrant-run food shop providing a wide range of authentic spices and ingredients.', 55.863813962452355, -4.302852580455955),
    (3, 'La Panadería', 'A family-owned bakery specializing in traditional bread and pastries.', 55.859507108009105, -4.307653191840376),
    (4, 'Green Grocer', 'A small local grocery store offering a variety of fresh fruits, vegetables, and organic products.', 55.864219200178430, -4.311974401759780),
    (5, 'Tesco Express', 'A convenient supermarket chain with a wide selection of groceries and household items.', 55.849519200178430, -4.3017746401759780),
    (6, 'The Spice House', 'A hidden gem for spice lovers, offering an extensive collection of aromatic spices from around the world.', 55.855313, -4.307188),
    (7, 'Asian Food Mart', 'A diverse food market showcasing the flavors of Asia with a range of imported ingredients and snacks.', 55.864681, -4.344796),
    (8, 'The Corner Store', 'A neighborhood shop where you can find everyday essentials, snacks, and friendly service.', 55.853286, -4.326875),
    (9, 'Mama Mia Pizzeria', 'An Italian-inspired pizzeria serving delicious wood-fired pizzas made with love.', 55.852193, -4.344590),
    (10, 'Little India Grocery', 'An Indian grocery store offering a rich assortment of spices, lentils, and traditional Indian products.', 55.872547, -4.332872),
    (11, 'Café de Paris', 'A charming café with a French touch, serving freshly brewed coffee, pastries, and light bites.', 55.857970, -4.327939),
    (12, 'Le Petit Boulanger', 'A petite bakery specializing in artisanal bread, croissants, and other French delicacies.', 55.856621, -4.315837),
    (13, 'The Tea Emporium', 'A cozy tea shop with a vast selection of loose-leaf teas from around the world.', 55.854983, -4.286869),
    (14, 'Sunshine Market', 'A family-owned grocery store providing fresh produce, local goods, and friendly service.', 55.861580, -4.287435),
    (15, 'Spice of Life', 'A vibrant store offering a colorful array of spices, herbs, and exotic ingredients for adventurous cooks.', 55.863658, -4.319892);


-- Dummy data for opening times table
INSERT INTO times (location, day, open, close) VALUES
   (1, 0, '09:00:00', '18:00:00'),
   (1, 1, '09:00:00', '18:00:00'),
   (1, 2, '09:00:00', '18:00:00'),
   (1, 3, '09:00:00', '18:00:00'),
   (1, 4, '09:00:00', '18:00:00'),
   (1, 5, '10:00:00', '16:00:00'),
   (2, 0, '08:30:00', '17:30:00'),
   (2, 1, '08:30:00', '17:30:00'),
   (2, 2, '08:30:00', '17:30:00'),
   (2, 3, '08:30:00', '17:30:00'),
   (2, 4, '08:30:00', '17:30:00'),
   (4, 0, '09:30:00', '18:30:00'),
   (4, 1, '09:30:00', '18:30:00'),
   (4, 2, '09:30:00', '18:30:00'),
   (4, 3, '09:30:00', '18:30:00'),
   (4, 4, '09:30:00', '18:30:00'),
   (5, 1, '09:20:00', '14:30:00'),
   (5, 2, '09:20:00', '14:30:00'),
   (5, 3, '09:20:00', '14:30:00'),
   (5, 4, '09:20:00', '14:30:00'),
   (6, 0, '09:10:00', '16:45:00'),
   (6, 1, '09:10:00', '16:45:00'),
   (6, 2, '09:10:00', '16:45:00'),
   (6, 3, '09:10:00', '16:45:00'),
   (6, 4, '09:10:00', '16:45:00'),
   (7, 0, '08:45:00', '17:15:00'),
   (7, 1, '08:45:00', '17:15:00'),
   (7, 2, '08:45:00', '17:15:00'),
   (7, 3, '08:45:00', '17:15:00'),
   (7, 4, '08:45:00', '17:15:00'),
   (8, 0, '10:30:00', '19:30:00'),
   (8, 1, '10:30:00', '19:30:00'),
   (8, 2, '10:30:00', '19:30:00'),
   (8, 3, '10:30:00', '19:30:00'),
   (8, 4, '10:30:00', '19:30:00'),
   (9, 0, '09:00:00', '18:00:00'),
   (9, 1, '09:00:00', '18:00:00'),
   (9, 2, '09:00:00', '18:00:00'),
   (9, 3, '09:00:00', '18:00:00'),
   (9, 4, '09:00:00', '18:00:00'),
   (10, 0, '09:30:00', '18:30:00'),
   (10, 1, '09:30:00', '18:30:00'),
   (10, 2, '09:30:00', '18:30:00'),
   (10, 3, '09:30:00', '18:30:00'),
   (10, 4, '09:30:00', '18:30:00'),
   (11, 0, '10:00:00', '19:00:00'),
   (11, 1, '10:00:00', '19:00:00'),
   (11, 2, '10:00:00', '19:00:00'),
   (11, 3, '10:00:00', '19:00:00'),
   (11, 4, '10:00:00', '19:00:00'),
   (12, 0, '10:30:00', '19:30:00'),
   (12, 1, '10:30:00', '19:30:00'),
   (12, 2, '10:30:00', '19:30:00'),
   (12, 3, '10:30:00', '19:30:00'),
   (12, 4, '10:30:00', '19:30:00'),
   (13, 0, '11:00:00', '20:00:00'),
   (13, 1, '11:00:00', '20:00:00'),
   (13, 2, '11:00:00', '20:00:00'),
   (13, 3, '11:00:00', '20:00:00'),
   (13, 4, '11:00:00', '20:00:00'),
   (14, 0, '11:30:00', '20:30:00'),
   (14, 1, '11:30:00', '20:30:00'),
   (14, 2, '11:30:00', '20:30:00'),
   (14, 3, '11:30:00', '20:30:00'),
   (14, 4, '11:30:00', '20:30:00'),
   (15, 0, '12:00:00', '21:00:00'),
   (15, 1, '12:00:00', '21:00:00'),
   (15, 2, '12:00:00', '21:00:00'),
   (15, 3, '12:00:00', '21:00:00'),
   (15, 4, '12:00:00', '21:00:00');


-- Dummy food types...
-- If these are to be handled individually when rendering, perhaps it might
-- be best to replace these with canonical data?
INSERT INTO food_types (id, name, description, meta) VALUES
   ('fresh_veg', 'Fresh Vegetables', 'Various fresh vegetables', '{"icon":"🥕"}'),
   ('canned', 'Canned Goods', 'Canned food items', '{}'),
   ('dairy', 'Dairy', 'Dairy items like milk, yogurt, cream', '{}'),
   ('fresh_fruit', 'Fruit', 'Fresh fruit produce', '{}'),
   ('frozen', 'Frozen', 'Frozen items', '{}'),
   ('toiletries', 'Toiletries', 'Toiletries', '{}'),
   ('halal', 'Halal', 'Halal-certified food items', '{"icon":"☪️"}'),
   ('vegan', 'Vegan', 'Plant-based food items', '{"icon":"🌱","classes":["dietary"]}');


-- Dummy data attaching rough food type labels to locations/shops
INSERT INTO location_food_types (location, food_type) VALUES
   (1, 'fresh_veg'),
   (1, 'vegan'),
   (2, 'fresh_veg'),
   (3, 'halal'),
   (4, 'fresh_veg'),
   (4, 'halal'),
   (5, 'canned'),
   (6, 'dairy'),
   (6, 'frozen'),
   (7, 'fresh_fruit'),
   (7, 'dairy'),
   (8, 'toiletries'),
   (8, 'dairy'),
   (9, 'frozen'),
   (9, 'halal'),
   (10, 'fresh_veg'),
   (10, 'vegan'),
   (11, 'canned'),
   (11, 'frozen'),
   (12, 'vegan'),
   (13, 'dairy'),
   (13, 'toiletries'),
   (14, 'fresh_fruit'),
   (14, 'canned'),
   (15, 'frozen'),
   (15, 'toiletries'),
   (1, 'dairy'),
   (1, 'frozen'),
   (1, 'canned'),
   (2, 'dairy'),
   (3, 'fresh_fruit'),
   (3, 'canned'),
   (3, 'toiletries'),
   (4, 'vegan'),
   (4, 'canned');
