// Example from: https://developers.google.com/maps/documentation/javascript/examples/maxzoom-simple

import {useEffect} from 'react';
import {
  useMaxZoomService,
  useGoogleMap
} from '@ubilabs/google-maps-react-hooks';

const MaxZoomService = () => {
  const map = useGoogleMap();

  // Get max zoom service from hook
  const maxZoomService = useMaxZoomService();

  useEffect(() => {
    if (!map || !maxZoomService) {
      return () => {};
    }

    // Create new infoWindow
    const initialPosition = {lat: 51.08998021141488, lng: 10.627828045134935};
    const infoWindow = new google.maps.InfoWindow({
      content:
        'Click somewhere on the map to see the max zoom at the position for map type imagery.',
      position: initialPosition
    });

    map.setCenter(initialPosition);

    infoWindow.open(map);

    // Function to show the maximum zoom level of a location
    const showMaxZoomLevel = (event: google.maps.MapMouseEvent) => {
      const {latLng} = event;

      if (!latLng) {
        return;
      }

      maxZoomService.getMaxZoomAtLatLng(
        latLng,
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

    // Clean up infoWindow
    return () => {
      if (map) {
        google.maps.event.clearListeners(map, 'click');
        infoWindow.close();
      }
    };
  }, [map, maxZoomService]);

  return null;
};

export default MaxZoomService;
