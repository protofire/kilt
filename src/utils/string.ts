export const formatDid = (did: string) => 
  did.substring(0, 12) + '...' + did.substring(did.length - 5, did.length - 1)