import db from '/db.js';

export const metadata = {
   title: 'Locations Page Title',
};


// TOOO: relocate this, if used at all, to a common location
function Location({ props }) {
   return(
      <div>
         <h2>{props.name}</h2>
         <p>{props.description}</p>
         <p>{props.lat}, {props.long}</p>
      </div>
   );
}
 

export default async function Page() {
   const res = await db.query('SELECT * FROM locations', []);
   // TODO: error handling

   return <>
      <h1>Locations</h1>
      {res.rows.map(l =>
         <Location props={l} />
      )}
   </>;
}

