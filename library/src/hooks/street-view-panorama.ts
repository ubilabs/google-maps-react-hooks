/* eslint-disable complexity */
import {useContext, useEffect, useState} from 'react';

import {GoogleMapsContext} from '../google-maps-provider';

export interface StreetViewPanoramaProps {
  divElement?: HTMLElement | null;
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
  pov?: google.maps.StreetViewPov;
  zoom?: number;
}

/**
 * Hook to get Street View Panorama
 */
export const useStreetViewPanorama = (
  props: StreetViewPanoramaProps
): google.maps.StreetViewPanorama | null => {
  const {divElement, position, pov, zoom} = props;

  const {googleMapsAPIIsLoaded, map} = useContext(GoogleMapsContext);

  const [streetViewPanorama, setStreetViewPanorama] =
    useState<google.maps.StreetViewPanorama | null>(null);

  // Creates a Street View instance
  useEffect(() => {
    // If no div element is passed, initialize a map with Street View Panorama
    if (!divElement) {
      // Wait for Google Maps map instance
      if (!map) {
        return (): void => {};
      }

      const newPanorama = map.getStreetView();

      if (pov) {
        newPanorama.setPov(pov);
      }

      if (position) {
        newPanorama.setPosition(position);
      }

      // eslint-disable-next-line no-eq-null
      if (zoom != null) {
        newPanorama.setZoom(zoom);
      }

      setStreetViewPanorama(newPanorama);
    } else {
      // Wait for Google Maps API
      if (!googleMapsAPIIsLoaded) {
        return (): void => {};
      }

      // If a div element is passed, initialize street view in the element
      const newPanorama = new google.maps.StreetViewPanorama(divElement, {
        position,
        pov,
        zoom
      });

      setStreetViewPanorama(newPanorama);
    }

    return (): void => {
      if (map) {
        map.setStreetView(null);
      }
    };
  }, [map, divElement]);

  return streetViewPanorama;
};
