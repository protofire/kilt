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
