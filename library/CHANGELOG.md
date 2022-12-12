## [2.0.2](https://github.com/ubilabs/google-maps-react-hooks/compare/v2.0.1...v2.0.2) (2022-12-12)


### Bug Fixes

* **examples:** update types ([e79a89e](https://github.com/ubilabs/google-maps-react-hooks/commit/e79a89e4ef27701e91e865afd0bc65dc724cbb1b))



## [2.0.1](https://github.com/ubilabs/google-maps-react-hooks/compare/v2.0.0...v2.0.1) (2022-12-09)


### Bug Fixes

* **app:** move react strict to fix api load ([aba24ed](https://github.com/ubilabs/google-maps-react-hooks/commit/aba24ed2187be77f0128c4411c03752c0343b7b5))
* **autocomplete-widget:** fix styles import for autocomplete widget ([6962db8](https://github.com/ubilabs/google-maps-react-hooks/commit/6962db8882ab124068625161f467368599f40f72))
* **distance-matrix-service:** update import name for useGeocodingService hook ([c5a95c3](https://github.com/ubilabs/google-maps-react-hooks/commit/c5a95c337aaaf5c85b86f320165e0ee748f48767))
* **distance-matrix:** types were missing ([68ecb32](https://github.com/ubilabs/google-maps-react-hooks/commit/68ecb325ca6ab5ff9d655cb52cd24abdeba05d56))
* **elevation:** check for elevator ([64e278e](https://github.com/ubilabs/google-maps-react-hooks/commit/64e278e8ccdd464beb188d2e845e80552cfc406e))
* **examples:** stop rendering GoogleMapsProvider twice because of strict mode ([3cecd10](https://github.com/ubilabs/google-maps-react-hooks/commit/3cecd10c12644af888e139819eca463eece31c8a))
* **google-maps-provider:** fixes advanced markers break map loading ([6bb30e7](https://github.com/ubilabs/google-maps-react-hooks/commit/6bb30e7a8e7e7c54cb0b5cc7720ef36daf2e7d7d))
* **google-maps-provider:** quick fix google maps check ([ce6ee04](https://github.com/ubilabs/google-maps-react-hooks/commit/ce6ee0404cd505253f201cab75a65ba4af776ef1))
* **map-clean-up:** clean up map instance and scripts correctly ([eb93d71](https://github.com/ubilabs/google-maps-react-hooks/commit/eb93d712090696a51de874f36bb32ddc58dfee72))
* **map-clean-up:** make sure Google Maps script is added only once ([40d56da](https://github.com/ubilabs/google-maps-react-hooks/commit/40d56da6e5113bed43a94e84137df036402f4437))
* **package:** use cross-env to make environment variables work properly for all platforms ([8fe9b97](https://github.com/ubilabs/google-maps-react-hooks/commit/8fe9b97a26129fe0cc0104bfe883cf97181c4e62))
* **package:** use right start script ([ce36728](https://github.com/ubilabs/google-maps-react-hooks/commit/ce3672802964a34dfe3157293737cb0d4469e618))
* **places-service-with-element:** fix typos ([71272e8](https://github.com/ubilabs/google-maps-react-hooks/commit/71272e89fbcd5a3acd2ea66cd7fd5822b252b292))
* **places-service-with-element:** use div ref with container and state ([fb8edba](https://github.com/ubilabs/google-maps-react-hooks/commit/fb8edbaeb525e3b0b881fc9ce9da016d46630d41))
* **readme:** use relative links ([021f7cd](https://github.com/ubilabs/google-maps-react-hooks/commit/021f7cded11da59f839665065de6028be31bb698))
* **street-view-panorama:** condition for zoom should allow 0 ([1e0246b](https://github.com/ubilabs/google-maps-react-hooks/commit/1e0246b8c9d047232b0546720e160f5845fc08f4))


### Code Refactoring

* **google-maps-provider:** rename Google Maps provider component ([12f5c1e](https://github.com/ubilabs/google-maps-react-hooks/commit/12f5c1e98f381e13c72455efa8c9cb7d535fb042))
* **google-maps-provider:** rename map options property ([3b04c66](https://github.com/ubilabs/google-maps-react-hooks/commit/3b04c66e70eff91bffaf99f310ad97f0c9b43fe2))


### Features

* **directions:** add directions renderer to hook return value ([2e225cf](https://github.com/ubilabs/google-maps-react-hooks/commit/2e225cf908e2c9030c68373fd42b75ddfa754556))
* **examples:** add autocomplete service example ([e2e000b](https://github.com/ubilabs/google-maps-react-hooks/commit/e2e000baddfd5ca325400a4887236fa311383660))
* **examples:** add elevation service example ([d2a4f16](https://github.com/ubilabs/google-maps-react-hooks/commit/d2a4f16dff8d1ede952cb08fd250a531c529131e))
* **examples:** add example for max zoom hook ([2dd78ba](https://github.com/ubilabs/google-maps-react-hooks/commit/2dd78ba8c7b28ce171b90f0a8229bae3f95cf9d3))
* **examples:** add multiple maps example ([29017ab](https://github.com/ubilabs/google-maps-react-hooks/commit/29017ab8a647f6f7048ca3ba2629977da4451b0c))
* **examples:** add places services with div element example ([adae04e](https://github.com/ubilabs/google-maps-react-hooks/commit/adae04e83cbe286c45c5608034972f98479823b4))
* **examples:** add street view panorama in div element example ([c5019ef](https://github.com/ubilabs/google-maps-react-hooks/commit/c5019ef031c4fe76dcb3321c4a6ef2efd9bc830a))
* **examples:** add street view panorama map example ([8d10884](https://github.com/ubilabs/google-maps-react-hooks/commit/8d1088402b65ddaf180ea136f921d02a88b49b84))
* **examples:** clean up examples properly ([9f667fe](https://github.com/ubilabs/google-maps-react-hooks/commit/9f667fe44cb3b00fe74c11478231e415a64b41fa))
* **examples:** update render conditions in examples ([71f5139](https://github.com/ubilabs/google-maps-react-hooks/commit/71f5139dd5128c97cebb062a518626618ec08916))
* **examples:** update render conditions in examples ([7a67d1e](https://github.com/ubilabs/google-maps-react-hooks/commit/7a67d1e70f21018cb295c0ee94fac9c7ac46a8a1))
* **google-maps-provider:** add Google Maps API loading state to context ([5f40dbb](https://github.com/ubilabs/google-maps-react-hooks/commit/5f40dbb5e47338501f71855507d23e73157e6554))
* **google-maps-provider:** handle Google Maps API loading and map creation independently ([40f16d3](https://github.com/ubilabs/google-maps-react-hooks/commit/40f16d3c72b0d2c3c998f95ffd34c33247db4c34))
* **google-maps-provider:** update Autocomplete Service hook for new maps provider and context ([a46b145](https://github.com/ubilabs/google-maps-react-hooks/commit/a46b145c2453d77f6dc9c2f26249d8cc9ba9db57))
* **google-maps-provider:** update max zoom example for new maps provider and map hook ([b9db90e](https://github.com/ubilabs/google-maps-react-hooks/commit/b9db90e819061990da329711e9c3451054aa36f1))
* **hooks:** add autocomplete-service hook ([8de5c95](https://github.com/ubilabs/google-maps-react-hooks/commit/8de5c953a6120bb52f2caf7ff7a45d6744011b4c))
* **hooks:** add street view hook ([2f44913](https://github.com/ubilabs/google-maps-react-hooks/commit/2f449132e345e58b6c5631d731b8f46e7ceab3e2))
* **multiple-map-instances:** add support for usage of multiple GoogleMapsProvider components ([4c2e57d](https://github.com/ubilabs/google-maps-react-hooks/commit/4c2e57df9c2364034bddf461b27544e06e10f81b))
* **package:** add new start script for elevation example ([e1931b5](https://github.com/ubilabs/google-maps-react-hooks/commit/e1931b514ccbe997080f1ca13d7a4147a2b13e87))
* **package:** add start script for places service with element example ([69e24cf](https://github.com/ubilabs/google-maps-react-hooks/commit/69e24cfab428285cacf34af6a2ff4b03d40bcec0))
* **package:** add start scripts for autocomplete service example ([c63ccbc](https://github.com/ubilabs/google-maps-react-hooks/commit/c63ccbc7182118940f9c6abc30c148a8f0314364))
* **package:** add start scripts for street view examples ([e4d8ae9](https://github.com/ubilabs/google-maps-react-hooks/commit/e4d8ae98c0e55e93409614e1a6c2bdff227665e2))
* **package:** adjust start script for max zoom example ([d2ceef4](https://github.com/ubilabs/google-maps-react-hooks/commit/d2ceef4c2791d4fae7f8c629c47417ce8dff998a))
* **places-service:** add divElement as props to usePlacesService hook ([3068f6c](https://github.com/ubilabs/google-maps-react-hooks/commit/3068f6c51e17e7896eb921e071b9d0c947e1e142))
* **REAME:** add links to new examples ([a81f999](https://github.com/ubilabs/google-maps-react-hooks/commit/a81f99987804ad1ee9f9d181028f439bfc43b6a6))
* **street-view-panorama:** rename to street view panorama ([0cd73d9](https://github.com/ubilabs/google-maps-react-hooks/commit/0cd73d9258bc47a28fd2de7ab9a12485e80dd34d))
* **street-view-panorama:** update hook with map contest and api loading check ([23bc975](https://github.com/ubilabs/google-maps-react-hooks/commit/23bc9750f5c5d1d264ff0280c5854625bbfdaf81))


### BREAKING CHANGES

* **google-maps-provider:** The `useGoogleMap` hook no longer returns an object, but only a Google Maps map instance instead.
The `onLoad` callback property of the `GoogleMapsProvider` was removed in favor of the new `onLoadScript` and `onLoadMap` callback properties.
* **google-maps-provider:** The `GoogleMapProvider` component was renamed to `GoogleMapsProvider`.
* **google-maps-provider:** The `GoogleMapProvider` property `options` was renamed to `mapOptions`.



## [1.6.2](https://github.com/ubilabs/google-maps-react-hooks/compare/v1.6.1...v1.6.2) (2022-10-25)


### Bug Fixes

* **index:** export map provider component ([8f2874e](https://github.com/ubilabs/google-maps-react-hooks/commit/8f2874efe890a508a0da750597d34a5b89627c72))



## [1.6.1](https://github.com/ubilabs/google-maps-react-hooks/compare/v1.6.0...v1.6.1) (2022-10-25)


### Bug Fixes

* **index:** export default elevation and maxzoom hook ([0af9eeb](https://github.com/ubilabs/google-maps-react-hooks/commit/0af9eeb75cedf19b27bf7e0ff61da517cbe9cac8))
* **README:** use right title for useDistanceMatrix example ([613d359](https://github.com/ubilabs/google-maps-react-hooks/commit/613d359954700a0d1a2c31793538bf7539537d68))


### Features

* **examples:** add distance matrix example ([49e7e2b](https://github.com/ubilabs/google-maps-react-hooks/commit/49e7e2bb1293dae57273b00166c6725e52d429a7))
* **index:** auto generated exports with named exports ([b95c7fa](https://github.com/ubilabs/google-maps-react-hooks/commit/b95c7faf6decbfc949bbafd5fc6df7134c3d8c15))
* **package:** add autogenerated exports ([17b70a3](https://github.com/ubilabs/google-maps-react-hooks/commit/17b70a361b0c3e8b47d45afa159151d3ee832ac2))
* **readme:** add links to maxzoom and elevation hooks ([a695a3f](https://github.com/ubilabs/google-maps-react-hooks/commit/a695a3fd5f92441f6d086000529922fc8a7b9b9b))



# [1.6.0](https://github.com/ubilabs/google-maps-react-hooks/compare/v1.4.7...v1.6.0) (2022-10-20)


### Bug Fixes

* **google-map:** use right condition for authReferrerPolicy parameter ([098d215](https://github.com/ubilabs/google-maps-react-hooks/commit/098d215ceb547af41e346eaf1c7752b43cf94e87))
* **package:** adjust module ([#56](https://github.com/ubilabs/google-maps-react-hooks/issues/56)) ([106311e](https://github.com/ubilabs/google-maps-react-hooks/commit/106311e1d3160fc2639338a1191c9a78872d413c))


### Features

* **elevation:** update hook name ([caf6445](https://github.com/ubilabs/google-maps-react-hooks/commit/caf6445765845d6ba9f5fbdae01c748013a71265))
* **examples:** add autocomplete places search example ([4362c83](https://github.com/ubilabs/google-maps-react-hooks/commit/4362c831b20e428d6733afca0e720838035ffa51))
* **examples:** add basic google map example ([467e213](https://github.com/ubilabs/google-maps-react-hooks/commit/467e2137a8c6d90da6173ddd8e5d20b218039b76))
* **examples:** add geocoding example ([bd724a4](https://github.com/ubilabs/google-maps-react-hooks/commit/bd724a4a5d628c806783a118d15f94d6e40c8392))
* **examples:** add google map with markers example ([ca420eb](https://github.com/ubilabs/google-maps-react-hooks/commit/ca420eb7176551c7535921775da3aff4ecdfad36))
* **examples:** add places example ([2a71d50](https://github.com/ubilabs/google-maps-react-hooks/commit/2a71d5087a0f6e288c672a701181f0b6e52794d9))
* **examples:** example for useDirections hook ([5cc6ed8](https://github.com/ubilabs/google-maps-react-hooks/commit/5cc6ed88b37ff618c1f438e49542fbb591d5adce))
* **hooks:** add elevation hook ([2c2fe2c](https://github.com/ubilabs/google-maps-react-hooks/commit/2c2fe2cf4448fa138b435a317b1438e3f9757d1f))
* **hooks:** add max zoom hook ([e1b3a7e](https://github.com/ubilabs/google-maps-react-hooks/commit/e1b3a7eeca5ef548b525062773e732339af9f2a5))
* **hooks:** add new hook for distance matrix service ([798a2a7](https://github.com/ubilabs/google-maps-react-hooks/commit/798a2a7a117e12abd042b90f0afe0f3d5833c3d7))
* **map-provider:** add authReferrerPolicy to the map provider props ([a0a5142](https://github.com/ubilabs/google-maps-react-hooks/commit/a0a51426a472f34995317050d206575d5d7e0fed))
* **readme:** add distance matrix ([3b7751f](https://github.com/ubilabs/google-maps-react-hooks/commit/3b7751faae13aa911ccdce4e17975ac093a7b972))
* **README:** add npm and license shields ([30ef219](https://github.com/ubilabs/google-maps-react-hooks/commit/30ef219637d629301e5cfdf459c5e6e8c226e612))
* **README:** add useElevationService hook to readme ([5a7efc7](https://github.com/ubilabs/google-maps-react-hooks/commit/5a7efc774caf5b492bcb3363f4cf4b01b0674054))
* **readme:** update properties with optional options ([de90170](https://github.com/ubilabs/google-maps-react-hooks/commit/de90170ba48fa2a6960c6acaed3662b344a6e228))
* **README:** update readme with authReferrerPolicy ([0a2caf3](https://github.com/ubilabs/google-maps-react-hooks/commit/0a2caf312c53bcbe20319fd4f2c81f001bf20d73))
* **README:** update readme with useMAxZoomService hook ([3b61309](https://github.com/ubilabs/google-maps-react-hooks/commit/3b613094a6b970f38eb0f2c08e4f2dbcbc871f6c))



## [1.4.7](https://github.com/ubilabs/google-maps-react-hooks/compare/v1.4.4...v1.4.7) (2021-03-01)


### Bug Fixes

* correctly import googlemaps types ([30a9dc6](https://github.com/ubilabs/google-maps-react-hooks/commit/30a9dc662ca99d7cb8b5a3072b3b0fdb5ae86fc9))



## [1.4.4](https://github.com/ubilabs/google-maps-react-hooks/compare/v1.4.3...v1.4.4) (2020-08-12)



## [1.4.3](https://github.com/ubilabs/google-maps-react-hooks/compare/v1.4.1...v1.4.3) (2020-07-28)



## [1.4.1](https://github.com/ubilabs/google-maps-react-hooks/compare/v1.4.2...v1.4.1) (2020-07-28)



## [1.4.2](https://github.com/ubilabs/google-maps-react-hooks/compare/v1.3.0...v1.4.2) (2020-07-28)


### Bug Fixes

* documentation and types ([#17](https://github.com/ubilabs/google-maps-react-hooks/issues/17)) ([44ab18b](https://github.com/ubilabs/google-maps-react-hooks/commit/44ab18bb3d47f8cfd9d84020edf80e6e1b958b07))
* **loading:** prevent 'undefined' in api url params ([#15](https://github.com/ubilabs/google-maps-react-hooks/issues/15)) ([cab45eb](https://github.com/ubilabs/google-maps-react-hooks/commit/cab45eb88c3e602d48506562e9855435bdb61413))


### Features

* **google-map:** add language change for map ([#9](https://github.com/ubilabs/google-maps-react-hooks/issues/9)) ([636e533](https://github.com/ubilabs/google-maps-react-hooks/commit/636e533b4ea7c506415d605b2dc23fbecbedb019))



# [1.3.0](https://github.com/ubilabs/google-maps-react-hooks/compare/v1.2.0...v1.3.0) (2020-07-07)


### Features

* **mapIds:** add option for cloud map styles ([#8](https://github.com/ubilabs/google-maps-react-hooks/issues/8)) ([18b8265](https://github.com/ubilabs/google-maps-react-hooks/commit/18b826575555085c9db3ebee79b80867ccd682fc))



# [1.2.0](https://github.com/ubilabs/google-maps-react-hooks/compare/v1.1.0...v1.2.0) (2020-04-21)


### Features

* **directions:** render route of given index ([#3](https://github.com/ubilabs/google-maps-react-hooks/issues/3)) ([5722dca](https://github.com/ubilabs/google-maps-react-hooks/commit/5722dcaafc6190b828a1f2c48b2609988c346a72))



# [1.1.0](https://github.com/ubilabs/google-maps-react-hooks/compare/v1.0.5...v1.1.0) (2020-04-21)


### Features

* add onLoad prop ([#4](https://github.com/ubilabs/google-maps-react-hooks/issues/4)) ([eaa634c](https://github.com/ubilabs/google-maps-react-hooks/commit/eaa634c9cd2a7e4b573b87d541c559a5ac66f054))



## 1.0.5 (2020-04-20)



