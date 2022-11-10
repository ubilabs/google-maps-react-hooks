# Google Maps React Hooks

[![npm version](https://img.shields.io/npm/v/@ubilabs/google-maps-react-hooks)](https://www.npmjs.com/package/@ubilabs/google-maps-react-hooks) [![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## Description

This is a JavaScript library to easily implement a Google Maps map into your React application. It comes with a collection of React hooks to access the Google Maps map instance all over your components and to use some of the Google Maps [Services](https://developers.google.com/maps/documentation/javascript#services) or [Libraries](https://developers.google.com/maps/documentation/javascript#libraries).

#### Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Library](#library)
- [Basic Google Map Setup](#basic-google-map-setup)
- [Hooks](#hooks)
  - [Hooks Overview](#hooks-overview)
  - [Hooks Example Setup](#hooks-example-setup)
- [Examples](#examples)
  - [Examples Overview](#examples-overview)
- [Development](#development-only-for-maintainers)
  - [Contribution](#contribution)
  - [Quick Start](#quick-start)

## Requirements

You need to have React [16.8.0](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) or later installed to use the Hooks API.

## Installation

```sh
npm install @ubilabs/google-maps-react-hooks -D
```

## Library

The full Google Maps React Hooks library can be found in the [library directory](./library).

## Basic Google Map Setup

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

## Hooks

All hooks can be find [here](./library/src/hooks/). Please checkout the [documentation](./library/docs) for each hook and have a look at the [examples directory](./examples) to see how each hook can be implemented.

### Hooks Overview

- [useGoogleMap](./library/docs/useGoogleMap.md)
- [useDirectionsService](./library/docs/useDirectionsService.md)
- [useDistanceMatrixService](./library/docs/useDistanceMatrixService.md)
- [useElevationService](./library/docs/useElevationService.md)
- [useGeocodingService](./library/docs/useGeocodingService.md)
- [useMaxZoomService](./library/docs/useMaxZoomService.md)
- [usePlacesService](./library/docs/usePlacesService.md)
- [useAutocomplete](./library/docs/useAutocomplete.md)
- [useAutocompleteService](./library/docs/useAutocompleteService.md)

### Hooks Example Setup

**useGeocodingService**

```tsx
import React from 'react';
import {useGeocodingService} from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const geocoder = useGeocodingService();

  // Do something with the geocoder

  return (...);
};
```

**useAutocomplete**

```tsx
import React, {useRef, useState} from 'react';
import {useAutocomplete} from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const onPlaceChanged = place => {
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

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  return (
    <input ref={inputRef} value={inputValue} onChange={handleInputChange} />
  );
};
```

## Examples

Explore our [examples directory on GitHub](./examples) for full implementation examples.

### Examples Overview

- [Basic Google Map](./examples/basic-google-map)
- [Google Map with Markers](./examples/google-map-with-markers)
- [Multiple Google Maps](./examples/multiple-google-maps)
- [Directions Service](./examples/directions-service)
- [Distance Matrix Service](./examples/distance-matrix-service)
- [Elevation Service](./examples/elevation-service)
- [Geocoding Service](./examples/geocoding-service)
- [Maximum Zoom Imagery Service](./examples/max-zoom-service)
- [Places Autocomplete Service](./examples/places-autocomplete-service)
- [Places Autocomplete Widget](./examples/places-autocomplete-widget)
- [Places Service](./examples/places-service)
- [Places Service With Element](./examples/places-service-with-element)
- [Street View Panorama Map](./examples/street-view-panorama-map)
- [Street View Panorama With Element](./examples/street-view-panorama-with-element)

## Development (only for Maintainers)

### Contribution

We are happy about your contribution. Please checkout the following guide to get started:
[Contribution Guide](./CONTRIBUTING.md).

Also, make sure to follow our [Coding Conventions](./CONVENTIONS.md) when making commits.

### Quick Start

Clone the repository and run

```sh
npm install
```

in the project root to install all dependencies.

To develop the Google Maps React Hooks library, start the project locally with

```sh
npm run start:library
```
