'use client';

import { useState, useCallback, memo } from 'react';
import {
   GoogleMap,
   useJsApiLoader,
   Marker,
} from '@react-google-maps/api';

const containerStyle = {
   width: '80rem',
   height: '40rem'
};

function Map({ lat, lng }) {
   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: 'AIzaSyCXhK5ERNDL42X1HnIj8gFgMeNr0iKERiI',
   })

   const [map, setMap] = useState(null);

   const onLoad = useCallback(function callback(map) {
      // TODO: not just blindly copy
      // Rough bounds of the Govan ward area we're interested in
      const sw = {lat: 55.846051295550666, lng: -4.35666360454672};
      const ne = {lat: 55.87486951008421, lng: -4.269570716426365};

      const bounds = new window.google.maps.LatLngBounds(sw, ne);
      map.fitBounds(bounds);

      setMap(map)
   }, []);

   const onUnmount = useCallback(function callback(map) {
      setMap(null)
   }, []);

   return isLoaded ? (
      <GoogleMap
         mapContainerStyle={containerStyle} // TODO: style this properly with CSS
         center={{lat, lng}}
         zoom={9}
         onLoad={onLoad}
         onUnmount={onUnmount}
      >
         { /* TODO: would set actual markers, etc. here */ }
         <Marker position={{lat, lng}} />
      </GoogleMap>
   ) : <></>
}

export default memo(Map);

