import {} from 'googlemaps';

interface GoogleMapOptions {
  container: HTMLElement;
  googleMapsAPIKey: string;
  config: google.maps.MapOptions;
  onLoadScript: () => void;
  onLoadMap: (loadedMap: GoogleMap) => void;
  libraries?: string[];
  language?: string;
  region?: string;
  mapIds?: string[];
}

/**
 * A Google Maps wrapper class
 */
export default class GoogleMap {
  container?: HTMLElement;
  map?: google.maps.Map;

  constructor(options: GoogleMapOptions) {
    if (window.google && window.google.maps) {
      this.initMap(options);
    } else {
      this.loadGoogleScript(options);
    }
  }

  /**
   * Loads the google maps script
   */
  private loadGoogleScript(options: GoogleMapOptions): void {
    const scriptTag = document.createElement('script');
    const defaultLanguage = window.navigator.language.slice(0, 2);
    const defaultRegion = window.navigator.language.slice(3, 5);
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute(
      'src',
      `https://maps.googleapis.com/maps/api/js?key=${
        options.googleMapsAPIKey
      }&language=${options.language || defaultLanguage}&region=${options.region || defaultRegion}
      }${
        options.libraries && `&libraries=${options.libraries.join(',')}`
      }${
        options.mapIds && `&map_ids=${options.mapIds.join(',')}`
      }`
    );
    scriptTag.onload = (): void => {
      options.onLoadScript();
      this.initMap(options);
    };
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
  }

  /**
   * Initialize the google map
   */
  private initMap(options: GoogleMapOptions): void {
    const {container, config} = options;

    this.container = container;
    this.map = new google.maps.Map(this.container, config);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.map && options.onLoadMap(this);
    });
  }

  /**
   * Remove event listeners
   */
  public destroyListeners = (): void => {
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
    }
  };

  /**
   * Remove map instance
   */
  public destroyComplete = (): void => {
    if (this.map) {
      document.querySelectorAll('script[src^="https://maps.googleapis.com"]').forEach(script => {
        script.remove();
      });
      if (window.google && window.google.maps) {
        delete window.google.maps;
      }
    }
  };
}
