import Map from './Map.jsx';

export const metadata = {
   title: 'Map Page Title',
};
 
export default function Page() {
   return <>
      <h1>Map Test Page</h1>
      <Map lat={55.86096} lng={-4.310354} />
   </>;
}

