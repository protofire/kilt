import * as Kilt from '@kiltprotocol/sdk-js';
import type { ApiPromise } from '@polkadot/api';

let api: ApiPromise | undefined;

const blockchain = () => {

  const init = async () => {
    const endpoint = process.env.ENDPOINT ?? 'wss://peregrine.kilt.io/parachain-public-ws';
    await Kilt.init({ address: endpoint });
    const blockchain = await Kilt.connect();
    api = blockchain.api;
  }

  return {
    init,
    api
  };
}

export { blockchain };
