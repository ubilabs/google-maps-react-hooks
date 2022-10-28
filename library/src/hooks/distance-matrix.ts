import {useContext, useMemo} from 'react';

import {GoogleMapsContext} from '../google-maps-provider';

/**
 * Hook to get Distance Matrix Service instance
 */
export const useDistanceMatrix =
  (): google.maps.DistanceMatrixService | null => {
    const {googleMapsAPIIsLoaded} = useContext(GoogleMapsContext);

    // Creates a Distance Matrix Service instance
    const distanceMatrixService =
      useMemo<google.maps.DistanceMatrixService | null>(() => {
        // Wait for Google Maps API to be loaded
        if (!googleMapsAPIIsLoaded) {
          return null;
        }

        if (!google.maps.DistanceMatrixService) {
          throw Error('Distance Matrix library missing.');
        }

        return new google.maps.DistanceMatrixService();
      }, [googleMapsAPIIsLoaded]);

    return distanceMatrixService;
  };
