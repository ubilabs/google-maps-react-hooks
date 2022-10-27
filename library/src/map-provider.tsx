import React, {useState, useEffect, PropsWithChildren} from 'react';

import GoogleMap from './google-map';

export interface GoogleMapProviderProps {
  googleMapsAPIKey: string;
  mapContainer?: HTMLElement | null;
  options?: google.maps.MapOptions;
  libraries?: string[];
  language?: string;
  region?: string;
  version?: string;
  onLoad?: (map: google.maps.Map) => void;
  authReferrerPolicy?: string;
}

export interface GoogleMapContextType extends Partial<GoogleMap> {
  loading: boolean;
}

/**
 * The map context
 */
export const GoogleMapContext = React.createContext<GoogleMapContextType>({
  loading: true
});

/**
 * The global Google Map provider
 */
export const GoogleMapProvider: React.FunctionComponent<
  PropsWithChildren<GoogleMapProviderProps>
> = props => {
  const {
    children,
    googleMapsAPIKey,
    mapContainer,
    options,
    libraries,
    language,
    region,
    version,
    onLoad,
    authReferrerPolicy
  } = props;

  const [loading, setLoading] = useState<boolean>(true);
  const [map, setMap] = useState<GoogleMap>();

  const createGoogleMap = () => {
    if (!mapContainer) {
      return;
    }

    const mapOptions = {
      container: mapContainer,
      googleMapsAPIKey,
      onLoadScript: (): void => setLoading(false),
      onLoadMap: (loadedMap: GoogleMap): void => {
        setMap(loadedMap);
        if (typeof onLoad === 'function' && loadedMap.map) {
          onLoad(loadedMap.map);
        }
      },
      config: options,
      libraries,
      language,
      region,
      version,
      authReferrerPolicy
    };

    // Load Google Maps script and create Google Map instance
    new GoogleMap(mapOptions);
  };

  // Handle creation of a Google Maps map instance
  // Recreate map on `mapContainer`, `language` or `region` change
  useEffect(() => {
    createGoogleMap();
  }, [mapContainer, language, region]);

  // Destroy old map instance listeners on `mapContainer` change
  useEffect(
    () => () => {
      map?.destroyListeners();
    },
    [mapContainer]
  );

  // Destroy old map instance and remove loaded Google Maps scripts
  // on `language` or `region` change and when component unmounts
  useEffect(
    () => () => {
      map?.destroyComplete();
    },
    [language, region]
  );

  return (
    <GoogleMapContext.Provider value={{...map, loading}}>
      {children}
    </GoogleMapContext.Provider>
  );
};
