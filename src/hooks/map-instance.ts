import {useContext} from 'react';

import {GoogleMapContext, GoogleMapContextType} from '../map-provider';

/**
 * Hook to get global map instance
 */
const useGoogleMap = (): GoogleMapContextType => useContext(GoogleMapContext);

export default useGoogleMap;
