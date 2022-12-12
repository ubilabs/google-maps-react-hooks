import React, {useCallback, useEffect, useState} from 'react';

import {usePlacesService} from '@ubilabs/google-maps-react-hooks';

import styles from './places-service-with-element.module.css';

const PlacesServiceElement = () => {
  const [divContainer, setDivContainer] = useState<HTMLDivElement | null>(null);

  const divRef = useCallback(
    (node: React.SetStateAction<HTMLDivElement | null>) => {
      node && setDivContainer(node);
    },
    []
  );

  const [placeResults, setPlaceResults] = useState<
    google.maps.places.PlaceResult[]
  >([]);

  // Get the places service from the usePlacesService hook
  const service = usePlacesService({divElement: divContainer});

  useEffect(() => {
    if (!service) {
      return;
    }

    const request = {
      location: {lat: 41.0864626164749, lng: 28.934162036450086},
      radius: 800,
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

      setPlaceResults(results);
    }

    service.nearbySearch(request, callback);
  }, [Boolean(service)]);

  return (
    <>
      <div className={styles.container}>
        <h1>Amazing restaurants in Istanbul</h1>
        <ul className={styles.restaurantList}>
          {placeResults.map((place, index) => {
            const name = place.name || 'N/A';
            const rating = place.rating || 'N/A';

            return (
              <li key={index}>
                <h3>{name}</h3>
                <p>Rating: {rating}</p>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Add div container for the places service */}
      <div ref={divRef} />
    </>
  );
};

export default PlacesServiceElement;
