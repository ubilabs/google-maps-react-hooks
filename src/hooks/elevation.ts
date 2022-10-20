import {useMemo} from 'react';

import useGoogleMap from './map-instance';

/**
 * Hook to get Elevation Service instance
 */
const useElevationService = (): google.maps.ElevationService | null => {
  const {map} = useGoogleMap();

  // Creates an Elevation Service instance
  const elevationService =
    useMemo<google.maps.ElevationService | null>(() => {
      // Wait for map to be initialized
      if (!map) {
        return null;
      }

      return new google.maps.ElevationService();
    }, [map]);

  return elevationService;
};

export default useElevationService;
