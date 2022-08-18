import { DidUri, ICType } from '@kiltprotocol/sdk-js';

/**
 * This list contains all the existing ctypes supported by Kilt by default.
 * Learn more: https://github.com/KILTprotocol/ctype-index
 */
export const ctypesList: ICType[] = [
  {
    schema: {
      $id: 'email',
      $schema: 'http://kilt-protocol.org/draft-01/ctype#',
      properties: {
        Email: { type: 'string' }
      },
      title: 'Email',
      type: 'object'
    },
    owner: process.env.OWNER as DidUri,
    hash: '0x3291bb126e33b4862d421bfaa1d2f272e6cdfc4f96658988fbcffea8914bd9ac'
  },
  {
    schema: {
      $id: 'telegram',
      $schema: 'http://kilt-protocol.org/draft-01/ctype#',
      properties: {
        'First name': { type: 'string' },
        'Last name': { type: 'string' },
        'User ID': { type: 'number' },
        Username: { type: 'string' }
      },
      title: 'Telegram',
      type: 'object'
    },
    owner: process.env.OWNER as DidUri,
    hash: '0xcef8f3fe5aa7379faea95327942fd77287e1c144e3f53243e55705f11e890a4c'
  },
  {
    schema: {
      $id: 'github',
      $schema: 'http://kilt-protocol.org/draft-01/ctype#',
      properties: {
        'User ID': { type: 'string' },
        Username: { type: 'string' }
      },
      title: 'GitHub',
      type: 'object'
    },
    owner: process.env.OWNER as DidUri,
    hash: '0xad52bd7a8bd8a52e03181a99d2743e00d0a5e96fdc0182626655fcf0c0a776d0'
  },
  {
    schema: {
      $id: 'discord',
      $schema: 'http://kilt-protocol.org/draft-01/ctype#',
      properties: {
        Discriminator: { type: 'string' },
        'User ID': { type: 'string' },
        Username: { type: 'string' }
      },
      title: 'Discord',
      type: 'object'
    },
    owner: process.env.OWNER as DidUri,
    hash: '0xd8c61a235204cb9e3c6acb1898d78880488846a7247d325b833243b46d923abe'
  },
  {
    schema: {
      $id: 'zcloak',
      $schema: 'http://kilt-protocol.org/draft-01/ctype#',
      properties: {
        age: { type: 'integer' },
        id_number: { type: 'string' },
        name: { type: 'string' },
        nation: { type: 'integer' }
      },
      title: 'zCloak Primary Access',
      type: 'object'
    },
    owner: process.env.OWNER as DidUri,
    hash: '0x7f2ef721b292b9b7d678e9f82ab010e139600558df805bbc61a0041e60b61a18'
  },
  {
    schema: {
      $id: 'twich',
      $schema: 'http://kilt-protocol.org/draft-01/ctype#',
      properties: {
        'User ID': { type: 'string' },
        Username: { type: 'string' }
      },
      title: 'Twitch',
      type: 'object'
    },
    owner: process.env.OWNER as DidUri,
    hash: '0x568ec5ffd7771c4677a5470771adcdea1ea4d6b566f060dc419ff133a0089d80'
  },
  {
    schema: {
      $id: 'twitter',
      $schema: 'http://kilt-protocol.org/draft-01/ctype#',
      properties: {
        Twitter: { type: 'string' }
      },
      title: 'Twitter',
      type: 'object'
    },
    owner: process.env.OWNER as DidUri,
    hash: '0x47d04c42bdf7fdd3fc5a194bcaa367b2f4766a6b16ae3df628927656d818f420'
  },
  {
    schema: {
      $id: 'linkage',
      $schema: 'http://kilt-protocol.org/draft-01/ctype#',
      properties: {
        id: { type: 'string' },
        origin: { type: 'string' }
      },
      title: 'Domain Linkage Credential',
      type: 'object'
    },
    owner: process.env.OWNER as DidUri,
    hash: '0x9d271c790775ee831352291f01c5d04c7979713a5896dcf5e81708184cc5c643'
  }
];
