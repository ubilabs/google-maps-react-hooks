import React, {FunctionComponent, useState, useCallback} from 'react';
import {GoogleMapProvider} from '@ubilabs/google-maps-react-hooks';

import MapCanvas from './components/map-canvas/map-canvas';

import {GOOGLE_MAPS_API_KEY} from '../constants';

import './main.module.css';
import PlacesExample from './components/places-example/places-example';

const mapOptions = {
  center: {lat: 53.5582447, lng: 9.647645},
  zoom: 20,
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
      <GoogleMapProvider
        googleMapsAPIKey={GOOGLE_MAPS_API_KEY}
        mapContainer={mapContainer}
        mapOptions={mapOptions}
        // Add library places
        libraries={['places']}
      >
        <div id="container">
          <MapCanvas ref={mapRef} />
          <PlacesExample />
        </div>
      </GoogleMapProvider>
    </React.StrictMode>
  );
};

export default App;
