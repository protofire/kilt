import {
  Did,
  Credential,
  Attestation,
  KeyringPair,
  KeystoreSigner,
  IRequestForAttestation
} from '@kiltprotocol/sdk-js';
import { submitTx } from './utils';

export const createAttestation = async (
  requestForAttestation: IRequestForAttestation,
  attester: Did.FullDidDetails,
): Promise<Credential> => {
  const attestation = Attestation.fromRequestAndDid(
    requestForAttestation,
    attester.uri
  );

  return Credential.fromRequestAndAttestation(
    requestForAttestation,
    attestation
  );
};

export const submitAttestation = async (
  keystore: KeystoreSigner,
  attester: Did.FullDidDetails,
  requestForAttestation: IRequestForAttestation,
  submitterAccount: KeyringPair
) => {
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
};
