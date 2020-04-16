import {useMemo} from 'react';

import useGoogleMap from './map-instance';

/**
 * Hook to get Google Maps Geocoder instance
 */
const useGeocoder = (): google.maps.Geocoder | null => {
  const {map} = useGoogleMap();

  // Creates a Geocoder instance
  const geocoder = useMemo<google.maps.Geocoder | null>(() => {
    // Wait for Google Maps API to be initialized
    if (!map) {
      return null;
    }

    return new google.maps.Geocoder();
  }, [map]);

  return geocoder;
};

export default useGeocoder;
