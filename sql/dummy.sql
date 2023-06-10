-- Dummy data for locations/shops table
INSERT INTO locations (name, description, lat, long) VALUES
   ('Shop A', 'This is shop A', 41.8781, -87.6298),
   ('Shop B', 'This is shop B', 34.0522, -118.2437),
   ('Shop C', 'This is shop C', 51.5074, -0.1278),
   ('Shop D', 'This is shop D', 40.7128, -74.0060);


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
INSERT INTO food_types (name, description, classes) VALUES
   ('Fresh Vegetables', 'Various fresh vegetables', ARRAY['veg']),
   ('Canned Goods', 'Canned food items', ARRAY['canned']),
   -- TODO: perhaps add additional umbrella classes? 'religious', 'restriction', etc..?
   ('Halal', 'Halal-certified food items', ARRAY['halal','dietary']),
   ('Vegan', 'Plant-based food items', ARRAY['vegan','dietary']);
