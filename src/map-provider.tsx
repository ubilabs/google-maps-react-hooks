import React, {useState, useEffect} from 'react';

import GoogleMap from './google-map';

export interface GoogleMapProviderProps {
  children: React.ReactElement;
  googleMapsAPIKey: string;
  mapContainer?: HTMLElement | null;
  options: google.maps.MapOptions;
  libraries: string[];
  language?: string;
  region?: string;
  mapIds: string[];
  onLoad?: (map: google.maps.Map) => void;
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
const GoogleMapProvider = (props: GoogleMapProviderProps): JSX.Element => {
  const {
    children,
    googleMapsAPIKey,
    mapContainer,
    options,
    libraries,
    language,
    region,
    mapIds,
    onLoad
  } = props;

  const [loading, setLoading] = useState<boolean>(true);
  const [map, setMap] = useState<GoogleMap>();

  const createGoogleMap = (() => {
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
      mapIds,
      language,
      region
    };
    // Create Google Map instance
    new GoogleMap(mapOptions);
  });

  // Initializes Google Map on mount
  useEffect(() => {
    if (!mapContainer) {
      return (): void => {};
    }

    // Destroy old map instance listeners
    if (map) {
      map.destroyListeners();
    }

    // Create Google Map
    createGoogleMap();

    // Destroy Google Map when component unmounts
    return (): void => {
      map && map.destroyListeners();
    };
  }, [mapContainer]);

  // Initializes Google Map on language change
  useEffect(() => {
  if (!mapContainer) {
    return (): void => {};
  }

  // Destroy old map instance
  if (map) {
    map.destroyComplete();
  }

  // Create Google Map
  createGoogleMap();

  // Destroy Google Map when component unmounts
  return (): void => {
    map && map.destroyComplete();
  };
  }, [language, region]);

  return (
    <GoogleMapContext.Provider value={{...map, loading}}>
      {children}
    </GoogleMapContext.Provider>
  );
};

export default GoogleMapProvider;
