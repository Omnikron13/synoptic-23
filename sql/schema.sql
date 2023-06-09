-- Always use protection
BEGIN;

-- TODO: perhaps name this something
CREATE SCHEMA IF NOT EXISTS public;
SET search_path TO public;


-- Function checking for (functionally) empty strings in constraints, useful to validate names, etc.
CREATE OR REPLACE FUNCTION not_blank(c char) RETURNS boolean
   AS 'SELECT LENGTH(TRIM(COALESCE(c, ''''))) > 0'
   LANGUAGE SQL
   IMMUTABLE
   LEAKPROOF
   CALLED ON NULL INPUT
   PARALLEL SAFE
;


-- Tabula rasa
DROP TABLE IF EXISTS locations;


-- Table of locations/shops
CREATE TABLE IF NOT EXISTS locations(
   id INTEGER PRIMARY KEY,
   name
      VARCHAR(255)
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


COMMIT;

