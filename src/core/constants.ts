export const Validation = {
  MIN_CHARS: (min: number) =>
    min === 1
      ? 'Must be at least 1 character'
      : `Must be at least ${min} characters`,
  NOT_NEGATIVE: 'Cannot be negative',
  REQUIRED: 'Required',
  VALID_URL: 'Must be a valid URL',
};
