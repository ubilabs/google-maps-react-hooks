# Google Maps React Hooks

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ubilabs/google-maps-react-hooks/tree/main/LICENSE)

## Description

This is a JavaScript library to easily implement a Google Maps map into your React application. It comes with a collection of React hooks to access the Google Maps map instance all over your components and to use some of the Google Maps [Services](https://developers.google.com/maps/documentation/javascript#services) or [Libraries](https://developers.google.com/maps/documentation/javascript#libraries).

#### Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Map Usage](#map-usage)
- Documentation
  - [GoogleMapsProvider](./docs/GoogleMapsProvider.md)
  - Hooks
    - [useGoogleMap](./docs/useGoogleMap.md)
    - [useDirectionsService](./docs/useDirectionsService.md)
    - [useDistanceMatrixService](./docs/useDistanceMatrixService.md)
    - [useElevationService](./docs/useElevationService.md)
    - [useGeocodingService](./docs/useGeocodingService.md)
    - [useMaxZoomService](./docs/useMaxZoomService.md)
    - [usePlacesService](./docs/usePlacesService.md)
    - [useAutocomplete](./docs/useAutocomplete.md)
    - [useAutocompleteService](./docs/useAutocompleteService.md)
- [Examples](https://github.com/ubilabs/google-maps-react-hooks/tree/main/examples)
  - [Basic Google Map](../examples/basic-google-map)
  - [Google Map with Markers](../examples/google-map-with-markers)
  - [Multiple Google Maps](../examples/multiple-google-maps)
  - [Directions Service](../examples/directions-service)
  - [Distance Matrix Service](../examples/distance-matrix-service)
  - [Elevation Service](../examples/elevation-service)
  - [Geocoding Service](../examples/geocoding-service)
  - [Maximum Zoom Imagery Service](../examples/max-zoom-service)
  - [Places Autocomplete Service](../examples/places-autocomplete-service)
  - [Places Autocomplete Widget](../examples/places-autocomplete-widget)
  - [Places Service](../examples/places-service)
  - [Places Service With Element](../examples/places-service-with-element)
  - [Street View Panorama Map](../examples/street-view-panorama-map)
  - [Street View Panorama With Element](../examples/street-view-panorama-with-element)

## Requirements

You need to have React [16.8.0](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) or later installed to use the Hooks API.

## Installation

```sh
npm install @ubilabs/google-maps-react-hooks -D
```

**NOTE FOR WINDOWS USERS**:
We are using [cross-env](https://github.com/kentcdodds/cross-env) for environment variables to work on all platforms. There is an issue that `npm` uses `cmd` by default. The workaround is to add `script-shell` to `powershell` in your `.npmrc`. Please follow [this setup](https://github.com/kentcdodds/cross-env/issues/192#issuecomment-513341729) to make it work.

## Map Usage

Import the `GoogleMapsProvider` and wrap it around your components.
Make sure all components that should have access to the Google Maps map instance are nested inside the `GoogleMapsProvider`.

If you still can't see a map on your page, make sure that your map container has a `height` CSS property (by default it usually has no height) and that a `center` and `zoom` was set for your map.

```tsx
import React, {useState, useCallback, forwardRef} from 'react';
import {GoogleMapsProvider} from '@ubilabs/google-maps-react-hooks';

function App() {
  const [mapContainer, setMapContainer] = useState(null);
  const mapRef = useCallback(node => {
    node && setMapContainer(node);
  }, []);

  const mapOptions = {
    // Add your map options here
    // `center` and `zoom` are required for every map to be displayed
    center: {lat: 53.5582447, lng: 9.647645},
    zoom: 6
  };

  return (
    <GoogleMapsProvider
      googleMapsAPIKey="YOUR API KEY HERE"
      mapContainer={mapContainer}
      mapOptions={mapOptions}>
      <React.StrictMode>
        <div ref={ref} style={{height: '100%'}} />
      </React.StrictMode>
    </GoogleMapsProvider>
  );
}

export default App;
```

The `GoogleMapsProvider` makes the Google Maps map instance available to any nested components with the `useGoogleMap` hook.

```tsx
import React from 'react';
import {useGoogleMap} from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const map = useGoogleMap();

  // Do something with the Google Maps map instance

  return (...);
};
```

## Examples

Explore our [examples directory on GitHub](https://github.com/ubilabs/google-maps-react-hooks/tree/main/examples) for full implementation examples.
