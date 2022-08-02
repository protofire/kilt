# KILT Attestation workflow recipe 🧬
Recipe application that shows an attestation process in order to verify CTypes for DiDs on the **KILT** blockchain.

Learn more about attestation [here](https://docs.kilt.io/docs/develop/workshop/attestation).

> :warning: **Disclaimer:** This code is not for production use. It serves as an example workflow for dids CTypes attestation.

## About this project
This is a monorepo project containing a frontend application built using `create-react-app` at the root folder of the project and a server `node.js` application under the `server` forlder.

## Sporran wallet setup
In order to run and debug the app you will need to setup the `Sporran` testing wallet.

#### Steps
1. Create testing KILT credentials using the Distillery CLI app. Follow the Setup claimer flow from the following link: [Kilt distillery app](https://github.com/KILTprotocol/kilt-distillery-cli).
   
2. Install Sporran testing wallet following the Readme file from the following link: [Sporran wallet setup](https://github.com/BTE-Trusted-Entity/sporran-extension)

3. Finally: 
   1. go to the Sporran wallet and create a new identity. 
   2. Once you have created the identity, you will need credentials in order to get your ***on-chain DiD***. Select the **+ import credentials** button.
   3. Drag and drop one of the previous `.json` files (credentials) created from the distillery app (see step 1).

<img src="./docs/import_identity.png?raw=true" alt="Step 3 Image 1" width="30%"/>
<img src="./docs/import_credential.png?raw=true" alt="Step 3 Image 2" width="30%"/>
<img src="./docs/drop_json.png?raw=true" alt="Step 3 Image 3" width="30%"/>

## Frontend Available Scripts
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
List of available scripts under the `server` forlder.

1. `yarn install`

Installs required dependencies for running the app.

2. `yarn build`

Builds the app for production to the `dist` folder

2. `yarn start`

Builds and runs the application under the `dist` folder. 

1. `yarn dev`

Builds and runs the app in watch mode using `nodemon`, any change reloads the app.