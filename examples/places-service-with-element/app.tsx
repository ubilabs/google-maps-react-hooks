import React, {FunctionComponent} from 'react';
import {GoogleMapsProvider} from '@ubilabs/google-maps-react-hooks';

import PlacesServiceElement from './components/places-service-with-element/places-service-with-element';

import {GOOGLE_MAPS_API_KEY} from '../constants';

import './main.module.css';

const mapOptions = {
  center: {lat: 53.5582447, lng: 9.647645},
  zoom: 20,
  disableDefaultUI: true,
  zoomControl: false,
  clickableIcons: false
};

const App: FunctionComponent<Record<string, unknown>> = () => (
  <GoogleMapsProvider
    googleMapsAPIKey={GOOGLE_MAPS_API_KEY}
    mapOptions={mapOptions}
    // Add library places
    libraries={['places']}>
    <React.StrictMode>
      <div id="container">
        <PlacesServiceElement />
      </div>
    </React.StrictMode>
  </GoogleMapsProvider>
);

export default App;
