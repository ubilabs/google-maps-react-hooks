# Google Maps React Hooks

## Description

This is a JavaScript library to easily implement a Google Maps map into your React application. It comes with a collection of React hooks to access the Google Maps map instance all over your components and to handle some common interactions with the map.

#### Table of contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [GoogleMapProvider](#googlemapprovider)
- [Hooks](#hooks)
  - [useGoogleMap](#usegooglemap)
  - [useAutocomplete](#useautocomplete)
  - [useDirections](#usedirections)
  - [useGeocoder](#usegeocoder)
  - [usePlacesService](#useplacesservice)
- [Publish](#publish)

## Requirements

You need to have React [16.8.0](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) or later installed to use the Hooks API.

## Installation

This package is hosted in the private [Github package registry](https://github.com/orgs/ubilabs/packages). To use this, include a `.npmrc` file in your project with the following content:

```
registry=https://npm.pkg.github.com/ubilabs
```

npm will then use Github as a proxy to install packages. Now let’s add the package to our project:

```sh
npm install @ubilabs/google-maps-react-hooks -D
```

## Usage

Import the `MapProvider` and wrap it around your components.
Make sure all components that should have access to the Mapbox map instance
are nested inside of the `MapProvider`.

```jsx
import React, { useState, useCallback, forwardRef } from 'react';
import { GoogleMapProvider } from '@ubilabs/google-maps-react-hooks';

const MapCanvas = React.forwardRef((props, ref) => (
  <div ref={ref} />
));

function App() {
  const [mapContainer, setMapContainer] = useState(null);
  const mapRef = useCallback((node) => {
    node && setMapContainer(node);
  }, []);

  return (
    <GoogleMapProvider
      googleMapsAPIKey="my Google Maps API key"
      mapContainer={mapContainer}
      options={mapOptions}
      libraries={['places']}
    >
      <React.StrictMode>
        <MapCanvas ref={mapRef} />
      </React.StrictMode>
    </GoogleMapProvider>
  );
}

export default App;
```

The `GoogleMapProvider` makes the Google Maps map instance available to any nested components with the `useGoogleMap` hook.

```jsx
import React from 'react';
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const { map } = useGoogleMap();

  // Do something with the Google Maps map instance

  return (...);
};
```

## GoogleMapProvider

A provider component to wrap around all components that should have access to the Google Maps map instance. ([read more](docs/google-map-provider.md))

## Hooks

### useGoogleMap

React hook to get the map instance. ([read more](docs/use-google-map.md))

### useAutocomplete

React hook to use the [Google Maps autocomplete](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete) in any component. ([read more](docs/use-autocomplete.md))

### useDirections

React hook to use the [Google Maps Directions](https://developers.google.com/maps/documentation/javascript/reference/directions) in any component. ([read more](docs/use-directions.md))

### useGeocoder

React hook to use the [Google Maps geocoder](https://developers.google.com/maps/documentation/javascript/reference/geocoder) in any component. ([read more](docs/use-geocoder.md))

### usePlacesService

React hook to use the [Google Maps Places Service](https://developers.google.com/maps/documentation/javascript/reference/places-service) in any component. ([read more](docs/use-places-service.md))

## Publish

To publish new versions to the Github package registry, follow [this guide here](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages).

Basically, do this:

* create a personal token for Github
* create `~/.npmrc` with this content: `//npm.pkg.github.com/:_authToken=TOKEN`
* login with this command: `npm login --registry=https://npm.pkg.github.com`
