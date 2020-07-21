import {useMemo, useEffect, useCallback} from 'react';

import useGoogleMap from './map-instance';

interface DirectionsProps {
  renderOnMap?: boolean;
  renderOptions?: google.maps.DirectionsRendererOptions;
}

interface DirectionsHookReturns {
  directionsService: google.maps.DirectionsService | null;
  findRoute:
    | ((
        request: google.maps.DirectionsRequest
      ) => Promise<google.maps.DirectionsResult>)
    | null;
  findAndRenderRoute:
    | ((
        request: google.maps.DirectionsRequest
      ) => Promise<google.maps.DirectionsResult>)
    | null;
  renderRouteOfIndex: (index: number) => void;
}

/**
 * Hook to get Google Maps Places Directions Service instance
 */
const useDirections = (props: DirectionsProps = {}): DirectionsHookReturns => {
  const {renderOnMap, renderOptions} = props;
  const {map, loading} = useGoogleMap();

  // Creates a Directions Service instance
  const directionsService = useMemo<google.maps.DirectionsService | null>(() => {
    // Wait for map to be initialized
    if (!map || loading) {
      return null;
    }

    return new google.maps.DirectionsService();
  }, [map, loading]);

  // Creates a Directions Renderer instance
  const directionsRenderer = useMemo<google.maps.DirectionsRenderer | null>(() => {
    // Wait for map to be initialized
    if (!map || !renderOnMap) {
      return null;
    }

    const renderer = new google.maps.DirectionsRenderer(renderOptions);
    renderer.setMap(map);

    return renderer;
  }, [map, renderOnMap]);

  // Updates the directions renderer options
  useEffect(() => {
    if (!directionsRenderer) {
      return;
    }

    directionsRenderer.setOptions(renderOptions || {});
  }, [renderOptions]);

  // Custom Directions route request
  const findRoute = useCallback(
    (
      request: google.maps.DirectionsRequest
    ): Promise<google.maps.DirectionsResult> =>
      new Promise((resolve, reject) => {
        if (directionsService) {
          directionsService.route(
            request,
            (
              result: google.maps.DirectionsResult,
              status: google.maps.DirectionsStatus
            ): void => {
              if (status === google.maps.DirectionsStatus.OK) {
                resolve(result);
              } else {
                reject(status);
              }
            }
          );
        }
      }),
    [directionsService]
  );

  // Custom Directions route request followed by directions rendering
  const findAndRenderRoute = useCallback(
    (
      request: google.maps.DirectionsRequest
    ): Promise<google.maps.DirectionsResult> =>
      new Promise((resolve, reject) => {
        if (directionsService) {
          directionsService.route(
            request,
            (
              result: google.maps.DirectionsResult,
              status: google.maps.DirectionsStatus
            ): void => {
              if (status === google.maps.DirectionsStatus.OK) {
                if (directionsRenderer) {
                  directionsRenderer.setDirections(result);
                }
                resolve(result);
              } else {
                reject(status);
              }
            }
          );
        }
      }),
    [directionsService, directionsRenderer]
  );

  // Renders directions route of given index
  const renderRouteOfIndex = (index: number) => {
    if (directionsRenderer) {
      directionsRenderer.setRouteIndex(index);
    }
  };

  return {
    directionsService,
    findRoute: directionsService && findRoute,
    findAndRenderRoute:
      directionsService && directionsRenderer && findAndRenderRoute,
    renderRouteOfIndex
  };
};

export default useDirections;
