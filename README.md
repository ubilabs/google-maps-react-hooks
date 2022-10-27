# Google Maps React Hooks
[![npm version](https://img.shields.io/npm/v/@ubilabs/google-maps-react-hooks)](https://www.npmjs.com/package/@ubilabs/google-maps-react-hooks) [![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## Description

This is a JavaScript library to easily implement a Google Maps map into your React application. It comes with a collection of React hooks to access the Google Maps map instance all over your components and to handle some common interactions with the map.

#### Table of contents
- [Google Maps React Hooks Library](./library)
- [Examples](./examples)
  - [Basic Google Map](./examples/basic-google-map)
  - [Google Map with Markers](./examples/google-map-with-markers)
  - [Places Autocomplete](./examples/places-autocomplete)
  - [Directions Service](./examples/directions)
  - [Geocoding Service](./examples/geocoding)
  - [Places Library](./examples/places)
  - [Distance Matrix Service](./examples/distance-matrix)
- [Development](#development-only-for-maintainers)
  - [Library](#library)
  - [Examples](#examples)
  - [Publish library on npm](#publish-library-on-npm)

## Development (only for Maintainers)

Clone the repository and run

```sh
npm install
```

in the project root to install all dependencies.

### Library

To develop the Google Maps React Hooks library, start the project locally with

```sh
npm run start:library
```

### Examples

To develop one of the examples, you have to create a `.env` file in the `/examples` directory first and add your [Google Maps API key](https://developers.google.com/maps/documentation/embed/get-api-key#:~:text=Go%20to%20the%20Google%20Maps%20Platform%20%3E%20Credentials%20page.&text=On%20the%20Credentials%20page%2C%20click,Click%20Close.) to it in the following format:

```
GOOGLE_MAPS_API_KEY="<YOUR API KEY HERE>"
```

An example can be found in `/examples/.env.example`.

Start the example locally with the appropriate task, e.g. `npm run start:map-example`. You can find the right task in the README of the example you want to start.

The example runs on [localhost:1234](http://localhost:1234).

### Publish library on npm

A new library version is automatically published by Github Actions as soon as a new version tag is available.
To trigger a new release, run:

```sh
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git] -w library
```

**NOTE**: Make sure to not forget setting the context to the library workspace with `-w library` when running the command from project root.