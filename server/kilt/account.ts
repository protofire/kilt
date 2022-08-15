import { SigningAlgorithms } from '@kiltprotocol/sdk-js';
import { Keyring } from '@polkadot/keyring';

export const getOwnerKeyring = () => {
  const mnemonic = process.env.OWNER_MNEMONIC;
  if (!mnemonic) throw Error('Must add OWNER_MNEMONIC env var');

  const keyring = new Keyring({
    type: SigningAlgorithms.Sr25519,
    ss58Format: 38
  });

  keyring.addFromMnemonic(mnemonic);
  return keyring;
};
