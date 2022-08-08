import { DidUri, InstanceType } from '@kiltprotocol/sdk-js';

interface IPropertyMap {
  readonly [name: string]: {
    readonly $ref?: string | undefined;
    readonly type?: InstanceType | undefined;
    readonly format?: string | undefined;
  }
}

export interface IAttester {
  readonly did: string;
  readonly name: string;
}

export interface IAttesterCtype {
  readonly _id?: string;
  readonly attesterDidUri: DidUri;
  readonly ctypeName?: string;
  readonly ctypeId: string;
  readonly quote?: number;
  readonly terms?: string;
  readonly properties?: IPropertyMap
}
