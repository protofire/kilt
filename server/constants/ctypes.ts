import { ICTypeSchema } from '@kiltprotocol/sdk-js';

/**
 * This list contains all the existing ctypes supported by Kilt by default.
 * Learn more: https://github.com/KILTprotocol/ctype-index
 */
export const ctypesList: ICTypeSchema[] = [
  {
    $id: 'email',
    $schema: 'http://kilt-protocol.org/draft-01/ctype#',
    properties: {
      Email: { type: 'string' }
    },
    title: 'Email',
    type: 'object'
  },
  {
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
  {
    $id: 'github',
    $schema: 'http://kilt-protocol.org/draft-01/ctype#',
    properties: {
      'User ID': { type: 'string' },
      Username: { type: 'string' }
    },
    title: 'GitHub',
    type: 'object'
  },
  {
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
  {
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
  {
    $id: 'twich',
    $schema: 'http://kilt-protocol.org/draft-01/ctype#',
    properties: {
      'User ID': { type: 'string' },
      Username: { type: 'string' }
    },
    title: 'Twitch',
    type: 'object'
  },
  {
    $id: 'twitter',
    $schema: 'http://kilt-protocol.org/draft-01/ctype#',
    properties: {
      Twitter: { type: 'string' }
    },
    title: 'Twitter',
    type: 'object'
  },
  {
    $id: 'linkage',
    $schema: 'http://kilt-protocol.org/draft-01/ctype#',
    properties: {
      id: { type: 'string' },
      origin: { type: 'string' }
    },
    title: 'Domain Linkage Credential',
    type: 'object'
  }
];
