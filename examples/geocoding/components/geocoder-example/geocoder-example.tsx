import {useEffect, useState} from 'react';
import {useGeocoder, useGoogleMap} from '@ubilabs/google-maps-react-hooks';

const GeocoderExample = () => {
  const {map} = useGoogleMap();

  // Get the geocoder from the useGeocoder hook
  const geocoder = useGeocoder();

  const initialPosition = {lat: 51.08998021141488, lng: 10.627828045134935};

  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );

  useEffect(() => {
    if (!map) {
      return () => {};
    }

    // Add an initial marker
    if (!marker) {
      const initialMarker = new google.maps.Marker({
        map,
        position: initialPosition
      });

      setMarker(initialMarker);

      return () => {};
    }

    // Add an initial infowindow
    if (!infoWindow) {
      const initialInfoWindow = new google.maps.InfoWindow({
        content:
          'Click somewhere on the map to reverse geocode the position to an address.',
        position: initialPosition
      });

      setInfoWindow(initialInfoWindow);
      initialInfoWindow.open(map, marker);

      return () => {};
    }

    // Click on the map and open an infowindow with the reversed geocoded address.
    map.addListener('click', (mapsMouseEvent: google.maps.MapMouseEvent) => {
      // Use the geocoder to reverse geocode the position from the map
      // and add the address as content of the infowindow
      geocoder?.geocode(
        {location: mapsMouseEvent.latLng},
        (
          results: google.maps.GeocoderResult[],
          status: google.maps.GeocoderStatus
        ) => {
          if (status === 'OK') {
            const position = results[0].geometry.location;
            const formattedAddress = results[0].formatted_address;

            marker.setPosition(position);

            infoWindow.setPosition(position);
            infoWindow.setContent(formattedAddress);

            map.setCenter(results[0].geometry.location);
          } else {
            // eslint-disable-next-line no-console
            console.log(
              `Geocode was not successful for the following reason: ${status}`
            );
          }
        }
      );
    });

    // Clean up listeners and remove marker and infowindow instances
    return () => {
      google.maps.event.clearListeners(map, 'click');
    };
  }, [map, infoWindow, marker]);

  return null;
};

export default GeocoderExample;
