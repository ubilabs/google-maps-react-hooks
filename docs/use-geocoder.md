# useGeocoder

React hook to use the [Google Maps geocoder](https://developers.google.com/maps/documentation/javascript/reference/geocoder) in any component.

## Usage

```jsx
import React from 'react';
import { useGeocoder } from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const geocoder = useGeocoder();

  // Do something with the geocoder

  return (...);
};
```

## Return value

Returns the [`Geocoder`](https://developers.google.com/maps/documentation/javascript/reference/geocoder) class to use directly.

```TypeScript
google.maps.Geocoder
```
