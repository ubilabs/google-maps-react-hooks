import React, {FunctionComponent, useState, useCallback} from 'react';
import {GoogleMapsProvider} from '@ubilabs/google-maps-react-hooks';

import MapCanvas from './components/map-canvas/map-canvas';
import StreetViewPanoramaMap from './components/street-view-panorama-map/street-view-panorama-map';

import {GOOGLE_MAPS_API_KEY} from '../constants';

import './main.module.css';

const mapOptions = {
  center: {lat: 53.5582447, lng: 9.647645},
  zoom: 12,
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: true
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
          <StreetViewPanoramaMap />
        </div>
      </React.StrictMode>
    </GoogleMapsProvider>
  );
};

export default App;
