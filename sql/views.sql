-- All the basic information about a location can more or less be assembled here
-- within the database. Postgres is pretty dope.
CREATE VIEW locations_view AS
WITH
   times_agg AS (
      SELECT
         location,
         array_agg(json_build_object('day', dow_name(day), 'open', open, 'close', close))
            AS json
      FROM times
      GROUP BY location
      ORDER BY location
         ASC
   ),
   food_type_agg AS (
      SELECT
         location,
         array_agg(row_to_json(food_types))
            AS json
      FROM location_food_types
      JOIN food_types
         ON food_types.id = location_food_types.food_type
      GROUP BY location
      ORDER BY location
   )
SELECT
   id,
   name,
   description,
   json_build_object('lat', lat, 'lng', long)
      AS coords,
   times_agg.json
      AS times,
   food_type_agg.json
      AS food_types
FROM locations
LEFT JOIN times_agg
   ON locations.id = times_agg.location
LEFT JOIN food_type_agg
   ON locations.id = food_type_agg.location
ORDeR BY id
   ASC
;

