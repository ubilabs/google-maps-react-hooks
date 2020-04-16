import {useMemo} from 'react';

import useGoogleMap from './map-instance';

/**
 * Hook to get Google Maps Places Service instance
 */
const usePlacesService = (): google.maps.places.PlacesService | null => {
  const {map} = useGoogleMap();

  // Creates a Places Service instance
  const placesService = useMemo<google.maps.places.PlacesService | null>(() => {
    // Wait for map to be initialized
    if (!map) {
      return null;
    }

    if (!google.maps.places) {
      throw Error(
        "Places library missing. Add 'places' to the libraries array of GoogleMapProvider."
      );
    }

    return new google.maps.places.PlacesService(map);
  }, [map]);

  return placesService;
};

export default usePlacesService;
