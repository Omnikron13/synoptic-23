import classnames from 'classnames';

import { getAll as getAllFoodTypes } from 'FoodType';

// JSON5 claims to fully mimic the JSON API, so in _theory_ it should be ok to shadow it
const JSON = await import('json5');

// TODO: replace with its own stylesheet
import styles from 'styles/admin.locations.module.scss';

import AdminFoodTypesList from 'AdminFoodTypesList';

// Page entrypoint
export default async function Page() {
   return(
      <>
         <h2>FoodTypes</h2>
         <AdminFoodTypesList data={await getAllFoodTypes()} />
      </>
   );
}
