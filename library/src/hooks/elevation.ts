import {useContext, useMemo} from 'react';

import {GoogleMapsContext} from '../google-maps-provider';

/**
 * Hook to get Elevation Service instance
 */
export const useElevationService = (): google.maps.ElevationService | null => {
  const {googleMapsAPIIsLoaded} = useContext(GoogleMapsContext);

  // Creates an Elevation Service instance
  const elevationService = useMemo<google.maps.ElevationService | null>(() => {
    // Wait for Google Maps API to be loaded
    if (!googleMapsAPIIsLoaded) {
      return null;
    }

    return new google.maps.ElevationService();
  }, [googleMapsAPIIsLoaded]);

  return elevationService;
};
