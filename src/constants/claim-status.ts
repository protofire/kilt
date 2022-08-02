/* eslint-disable */
enum Status {
  UNCLAIMED,
  UNVERIFIED,
  PENDING_PAYMENT,
  VERIFIED,
}

const statusInfo: Record<number, {label: string, color: string}> = {
  0: { label: 'Unclaimed', color: '#db4b4b' },
  1: { label: 'Unverified', color: '#CED118' },
  2: { label: 'Pending payment', color: '#1B5BFF' },
  3: { label: 'Verified', color: '#429441' }
};

export { statusInfo, Status };
/* eslint-enable */
