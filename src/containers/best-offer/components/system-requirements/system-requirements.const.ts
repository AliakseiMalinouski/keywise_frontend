export const PLATFORMS = [
  { key: 'pc', labelKey: 'requirementsPc' as const, field: 'pc' as const },
  { key: 'mac', labelKey: 'requirementsMac' as const, field: 'mac' as const },
  {
    key: 'linux',
    labelKey: 'requirementsLinux' as const,
    field: 'linux' as const,
  },
] as const;
