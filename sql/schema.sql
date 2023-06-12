-- Always use protection
BEGIN;

-- TODO: perhaps name this something
CREATE SCHEMA IF NOT EXISTS public;
SET search_path TO public;


-- Add a case-insensitive collation
CREATE COLLATION IF NOT EXISTS en_gb_nocase (provider = icu, locale = 'en-GB-u-ks-level1', deterministic = false);


-- Function checking for (functionally) empty strings in constraints, useful to validate names, etc.
CREATE OR REPLACE FUNCTION not_blank(c char) RETURNS boolean
   AS $$ SELECT LENGTH(TRIM(COALESCE(c, ''''))) > 0 $$
   LANGUAGE SQL
   IMMUTABLE
   LEAKPROOF
   CALLED ON NULL INPUT
   PARALLEL SAFE
;


-- Translate day-of-week numbers (e.g. from EXTRACT(DOW FROM ...) to names
CREATE OR REPLACE FUNCTION dow_name(i INTEGER) RETURNS text
   AS $$ SELECT ('{Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday}'::text[])[i + 1] $$
   LANGUAGE SQL
   STRICT
   IMMUTABLE
   PARALLEL SAFE
;


-- Tabula rasa
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS times CASCADE;
DROP TABLE IF EXISTS food_types CASCADE;
DROP TABLE IF EXISTS location_food_types CASCADE;


-- Table of locations/shops
CREATE TABLE IF NOT EXISTS locations(
   id SERIAL PRIMARY KEY,
   name
      TEXT
      UNIQUE
      NOT NULL
      CHECK(not_blank(name))
   ,
   description
      TEXT
   ,
   lat
      DOUBLE PRECISION
      NOT NULL
      CHECK(lat BETWEEN -90 AND 90)
   ,
   long
      DOUBLE PRECISION
      NOT NULL
      CHECK(long BETWEEN -180 AND 180)
);


-- Table of opening/availability hours
CREATE TABLE IF NOT EXISTS times(
   location
      INTEGER
      NOT NULL
      REFERENCES locations
         ON UPDATE CASCADE
         ON DELETE CASCADE
   ,
   day
      SMALLINT
      NOT NULL
      CHECK(day BETWEEN 0 AND 6)
   ,
   open
      TIME
      NOT NULL
   ,
   close
      TIME
      NOT NULL
      CHECK(close > open)
   ,
   PRIMARY KEY(location, day)
);


-- Table of food types, e.g. 'Fresh Vegetables', 'Canned Goods', 'Halal', 'Vegan', etc.
CREATE TABLE IF NOT EXISTS food_types(
   id
      TEXT
      PRIMARY KEY
      -- Apparently setting a case insensitive collation breaks regex, including SIMILAR TO...
      --COLLATE en_gb_nocase
      CHECK(id SIMILAR TO '[a-z0-9_-]{3,32}')
   ,
   name
      TEXT
      UNIQUE
      NOT NULL
      CHECK(not_blank(name))
   ,
   description
      TEXT
   ,
   meta
      JSONB
      NOT NULL
      DEFAULT '{}'
);


-- General overiew of the types/categories of food usually available (surplus/clearance) at a location
CREATE TABLE IF NOT EXISTS location_food_types(
   location
      INTEGER
      NOT NULL
      REFERENCES locations
         ON UPDATE CASCADE
         ON DELETE CASCADE
   ,
   food_type
      TEXT
      NOT NULL
      REFERENCES food_types
         ON UPDATE CASCADE
         ON DELETE CASCADE
   ,
   PRIMARY KEY(location, food_type)
);


COMMIT;

