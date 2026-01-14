export const formatIsoDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
