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
            {locs.map(l => <LocationComponent {...l} />)}
         </ul>
      </>
   );
}


function LocationComponent({ id, name, description, coords, times, food_types }) {
   return(
      <li className={classnames('location', styles.location)}>
         <h3 className={classnames('name', styles.name)}>{name}</h3>

         <p className={classnames('description', styles.description)}>{description}</p>

         <HGeoComponent {...coords} />

         <TimesListComponent times={times} />

         <FoodTypesListComponent food_types={food_types} />
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


function TimesListComponent({ times }) {
   return(
      <ol className={classnames('timesList', styles.timesList)}>
         <h3>Times</h3>
         {times?.map(t => <TimeComponent key={t.day} {...t} />)}
      </ol>
   );
}


function TimeComponent({ day, open, close }) {
   // TODO: generate the human-readable times in a less fragile way
   return(
      <li className={classnames('time', styles.time)}>
         <span className={styles.day}>{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][day]}</span>
         <span className={classnames('range', styles.range)}>
            <time className={styles.open} datetime={open}>{open.slice(0, -3)}</time>
            <span className={styles.dash}>&ndash;</span>
            <time className={styles.close} datetime={close}>{close.slice(0, -3)}</time>
         </span>
      </li>
   );
}


function FoodTypesListComponent({ food_types }) {
   return(
      <ul className={classnames('foodTypesList', styles.foodTypesList)}>
         <h3>Food types/categories</h3>
         {food_types?.map(ft => <FoodTypeComponent key={ft.id} {...ft} />)}
      </ul>
   );
}


function FoodTypeComponent({ id, name, description, meta }) {
   return(
      <li className={classnames('foodType', styles.foodType, id, meta?.classes)}>
         <h4 className={'name', styles.name}>{name} [{id}]</h4>
         <p className={'description', styles.description}>{description}</p>
      </li>
   );
}
