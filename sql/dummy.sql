-- Dummy data for locations/shops table
INSERT INTO locations (name, description, lat, long) VALUES
   ('Shop A', 'This is shop A', 55.863335210385820, -4.315243338367801),
   ('Shop B', 'This is shop B', 55.863813962452355, -4.302852580455955),
   ('Shop C', 'This is shop C', 55.859507108009105, -4.307653191840376),
   ('Shop D', 'This is shop D', 55.864219200178430, -4.311974401759780);


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
   -- Leaving one location/shop with no opening times, as an edge case
   --(3, 0, '10:00:00', '19:00:00'),
   --(3, 1, '10:00:00', '19:00:00'),
   --(3, 2, '10:00:00', '19:00:00'),
   --(3, 3, '10:00:00', '19:00:00'),
   --(3, 4, '10:00:00', '19:00:00'),
   (4, 0, '09:30:00', '18:30:00'),
   (4, 1, '09:30:00', '18:30:00'),
   (4, 2, '09:30:00', '18:30:00'),
   (4, 3, '09:30:00', '18:30:00'),
   (4, 4, '09:30:00', '18:30:00');


-- Dummy food types...
-- If these are to be handled individually when rendering, perhaps it might
-- be best to replace these with canonical data?
INSERT INTO food_types (id, name, description, meta) VALUES
   ('fresh_veg', 'Fresh Vegetables', 'Various fresh vegetables', '{}'),
   ('canned', 'Canned Goods', 'Canned food items', '{}'),
   -- TODO: perhaps add additional umbrella classes? 'religious', 'restriction', etc..?
   ('halal', 'Halal', 'Halal-certified food items', '{}'),
   ('vegan', 'Vegan', 'Plant-based food items', '{"class":"dietary"}');


-- Dummy data attaching rough food type labels to locations/shops
INSERT INTO location_food_types (location, food_type) VALUES
   (1, 'fresh_veg'),
   (1, 'vegan'),
   (2, 'fresh_veg'),
   (3, 'halal'),
   (4, 'fresh_veg'),
   (4, 'halal');
