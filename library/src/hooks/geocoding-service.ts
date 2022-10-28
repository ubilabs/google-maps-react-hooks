import {useContext, useMemo} from 'react';

import {GoogleMapsContext} from '../google-maps-provider';

/**
 * Hook to get Google Maps Geocoder instance
 */
export const useGeocodingService = (): google.maps.Geocoder | null => {
  const {googleMapsAPIIsLoaded} = useContext(GoogleMapsContext);

  // Creates a Geocoder instance
  const geocoder = useMemo<google.maps.Geocoder | null>(() => {
    // Wait for Google Maps API to be loaded
    if (!googleMapsAPIIsLoaded) {
      return null;
    }

    return new google.maps.Geocoder();
  }, [googleMapsAPIIsLoaded]);

  return geocoder;
};
