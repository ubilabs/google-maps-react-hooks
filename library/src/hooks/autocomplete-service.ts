import {useMemo} from 'react';

import {useGoogleMap} from './map-instance';

/**
 * Hook to get Google Maps Autocomplete Service instance
 */
export const useAutocompleteService = (): google.maps.places.AutocompleteService | null => {
  const {map} = useGoogleMap();

  // Creates an Autocomplete Service instance
  const autocompleteService = useMemo<google.maps.places.AutocompleteService | null>(() => {
    // Wait for map to be initialized
    if (!map) {
      return null;
    }

    if (!google.maps.places) {
      throw Error(
        "Places library missing. Add 'places' to the libraries array of GoogleMapProvider."
      );
    }

    return new google.maps.places.AutocompleteService();
  }, [map]);

  return autocompleteService;
};
