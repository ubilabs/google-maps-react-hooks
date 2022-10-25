import {useMemo} from 'react';

import {useGoogleMap} from './map-instance';

/**
 * Hook to get Max Zoom Service instance
 */
export const useMaxZoomService = (): google.maps.MaxZoomService | null => {
  const {map} = useGoogleMap();

  // Creates a Max Zoom Service instance
  const maxZoomService = useMemo<google.maps.MaxZoomService | null>(() => {
    // Wait for map to be initialized
    if (!map) {
      return null;
    }

    return new google.maps.MaxZoomService();
  }, [map]);

  return maxZoomService;
};
