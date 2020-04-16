import {useState, useRef, useEffect} from 'react';

import useGoogleMap from './map-instance';

interface AutocompleteProps {
  inputField: HTMLInputElement | null;
  options?: google.maps.places.AutocompleteOptions;
  onPlaceChanged: (place: google.maps.places.PlaceResult) => void;
}

/**
 * Hook to get a Google Maps Places Autocomplete instance
 * monitoring an input field
 */
const useAutocomplete = (
  props: AutocompleteProps
): google.maps.places.Autocomplete | null => {
  const {inputField, options, onPlaceChanged} = props;
  const placeChangedHandler = useRef(onPlaceChanged);
  const {map} = useGoogleMap();

  const [
    autocomplete,
    setAutocomplete
  ] = useState<google.maps.places.Autocomplete | null>(null);

  // Initializes the Google Maps Places Autocomplete
  useEffect(() => {
    // Wait for map and input element to be initialized
    if (!map || !inputField) {
      return (): void => {};
    }

    if (!google.maps.places) {
      throw Error(
        "Autocomplete library missing. Add 'places' to the libraries array of GoogleMapProvider."
      );
    }

    // Create Autocomplete instance
    const autocompleteInstance = new google.maps.places.Autocomplete(
      inputField,
      options
    );
    setAutocomplete(autocompleteInstance);

    // Add places change listener to Autocomplete
    autocompleteInstance.addListener('place_changed', () => {
      const place = autocompleteInstance.getPlace();
      placeChangedHandler.current && placeChangedHandler.current(place);
    });

    // Clear listeners on unmount
    return (): void => {
      autocompleteInstance &&
        google.maps.event.clearInstanceListeners(autocompleteInstance);
    };
  }, [map, inputField, options]);

  return autocomplete;
};

export default useAutocomplete;
