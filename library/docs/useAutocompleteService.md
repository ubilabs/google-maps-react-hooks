# `useAutocompleteService` Hook

React hook to use the [Google Maps Places Autocomplete Service](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service) in any component.

## Usage

When initializing the `<GoogleMapProvider>`, include the places library like this: `libraries={['places']}`.

```tsx
 // Code snippet here
```

## Methods

There are two different [methods for Autocomplete Service](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteService-Methods) to retrieve autocomplete predictions.

1. [**getPlacePredictions**](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest): Gets place autocomplete predictions based on the supplied autocomplete request.

2. [**getQueryPredictions**](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#QueryAutocompletionRequest): Gets place autocomplete predictions based on the supplied query autocomplete request.

## Parameters

### AutocompleteProps

Needs a reference to an Input field, and has some optional properties. Check: [AutocompletionRequest interface](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest) or [QueryAutocompletionRequest interface](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#QueryAutocompletionRequest).
