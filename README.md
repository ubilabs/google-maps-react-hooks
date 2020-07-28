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

Import the `GoogleMapProvider` and wrap it around your components.
Make sure all components that should have access to the Google Maps map instance
are nested inside of the `GoogleMapProvider`.

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
      mapIds={['<your-mapstyle-id>']}
      language={'de'}
      region={'DE'}
      onLoad={(map) => map.setZoom(4)}
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

Component to wrap around the code where the map should be available.

```jsx
<GoogleMapProvider
  googleMapsAPIKey="my Google Maps API key"
  mapContainer={mapContainer}
  options={mapOptions}
  libraries={['places']}
  mapIds={['<your-mapstyle-id>']}
  language={'de'}
  region={'DE'}
  onLoad={(map) => map.setZoom(4)}
>
  {children}
</GoogleMapProvider>
```

### Properties

```TypeScript
interface GoogleMapProviderProps {
  children: React.ReactElement;
  googleMapsAPIKey: string;
  mapContainer?: HTMLElement | null;
  options: google.maps.MapOptions;
  libraries?: string[];
  language?: string;
  region?: string;
  mapIds?: string[];
  onLoad?: (map: google.maps.Map) => void;
}
```

## Hooks

### useGoogleMap

React hook to get the map instance.

#### Usage

```jsx
import React from 'react';
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const { map } = useGoogleMap();

  // Do something with the Google Maps map instance

  return (...);
};
```

#### Return value

Type: `GoogleMapContextType`:

```TypeScript
{
  loading: boolean,
  map: google.maps.Map
}
```

The [Google Maps map](https://developers.google.com/maps/documentation/javascript/reference/map#Map) instance is returned.

### useAutocomplete

React hook to use the [Google Maps autocomplete](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete) in any component.

#### Usage

```jsx
import React, { useRef, useState } from 'react';
import { useAutocomplete } from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const onPlaceChanged = (place) => {
    if (place) {
      setInputValue(place.formatted_address || place.name);
    }

    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged
  });

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return <input
    ref={inputRef}
    value={inputValue}
    onChange={handleInputChange}
  />
};
```

#### Parameters

##### AutocompleteProps

Needs a reference to an Input field, some optional [AutocompleteOptions](https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions) and a callback for when a place got changed.

```TypeScript
interface AutocompleteProps {
  inputField: HTMLInputElement | null;
  options?: google.maps.places.AutocompleteOptions;
  onPlaceChanged: (place: google.maps.places.PlaceResult) => void;
}
```

### useDirections

React hook to use the [Google Maps Directions](https://developers.google.com/maps/documentation/javascript/reference/directions) in any component.

#### Usage

```jsx
import React from 'react';
import { useDirections } from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const { directionsService, findAndRenderRoute, setRouteIndex } = useDirections(directionsOptions);

  // Do something with the directions

  return (...);
};
```

#### Parameters

##### DirectionsProps

Pass in whether to render on a Google Maps map or not and the [DirectionsRendererOptions](https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions).

```TypeScript
interface DirectionsProps {
  renderOnMap?: boolean;
  renderOptions?: google.maps.DirectionsRendererOptions;
}
```

#### Return value

Returns the [`directionsService`](https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsService) to use directly, `findRoute` which returns a route and `findAndRenderRoute` which also renders the route on the map. When using `findAndRenderRoute`, the `renderOnMap` prop should be set to `true`. `renderRouteOfIndex` can be used to render a specific route of `google.maps.DirectionsResult` returned by `findRoute` or `findAndRenderRoute`.

```TypeScript
interface DirectionsHookReturns {
  directionsService: google.maps.DirectionsService | null;
  findRoute: ((request: google.maps.DirectionsRequest) => Promise<google.maps.DirectionsResult>) | null;
  findAndRenderRoute: ((request: google.maps.DirectionsRequest) => Promise<google.maps.DirectionsResult>) | null;
  renderRouteOfIndex: (index: number) => void;
}
```

### useGeocoder

React hook to use the [Google Maps geocoder](https://developers.google.com/maps/documentation/javascript/reference/geocoder) in any component.

#### Usage

```jsx
import React from 'react';
import { useGeocoder } from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const geocoder = useGeocoder();

  // Do something with the geocoder

  return (...);
};
```

#### Return value

Returns the [`Geocoder`](https://developers.google.com/maps/documentation/javascript/reference/geocoder) class to use directly.

```TypeScript
google.maps.Geocoder
```

### usePlacesService

React hook to use the [Google Maps Places Service](https://developers.google.com/maps/documentation/javascript/reference/places-service) in any component.

#### Usage

When initializing the `<GoogleMapProvider>`, include the places library like this: `libraries={['places']}`.

```jsx
import React from 'react';
import { usePlacesService } from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const placesServie = usePlacesService();

  // Do something with the places Service

  return (...);
};
```

#### Return value

Returns the [`PlacesService`](google.maps.places.PlacesService) class to use directly.

```TypeScript
google.maps.places.PlacesService
```

## Publish

To publish new versions to the Github package registry, follow [this guide here](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages).

Basically, do this:

* create a personal token for Github
* create `~/.npmrc` with this content: `//npm.pkg.github.com/:_authToken=TOKEN`
* login with this command: `npm login --registry=https://npm.pkg.github.com`
