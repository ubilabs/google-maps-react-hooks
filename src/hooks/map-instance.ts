import {useContext} from 'react';

import {GoogleMapContext, GoogleMapContextType} from '../map-provider';

/**
 * Hook to get global map instance
 */
export const useGoogleMap = (): GoogleMapContextType =>
  useContext(GoogleMapContext);
