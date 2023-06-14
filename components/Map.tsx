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
         onLoad={onLoad}
         onUnmount={onUnmount}
      >
         {children}
      </GoogleMap>
   ) : <></>
}

export function LocationMarker({ name, coords }) {
   return(
      <Marker
         position={coords}
         title={name}
         label='☭'
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

export default memo(Map);

