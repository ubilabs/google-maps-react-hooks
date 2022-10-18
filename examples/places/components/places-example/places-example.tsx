import {useEffect} from 'react';

import {
  useGoogleMap,
  usePlacesService
} from '@ubilabs/google-maps-react-hooks';

const PlacesExample = () => {
  const {map} = useGoogleMap();

  // Get the places service from the usePlacesService hook
  const service = usePlacesService();

  useEffect(() => {
    if (!map || !service) {
      return;
    }

    const bounds = new google.maps.LatLngBounds();

    const request = {
      location: {lat: 53.550481787761306, lng: 9.992336490896136},
      radius: 500,
      type: 'cafe'
    };

    function callback(
      results: google.maps.places.PlaceResult[],
      status: google.maps.places.PlacesServiceStatus
    ) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let index = 0; index < results.length; index++) {
          const name = results[index].name;
          const position = results[index].geometry?.location;
          const openingHours = results[index].opening_hours;

          const isOpenStatus = openingHours ? 'Is open' : 'Closed';

          if (!position) {
            return;
          }

          const marker = new google.maps.Marker({
            map,
            position
          });

          map?.fitBounds(bounds.extend(position));

          const infowindow = new google.maps.InfoWindow({
            position,
            content: `<b>${name}</b> is ${isOpenStatus}`
          });

          infowindow.open(map, marker);
        }
      }
    }

    service.nearbySearch(request, callback);
  }, [map]);

  return null;
};

export default PlacesExample;
