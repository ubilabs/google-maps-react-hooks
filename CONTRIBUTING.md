# Contributing to Ubilabs Google Maps React Hooks

We are happy you came here and thank you for contributing! 🎉 

To get started there are some things that need to be set up.

----

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

----

## Issue Tracker

- before submitting a new issue, please:

    - check for existing related issues

    - check the issue tracker for a specific upstream project that may be more appropriate

    - check against supported versions of this project (i.e. the latest)

- please keep discussions on-topic, and respect the opinions of others

- please contact us privately to discuss security vulnerabilities


## Pull Requests / Merge Requests

- **IMPORTANT**: by submitting a patch, you agree to allow the project owners to license your work under this [LICENSE.md](LICENSE.md)

- please provide test cases for all features and bug fixes

- provide documentation for all public API methods

- commit messages should follow the format outlined in [CONVENTIONS.md](CONVENTIONS.md)

### Code Style and Code Quality

- Testing

   - [ESLint](https://eslint.org/) configuration files are provided
   - [TypeScript](https://www.typescriptlang.org/) check for types and TypeScript setup
   - [Prettier](https://prettier.io/) code formatter

- run `npm run test` before submitting a PR to ensure that your code uses correct style and passes all tests
