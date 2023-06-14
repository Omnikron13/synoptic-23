import * as Location from 'Location';
import { ClientComponents } from './components';

import styles from 'styles/map.module.sass';

export const metadata = {
   title: 'Map Page Title',
};
 
export default async function Page() {
   // TODO: replace this with some kind of state in the real app
   const locs = await Location.getAll();

   return(
      <body className={styles.body}>
         <h1>Map Test Page</h1>
         <ClientComponents locations={locs} />
      </body>
   );
}

