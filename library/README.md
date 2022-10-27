# Google Maps React Hooks
[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ubilabs/google-maps-react-hooks/tree/main/LICENSE)

## Description

This is a JavaScript library to easily implement a Google Maps map into your React application. It comes with a collection of React hooks to access the Google Maps map instance all over your components and to use some of the Google Maps [Services](https://developers.google.com/maps/documentation/javascript#services) or [Libraries](https://developers.google.com/maps/documentation/javascript#libraries).

#### Table of contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Map Usage](#map-usage)
- Documentation
  - [GoogleMapProvider](https://github.com/ubilabs/google-maps-react-hooks/tree/main/library/docs/GoogleMapProvider.md)
  - Hooks
    - [useGoogleMap](https://github.com/ubilabs/google-maps-react-hooks/tree/main/library/docs/useGoogleMap.md)
    - [useDirections](https://github.com/ubilabs/google-maps-react-hooks/tree/main/library/docs/useDirections.md)
    - [useDistanceMatrix](https://github.com/ubilabs/google-maps-react-hooks/tree/main/library/docs/useDistanceMatrix.md)
    - [useElevationService](https://github.com/ubilabs/google-maps-react-hooks/tree/main/library/docs/useElevationService.md)
    - [useGeocoder](https://github.com/ubilabs/google-maps-react-hooks/tree/main/library/docs/useGeocoder.md)
    - [useMaxZoomService](https://github.com/ubilabs/google-maps-react-hooks/tree/main/library/docs/useMaxZoomService.md)
    - [usePlacesService](https://github.com/ubilabs/google-maps-react-hooks/tree/main/library/docs/usePlacesService.md)
    - [useAutocomplete](https://github.com/ubilabs/google-maps-react-hooks/tree/main/library/docs/useAutocomplete.md)
- [Examples](https://github.com/ubilabs/google-maps-react-hooks/tree/main/examples)
  - [Basic Google Map](https://github.com/ubilabs/google-maps-react-hooks/tree/main/examples/basic-google-map)
  - [Google Map with Markers](https://github.com/ubilabs/google-maps-react-hooks/tree/main/examples/google-map-with-markers)
  - [Directions Service](https://github.com/ubilabs/google-maps-react-hooks/tree/main/examples/directions)
  - [Distance Matrix Service](https://github.com/ubilabs/google-maps-react-hooks/tree/main/examples/distance-matrix)
  - [Geocoding Service](https://github.com/ubilabs/google-maps-react-hooks/tree/main/examples/geocoding)
  - [Places Service](https://github.com/ubilabs/google-maps-react-hooks/tree/main/examples/places)
  - [Places Autocomplete Service](https://github.com/ubilabs/google-maps-react-hooks/tree/main/examples/places-autocomplete)

## Requirements

You need to have React [16.8.0](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) or later installed to use the Hooks API.

## Installation

```sh
npm install @ubilabs/google-maps-react-hooks -D
```

## Map Usage

Import the `GoogleMapProvider` and wrap it around your components.
Make sure all components that should have access to the Google Maps map instance are nested inside the `GoogleMapProvider`.

If you still can't see a map on your page, make sure that your map container has a `height` CSS property (by default it usually has no height) and that a `center` and `zoom` was set for your map.

```jsx
import React, {useState, useCallback, forwardRef} from 'react';
import {GoogleMapProvider} from '@ubilabs/google-maps-react-hooks';

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
    <GoogleMapProvider
      googleMapsAPIKey="YOUR API KEY HERE"
      mapContainer={mapContainer}
      options={mapOptions}>
      <React.StrictMode>
        <div ref={ref} style={{height: '100%'}} />
      </React.StrictMode>
    </GoogleMapProvider>
  );
}

export default App;
```

The `GoogleMapProvider` makes the Google Maps map instance available to any nested components with the `useGoogleMap` hook.

```jsx
import React from 'react';
import {useGoogleMap} from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const {map} = useGoogleMap();

  // Do something with the Google Maps map instance

  return (...);
};
```

## Examples

Explore our [examples directory on GitHub](https://github.com/ubilabs/google-maps-react-hooks/tree/main/examples) for full implementation examples.

