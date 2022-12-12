import {useEffect} from 'react';
import {
  useElevationService,
  useGoogleMap
} from '@ubilabs/google-maps-react-hooks';

const ElevationService = () => {
  const map = useGoogleMap();

  // Get the elevator from the useElevationService hook
  const elevator = useElevationService();

  useEffect(() => {
    if (!map || !elevator) {
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
    const clickListener = map.addListener(
      'click',
      (mapsMouseEvent: google.maps.MapMouseEvent) => {
        const {latLng} = mapsMouseEvent;

        if (!latLng) {
          return;
        }

        // Update infowindow with new position and elevation info
        infoWindow.setPosition(latLng);

        // Retrieve elevation info from elevator
        elevator.getElevationForLocations(
          {locations: [latLng]},
          (
            results: google.maps.ElevationResult[] | null,
            status: google.maps.ElevationStatus
          ) => {
            if (status !== google.maps.ElevationStatus.OK || !results) {
              console.error(status);

              return;
            }

            const {location, elevation} = results[0];

            if (!location || !elevation) {
              return;
            }

            // eslint-disable-next-line no-console
            console.log(results);

            map.setCenter(location);

            infoWindow.setPosition(location);
            infoWindow.setContent(`Elevation: ${elevation}`);
          }
        );
      }
    );

    // Clean up click listener and remove the infowindow from the map
    return () => {
      google.maps.event.removeListener(clickListener);
      infoWindow.close();
    };
  }, [map, elevator]);

  return null;
};

export default ElevationService;
