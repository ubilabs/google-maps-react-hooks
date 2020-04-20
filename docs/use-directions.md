# useDirections

React hook to use the [Google Maps Directions](https://developers.google.com/maps/documentation/javascript/reference/directions) in any component.

## Usage

```jsx
import React from 'react';
import { useDirections } from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const { directionsService, findAndRenderRoute, setRouteIndex } = useDirections(directionsOptions);

  // Do something with the directions

  return (...);
};
```

## Parameters

### DirectionsProps

Pass in whether to render on a Google Maps map or not and the [DirectionsRendererOptions](https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions).

```TypeScript
interface DirectionsProps {
  renderOnMap?: boolean;
  renderOptions?: google.maps.DirectionsRendererOptions;
}
```

## Return value

Returns the [`directionsService`](https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsService) to use directly, `findRoute` which returns a route and `findAndRenderRoute` which also renders the route on the map. When using `findAndRenderRoute`, the `renderOnMap` prop should be set to `true`.

```TypeScript
interface DirectionsHookReturns {
  directionsService: google.maps.DirectionsService | null;
  findRoute: ((request: google.maps.DirectionsRequest) => Promise<google.maps.DirectionsResult>) | null;
  findAndRenderRoute: ((request: google.maps.DirectionsRequest) => Promise<google.maps.DirectionsResult>) | null;
}
```
