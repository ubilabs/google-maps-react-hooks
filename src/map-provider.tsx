import React, {useState, useEffect} from 'react';

import GoogleMap from './google-map';

export interface GoogleMapProviderProps {
  googleMapsAPIKey: string;
  mapContainer?: HTMLElement | null;
  options: google.maps.MapOptions;
  libraries?: string[];
  language?: string;
  region?: string;
  mapIds?: string[];
  version?: string;
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
const GoogleMapProvider: React.FunctionComponent<GoogleMapProviderProps> = (
  props
) => {
  const {
    children,
    googleMapsAPIKey,
    mapContainer,
    options,
    libraries,
    language,
    region,
    mapIds,
    version,
    onLoad
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
      mapIds,
      language,
      region,
      version
    };
    // Create Google Map instance
    new GoogleMap(mapOptions);
  };

  // Destroy Google Map when component unmounts
  useEffect(() => map && map.destroyComplete(), []);

  // Destroy and recreate map on mapcontainer change
  useEffect(() => {
    if (!mapContainer) {
      return;
    }

    if (map) {
      // Destroy old map instance listeners
      map.destroyListeners();
    }

    // create new map instance
    createGoogleMap();
  }, [mapContainer]);

  // Destroy and recreate map on language or region change
  useEffect(() => {
    if (!map) {
      return;
    }

    // Destroy old map instance
    map.destroyComplete();

    // create new map instance
    createGoogleMap();
  }, [language, region]);

  return (
    <GoogleMapContext.Provider value={{...map, loading}}>
      {children}
    </GoogleMapContext.Provider>
  );
};

export default GoogleMapProvider;
