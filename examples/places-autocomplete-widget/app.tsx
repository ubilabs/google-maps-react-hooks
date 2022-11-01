import React, {FunctionComponent, useState, useCallback} from 'react';
import {GoogleMapsProvider} from '@ubilabs/google-maps-react-hooks';

import MapCanvas from './components/map-canvas/map-canvas';
import PlacesAutocompleteWidget from './components/places-autocomplete-widget/places-autocomplete-widget';

import {GOOGLE_MAPS_API_KEY} from '../constants';

import './main.module.css';

const mapOptions = {
  center: {lat: 53.5582447, lng: 9.647645},
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
      <GoogleMapsProvider
        googleMapsAPIKey={GOOGLE_MAPS_API_KEY}
        mapContainer={mapContainer}
        mapOptions={mapOptions}
        // Add the places library
        libraries={['places']}>
        <div id="container">
          <MapCanvas ref={mapRef} />
          <PlacesAutocompleteWidget />
        </div>
      </GoogleMapsProvider>
    </React.StrictMode>
  );
};

export default App;
