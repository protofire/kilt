import { Status } from '../constants/status';

const colors: Record<string, string> = {
  [Status.verified]: '#429441',
  [Status.unverified]: '#CED118',
  [Status.pendingPayment]: '#1B5BFF'
};

const labels: Record<string, string> = {
  [Status.verified]: 'Verified',
  [Status.unverified]: 'Unverified',
  [Status.pendingPayment]: 'Pending Payment'
};

export const getColorByStatus = (status: string) => colors[status];
export const getLabelByStatus = (status: string) => labels[status];
