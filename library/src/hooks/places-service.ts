import {useContext, useEffect, useState} from 'react';

import {GoogleMapsContext} from '../google-maps-provider';

export interface PlacesServiceProps {
  divElement?: HTMLDivElement | null;
}

/**
 * Hook to get Google Maps Places Service instance
 */
export const usePlacesService = (
  props?: PlacesServiceProps
): google.maps.places.PlacesService | null => {
  const {map, googleMapsAPIIsLoaded} = useContext(GoogleMapsContext);

  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  // Creates a Places Service instance
  useEffect(() => {
    if (!googleMapsAPIIsLoaded) {
      return;
    }

    if (!google.maps.places) {
      throw Error(
        "Places library missing. Add 'places' to the libraries array of GoogleMapsProvider."
      );
    }

    // Create places service which renders attributions in the map container
    if (props?.divElement === undefined) {
      // Wait for map to be initialized
      if (!map) {
        return;
      }

      const serviceMap = new google.maps.places.PlacesService(map);
      setPlacesService(serviceMap);

      return;
    }

    // Create places service which renders attributions in the passed div element
    // Wait for div element to be available
    if (!props?.divElement) {
      return;
    }

    const serviceElement = new google.maps.places.PlacesService(
      props?.divElement
    );
    setPlacesService(serviceElement);
  }, [googleMapsAPIIsLoaded, map, props?.divElement]);

  return placesService;
};
