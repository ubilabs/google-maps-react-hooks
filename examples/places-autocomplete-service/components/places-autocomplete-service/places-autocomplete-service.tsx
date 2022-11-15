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
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [inputValue, setInputValue] = useState<string>('');
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

    // Show dropdown with a little delay
    timeout.current = setTimeout(() => {
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
    if (inputValue.length >= 2) {
      autocompleteService?.getPlacePredictions(
        {
          input: inputValue
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
      <label htmlFor="places-search-autocomplete">Search for a location:</label>
      <input
        ref={inputRef}
        className={styles.searchInput}
        value={inputValue}
        onChange={handleInputChange}
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-controls="search-suggestions"
        aria-expanded={suggestionsAreVisible}
        id="places-search-autocomplete"
      />

      {suggestionsAreVisible && (
        <ul
          className={styles.suggestions}
          id="search-suggestions"
          role="listbox"
          aria-label="Suggested locations:">
          {suggestions.map(suggestion => (
            <li
              key={suggestion.id}
              onClick={() => selectSuggestion(suggestion)}
              id={suggestion.id}
              role="option">
              <span>{suggestion.label}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PlacesAutocompleteService;
