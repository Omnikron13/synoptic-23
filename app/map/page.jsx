import Map from './Map.jsx';
import * as Location from '/Location.ts';

export const metadata = {
   title: 'Map Page Title',
};
 
export default async function Page() {
   // TODO: replace this with some kind of state in the real app
   const locs = await Location.getAll();
   const points = locs.map(l => ({ lat: l.lat, lng: l.long }));

   return <>
      <h1>Map Test Page</h1>
      <Map points={points} />
   </>;
}

