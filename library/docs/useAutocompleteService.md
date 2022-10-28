# `useAutocompleteService` Hook

React hook to use the [Google Maps Places Autocomplete Service](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service) in any component.

## Usage

When initializing the `<GoogleMapsProvider>`, include the places library like this: `libraries={['places']}`.

```tsx
 // Code snippet here
```

## Parameters

### AutocompleteProps

Needs a reference to an Input field, and has some optional properties. Check: [AutocompletionRequest interface](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest) or [QueryAutocompletionRequest interface](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#QueryAutocompletionRequest).
