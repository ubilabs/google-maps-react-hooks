# `useGeocodingService` Hook Setup Example

This is an example setup to show the usage of the **useGeocodingService hook** with the Google Maps React Hooks library.

## Instructions

To run this project, clone the Google Maps React Hooks repository locally.

First go to the root of the repository and run

```shell
npm install
```

once to install all dependencies.

Then start this example locally with

```shell
npm run start:geocoding-service-example
```

**NOTE**:
To see the examples it is needed to add an `.env` file with a [Google Maps API key](https://developers.google.com/maps/documentation/embed/get-api-key#:~:text=Go%20to%20the%20Google%20Maps%20Platform%20%3E%20Credentials%20page.&text=On%20the%20Credentials%20page%2C%20click,Click%20Close.) in the following format:

```
GOOGLE_MAPS_API_KEY="<YOUR API KEY HERE>"
```

An example can be found in `.env.example`.

## Output

The project will start at [localhost:1234](http://localhost:1234) and show a Google Map where the user can click on the map and the coordinates will be reversed geocoded into a human readable address.

![image](https://user-images.githubusercontent.com/39244966/196205574-b0c318a8-1e55-4c52-a18f-43fc13d2d903.png)
