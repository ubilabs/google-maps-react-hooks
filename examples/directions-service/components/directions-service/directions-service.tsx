import {useEffect} from 'react';
import {useDirectionsService} from '@ubilabs/google-maps-react-hooks';

const DirectionsService = () => {
  const directionsOptions = {
    renderOnMap: true,
    renderOptions: {
      suppressMarkers: true,
      polylineOptions: {strokeColor: '#FB2576', strokeWeight: 4}
    }
  };

  // Use findAndRenderRoute to get directions and render a route to the map
  const {findAndRenderRoute, directionsRenderer} =
    useDirectionsService(directionsOptions);

  useEffect(() => {
    if (!findAndRenderRoute) {
      return () => {};
    }

    // Form Request to pass to findAndRenderRoute
    // https://developers.google.com/maps/documentation/javascript/directions#DirectionsRequests
    const request = {
      travelMode: google.maps.TravelMode.DRIVING,
      origin: 'Berlin',
      destination: 'München',
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: google.maps.TrafficModel.BEST_GUESS
      }
    };

    findAndRenderRoute(request)
      .then((result: google.maps.DirectionsResult) => {
        // eslint-disable-next-line no-console
        console.log(result);
      })
      .catch((errorStatus: google.maps.DirectionsStatus) => {
        console.error(errorStatus);
      });

    return () => {
      if (directionsRenderer) {
        directionsRenderer.setMap(null);
      }
    };
  }, [findAndRenderRoute]);

  return null;
};

export default DirectionsService;
