# Google Maps React Hooks
[![npm version](https://img.shields.io/npm/v/@ubilabs/google-maps-react-hooks)](https://www.npmjs.com/package/@ubilabs/google-maps-react-hooks) [![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ubilabs/google-maps-react-hooks/blob/develop/LICENSE)

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

```sh
npm install @ubilabs/google-maps-react-hooks -D
```

## Usage

Import the `GoogleMapProvider` and wrap it around your components.
Make sure all components that should have access to the Google Maps map instance are nested inside the `GoogleMapProvider`.

If you still can't see a map on your page, make sure that your `<MapCanvas>` component has a `height` CSS property. By default it will have a `height: 0`.

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
  onLoad={(map) => map.setZoom(4)}
>
  {children}
</GoogleMapProvider>
```

### Properties

Properties that can be passed to the `GoogleMapsProvider` that are either the container to hold the map instance or [Maps JavaScript API URL Parameters](https://developers.google.com/maps/documentation/javascript/url-params).

```TypeScript
interface GoogleMapProviderProps {
  googleMapsAPIKey: string;
  mapContainer?: HTMLElement | null;
  options?: google.maps.MapOptions;
  libraries?: string[];
  language?: string;
  region?: string;
  version?: string;
  authReferrerPolicy?: string;
  onLoad?: (map: google.maps.Map) => void;
}
```
- - - -
__googleMapsAPIKey__ (_compulsary property_)

  The Google Maps JavaScript API Key.
  ```Typescript
  googleMapsAPIKey: string;
  ```

See: [Use API Key](https://developers.google.com/maps/documentation/embed/get-api-key)

- - - -

__mapContainer__ (_optional property_)

A reference to the HTML element that displays the map.
Without the mapContainer provided, no visual map will be displayed.

```Typescript
mapContainer?: HTMLElement | null;
```

_Example:_

The mapContainer will be passed to the `mapProvider` and `mapCanvas component` in the following way:

```TypeScript
function App() {
  const [mapContainer, setMapContainer] = useState(null);
  
  const mapRef = useCallback((node) => {
    node && setMapContainer(node);
  }, []);

  return (
    <GoogleMapProvider
      googleMapsAPIKey="my Google Maps API key"
      mapContainer={mapContainer}
    >
      <React.StrictMode>
        <MapCanvas ref={mapRef} />
      </React.StrictMode>
    </GoogleMapProvider>
  );
}
```

See: [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)

- - - -

__options__ (_optional property_)

The Google Maps MapOptions.

```Typescript
options?: google.maps.MapOptions;
```

_Example:_

```Typescript
const mapOptions = {
  center: {lat: 53.5582447, lng: 9.647645},
  zoom: 6,
  disableDefaultUI: true,
};
```

See: [MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)

**NOTE**: If the `mapOptions` are not provided here, the map will not be displayed until they are set.

_Example:_ 

MapOptions can be set later in another component in the following way:

```Typescript
import {useGoogleMap} from '@ubilabs/google-maps-react-hooks';

const mapOptions = {
  center: {lat: 53.5582447, lng: 9.647645},
  zoom: 6,
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: {
    position: 3 // Right top
  }
};

const {map} = useGoogleMap();

map?.setOptions(mapOptions);
```

- - - -

__libraries__ (_optional property_)

Additional Google Maps libraries to load ('drawing', 'geometry', 'places' or 'visualization').

```Typescript
libraries?: string[];
```

See: [Libraries](https://developers.google.com/maps/documentation/javascript/libraries)

- - - -

__languages__ (_optional property_)

By default Google Maps will use the preferred region from the browser setting. This is the property to set it manually.

```Typescript
language?: string;
```

See: [Localization](https://developers.google.com/maps/documentation/javascript/localization)

- - - -

__region__ (_optional property_)

By default Google Maps will use the preferred region from the browser setting. This is the property to set it manually.

```Typescript
region?: string;
```

See: [Localization](https://developers.google.com/maps/documentation/javascript/localization)

- - - -

__version__ (_optional property_)

Use this parameter to specify a version.

```Typescript
version?: string;
```

See: [Versions](https://developers.google.com/maps/documentation/javascript/versions)

- - - -

__authReferrerPolicy__ (_optional property_)

Use this parameter to set auth_referrer_policy=origin when an URL on the same origin uses the API Key, to limit the amount of data sent when authorizing requests.

```Typescript
authReferrerPolicy?: string;
```

See: [auth_referrer_policy](https://developers.google.com/maps/documentation/javascript/url-params)

- - - -

__onLoad__ (_optional property_)

A callback function that is called, when the map is loaded.

```Typescript
onLoad?: (map: google.maps.Map) => void;
```

_Example:_

```Typescript
<GoogleMapProvider
  googleMapsAPIKey="my Google Maps API key"
  onLoad={(map) => map.setZoom(4)}
>
  ...
</GoogleMapProvider>
```

- - - -

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

### useMaxZoomService

React hook to use the [Maximum Zoom Imagery Service](https://developers.google.com/maps/documentation/javascript/maxzoom) in any component.

#### Usage

```tsx
import React, {useEffect} from 'react';
import {useMaxZoomService} from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const maxZoomService = useMaxZoomService();
  const location = /** google.maps.LatLng */;

  useEffect(() => {
    maxZoomService?.getMaxZoomAtLatLng(
      location,
      (result: google.maps.MaxZoomResult) => {
        // Do something with result
      }
    );
  }, [location]);

  return (...);
};
```

#### Return value

Returns the [`MaxZoomService`](google.maps.places.MaxZoomService) class to use directly.

```TypeScript
google.maps.places.MaxZoomService
```

## Publish (only for maintainers)

`npm publish --access public`
