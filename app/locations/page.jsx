import db from '/db.js';
import * as model from '/Location.ts';

export const metadata = {
   title: 'Locations Page Title',
};


// TOOO: relocate this, if used at all, to a common location...
async function Location({ name, description, coords, times, food_types }) {
   return(
      <div className='location'>
         <h2>{name} ({coords.lat}, {coords.lng})</h2>
         {description ?
            <p>{description}</p>
            :<></>}
         <Times times={times} />
         <FoodTypes food_types={food_types} />
      </div>
   );
}


async function Times({ times }) {
   return times ?
      <>
         <h3>Times</h3>
         <ol>
            {times.map(t =>
               <li key={t.day}>{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][t.day]} - {t.open} - {t.close}</li>
            )}
         </ol>
      </>
      : <></>;
}


function FoodTypes({ food_types }) {
   return food_types ?
      <>
         <h3>Food Types</h3>
         <ul>
            {food_types.map(ft => <li key={ft.id}>{ft.name} : {ft.description}</li>)}
         </ul>
      </>
      : <></>;
}


export default async function Page() {
   const locs = await model.getAll();

   return <>
      <h1>Locations</h1>
      {locs.map(l =>
         <Location {...l} />
      )}
   </>;
}

