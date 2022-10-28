import React, {FunctionComponent, useState, useCallback} from 'react';
import {GoogleMapsProvider} from '@ubilabs/google-maps-react-hooks';

import MapCanvas from './components/map-canvas/map-canvas';
import GeocoderExample from './components/geocoder-example/geocoder-example';

import {GOOGLE_MAPS_API_KEY} from '../constants';

import './main.module.css';

const mapOptions = {
  center: {lat: 51.08998021141488, lng: 10.627828045134935},
  zoom: 8,
  disableDefaultUI: true,
  zoomControl: false,
  clickableIcons: false
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
      <GoogleMapsProvider
        googleMapsAPIKey={GOOGLE_MAPS_API_KEY}
        mapContainer={mapContainer}
        mapOptions={mapOptions}>
        <div id="container">
          <MapCanvas ref={mapRef} />
          <GeocoderExample />
        </div>
      </GoogleMapsProvider>
    </React.StrictMode>
  );
};

export default App;
