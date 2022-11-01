import React, {useEffect, useState} from 'react';

import {
  useDistanceMatrix,
  useGeocoder,
  useGoogleMap
} from '@ubilabs/google-maps-react-hooks';

import {getOriginMarkerIcon} from '../../libs/marker-icon-helpers';

import styles from './distance-matrix.module.css';

const DistanceMatrix = () => {
  const map = useGoogleMap();
  const geocoder = useGeocoder();

  // Get the service from the useDistanceMatrix hook
  const service = useDistanceMatrix();

  const [elements, setElements] = useState<
    google.maps.DistanceMatrixResponseElement[]
  >([]);
  const [destinationList, setDestinationList] = useState(['']);

  useEffect(() => {
    if (!map || !geocoder || !service) {
      return () => {};
    }

    const markers: Array<google.maps.Marker> = [];

    const bounds = new google.maps.LatLngBounds();

    // Distance Matrix request
    // https://developers.google.com/maps/documentation/distance-matrix/distance-matrix#required-parameters
    const request = {
      origins: ['Invalides'],
      destinations: [
        'Palais Garnier',
        {lat: 48.87486838960709, lng: 2.293475122446004}, // Arc de Triomphe
        {lat: 48.85680070130583, lng: 2.2917585087353705}, // Eiffel Tower
        'Louvre Museum',
        {lat: 48.846182892343855, lng: 2.3604230571607023} // Jardin de Plantes
      ],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    };

    // Function to create a marker
    const createMarker = (
      position: google.maps.LatLng | google.maps.LatLngLiteral,
      icon?: google.maps.Icon
    ) => {
      const marker = new google.maps.Marker({
        map,
        position,
        icon
      });
      markers.push(marker);
    };

    // Get distance matrix response
    service.getDistanceMatrix(request, response => {
      const origins = response.originAddresses;
      const destinations = response.destinationAddresses;
      const responseElements = response.rows[0].elements;

      setDestinationList(destinations);
      setElements(responseElements);

      // Geocode the response to set a marker at the positions of the origin and the destinations
      geocoder.geocode({address: origins[0]}, results => {
        const position = results[0]?.geometry.location;

        // Add another marker icon for the origin
        createMarker(position, getOriginMarkerIcon());

        map.fitBounds(bounds.extend(position));
      });

      destinations.forEach(destination => {
        geocoder.geocode({address: destination}, results => {
          const position = results[0]?.geometry.location;

          createMarker(position);

          map.fitBounds(bounds.extend(position));
        });
      });
    });

    // Clean up markers
    return () => {
      markers.forEach(marker => marker.setMap(null));
    };
  }, [map, Boolean(geocoder), Boolean(service)]);

  return (
    <div className={styles.info}>
      {destinationList.map((destination, index) => {
        const distance = elements[index]?.distance?.text;
        const duration = elements[index]?.duration?.text;

        return (
          <div key={index}>
            <h3>{destination}</h3>
            <p>{distance}</p>
            <p>{duration}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DistanceMatrix;
