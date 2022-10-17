import {useMemo} from 'react';

import useGoogleMap from './map-instance';

/**
 * Hook to get Distance Matrix Service instance
 */
const useDistanceMatrix =
  (): google.maps.DistanceMatrixService | null => {
    const {map} = useGoogleMap();

    // Creates a Distance Matrix Service instance
    const distanceMatrixService =
      useMemo<google.maps.DistanceMatrixService | null>(() => {
        // Wait for map to be initialized
        if (!map) {
          return null;
        }

        if (!google.maps.DistanceMatrixService) {
          throw Error('Distance Matrix library missing.');
        }

        return new google.maps.DistanceMatrixService();
      }, [map]);

    return distanceMatrixService;
  };

export default useDistanceMatrix;
