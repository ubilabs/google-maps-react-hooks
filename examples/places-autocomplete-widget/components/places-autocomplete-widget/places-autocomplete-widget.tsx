import React, {useEffect, useRef, useState} from 'react';
import {useAutocomplete, useGoogleMap} from '@ubilabs/google-maps-react-hooks';

import styles from './places-search.module.css';

const PlacesAutocompleteWidget = () => {
  const map = useGoogleMap();

  // Use the input ref to pass an input field to the useAutocomplete hook below
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = useState('');
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const onPlaceChanged = (place: google.maps.places.PlaceResult) => {
    if (place) {
      setSelectedPlace(place);
      setInputValue(place.formatted_address || place.name);

      // Keep focus on input element
      inputRef.current?.focus();
    }
  };

  // Use the useAutocomplete hook and pass the input field ref and the onPlaceChanged function to it
  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Add a marker whenever a place was selected
  useEffect(() => {
    if (!map || !selectedPlace) {
      return () => {};
    }

    const markerOptions: google.maps.MarkerOptions = {
      map,
      position: selectedPlace.geometry?.location,
      title: selectedPlace.name,
      clickable: false
    };

    const marker = new google.maps.Marker(markerOptions);

    // Clean up marker
    return () => {
      marker.setMap(null);
    };
  }, [map, selectedPlace]);

  return (
    <input
      className={styles.searchInput}
      ref={inputRef}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default PlacesAutocompleteWidget;
