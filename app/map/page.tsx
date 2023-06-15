import * as Location from 'Location';
import * as FoodType from 'FoodType';
import { ClientComponents } from './components';

import styles from 'styles/map.module.sass';

export const metadata = {
   title: 'Map',
};
 
export default async function Page() {
   // TODO: replace this with some kind of state in the real app
   const locs = await Location.getAll();

   return(
      <body className={styles.body}>
         <ClientComponents locations={locs} foodTypes={await FoodType.getAll()} />
      </body>
   );
}

