import Map from 'components/Map';
import { LocationMarker } from 'components/Map';
import * as Location from 'Location';

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
         <div className={styles.mapContainer}>
            <Map>
               {locs.map(l => <LocationMarker {...l} />)}
            </Map>
         </div>
      </body>
   );
}

