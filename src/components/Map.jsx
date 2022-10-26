import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NODE_ENV === 'development' ? 'pk.eyJ1IjoiZGhlZXJhamFyb3JhMTk5NyIsImEiOiJjbDlvM2VmbTQwZHlzM3BvNW04ODU1NTJ1In0.kpZXObzDZM5VFW3y3oq99g' : 'pk.eyJ1IjoiZGhlZXJhamFyb3JhMTk5NyIsImEiOiJjbDlvNW4zdHMwZWRrM3VrYjNkb3B6dW5uIn0.NRSOWdRDdv_puvSI1qmUpQ';
export default function Map(props) {
 const mapContainerRef = useRef(null);
 const [location, setLocation] = useState(props.location);
 const [lng, setLng] = useState(props.lng);
 const [lat, setLat] = useState(props.lat);
 const [zoom, setZoom] = useState(9);

 useEffect(() => {
  setLng(props.lng)
  setLat(props.lat)
  const map = new mapboxgl.Map({
   container: mapContainerRef.current,
   style: 'mapbox://styles/mapbox/streets-v11',
   center: [lng, lat],
   zoom: zoom,
  });

  return () => map.remove();
 }, [props]);
 return (
  <div className='map-container' ref={mapContainerRef} />
 );
};
