import { DidUri } from '@kiltprotocol/sdk-js';
import { IAttestedCredential } from '../../interfaces/credential';

export const onLoadCredential = async (id: number) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return {
    id: 'someid',
    attesterDidUri: 'kilt:did:...' as DidUri,
    attesterName: 'Attester 1',
    ctypeName: 'CType 1',
    status: 'verified',
    terms: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore 
      magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea 
      commodo consequat.`,
    claimerText: 'some text from claimer'
  } as IAttestedCredential;
};
