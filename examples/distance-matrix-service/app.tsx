import React, {FunctionComponent, useState, useCallback} from 'react';
import {GoogleMapsProvider} from '@ubilabs/google-maps-react-hooks';

import MapCanvas from './components/map-canvas/map-canvas';
import DistanceMatrixService from './components/distance-matrix-service/distance-matrix-service';

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
    <GoogleMapsProvider
      googleMapsAPIKey={GOOGLE_MAPS_API_KEY}
      mapContainer={mapContainer}
      mapOptions={mapOptions}
      libraries={['places']}>
      <React.StrictMode>
        <div id="container">
          <MapCanvas ref={mapRef} />
          <DistanceMatrixService />
        </div>
      </React.StrictMode>
    </GoogleMapsProvider>
  );
};

export default App;
