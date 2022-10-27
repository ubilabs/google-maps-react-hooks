import React, {ReactElement} from 'react';
import * as ReactDOMServer from 'react-dom/server';

import OriginMarkerIcon from '../components/icons/origin-marker';

const size: [number, number] = [30, 30]; // [width, height]

/**
 * Returns an image url string for the svg element
 */
export const encodeSvgToDataUrl = (svgElement: ReactElement): string =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    ReactDOMServer.renderToStaticMarkup(svgElement)
  )}`;

/**
 * Gets the origin marker icon svg to use for the google.maps.Marker
 * */
export const getOriginMarkerIcon = () => ({
  url: encodeSvgToDataUrl(<OriginMarkerIcon />),
  scaledSize: new google.maps.Size(...size)
});
