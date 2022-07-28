import { mnemonicGenerate } from "@polkadot/util-crypto";
import * as Kilt from "@kiltprotocol/sdk-js";

// create attesters account to pay for fees
export async function generateAccount(): Promise<{
  account: Kilt.KeyringPair;
  mnemonic: string;
}> {
  // connect to blockchain
  await Kilt.init({ address: process.env.WSS_ADDRESS });

  // setup keyring
  const keyring = new Kilt.Utils.Keyring({
    ss58Format: 38,
    type: "sr25519",
  });

  // generate a mnemonic
  const mnemonic = mnemonicGenerate();
  const account = keyring.addFromMnemonic(mnemonic);

  return { account, mnemonic };
}

export async function getAccount(mnemonic: string): Promise<Kilt.KeyringPair> {
  await Kilt.init({ address: process.env.WSS_ADDRESS })
  const keyring = new Kilt.Utils.Keyring({
    ss58Format: 38,
    type: 'sr25519'
  })
  return keyring.addFromMnemonic(mnemonic)
}

export async function generateKeypairs(
  keystore: Kilt.Did.DemoKeystore,
  mnemonic?: string
): Promise<{
  authentication: Kilt.NewDidVerificationKey
  keyAgreement: Kilt.NewDidEncryptionKey
  assertionMethod: Kilt.NewDidVerificationKey
  capabilityDelegation: Kilt.NewDidVerificationKey
}> {
  // signing keypair
  const signing = await keystore.generateKeypair({
    alg: Kilt.Did.SigningAlgorithms.Sr25519,
    seed: mnemonic
  })

  // encryption keypair
  const encryption = await keystore.generateKeypair({
    alg: Kilt.Did.EncryptionAlgorithms.NaclBox,
    seed: mnemonic
  })

  // build the Attester keys object
  const keys = {
    authentication: {
      publicKey: signing.publicKey,
      type: Kilt.VerificationKeyType.Sr25519
    },
    keyAgreement: {
      publicKey: encryption.publicKey,
      type: Kilt.EncryptionKeyType.X25519
    },
    capabilityDelegation: {
      publicKey: signing.publicKey,
      type: Kilt.VerificationKeyType.Sr25519
    },
    assertionMethod: {
      publicKey: signing.publicKey,
      type: Kilt.VerificationKeyType.Sr25519
    }
  }

  return keys
}

export async function createFullDid(): Promise<Kilt.Did.FullDidDetails> {
  await Kilt.init({ address: process.env.WSS_ADDRESS })
  const { api } = await Kilt.connect()
  // const mnemonic = process.env.ATTESTER_MNEMONIC as string

  let { account, mnemonic } = await generateAccount();

  // Init keystore and load attester account
   account = await getAccount(mnemonic)
  const keystore = new Kilt.Did.DemoKeystore()

  // generate the keypairs
  // we are using the same mnemonic as for the attester account, but we could also use a new secret
  const keys = await generateKeypairs(keystore, mnemonic)

  // get extrinsic that will create the DID on chain and DID-URI that can be used to resolve the DID Document
  return new Kilt.Did.FullDidCreationBuilder(api, keys.authentication)
    .addEncryptionKey(keys.keyAgreement)
    .setAttestationKey(keys.assertionMethod)
    .setDelegationKey(keys.capabilityDelegation)
    .buildAndSubmit(keystore, account.address, async (creationTx) => {
      await Kilt.BlockchainUtils.signAndSubmitTx(creationTx, account, {
        resolveOn: Kilt.BlockchainUtils.IS_FINALIZED
      })
    })
}

export async function getFullDid(
  didUri: Kilt.DidUri
): Promise<Kilt.Did.FullDidDetails> {
  // make sure the did is already on chain
  const onChain = await Kilt.Did.FullDidDetails.fromChainInfo(didUri)
  if (!onChain) throw Error(`failed to find on chain did: ${didUri}`)
  return onChain
}