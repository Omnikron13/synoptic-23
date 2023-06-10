import db from '/db.js';
import * as model from '/Location.ts';

export const metadata = {
   title: 'Locations Page Title',
};


// TOOO: relocate this, if used at all, to a common location...
async function Location({ name, description, lat, long, times }) {
   return(
      <div className='location'>
         <h2>{name} ({lat}, {long})</h2>
         {description ?
            <p>{description}</p>
            :<></>}
         {times.length > 0 ?
            <Times times={times} />
            :<></>}
      </div>
   );
}


async function Times({ times }) {
   // TODO: offload this properly elsewhere...
   const days = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6:'Sat' };

   return <>
      <h3>Times</h3>
      <ol>
         {times.map(t =>
            <li>{days[t.day]} - {t.open} - {t.close}</li>
         )}
      </ol>
   </>;
}


export default async function Page() {
   const locs = await model.getAll();

   return <>
      <h1>Locations</h1>
      {locs.map(l =>
         <Location
            name={l.name}
            description={l.description}
            lat={l.lat}
            long={l.long}
            times={l.times}
         />
      )}
   </>;
}

