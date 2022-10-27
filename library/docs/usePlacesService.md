# `usePlacesService` Hook

React hook to use the [Google Maps Places Service](https://developers.google.com/maps/documentation/javascript/reference/places-service) in any component.

## Usage

When initializing the `<GoogleMapProvider>`, include the places library like this: `libraries={['places']}`.

```jsx
import React from 'react';
import {usePlacesService} from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const placesServie = usePlacesService();

  // Do something with the places Service

  return (...);
};
```

## Return value

Returns a [`PlacesService`](google.maps.places.PlacesService) instance to use directly.

```TypeScript
google.maps.places.PlacesService
```
