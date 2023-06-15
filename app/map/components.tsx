'use client';
import { useEffect, useState } from 'react';
import Map from 'components/Map';
import { LocationMarker, UserMarker } from 'components/Map';
import Filter from 'components/Filter';

import styles from 'styles/map.module.sass';

export function ClientComponents({ locations, foodTypes }) {
   const [locationList, setLocationList] = useState(locations);
   const [geo, setGeo] = useState(null);

   // TODO: rename this and shit if adding more than food type filtering
   const [filter, setFilter] = useState([]);

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
      fetch(`/api/locations?start=${geo.lat},${geo.lng}`)
         .then(res => res.json())
         .then(data => setLocationList(data));
   }, [geo]);

   // TODO: make this less horrifying...
   const filteredLocationList = filter.length == 0 ? locationList : locationList.filter(l => l.food_types.some(ft => filter.includes(ft.id)));


   return <>
      {/* TODO: strip this debug output */ geo ? <p>{geo.lat}, {geo.lng}</p> : <p>no geo</p>}
      <main>
         <button onClick={() => setGeo({lat: 55.860555, lng: -4.324892})}>Spoof GeoLoc</button>

         <Filter foodTypes={foodTypes} filter={filter} setFilter={setFilter} />

         {filteredLocationList.map((l, i) => <p key={i}>{l.name}</p>)}
      </main>
      <div className={styles.mapContainer}>
         <Map>
            {geo && <UserMarker coords={geo} />}
            {filteredLocationList.map((l, i) => <LocationMarker key={i} {...l} />)}
         </Map>
      </div>
   </>;
}
