### Server for KILT cookbook

1. Create .env with
```bash
PORT=8000
DB_URI=mongodb+srv:...
ENDPOINT=wss://peregrine.kilt.io/parachain-public-ws
OWNER_MNEMONIC=
OWNER_DID=
SECRET=
ORIGIN=http://localhost:3000
```
2. Run `yarn build`
3. Run `yarn dev`

Check `localhost:8000/`
