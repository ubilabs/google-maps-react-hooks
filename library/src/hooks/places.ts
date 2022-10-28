import {useContext, useMemo} from 'react';

import {GoogleMapsContext} from '../google-maps-provider';

/**
 * Hook to get Google Maps Places Service instance
 */
export const usePlacesService = (): google.maps.places.PlacesService | null => {
  const {map} = useContext(GoogleMapsContext);

  // Creates a Places Service instance
  const placesService = useMemo<google.maps.places.PlacesService | null>(() => {
    // Wait for map to be initialized
    if (!map) {
      return null;
    }

    if (!google.maps.places) {
      throw Error(
        "Places library missing. Add 'places' to the libraries array of GoogleMapsProvider."
      );
    }

    return new google.maps.places.PlacesService(map);
  }, [map]);

  return placesService;
};
