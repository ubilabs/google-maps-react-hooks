import {useEffect} from 'react';

import {useGoogleMap, usePlacesService} from '@ubilabs/google-maps-react-hooks';

const PlacesService = () => {
  const map = useGoogleMap();

  // Get the places service from the usePlacesService hook
  const service = usePlacesService();

  useEffect(() => {
    if (!map || !service) {
      return () => {};
    }

    const markers: Array<google.maps.Marker> = [];

    const bounds = new google.maps.LatLngBounds();

    const request = {
      location: {lat: 53.550481787761306, lng: 9.992336490896136},
      radius: 500,
      type: 'cafe'
    };

    function callback(
      results: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus
    ) {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
        console.error(status);

        return;
      }

      for (let index = 0; index < results.length; index++) {
        const name = results[index].name;
        const position = results[index].geometry?.location;
        const openingHours = results[index].opening_hours;

        const isOpenStatus = openingHours ? 'open' : 'closed';

        if (!map || !position) {
          return;
        }

        const marker = new google.maps.Marker({
          map,
          position
        });

        markers.push(marker);

        map.fitBounds(bounds.extend(position));

        const infowindow = new google.maps.InfoWindow({
          position,
          content: `<b>${name}</b> is ${isOpenStatus}`
        });

        infowindow.open(map, marker);
      }
    }

    service.nearbySearch(request, callback);

    // Clean up markers
    return () => {
      markers.forEach(marker => marker.setMap(null));
    };
  }, [map, Boolean(service)]);

  return null;
};

export default PlacesService;
