const statusToCeil: Record<string, {value: string, color: string}> = {
  unclaimed: { value: 'Unclaimed', color: '#db4b4b' },
  unverified: { value: 'Unverified', color: '#CED118' },
  pending_payment: { value: 'Pending payment', color: '#1B5BFF' },
  verified: { value: 'Verified', color: '#429441' }
};

export { statusToCeil };
