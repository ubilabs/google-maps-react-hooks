# `useMaxZoomService` Hook

React hook to use the [Maximum Zoom Imagery Service](https://developers.google.com/maps/documentation/javascript/maxzoom) in any component.

## Usage

```tsx
import React, { useEffect } from 'react';
import { useMaxZoomService } from '@ubilabs/google-maps-react-hooks';

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

## Return value

Returns a [`MaxZoomService`](google.maps.places.MaxZoomService) instance to use directly.

```TypeScript
google.maps.places.MaxZoomService
```
