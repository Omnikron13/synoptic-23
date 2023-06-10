import db from '/db.js';

async function construct(obj: Location): Location {
   // Return (raw) time records for this location
   obj.getTimes = async () => {
      const res = await db.query('SELECT day, open, close FROM times WHERE location = $1', [obj.id]);
      // TDOD: error handling
      return res.rows;
   };

   // Attach time records to object
   obj.times = await obj.getTimes();

   return obj;
}

export async function get(id: number): Promise<Location> {
   const res = await db.query('SELECT * FROM locations WHERE id = $1', [id]);

   return construct(res.rows[0]);
}

export async function getAll(): Promise<Location[]> {
   const res = await db.query('SELECT * FROM locations');

   return Promise.all(res.rows.map(l => construct(l)));
}

