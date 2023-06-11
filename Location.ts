import db from '/db.js';

async function construct(obj: Location): Promise<Location> {
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

