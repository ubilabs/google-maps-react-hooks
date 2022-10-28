import React, {useRef} from 'react';

import {
  useGoogleMap,
  useStreetViewPanorama
} from '@ubilabs/google-maps-react-hooks';

import styles from './street-view-element.module.css';

const StreetViewPanoramaElement = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const map = useGoogleMap();

  const panorama = useStreetViewPanorama({
    divElement: divRef.current,
    position: {lat: 53.55150164023877, lng: 9.986843327204179},
    pov: {heading: 165, pitch: 0},
    zoom: 1
  });

  map?.setStreetView(panorama);

  return <div className={styles.pano} ref={divRef} />;
};

export default StreetViewPanoramaElement;
