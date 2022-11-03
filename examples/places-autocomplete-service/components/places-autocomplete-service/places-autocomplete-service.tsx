import React, {
  FunctionComponent,
  ChangeEvent,
  useState,
  useRef,
  useEffect
} from 'react';
import {
  useAutocompleteService,
  useGoogleMap,
  usePlacesService
} from '@ubilabs/google-maps-react-hooks';

import styles from './places-autocomplete-service.module.css';

export interface PlacesAutocompleteServiceSuggestion {
  id: string;
  label: string;
}

const maxNumberOfSuggestions = 5;

const PlacesAutocompleteService: FunctionComponent<
  Record<string, unknown>
> = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // eslint-disable-next-line no-undef
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedInputValue, setDebouncedValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<
    Array<PlacesAutocompleteServiceSuggestion>
  >([]);
  const [suggestionsAreVisible, setSuggestionsAreVisible] =
    useState<boolean>(false);

  const map = useGoogleMap();
  const autocompleteService = useAutocompleteService();
  const placesService = usePlacesService();

  // Update the user input value
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    // Update debounced value (for search request) after delay
    timeout.current = setTimeout(() => {
      setDebouncedValue(event.target.value);

      // Show dropdown
      setSuggestionsAreVisible(true);
    }, 300);
  };

  // Handle suggestion selection
  const selectSuggestion = (
    suggestion: PlacesAutocompleteServiceSuggestion
  ) => {
    inputRef.current?.focus();
    setInputValue(suggestion.label);

    // Close dropdown
    setSuggestionsAreVisible(false);

    // Get the location from Places Service of the selected place and zoom to it
    placesService?.getDetails(
      {placeId: suggestion.id},
      (
        placeResult: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (
          status !== google.maps.places.PlacesServiceStatus.OK ||
          !placeResult
        ) {
          return;
        }

        // Get position of the suggestion to move map
        const position = placeResult.geometry?.location;

        if (map && position) {
          map.setZoom(14);
          map.panTo(position);
        }
      }
    );
  };

  // Update suggestions and get autocomplete place suggestions
  useEffect(() => {
    if (debouncedInputValue.length >= 2) {
      autocompleteService?.getPlacePredictions(
        {
          input: debouncedInputValue
        },
        (
          predictions: google.maps.places.AutocompletePrediction[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !predictions
          ) {
            return;
          }

          const autocompleteSuggestions = predictions
            .slice(0, maxNumberOfSuggestions)
            .map(prediction => ({
              id: prediction.place_id,
              label: prediction.description
            }));

          // Update suggestions for dropdown suggestions list
          setSuggestions(autocompleteSuggestions);
        }
      );
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <>
      <input
        ref={inputRef}
        className={styles.searchInput}
        value={inputValue}
        onChange={handleInputChange}
        autoComplete="off"
        aria-owns="search-suggestions"
        aria-expanded={suggestionsAreVisible}
        aria-autocomplete="list"
        role="combobox"
      />

      {suggestionsAreVisible && (
        <ul
          className={styles.suggestions}
          id="search-suggestions"
          role="listbox">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              onClick={() => selectSuggestion(suggestion)}
              id={`search-suggestion-${index}`}
              role="option"
              tabIndex={-1}>
              <span>{suggestion.label}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PlacesAutocompleteService;
