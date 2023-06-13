import classnames from 'classnames';
import db from 'db';

export default class FoodType {
   id: string;
   name: string;
   description: string;
   meta: any;

   constructor({ id, name, description, meta, ...r}) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.meta = meta;
   }

   // Wrapping this up in the slightly odd getter + lambda combination sidesteps
   // an issue with 'this' falling out of scope inside React.js/Next.js.
   // Closures to the rescue once again...
   get detailsComponent() {
      return props => detailsComponent({...this, ...props});
   }
}


export async function get(id: string) : Promise<FoodType> {
   const res = await db.query('SELECT * FROM food_types WHERE id = $1', [id]);
   // TODO: error handling
   return new FoodType(res.rows[0]);
}

export async function getAll() : Promise<FoodType[]> {
   const res = await db.query('SELECT * FROM food_types');
   return res.rows.map(ft => new FoodType(ft));
}

export function detailsComponent({ id, name, description, meta }) {
   return (
      <details className={classnames('foodType', id, meta?.classes)}>
         <summary>{name}</summary>
         <p>{description}</p>
      </details>
   );
}

