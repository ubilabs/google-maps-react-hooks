import {useStreetViewPanorama} from '@ubilabs/google-maps-react-hooks';

const StreetViewPanoramaMap = () => {
  const position = {lat: 53.55150164023877, lng: 9.986843327204179};
  const pov = {heading: 165, pitch: 20};

  useStreetViewPanorama({
    position,
    pov,
    zoom: 1
  });

  return null;
};

export default StreetViewPanoramaMap;
