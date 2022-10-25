// Example from: https://developers.google.com/maps/documentation/javascript/examples/maxzoom-simple

import {useEffect, useState} from 'react';
import {
  useMaxZoomService,
  useGoogleMap
} from '@ubilabs/google-maps-react-hooks';

const MaxZoomService = () => {
  const {map} = useGoogleMap();

  // Get max zoom service from hook
  const maxZoomService = useMaxZoomService();

  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );

  useEffect(() => {
    if (!map || !maxZoomService) {
      return;
    }

    // Create new infoWindow

    if (!infoWindow) {
      // Create an initial InfoWindow
      const initialPosition = {lat: 51.08998021141488, lng: 10.627828045134935};
      const initialInfoWindow = new google.maps.InfoWindow({
        content:
          'Click somewhere on the map to see the max zoom at the position for map type imagery.',
        position: initialPosition
      });

      setInfoWindow(initialInfoWindow);
      map.setCenter(initialPosition);

      return;
    }

    infoWindow.open(map);

    // Function to show the maximum zoom level of a location
    const showMaxZoomLevel = (event: google.maps.MapMouseEvent) => {
      maxZoomService.getMaxZoomAtLatLng(
        event.latLng,
        (result: google.maps.MaxZoomResult) => {
          if (result.status !== 'OK') {
            // eslint-disable-next-line no-console
            console.error(result.status);
          } else {
            infoWindow.setContent(
              `The maximum zoom at this location is: ${result.zoom}`
            );

            infoWindow.setPosition(event.latLng);
          }
        }
      );
    };

    map.addListener('click', showMaxZoomLevel);
  }, [map, infoWindow]);

  return null;
};

export default MaxZoomService;
