import {useContext, useMemo} from 'react';

import {GoogleMapsContext} from '../google-maps-provider';

/**
 * Hook to get Max Zoom Service instance
 */
export const useMaxZoomService = (): google.maps.MaxZoomService | null => {
  const {googleMapsAPIIsLoaded} = useContext(GoogleMapsContext);

  // Creates a Max Zoom Service instance
  const maxZoomService = useMemo<google.maps.MaxZoomService | null>(() => {
    // Wait for Google Maps API to be loaded
    if (!googleMapsAPIIsLoaded) {
      return null;
    }

    return new google.maps.MaxZoomService();
  }, [googleMapsAPIIsLoaded]);

  return maxZoomService;
};
