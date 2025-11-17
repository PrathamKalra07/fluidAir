export const formatIsoToDDMMYY = (
  iso?: string | null,
  useUTC: boolean = false
): string => {
  if (!iso) return '';
  const date = new Date(iso);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(useUTC ? { timeZone: 'UTC' } : {}),
  }).format(date);
};
