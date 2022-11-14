# Contributing to Ubilabs Google Maps React Hooks

We are happy you came here and thank you for contributing! 🎉

To get started there are some things that need to be set up.

---

#### Table of contents

- [Setting Up Dev Environment](#setting-up-dev-environment)
  - [Fork the repo and start building](#fork-the-repo-and-start-building)
- [Issue Tracker](#issue-tracker)
- [Pull Requests / Merge Requests](#pull-requests--merge-requests)
  - [Code Style and Code Quality](#code-style-and-code-quality)
- [Adding An Example](#adding-an-example)
  - [Run examples](#run-examples)
  - [Develop examples](#develop-examples)
- [Publish library on npm](#publish-library-on-npm)

---

## Setting Up Dev Environment

We will work on the `develop` branch.

We use [npm](https://www.npmjs.com/) to manage the dependencies.

### Fork the repo and start building

All new features and bug-fixes should be branched off and merged into the `develop` branch.

#### Follow these steps to get started:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of [Google Maps React Hooks](https://github.com/ubilabs/google-maps-react-hooks)).

2. Clone your fork locally

```bash
# In a terminal, cd to parent directory where you want your clone to be, then
git clone https://github.com/<your_github_username>/google-maps-react-hooks.git

# cd to the google-maps-react-hooks directory
cd google-maps-react-hooks

# Checkout the develop branch
git checkout develop
```

3. At the root directory of the project on the develop branch, install all dependencies and build.

```bash
# Install dependencies
npm install

# Start the project locally before changing code
npm run start:library
```

4. Create a new branch where to make code changes.

```bash
# Make sure you are on the develop branch
git checkout develop

# Create a new branch
git checkout -b feat/my-new-feature-branch
```

5. To see example cases of the Google Maps react hooks, checkout the [Examples Folder](./examples). To start an example:

```bash
# If not done already: Go to 'google-maps-react-hooks' directory and run:
npm install

# Run an example (look at the different examples for their start scripts):
npm run start:sample-map
```

Then open [`localhost:1234`](http://localhost:1234) in a browser.

---

## Issue Tracker

- before submitting a new issue, please:

  - check for existing related issues

  - check the issue tracker for a specific upstream project that may be more appropriate

  - check against supported versions of this project (i.e. the latest)

- please keep discussions on-topic, and respect the opinions of others

- please contact us privately to discuss security vulnerabilities

---

## Pull Requests / Merge Requests

- **IMPORTANT**: by submitting a patch, you agree to allow the project owners to license your work under this [LICENSE.md](LICENSE.md)

  - please provide test cases for all features and bug fixes

  - provide documentation for all public API methods

  - commit messages should follow the format outlined in [CONVENTIONS.md](CONVENTIONS.md)

### Code Style and Code Quality

- **Testing**

  - [ESLint](https://eslint.org/) configuration files are provided
  - [TypeScript](https://www.typescriptlang.org/) check for types and TypeScript setup
  - [Prettier](https://prettier.io/) code formatter

Run `npm run test` before submitting a PR to ensure that your code uses correct style and passes all tests

---

## Adding An Example

Each hook should have an example in the examples folder.

### Run examples

To develop one of the examples, you have to create a `.env` file in the `/examples` directory first and add your [Google Maps API key](https://developers.google.com/maps/documentation/embed/get-api-key#:~:text=Go%20to%20the%20Google%20Maps%20Platform%20%3E%20Credentials%20page.&text=On%20the%20Credentials%20page%2C%20click,Click%20Close.) to it in the following format:

```
GOOGLE_MAPS_API_KEY="<YOUR API KEY HERE>"
```

An example can be found in `/examples/.env.example`.

Start the example locally with the appropriate task, e.g. `npm run start:map-example`. You can find the right task in the README of the example you want to start.

The example runs on [localhost:1234](http://localhost:1234).

### Develop examples

If you want to provide an example for a hook, please follow these steps:

1. Create a new folder in the [examples folder](./examples) with the new example's name.

2. In the folder, create a runnable React App showing the usage of the new hook in a common use case. Checkout the current examples in the [examples folder](./examples) to see how the setup should looks like. The [basic google map example](./examples/basic-google-map/) is always a good starting point.

3. Add a npm task in the [examples workspace package.json](./examples/package.json) with a naming convention like this:

```json
"start:example-folder-name": "EXAMPLE_ENTRY=./example-folder-name/index.html npm run start:example"
```

Please compare to the other example start tasks.

4. Add another npm task in the root [package.json](./package.json) to start the example, with a naming convention like this:

```json
"start:example-folder-name-example": "EXAMPLE=example-folder-name run-p start:library start:example"
```

Please compare to the other example start tasks.

5. Add a README to each example with an explanation of what the example does, a code snippet and an image of the example app in a ratio of 2:1.

6. Link the example in the [root README](./README.md) and the [README of the library workspace](./library/README.md) in the **Examples** overview of the **Table of contents** section.

---

## Publish library on npm

A new library version is automatically published by Github Actions as soon as a new version tag is available.
To trigger a new release, run:

```sh
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git] -w library
```

**NOTE**: Make sure to not forget setting the context to the library workspace with `-w library` when running the command from project root.
