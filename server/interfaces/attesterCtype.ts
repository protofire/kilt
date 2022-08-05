import { DidUri, InstanceType } from '@kiltprotocol/sdk-js';

export interface IAttesterCtype {
  attesterDid: DidUri | string,
  ctypeName: string,
  ctypeId: string,
  quote: number,
  terms: string,
  properties?: IPropertyMap
}

interface IPropertyMap {
  [name: string]: { 
    $ref?: string | undefined;
    type?: InstanceType | undefined;
    format?: string | undefined;
  }
}