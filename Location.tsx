import classnames from 'classnames';
import db from 'db';
import FoodType from 'FoodType';

export default class Location {
   id: number;
   name: string;
   description: string;
   coords: { lat: number, lng: number };
   times: { day: string, open: string, close: string }[];
   food_types: FoodType[];

   constructor({ id, name, description, coords, times, food_types, ...r}) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.coords = coords;
      this.times = times;
      this.food_types = food_types.map(ft => new FoodType(ft));
   }
}


export async function get(id: number) : Promise<Location> {
   const res = await db.query('SELECT * FROM locations_view WHERE id = $1', [id]);

   return new Location(res.rows[0]);
}

export async function getAll() : Promise<Location[]> {
   const res = await db.query('SELECT * FROM locations_view');

   return res.rows.map(l => new Location(l));
}

