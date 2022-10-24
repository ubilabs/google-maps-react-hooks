# Basic Google Maps Setup Example

This is an example setup to show the usage of the **useDirections hook with findAndRenderRoute** with the Google Maps React Hooks library.

## Instructions

To run this project, clone the Google Maps React Hooks repository locally.

Go to the root of the repository and run


```shell
npm install
```


once to install all dependencies.

Then start this example locally with


```shell
npm run start:directions-example
```

**NOTE**:
To see the examples it is needed to add an `.env` file with a [Google Maps API key](https://developers.google.com/maps/documentation/embed/get-api-key#:~:text=Go%20to%20the%20Google%20Maps%20Platform%20%3E%20Credentials%20page.&text=On%20the%20Credentials%20page%2C%20click,Click%20Close.) in the following format:

`GOOGLE_MAPS_API_KEY="<YOUR API KEY HERE>"`

An example can be found in `.env.example`.

## Output

The project will start at [localhost:1234](http://localhost:1234) and show a Google Map with a route from Berlin to Munich, retrieved from directions.

![image](https://user-images.githubusercontent.com/39244966/196410364-de14d9a0-5ecf-430d-846e-bc04e405b889.png)
