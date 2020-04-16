import React, {useState, useEffect} from 'react';

import GoogleMap from './google-map';

export interface GoogleMapProviderProps {
  children: React.ReactElement;
  googleMapsAPIKey: string;
  mapContainer?: HTMLElement | null;
  options: google.maps.MapOptions;
  libraries: string[];
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
  const {children, googleMapsAPIKey, mapContainer, options, libraries} = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [map, setMap] = useState<GoogleMap>();

  // Initializes Google Map on mount
  useEffect(() => {
    if (!mapContainer) {
      return (): void => {};
    }

    const mapOptions = {
      container: mapContainer,
      googleMapsAPIKey,
      onLoad: (): void => setLoading(false),
      onLoadMap: (loadedMap: GoogleMap): void => setMap(loadedMap),
      config: options,
      libraries
    };

    // Destroy old map instance
    if (map) {
      map.destroy();
    }

    // Create Google Map instance
    new GoogleMap(mapOptions);

    // Destroy Google Map when component unmounts
    return (): void => {
      map && map.destroy();
    };
  }, [mapContainer]);

  return (
    <GoogleMapContext.Provider value={{...map, loading}}>
      {children}
    </GoogleMapContext.Provider>
  );
};

export default GoogleMapProvider;
