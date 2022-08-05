import { InstanceType } from "@kiltprotocol/sdk-js";

export interface IAttester {
  did: string;
  name: string;
}

export interface IAttesterCtype {
  _id?: string;
  attesterDid: string;
  ctypeName?: string;
  ctypeId: string;
  quote?: number;
  terms?: string;
  properties?: IPropertyMap
}

interface IPropertyMap {
  [name: string]: { 
    $ref?: string | undefined;
    type?: InstanceType | undefined;
    format?: string | undefined;
  }
}
