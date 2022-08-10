import {
  Did,
  Credential,
  Attestation,
  KeyringPair,
  KeystoreSigner,
  IRequestForAttestation
} from "@kiltprotocol/sdk-js";
import { submitTx } from "./utils";

export const createAttestation = async (
  keystore: KeystoreSigner,
  requestForAttestation: IRequestForAttestation,
  attester: Did.FullDidDetails,
  submitterAccount: KeyringPair,
): Promise<Credential>  => {
  // Create an attestation object and write its root hash on the chain
  // using the provided attester's full DID.
  const attestation = Attestation.fromRequestAndDid(
    requestForAttestation,
    attester.uri
  );

  const storeTx = await attestation.getStoreTx();
  const attestationTx = await attester.authorizeExtrinsic(
    storeTx,
    keystore,
    submitterAccount.address
  );
  await submitTx(attestationTx, submitterAccount);

  // Return the credential, which is the combination of the original request for attestation
  // plus the on-chain attestation info.
  return Credential.fromRequestAndAttestation(
    requestForAttestation,
    attestation
  );
}
