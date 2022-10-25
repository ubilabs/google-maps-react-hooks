# `useElevationService` Hook Setup Example

This is an example setup to show the usage of the **useElevationService hook** with the Google Maps React Hooks library.

## Instructions

To run this project, clone the Google Maps React Hooks repository locally.

First go to the root of the repository and run

```shell
npm install
```

once to install all dependencies.

Then start this example locally with

```shell
npm run start:elevation-example
```

**NOTE**:
To see the examples it is needed to add an `.env` file with a [Google Maps API key](https://developers.google.com/maps/documentation/embed/get-api-key#:~:text=Go%20to%20the%20Google%20Maps%20Platform%20%3E%20Credentials%20page.&text=On%20the%20Credentials%20page%2C%20click,Click%20Close.) in the following format:

`GOOGLE_MAPS_API_KEY="<YOUR API KEY HERE>"`

An example can be found in `.env.example`.

## Output

The project will start at [localhost:1234](http://localhost:1234) and show an infowindow on a map asking to click somewhere on the map to see the elevation of that position.

![image](https://user-images.githubusercontent.com/39244966/197743973-de8d7a95-0e8e-4564-b9de-68913e17d6ca.png)

![image](https://user-images.githubusercontent.com/39244966/197744010-bd381b26-432e-497f-a0c5-0fd27f107f81.png)