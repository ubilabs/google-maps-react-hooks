import React, {FunctionComponent, useState, useCallback} from 'react';
import {GoogleMapProvider} from '@ubilabs/google-maps-react-hooks';

import MapCanvas from './components/map-canvas/map-canvas';
import DistanceMatrix from './components/distance-matrix/distance-matrix';

import {GOOGLE_MAPS_API_KEY} from '../constants';

import './main.module.css';

const mapOptions = {
  center: {lat: 48.8589466, lng: 2.2769956},
  zoom: 6,
  disableDefaultUI: true,
  zoomControl: true
};

const App: FunctionComponent<Record<string, unknown>> = () => {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);

  const mapRef = useCallback(
    (node: React.SetStateAction<HTMLDivElement | null>) => {
      node && setMapContainer(node);
    },
    []
  );

  return (
    <React.StrictMode>
      <GoogleMapProvider
        googleMapsAPIKey={GOOGLE_MAPS_API_KEY}
        mapContainer={mapContainer}
        mapOptions={mapOptions}
        libraries={['places']}>
        <div id="container">
          <MapCanvas ref={mapRef} />
          <DistanceMatrix />
        </div>
      </GoogleMapProvider>
    </React.StrictMode>
  );
};

export default App;
