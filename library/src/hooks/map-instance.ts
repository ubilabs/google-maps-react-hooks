import {useContext} from 'react';

import {GoogleMapsMapContext} from '../google-maps-provider';

/**
 * Hook to get global map instance
 */
export const useGoogleMap = (): google.maps.Map | undefined =>
  useContext(GoogleMapsMapContext);
