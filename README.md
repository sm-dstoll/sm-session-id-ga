# Working to add the session ID to Google Analytics

This code base is identical to the Soul Machines react reference UI as of Sept 9, 2022. 

The goal of this project is to uncover methods to add the Soul Machines session ID to the tracking done by Google analytics. This code base differs from its original in that in the redux store (`src/store/sm/index.js`), the session ID is being captured and saved into state. Additionally, we are able to access that session ID value in the `Router.js`, which is where the current Google Analytics integration is happening. 

The project is already using the `react-ga` NPM package to simplify the integration with GA. Documentation for this package is here: `https://github.com/react-ga/react-ga`.

Note that there is now an environment variable `REACT_APP_GA_TRACKING_ID` in `.env.example` that will need to be added to your `.env` file.

---

# Soul Machines React Reference UI

This template succeeds the previous [react-template](https://github.com/soulmachines/react-template). This is re-write is based on [create-react-app](https://github.com/facebook/create-react-app) and is designed mainly to provide a simple and familiar developer experience.

This template contains functional examples of how the user flow and interaction with the Digital Person should work, and likley require styling chanages to suit branding requirements.

## Setup

In order to run this application, you'll either need an API key or a token server. Most projects will use an API key--token servers are only necessary when interfacing with a non-native NLP through a orchestration server.

### Copy `.env.example` contents into `.env`
Create an empty text file called `.env` and copy the contents of `.env.example` into it. These environment variables are required for the UI to run.

If using an API key, set `REACT_APP_PERSONA_AUTH_MODE` to `0` and populate `REACT_APP_TOKEN_URL` with your key.

If using an orchestration server, set `REACT_APP_PERSONA_AUTH_MODE` to `1` and populate `REACT_APP_TOKEN_URL` with your token server endpoint and set `REACT_APP_TOKEN_URL` to `true`.

### `npm install`
Run to install the project's dependencies.

### `npm start`
Starts the development server. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will automatically reload when you make changes.

### `npm run build`
Builds the app for production to the `build` folder. The files will be bundled and minified for production.

## Linting & Code Style

This project strictly follows [AirBnB's JavaScript style guide](https://github.com/airbnb/javascript). We recommend you install [ESLint](https://eslint.org/) in your editor and adhere to its recommendations.

We have also provided an `.editorconfig` file that you can use in your editor to match the indentation, whitespace, and other styling rules we used in creating this template.
