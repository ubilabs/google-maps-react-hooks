import React, {useState, useEffect, PropsWithChildren} from 'react';
import {GoogleMapsApiLoader} from './google-maps-api-loader';

// https://developers.google.com/maps/documentation/javascript/url-params
export interface GoogleMapsAPIUrlParameters {
  googleMapsAPIKey: string;
  libraries?: string[];
  language?: string;
  region?: string;
  version?: string;
  authReferrerPolicy?: string;
}

export interface GoogleMapsConfiguration {
  mapContainer?: HTMLElement | null;
  mapOptions?: google.maps.MapOptions;
}

export interface GoogleMapsProviderProps
  extends GoogleMapsAPIUrlParameters,
    GoogleMapsConfiguration {
  onLoadScript?: () => void;
  onLoadMap?: (map: google.maps.Map) => void;
}

export interface GoogleMapsContextType {
  googleMapsAPIIsLoaded: boolean;
  map?: google.maps.Map;
}

// Declare global maps callback function
declare global {
  interface Window {
    mapsCallback: () => void;
  }
}

/**
 * The Google Maps context
 */
export const GoogleMapsContext = React.createContext<GoogleMapsContextType>({
  googleMapsAPIIsLoaded: false
});

const DEFAULT_LANGUAGE = navigator.language.slice(0, 2);
const DEFAULT_REGION = navigator.language.slice(3, 5);

/**
 * The global Google Maps provider
 */
export const GoogleMapsProvider: React.FunctionComponent<
  PropsWithChildren<GoogleMapsProviderProps>
> = props => {
  const {
    children,
    googleMapsAPIKey,
    mapContainer,
    mapOptions,
    libraries,
    language,
    region,
    version,
    authReferrerPolicy,
    onLoadScript,
    onLoadMap
  } = props;

  const [isLoadingAPI, setIsLoadingAPI] = useState<boolean>(true);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    console.log('effect: start loading');

    const apiParams = {
      key: googleMapsAPIKey,
      language: language || DEFAULT_LANGUAGE,
      region: region || DEFAULT_REGION,
      libraries: libraries ? libraries.join(',') : undefined,
      v: version,
      authReferrerPolicy
    };

    setIsLoadingAPI(true);
    GoogleMapsApiLoader.load(apiParams).then(
      () => {
        console.log('effect: loading done');
        setIsLoadingAPI(false);
        if (onLoadScript) {
          onLoadScript();
        }
      },
      err => {
        console.error('effect: loading failed: ', err);
        setIsLoadingAPI(false);
      }
    );

    return () => {
      console.log('effect/cleanup: unload API');
      GoogleMapsApiLoader.unload();
    };
  }, [
    googleMapsAPIKey,
    JSON.stringify(libraries),
    language,
    region,
    version,
    authReferrerPolicy
  ]);

  // Handle Google Maps map instance
  useEffect(() => {
    // Check for google.maps is needed because of Hot Module Replacement
    if (
      isLoadingAPI ||
      !mapContainer ||
      !(typeof google === 'object' && typeof google.maps === 'object')
    ) {
      return () => {};
    }

    const newMap = new google.maps.Map(mapContainer, mapOptions);

    google.maps.event.addListenerOnce(newMap, 'idle', () => {
      if (onLoadMap && newMap) {
        onLoadMap(newMap);
      }
    });

    setMap(newMap);

    // Remove all map related event listeners
    return () => {
      if (
        newMap &&
        typeof google === 'object' &&
        typeof google.maps === 'object'
      ) {
        google.maps.event.clearInstanceListeners(newMap);
      }
    };
  }, [isLoadingAPI, mapContainer]);

  return (
    <GoogleMapsContext.Provider
      value={{map, googleMapsAPIIsLoaded: !isLoadingAPI}}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
