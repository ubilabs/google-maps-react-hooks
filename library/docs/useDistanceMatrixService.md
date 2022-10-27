# `useDistanceMatrixService` Hook

React hook to use the [Google Maps Distance Matrix Service](https://developers.google.com/maps/documentation/javascript/distancematrix) in any component.

## Usage

```tsx
import React from 'react';
import {useDistanceMatrixService} from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const service = useDistanceMatrixService();

  service.getDistanceMatrix(request, response => {
    // Do something with the response
  }

  return (...);
};
```

## Return value

Returns a [`DistanceMatrixService`](google.maps.DistanceMatrixService) instance to use directly.

```TypeScript
google.maps.DistanceMatrixService
```
