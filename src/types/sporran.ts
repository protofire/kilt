
export interface ISporran {
  name: string;
  signExtrinsicWithDid: (arg: any) => Promise<any>,
  signWithDid: (arg: any) => Promise<any>,
  specVersion: string,
  startSession: (dappName: any, dAppEncryptionKeyUri: any, challenge: any) => Promise<any>,
  version: string,
}