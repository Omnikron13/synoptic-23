import classnames from 'classnames';

import { getAll as getAllLocations } from 'Location';

// JSON5 claims to fully mimic the JSON API, so in _theory_ it should be ok to shadow it
const JSON = await import('json5');

import styles from './admin.locations.module.scss';

const locs = await getAllLocations();

export default function Page() {
   const loc = locs[0];

   return(
      <>
         <h2>Locations</h2>
         <ul className={classnames(styles.locationsList)}>
            <li className={classnames('location', styles.location)}>
               <h3 className={classnames('name', styles.name)}>{loc.name}</h3>

               <p className={classnames('description', styles.description)}>{loc.description}</p>

               <p className={classnames('coords', 'h-geo', styles.coords)}>
                  <a href={`geo:${loc.coords.lat},${loc.coords.lng}`}>
                     <data className='p-latitude'  value={loc.coords.lat}>{loc.coords.lat}</data>
                     <data className='p-longitude' value={loc.coords.lng}>{loc.coords.lng}</data>
                  </a>
               </p>

               <ol className={classnames('timesList', styles.timesList)}>
                  <h3>Times</h3>
                  <li className={classnames('times', styles.times)} key={loc.times[0].day}>
                     {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][loc.times[0].day]}
                     {loc.times[0].open}
                     {loc.times[0].close}
                  </li>
                  <li key={loc.times[1].day}>{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][loc.times[1].day]} - {loc.times[1].open} - {loc.times[1].close}</li>
                  <li key={loc.times[2].day}>{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][loc.times[2].day]} - {loc.times[2].open} - {loc.times[2].close}</li>
                  <li key={loc.times[3].day}>{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][loc.times[3].day]} - {loc.times[3].open} - {loc.times[3].close}</li>
                  <li key={loc.times[4].day}>{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][loc.times[4].day]} - {loc.times[4].open} - {loc.times[4].close}</li>
                  <li key={loc.times[5].day}>{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][loc.times[5].day]} - {loc.times[5].open} - {loc.times[5].close}</li>
               </ol>

               <ul className={classnames('foodTypesList', styles.foodTypesList)}>
                  <h3>Food types/categories</h3>
                  <li className={classnames('foodType', styles.foodType, loc.food_types[0].id, loc.food_types[0].meta?.classes)}>
                     <h4 className='name'>{loc.food_types[0].name} [{loc.food_types[0].id}]</h4>
                     <p className='description'>{loc.food_types[0].description}</p>
                  </li>
                  <li className={classnames('foodType', styles.foodType, loc.food_types[1].id, loc.food_types[1].meta?.classes)}>
                     <h4 className='name'>{loc.food_types[1].name} [{loc.food_types[1].id}]</h4>
                     <p className='description'>{loc.food_types[1].description}</p>
                  </li>
               </ul>
            </li>

            <LocationComponent {...loc} />
         </ul>

         <pre>{JSON.stringify(loc, null, 3)}</pre>
      </>
   );
}


function LocationComponent({ id, name, description, coords }) {
   return(
      <li className={classnames('location', styles.location)}>
         <h3 className={classnames('name', styles.name)}>{name}</h3>

         <p className={classnames('description', styles.description)}>{description}</p>

         <HGeoComponent {...coords} />

         {/* TODO: fill out coords, times, food_types components */}
      </li>
   );
}


// h-geo microformat, see: http://microformats.org/wiki/h-geo
function HGeoComponent({ lat, lng }) {
   const nf = new Intl.NumberFormat('en-GB', {
      // Supposedly accurate to ~1.11m (dropping to 4dp is apparently ~11.1m)
      maximumFractionDigits: 5,
   });

   return(
      <p className={classnames('coords', 'h-geo', styles.coords)}>
         <a href={`geo:${lat},${lng}`}>
            <data className='p-latitude'  value={lat}>{nf.format(lat)}</data>
            <data className='p-longitude' value={lng}>{nf.format(lng)}</data>
         </a>
      </p>
   );
}


// TODO: TimesListComponent

// TODO: TimesComponent

// TODO: FoodTypeListComponent

// TODO: FoodTypeComponent
