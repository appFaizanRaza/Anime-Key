export const VALIDATION_MESSAGES = {
  REQUIRED: {
    EMAIL: "Email is required",
    PHONE: "Phone number is required",
    PASSWORD: "Password is required",
  },

  INVALID: {
    EMAIL: "Please enter a valid email address",
     PHONE: "Enter a valid phone number",
  },

  FIRST: {
    FIRSTNAME : "First name must be at least 2 characters",
  },

    LAST: {
    LASTNAME : "Last name must be at least 2 characters",
  },

  MIN_LENGTH: {
    PASSWORD: "Password must be at least 8 characters",
    NAME: "Must be at least 2 characters",
  },

  PASSWORD: {
    PATTERN: "Password must contain 8 characters, one uppercase and one number",
    MATCH: "Passwords do not match",
  },
};
