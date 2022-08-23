# KILT Attestation workflow recipe 🧬
Recipe application that shows an attestation process in order to verify CTypes for DiDs on the **KILT** blockchain.

Learn more about attestation [here](https://docs.kilt.io/docs/develop/workshop/attestation).

> :warning: **Disclaimer:** This code is not for production use. It serves as an example workflow for DiDs CTypes attestation.

### About this project
This is a monorepo project containing a frontend application built using `create-react-app` at the root folder and a backend `node.js` application under the `server` folder.

### Sporran wallet setup
In order to run and debug the app you will need to setup the `Sporran` testing wallet.

#### Steps
1. Create testing KILT credentials using the Distillery CLI app. Follow the `Setup claimer flow` from the following link: [Kilt distillery app](https://github.com/KILTprotocol/kilt-distillery-cli).
   
2. Install Sporran testing wallet following the Readme file from the following link: [Sporran wallet setup](https://github.com/BTE-Trusted-Entity/sporran-extension)

3. Finally: 
   1. go to the Sporran wallet and create a new identity. 
   2. Once you have created the identity, you will need credentials in order to get your ***on-chain DiD***. Select the **+ import credentials** button.
   3. Drag and drop one of the previous `.json` files (credentials) created from the distillery app (see step 1).
<div>
<img src="./docs/import_identity.png?raw=true" alt="Step 3 Image 1" width="30%"/>
<img src="./docs/import_credential.png?raw=true" alt="Step 3 Image 2" width="30%"/>
<img src="./docs/drop_json.png?raw=true" alt="Step 3 Image 3" width="30%"/>
</div>

### Running this app
1. Create **MongoDB** database for storing the attesters and claimers information. You can create it for free using https://cloud.mongodb.com/
   1. Once you finish the account setup, you can create a database (still using the free tier).
   2.  Go to **databse &rarr; Connect &rarr; Connect your application**.
   3.  Save the `uri` string from the example code (important for the next step)
       ```js
       const uri = "mongodb+srv://..." // <- copy this string
       ```
2. Set the enviroment variables in both *client* and *server* applications.
   1. Create a `.env` file in the root folder of the project and add the following variables:
   ```bash
   # Just for local env
   REACT_APP_SERVER_URL=http://localhost:8000
   REACT_APP_WS_BASE_URL=ws://localhost:8000/websockets
   ```
   1. Create a `.env` file inside the `/server` folder and add the following variables:
   ```bash
   PORT=8000
   DAPP_NAME=kilt
   WSS_ADDRESS=wss://peregrine.kilt.io/parachain-public-ws
   ENDPOINT=wss://peregrine.kilt.io/parachain-public-ws
   DB_URI=mongodb+srv:... # the URI you copied from mongoDB.
   OWNER_DID=did:kilt:... # App owner full DiD.
   OWNER_MNEMONIC=... # App owner mnemonic
   ```
3. **Running locally:** Open 2 terminals, one for the *server* app and another for the *client* app. In the first one:
      ```bash
      cd server
      yarn install
      yarn dev # runs the server in watch mode
      ```
      In the second one:
      ```bash
      yarn install
      yarn start # runs the frontend in watch mode
      ```
### Frontend Available Scripts
List of available scripts under the root folder.

1. `yarn install`

Installs required dependencies for running the app.

2. `yarn start`

Launches the application in `localhost:3000`

3. `yarn test`

Launches the test runner in the interactive watch mode.

4. `yarn build`

Builds the app for production to the `build` folder

5. `yarn deploy`

Runs `yarn build` to update `/build` folder, copies the content to `gh-pages` branch and pushes the app in github pages.

[Link to app](https://protofire.github.io/kilt/)

## Server Available Scripts
List of available scripts under the `server` folder.

1. `yarn install`

Installs the required dependencies for running the app.

2. `yarn build`

Builds the app for production into the `dist` folder

2. `yarn start`

Builds and runs the application into the `dist` folder. 

1. `yarn dev`

Builds and runs the app in watch mode using `nodemon`, any change reloads the app.
