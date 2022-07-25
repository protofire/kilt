import { Did, init } from "@kiltprotocol/sdk-js";
import { cryptoWaitReady } from "@polkadot/util-crypto";

export const exit = (response: any, status: any, message: any) => {
  response.statusMessage = message;
  return response.status(status).end();
}

export async function methodNotFound(request: any, response: any) {
  response.statusMessage = `method ${request.method} no found`;
  response.status(400).end();
}

export async function getEncryptionKey(encryptionKeyId: any) {
  await cryptoWaitReady();
  await init({ address: process.env.WSS_ADDRESS });
  const encryptionKey = await Did.DidResolver.resolveKey(encryptionKeyId);
  return encryptionKey
}