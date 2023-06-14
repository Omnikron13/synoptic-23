'use client';
import { useEffect, useState } from 'react';
import Map from 'components/Map';
import { LocationMarker, UserMarker } from 'components/Map';

import styles from 'styles/map.module.sass';

export function ClientComponents({ locations }) {
   const [locationList, setLocationList] = useState(locations);
   const [geo, setGeo] = useState(null);

   // Interface with the browser's geolocation API
   useEffect(() => {
      // If there is no geolocation in state, try to get it
      if(!geo) {
         window.navigator.geolocation.getCurrentPosition(p => {
            setGeo({lat: p.coords.latitude, lng: p.coords.longitude});
         });
         return;
      }
      // If there _is_ one, we should sort the list of locations by distance
      // TODO: either fetch from the API and let PostGIS do a rough sort, or
      // query the distance matrix api thing from google maps.
   }, [geo]);


   return <>
      {/* TODO: strip this debug output */ geo ? <p>{geo.lat}, {geo.lng}</p> : <p>no geo</p>}
      <button onClick={() => setGeo({lat: 55.860555, lng: -4.324892})}>Spoof GeoLoc</button>
      <input placeholder='Filter...' />
      <div className={styles.mapContainer}>
         <Map>
            {geo && <UserMarker coords={geo} />}
            {locationList.map((l, i) => <LocationMarker key={i} {...l} />)}
         </Map>
      </div>
   </>;
}
