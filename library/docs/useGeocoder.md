# `useGeocoder` Hook

React hook to use the [Google Maps Geocoding Service](https://developers.google.com/maps/documentation/javascript/geocoding) in any component.

## Usage

```jsx
import React from 'react';
import {useGeocoder} from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const geocoder = useGeocoder();

  // Do something with the geocoder

  return (...);
};
```

## Return value

Returns a [`Geocoder`](https://developers.google.com/maps/documentation/javascript/reference/geocoder) instance to use directly.

```TypeScript
google.maps.Geocoder
```
