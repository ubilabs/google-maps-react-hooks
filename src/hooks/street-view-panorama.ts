import {useMemo, useState} from 'react';

import {useGoogleMap} from './map-instance';

interface StreetViewProps {
  divElement?: HTMLElement | null;
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
  heading?: number;
  pitch?: number;
  zoom?: number;
}
/**
 * Hook to get Street View Panorama
 */
export const useStreetView = (
  props: StreetViewProps
): google.maps.StreetViewPanorama | null => {
  const {divElement, position, heading, pitch, zoom} = props;

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
        newPanorama.setPov({heading, pitch});

        if (position) {
          newPanorama.setPosition(position);
        }

        if (zoom) {
          newPanorama.setZoom(zoom);
        }

        newPanorama.setVisible(true);

        setPanorama(newPanorama);
      } else {
        const newPanorama = new google.maps.StreetViewPanorama(divElement, {
          position,
          pov: {
            heading,
            pitch
          },
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
