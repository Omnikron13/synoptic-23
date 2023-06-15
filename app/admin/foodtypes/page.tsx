import classnames from 'classnames';

import { getAll as getAllFoodTypes } from 'FoodType';

// JSON5 claims to fully mimic the JSON API, so in _theory_ it should be ok to shadow it
const JSON = await import('json5');

import styles from 'styles/foodtypes.admin.module.sass';

import AdminFoodTypesList from 'components/AdminFoodTypesList';

export const metadata = {
   title: 'FoodTypes',
};

// Page entrypoint
export default async function Page() {
   return(
      <body>
         <h2>FoodTypes</h2>
         <AdminFoodTypesList data={await getAllFoodTypes()} />
      </body>
   );
}
