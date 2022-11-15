import {useContext} from 'react';

import {GoogleMapsContext} from '../google-maps-provider';

/**
 * Hook to get global map instance
 */
export const useGoogleMap = (): google.maps.Map | undefined =>
  useContext(GoogleMapsContext).map;
