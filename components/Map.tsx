'use client';

import { useState, useCallback, memo } from 'react';
import {
   GoogleMap,
   useJsApiLoader,
   Marker,
} from '@react-google-maps/api';


function Map({ children }) {
   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: 'AIzaSyCXhK5ERNDL42X1HnIj8gFgMeNr0iKERiI',
   })

   const [map, setMap] = useState(null);

   const onLoad = useCallback(map => {
      // TODO: not just blindly copy
      // Rough bounds of the Govan ward area we're interested in
      const sw = {lat: 55.846051295550666, lng: -4.35666360454672};
      const ne = {lat: 55.87486951008421, lng: -4.269570716426365};

      const bounds = new window.google.maps.LatLngBounds(sw, ne);
      map.fitBounds(bounds);

      setMap(map);
   }, []);

   const onUnmount = useCallback(map => setMap(null), []);

   return isLoaded ? (
      <GoogleMap
         mapContainerStyle={{width: '100%', height: '100%'}}
         clickableIcons={false}
         options={{
            disableDefaultUI: true,
            gestureHandling: 'greedy',
         }}
         onLoad={onLoad}
         onUnmount={onUnmount}
      >
         {children}
      </GoogleMap>
   ) : <></>
}
export default memo(Map);

export function LocationMarker({ name, coords, label }) {
   return(
      <Marker
         position={coords}
         title={name}
         label={{text: label, color: 'white'}}
      />
   );
}

export function UserMarker({ coords }) {
   return(
      <Marker
         position={coords}
         title='You are here'
         label='😀'
      />
   );
}
