import classnames from 'classnames';
import db from '/db.js';

function construct(obj): FoodType {
   return {
      id: obj.id,
      name: obj.name,
      description: obj.description,
      classes: obj.classes,
   };
}

export async function get(id: string) : Promise<FoodType> {
   const res = await db.query('SELECT * FROM food_types WHERE id = $1', [id]);
   // TODO: error handling
   return construct(res.rows[0]);
}

export async function getAll(): Promise<FoodType[]> {
   const res = await db.query('SELECT * FROM food_types');
   return res.rows.map(ft => construct(ft));
}

export function FoodType({ name, description, classes }) {
   return (
      <details className={classnames('foodType', classes)}>
         <summary>{name}</summary>
         <p>{description}</p>
      </details>
   );
}

