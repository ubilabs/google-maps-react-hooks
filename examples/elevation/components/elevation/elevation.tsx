import {useEffect} from 'react';
import {
  useElevationService,
  useGoogleMap
} from '@ubilabs/google-maps-react-hooks';

const Elevation = () => {
  const {map} = useGoogleMap();
  // Get the elevator from the useElevationService hook
  const elevator = useElevationService();

  useEffect(() => {
    if (!map) {
      return () => {};
    }

    const initialPosition = {lat: 51.08998021141488, lng: 10.627828045134935};

    // Create a new InfoWindow
    const infoWindow = new google.maps.InfoWindow({
      content: 'Click somewhere on the map to see the elevation',
      position: initialPosition
    });

    map.setCenter(initialPosition);

    infoWindow.open(map);

    // Click on the map and open an infowindow with the elevation.
    map.addListener('click', (mapsMouseEvent: google.maps.MapMouseEvent) => {
      // Update infowindow with new position and elevation info
      infoWindow.setPosition(mapsMouseEvent.latLng);

      // Retrieve elevation info from elevator
      elevator?.getElevationForLocations(
        {locations: [mapsMouseEvent.latLng]},
        (results: google.maps.ElevationResult[]) => {
          // eslint-disable-next-line no-console
          console.log(results);

          map.setCenter(results[0].location);

          infoWindow.setPosition(results[0].location);
          infoWindow.setContent(`Elevation: ${results[0].elevation}`);
        }
      );
    });

    // Clean up infoWindow
    return () => {
      if (map) {
        google.maps.event.clearListeners(map, 'click');
        infoWindow.close();
      }
    };
  }, [map]);

  return null;
};

export default Elevation;
