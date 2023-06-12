import db from '/db.js';
import FoodType from '/FoodType.tsx';

async function construct(obj: Location): Promise<Location> {
   obj.food_types = obj.food_types.map(ft => new FoodType(ft));
   return obj;
}

export async function get(id: number): Promise<Location> {
   const res = await db.query('SELECT * FROM locations_view WHERE id = $1', [id]);

   return construct(res.rows[0]);
}

export async function getAll(): Promise<Location[]> {
   const res = await db.query('SELECT * FROM locations_view');

   return Promise.all(res.rows.map(l => construct(l)));
}

