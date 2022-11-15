import React, {FunctionComponent, useState, useCallback} from 'react';
import {GoogleMapsProvider} from '@ubilabs/google-maps-react-hooks';

import MapCanvas from './components/map-canvas/map-canvas';
import ElevationService from './components/elevation-service/elevation-service';

import {GOOGLE_MAPS_API_KEY} from '../constants';

import './main.module.css';

const mapOptions = {
  center: {lat: 53.5582447, lng: 9.647645},
  zoom: 8,
  disableDefaultUI: true,
  zoomControl: false
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
      mapOptions={mapOptions}>
      <React.StrictMode>
        <div id="container">
          <MapCanvas ref={mapRef} />
          <ElevationService />
        </div>
      </React.StrictMode>
    </GoogleMapsProvider>
  );
};

export default App;
