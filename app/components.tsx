'use client';
import { useEffect, useState } from 'react';
import Map from 'components/Map';
import { LocationMarker, UserMarker } from 'components/Map';
import Filter from 'components/Filter';

import styles from 'styles/map.module.sass';
import locationStyles from 'styles/locations.module.sass';

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

   // Add a unique label for _this particular_ filtered list
   // TODO: this would need to be fixed for > 26 shops
   const labelledLocationList = filteredLocationList.map((l, i) => ({...l, label: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i % 26]}));


   return <>
      <header className={styles.header}>
         <h1>Map Test Page</h1>
         <button onClick={() => setGeo({lat: 55.860555, lng: -4.324892})}>Spoof GeoLoc</button>
      </header>

      <main className={styles.main}>
         <details className={styles.filter}>
            <summary>Filter</summary>
            <Filter foodTypes={foodTypes} filter={filter} setFilter={setFilter} />
         </details>

         <ol className={styles.locationList}>
            {labelledLocationList.map((l, i) => <Location key={i} {...l} />)}
         </ol>
      </main>

      <div className={styles.mapContainer}>
         <Map>
            {geo && <UserMarker coords={geo} />}
            {labelledLocationList.map((l, i) => <LocationMarker key={i} {...l} />)}
         </Map>
      </div>
   </>;
}

function Location({ name, description, times, food_types, label, distance }) {
   return(
      <li className={locationStyles.location}>
         <header className={locationStyles.header}>
            <p className={locationStyles.label}>{label}</p>
            <h3 className={locationStyles.name}>{name}</h3>
            {distance && <p className={locationStyles.distance}>&nbsp;&ndash; {distance.text}</p>}
         </header>
         <p className={locationStyles.description}>{description}</p>
         <ol className={locationStyles.timesList}>
            <h4>Times</h4>
            {times?.map(t =><li key={t.day}>
               <span className={locationStyles.day}>{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][t.day]}</span>
               <span className={locationStyles.range}>
                  <time className={locationStyles.open} dateTime={t.open}>{t.open.slice(0, -3)}</time>
                  <span className={locationStyles.dash}>&ndash;</span>
                  <time className={locationStyles.close} dateTime={t.close}>{t.close.slice(0, -3)}</time>
               </span>
            </li>)}
         </ol>
         <ul className={locationStyles.foodTypesList}>
            {food_types?.map(ft => <li key={ft.id}>
               {ft.meta.icon && <span className={locationStyles.icon}>{ft.meta.icon}</span>}
               {ft.name}
            </li>)}
         </ul>
      </li>
   );
}
