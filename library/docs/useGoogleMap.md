# `useGoogleMap` Hook

React hook to get the [Google Maps map](https://developers.google.com/maps/documentation/javascript/reference/map#Map) instance.

## Usage

```jsx
import React from 'react';
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const { map } = useGoogleMap();

  // Do something with the Google Maps map instance

  return (...);
};
```

## Return value

Type: `GoogleMapContextType`:

```TypeScript
{
  loading: boolean,
  map: google.maps.Map
}
```

The [Google Maps map](https://developers.google.com/maps/documentation/javascript/reference/map#Map) instance is returned.
