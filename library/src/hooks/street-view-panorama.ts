/* eslint-disable complexity */
import {useEffect, useState} from 'react';

import {useGoogleMap} from './map-instance';

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

  // Get map instance
  const {map} = useGoogleMap();

  const [streetViewPanorama, setStreetViewPanorama] =
    useState<google.maps.StreetViewPanorama | null>(null);

  // Creates a Street View instance
  useEffect(() => {
    // Wait for Google Maps API to be initialized
    if (!map) {
      return (): void => {};
    }

    // If not div element is passed, initialize a map with street view
    if (!divElement) {
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
      // If a div element is passed, initialize street view in the element
      const newPanorama = new google.maps.StreetViewPanorama(divElement, {
        position,
        pov,
        zoom
      });

      map.setStreetView(newPanorama);

      setStreetViewPanorama(newPanorama);
    }

    return (): void => {
      map.setStreetView(null);
    };
  }, [map, divElement]);

  return streetViewPanorama;
};
