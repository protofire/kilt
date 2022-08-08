import { statusToCeil } from '../../constants/claim-status';

// attestation.
export const onListRequests = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return [
    { id: 1, values: [{ value: '0xCase2SD..ASD' }, { value: 'CType 1' }, statusToCeil.verified] },
    { id: 2, values: [{ value: '0xCase2SD..ASD' }, { value: 'CType 1' }, statusToCeil.pending_payment] },
    { id: 3, values: [{ value: '0xCase2SD..ASD' }, { value: 'CType 1' }, statusToCeil.unverified] }
  ];
};

// Loads detailed information about
// the claim request for attestation
export const onLoadRequest = async (id: number) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return {
    id,
    address: '0xCase2SD..ASD',
    status: 'unverified',
    ctype: 'CType 1',
    terms: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore 
      magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea 
      commodo consequat.`,
    claimerText: 'some text from claimer',
    files: ['file1.png', 'file2.jpeg', 'file3.pdf']
  };
};
