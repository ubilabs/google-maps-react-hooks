# `GoogleMapsProvider` Component

The `GoogleMapsProvider` is a component to wrap around the code where the map should be available.

```tsx
<GoogleMapsProvider googleMapsAPIKey="YOUR API KEY HERE">
  {children}
</GoogleMapsProvider>
```

## Properties

Properties that can be passed to the `GoogleMapsProvider` that are either the container to hold the map instance or [Maps JavaScript API URL Parameters](https://developers.google.com/maps/documentation/javascript/url-params).

```TypeScript
interface GoogleMapsProviderProps {
  googleMapsAPIKey: string;
  mapContainer?: HTMLElement | null;
  mapOptions?: google.maps.MapOptions;
  libraries?: string[];
  language?: string;
  region?: string;
  version?: string;
  authReferrerPolicy?: string;
  onLoadScript?: () => void;
  onLoadMap?: (map: google.maps.Map) => void;
}
```

---

**googleMapsAPIKey** (_compulsory property_)

The Google Maps JavaScript API Key.

```Typescript
googleMapsAPIKey: string;
```

See: [Use API Key](https://developers.google.com/maps/documentation/embed/get-api-key)

---

**mapContainer** (_optional property_)

A reference to the HTML element that displays the map.
Usually we do this by adding a `div` element.
Without the `mapContainer` provided, no visual map will be displayed.

```Typescript
mapContainer?: HTMLElement | null;
```

_Example:_

The `mapContainer` will be passed to the `GoogleMapsProvider` in the following way:

```tsx
function App() {
  const [mapContainer, setMapContainer] = useState(null);
  const mapRef = useCallback(node => {
    node && setMapContainer(node);
  }, []);

  return (
    <GoogleMapsProvider
      googleMapsAPIKey="YOUR API KEY HERE"
      mapContainer={mapContainer}>
      <React.StrictMode>
        <div ref={mapRef} style={{height: '100%'}} />
      </React.StrictMode>
    </GoogleMapsProvider>
  );
}
```

See: [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)

**NOTE**: Make sure to give your element a height (by default divs usually have no height), otherwise you won't see the map displayed.

---

**mapOptions** (_optional property_)

The Google Maps MapOptions.

```Typescript
mapOptions?: google.maps.MapOptions;
```

_Example:_

```Typescript
const mapOptions = {
  center: {lat: 53.5582447, lng: 9.647645},
  zoom: 6
};
```

See: [MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)

**NOTE**: If the `center` and `zoom` options are not provided here, the map will not be displayed until they are set with `map.setCenter(latLng)` and `map.setZoom(zoom)`.

_Example:_

MapOptions can also be set or changed later in another component in the following way:

```Typescript
import {useGoogleMap} from '@ubilabs/google-maps-react-hooks';

const mapOptions = {
  center: {lat: 53.5582447, lng: 9.647645},
  zoom: 6,
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: {
    position: 3 // Right top
  }
};

const map = useGoogleMap();

map?.setOptions(mapOptions);
```

---

**libraries** (_optional property_)

Additional Google Maps libraries to load ('drawing', 'geometry', 'places' or 'visualization').

```Typescript
libraries?: string[];
```

See: [Libraries](https://developers.google.com/maps/documentation/javascript/libraries)

---

**language** (_optional property_)

By default Google Maps will use the preferred language from the browser setting. This is the property to set it manually.

```Typescript
language?: string;
```

See: [Localization](https://developers.google.com/maps/documentation/javascript/localization)

---

**region** (_optional property_)

By default Google Maps will use the preferred region from the browser setting. This is the property to set it manually.

```Typescript
region?: string;
```

See: [Localization](https://developers.google.com/maps/documentation/javascript/localization)

---

**version** (_optional property_)

Use this parameter to specify a Google Maps JavaScript API version.

```Typescript
version?: string;
```

See: [Versions](https://developers.google.com/maps/documentation/javascript/versions)

---

**authReferrerPolicy** (_optional property_)

Use this parameter to set auth_referrer_policy=origin when an URL on the same origin uses the API Key, to limit the amount of data sent when authorizing requests.

```Typescript
authReferrerPolicy?: string;
```

See: [auth_referrer_policy](https://developers.google.com/maps/documentation/javascript/url-params)

---

**onLoadScript** (_optional property_)

A callback function that is called, when the Google Maps API is loaded.

```Typescript
onLoadScript?: () => void;
```

_Example:_

```tsx
<GoogleMapsProvider
  googleMapsAPIKey="YOUR API KEY HERE"
  onLoadScript={() => {
    console.log(google.maps);
  }}>
  ...
</GoogleMapsProvider>
```

**onLoadMap** (_optional property_)

A callback function that is called, when the Google Map map is loaded.

```Typescript
onLoadMap?: (map: google.maps.Map) => void;
```

_Example:_

```tsx
<GoogleMapsProvider
  googleMapsAPIKey="YOUR API KEY HERE"
  onLoadMap={map => map.setZoom(4)}>
  ...
</GoogleMapsProvider>
```
