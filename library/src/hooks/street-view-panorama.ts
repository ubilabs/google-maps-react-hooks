/* eslint-disable complexity */
import {useMemo, useState} from 'react';

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

  const [panorama, setPanorama] =
    useState<google.maps.StreetViewPanorama | null>(null);

  // Creates a Street View instance
  const streetViewPanorama =
    useMemo<google.maps.StreetViewPanorama | null>(() => {
      // Wait for Google Maps API to be initialized
      if (!map) {
        return null;
      }

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

        setPanorama(newPanorama);
      } else {
        const newPanorama = new google.maps.StreetViewPanorama(divElement, {
          position,
          pov,
          zoom
        });

        if (position) {
          map.setCenter(position);
        }

        map.setStreetView(newPanorama);

        setPanorama(newPanorama);
      }

      return panorama;
    }, [map, divElement]);

  return streetViewPanorama;
};