# useAutocomplete

React hook to use the [Google Maps autocomplete](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete) in any component.

## Usage

```jsx
import React, { useRef, useState } from 'react';
import { useAutocomplete } from '@ubilabs/google-maps-react-hooks';

const MyComponent = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const onPlaceChanged = (place) => {
    if (place) {
      setInputValue(place.formatted_address || place.name);
    }

    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged
  });

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return <input
    ref={inputRef}
    value={inputValue}
    onChange={handleInputChange}
  />
};
```

## Parameters

### AutocompleteProps

Needs a reference to an Input field, some optional [AutocompleteOptions](https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions) and a callback for when a place got changed.

```TypeScript
interface AutocompleteProps {
  inputField: HTMLInputElement | null;
  options?: google.maps.places.AutocompleteOptions;
  onPlaceChanged: (place: google.maps.places.PlaceResult) => void;
}
```
