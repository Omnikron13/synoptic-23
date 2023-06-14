import { NextResponse } from 'next/server';
import { getAll } from 'Location';

export async function GET(req) {
   let data = await getAll();
   if(req.nextUrl.searchParams.get('start')) {
      const matrix = await fetchDistanceMatrix(req.nextUrl.searchParams.get('start'), data);
      data = data
         .map((l, i) => ({...l, distance: matrix.rows[0].elements[i].distance}))
         .sort((a, b) => a.distance.value - b.distance.value);
   }
   return NextResponse.json(data);
}

async function fetchDistanceMatrix(userCoords, locations) {
   const apiKey = 'AIzaSyCXhK5ERNDL42X1HnIj8gFgMeNr0iKERiI';
   const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
   const params = new URLSearchParams({
      destinations: locations.map(l => `${l.coords.lat},${l.coords.lng}`).join('|'),
      origins: userCoords,
      units: 'metric',
      key: apiKey,
   });
   const res = await fetch(url + params);
   return res.json();
}
