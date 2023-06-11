-- All the basic information about a location can more or less be assembled here
-- within the database. Postgres is pretty dope.
CREATE VIEW locations_view AS
   SELECT
      l.id,
      l.name,
      l.description,
      json_build_object('lat', l.lat, 'lng', l.long)
         AS coords,
      ARRAY_AGG(row_to_json(food_types))
         AS food_types
   FROM locations l
   JOIN location_food_types l_ft
      ON l.id = l_ft.location
   JOIN food_types
      ON food_types.id = l_ft.food_type
   GROUP BY
      l.id, l.name, l.description
   ORDER BY
      l.id ASC
;

