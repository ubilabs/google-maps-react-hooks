import {useContext, useMemo} from 'react';

import {GoogleMapsContext} from '../google-maps-provider';

/**
 * Hook to get Google Maps Autocomplete Service instance
 */
export const useAutocompleteService =
  (): google.maps.places.AutocompleteService | null => {
    const {googleMapsAPIIsLoaded} = useContext(GoogleMapsContext);

    // Creates an Autocomplete Service instance
    const autocompleteService =
      useMemo<google.maps.places.AutocompleteService | null>(() => {
        // Wait for Google Maps API to be loaded
        if (!googleMapsAPIIsLoaded) {
          return null;
        }

        if (!google.maps.places) {
          throw Error(
            "Places library missing. Add 'places' to the libraries array of GoogleMapsProvider."
          );
        }

        return new google.maps.places.AutocompleteService();
      }, [googleMapsAPIIsLoaded]);

    return autocompleteService;
  };
