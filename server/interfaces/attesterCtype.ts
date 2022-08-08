import { DidUri, InstanceType } from '@kiltprotocol/sdk-js';

interface IPropertyMap {
  readonly [name: string]: {
    readonly $ref?: string | undefined;
    readonly type?: InstanceType | undefined;
    readonly format?: string | undefined;
  }
}

export interface IAttesterCtype {
  readonly attesterDidUri: DidUri | string,
  readonly ctypeName: string,
  readonly ctypeId: string,
  readonly quote: number,
  readonly terms: string,
  readonly properties?: Readonly<IPropertyMap>
}
