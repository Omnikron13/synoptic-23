import Map from './Map.jsx';
import * as Location from '/Location.ts';

export const metadata = {
   title: 'Map Page Title',
};
 
export default async function Page() {
   // TODO: replace this with some kind of state in the real app
   const locs = await Location.getAll();

   return <>
      <h1>Map Test Page</h1>
      <Map locations={locs} />
   </>;
}

