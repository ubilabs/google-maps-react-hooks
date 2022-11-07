import React, {FunctionComponent, useState, useCallback} from 'react';
import {GoogleMapsProvider} from '@ubilabs/google-maps-react-hooks';

import MapCanvas from './components/map-canvas/map-canvas';

import {GOOGLE_MAPS_API_KEY} from '../constants';

import './main.module.css';

const basicMapOptions = {
  zoom: 10,
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: {
    position: 3 // Right top
  }
};

// The Google Maps API parameters must be the same for all `GoogleMapsProvider` components!
const googleMapsAPIParameters = {
  googleMapsAPIKey: GOOGLE_MAPS_API_KEY,
  language: 'it',
  region: 'IT'
};

const App: FunctionComponent<Record<string, unknown>> = () => {
  const [hamburgMapContainer, setHamburgMapContainer] =
    useState<HTMLDivElement | null>(null);
  const hamburgMapRef = useCallback(
    (node: React.SetStateAction<HTMLDivElement | null>) => {
      node && setHamburgMapContainer(node);
    },
    []
  );
  const hamburgMapOptions = {
    ...basicMapOptions,
    center: {lat: 53.551086, lng: 9.993682}
  };

  const [munichMapContainer, setMunichMapContainer] =
    useState<HTMLDivElement | null>(null);
  const munichMapRef = useCallback(
    (node: React.SetStateAction<HTMLDivElement | null>) => {
      node && setMunichMapContainer(node);
    },
    []
  );
  const munichMapOptions = {
    ...basicMapOptions,
    center: {lat: 48.137154, lng: 11.576124}
  };

  const [sanFranciscoMapContainer, setSanFranciscoMapContainer] =
    useState<HTMLDivElement | null>(null);
  const sanFranciscoMapRef = useCallback(
    (node: React.SetStateAction<HTMLDivElement | null>) => {
      node && setSanFranciscoMapContainer(node);
    },
    []
  );
  const sanFranciscoMapOptions = {
    ...basicMapOptions,
    center: {lat: 37.773972, lng: -122.431297}
  };

  return (
    <div id="grid">
      <GoogleMapsProvider
        mapContainer={hamburgMapContainer}
        mapOptions={hamburgMapOptions}
        {...googleMapsAPIParameters}>
        <React.StrictMode>
          <MapCanvas ref={hamburgMapRef} />
          {/** The `useGoogleMap()` hook called inside this provider will return the map showing Hamburg. */}
        </React.StrictMode>
      </GoogleMapsProvider>

      <GoogleMapsProvider
        mapContainer={munichMapContainer}
        mapOptions={munichMapOptions}
        {...googleMapsAPIParameters}>
        <React.StrictMode>
          <MapCanvas ref={munichMapRef} />
          {/** The `useGoogleMap()` hook called inside this provider will return the map showing Munich. */}
        </React.StrictMode>
      </GoogleMapsProvider>

      <GoogleMapsProvider
        mapContainer={sanFranciscoMapContainer}
        mapOptions={sanFranciscoMapOptions}
        {...googleMapsAPIParameters}>
        <React.StrictMode>
          <MapCanvas ref={sanFranciscoMapRef} />
          {/** The `useGoogleMap()` hook called inside this provider will return the map showing San Francisco. */}
        </React.StrictMode>
      </GoogleMapsProvider>
    </div>
  );
};

export default App;
