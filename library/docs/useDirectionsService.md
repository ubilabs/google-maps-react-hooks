# `useDirectionsService` Hook

React hook to use the [Google Maps Directions Service](https://developers.google.com/maps/documentation/javascript/reference/directions) in any component.

## Usage

```jsx
import React from 'react';
import {useDirectionsService} from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const {
    directionsService,
    directionsRenderer,
    findAndRenderRoute,
    setRouteIndex
  } = useDirectionsService(directionsOptions);

  // Do something with the directions

  return (...);
};
```

## Parameters

### DirectionsProps

Pass in whether to render on a Google Maps map or not and the [DirectionsRendererOptions](https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions).

```TypeScript
interface DirectionsServiceProps {
  renderOnMap?: boolean;
  renderOptions?: google.maps.DirectionsRendererOptions;
}
```

## Return value

Returns an object with the following elements:
- [`directionsService`](https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsService) instance
- [`directionsRenderer`](https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRenderer) instance
- `findRoute` function, which returns a route
- `findAndRenderRoute` function, which also renders the route on the map
- `renderRouteOfIndex` function, which can be used to render a specific route of `google.maps.DirectionsResult` returned by `findRoute` or `findAndRenderRoute`

```TypeScript
interface DirectionsServiceHookReturns {
  directionsService: google.maps.DirectionsService | null;
  directionsRenderer: google.maps.DirectionsRenderer | null;
  findRoute: ((request: google.maps.DirectionsRequest) => Promise<google.maps.DirectionsResult>) | null;
  findAndRenderRoute: ((request: google.maps.DirectionsRequest) => Promise<google.maps.DirectionsResult>) | null;
  renderRouteOfIndex: (index: number) => void;
}
```

**NOTE**:
When using `findAndRenderRoute`, the `renderOnMap` property must be set to `true`.
