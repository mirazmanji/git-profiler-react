# GIT PROFILER

# Restfully query a user to get their profile picture and number of star gazers
#### Star gazers is defined as the aggregate number of stars a user has received on each of their repos.

<br/>

#### This project was built with React 18.2 using the latest functional components and hooks functionality.  
* React Class Components are becoming obsolete which is why this was done in functional components with hooks. 
* I could have used Redux to manage states but that's too much overhead for a lightweight app.
#### The API server runs on express using a cloud MongoDB server for caching git users.
* Access instructions to the MongoDB server are in the .env file.
#### The styling was done with Bootstrap 5.

<br/>

## Available Scripts

### `npm i`

Install the latest modules in the project and /server directory.

### `npm start`

Run this in the project directory and also in the /server directory for caching and API calls:

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

You may also see any transaction logs in the console when you query usernames.

The API server is configured to run on port 8081.  Remember to run npm start in the /server directory.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

<br/>

![This is an image preview of the App](public/AppPreview.png)