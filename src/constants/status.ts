export const STATUS = {
  idle: 'idle',
  loading: 'loading',
  error: 'error',
  success: 'success',
  empty: 'empty',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
