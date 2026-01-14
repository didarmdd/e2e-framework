type UserInput = {
  name?: string;
  job?: string;
};

export const buildUser = (overrides: UserInput = {}) => {
  return {
    name: overrides.name || 'Test User',
    job: overrides.job || 'QA',
  };
};
