import React, {useState, useEffect, PropsWithChildren} from 'react';

// https://developers.google.com/maps/documentation/javascript/url-params
export interface GoogleMapsAPIUrlParameters {
  libraries?: string[];
  language?: string;
  region?: string;
  version?: string;
  authReferrerPolicy?: string;
}

export interface GoogleMapsProviderProps extends GoogleMapsAPIUrlParameters {
  googleMapsAPIKey: string;
  mapContainer?: HTMLElement | null;
  mapOptions?: google.maps.MapOptions;
  onLoadScript?: () => void;
  onLoadMap?: (map: google.maps.Map) => void;
}

/**
 * The Google Maps map context
 */
export const GoogleMapsMapContext = React.createContext<
  google.maps.Map | undefined
>(undefined);

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

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [map, setMap] = useState<google.maps.Map>();

  // Load Google Maps API
  useEffect(() => {
    if (google?.maps) {
      setIsLoading(false);
      return () => {};
    }

    const scriptTag = document.createElement('script');
    const defaultLanguage = navigator.language.slice(0, 2);
    const defaultRegion = navigator.language.slice(3, 5);

    /* eslint-disable camelcase */
    const params = new URLSearchParams({
      key: googleMapsAPIKey,
      language: language || defaultLanguage,
      region: region || defaultRegion,
      ...(libraries?.length && {libraries: libraries.join(',')}),
      ...(version && {version}),
      ...(authReferrerPolicy && {auth_referrer_policy: authReferrerPolicy})
    });
    /* eslint-enable camelcase */

    scriptTag.type = 'text/javascript';
    scriptTag.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    scriptTag.onload = (): void => {
      setIsLoading(false);
      onLoadScript && onLoadScript();
    };
    document.getElementsByTagName('head')[0].appendChild(scriptTag);

    // Remove all loaded Google Maps scripts
    return () => {
      document
        .querySelectorAll('script[src^="https://maps.googleapis.com"]')
        .forEach(script => {
          script.remove();
        });

      if (google?.maps) {
        // @ts-ignore: The operand of a 'delete' operator must be optional.
        delete google.maps;
      }
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
    let newMap: google.maps.Map | undefined;

    if (!isLoading && mapContainer) {
      newMap = new google.maps.Map(mapContainer, mapOptions);

      google.maps.event.addListenerOnce(newMap, 'idle', () => {
        if (onLoadMap && newMap) {
          onLoadMap(newMap);
        }
      });

      setMap(newMap);
    }

    return () => {
      if (newMap && google?.maps) {
        google.maps.event.clearInstanceListeners(newMap);
      }
    };
  }, [
    isLoading,
    mapContainer,
    googleMapsAPIKey,
    JSON.stringify(libraries),
    language,
    region,
    version,
    authReferrerPolicy
  ]);

  return (
    <GoogleMapsMapContext.Provider value={map}>
      {children}
    </GoogleMapsMapContext.Provider>
  );
};
