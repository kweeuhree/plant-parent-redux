export const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

export const getAccountDays = (dateCreated: string): number => {
  const accountCreated = new Date(dateCreated).getTime();
  const today = new Date().getTime();

  return Math.floor((today - accountCreated) / oneDayInMilliseconds);
};
