# `useGoogleMap` Hook

React hook to get the [Google Maps map](https://developers.google.com/maps/documentation/javascript/reference/map#Map) instance.

## Usage

```tsx
import React from 'react';
import {useGoogleMap} from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const map = useGoogleMap();

  // Do something with the Google Maps map instance

  return (...);
};
```

## Return value

Returns a [Google Maps map instance](https://developers.google.com/maps/documentation/javascript/reference/map#Map) to use directly.
Type: `GoogleMapContextType`:

```TypeScript
google.maps.Map
```
