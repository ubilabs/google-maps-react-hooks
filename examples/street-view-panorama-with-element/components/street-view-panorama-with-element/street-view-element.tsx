import React, {useCallback, useEffect, useState} from 'react';

import {
  useGoogleMap,
  useStreetViewPanorama
} from '@ubilabs/google-maps-react-hooks';

import styles from './street-view-element.module.css';

const StreetViewPanoramaElement = () => {
  const [divContainer, setDivContainer] = useState<HTMLDivElement | null>(null);

  const divRef = useCallback(
    (node: React.SetStateAction<HTMLDivElement | null>) => {
      node && setDivContainer(node);
    },
    []
  );

  const map = useGoogleMap();

  const panorama = useStreetViewPanorama({
    divElement: divContainer,
    position: {lat: 53.55150164023877, lng: 9.986843327204179},
    pov: {heading: 165, pitch: 0},
    zoom: 1
  });

  useEffect(() => {
    if (map) {
      map.setStreetView(panorama);
    }
  }, [map, panorama]);

  // Clean up map when component unmounts
  useEffect(
    () => () => {
      if (map) {
        map.setStreetView(null);
      }
    },
    []
  );

  return <div className={styles.pano} ref={divRef} />;
};

export default StreetViewPanoramaElement;
