import * as Yup from 'yup';

// TODO: Research best practices for maximum lengths
export const USERNAME_MIN_LENGTH = 6;
export const USERNAME_MAX_LENGTH = 24;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 24;
// At least one lowercase, one uppercase, one number and one special character
export const PASSWORD_VERY_SECURE_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/;

export const formErrors = {
  username: {
    invalid: 'Bitte gib einen gültigen Username ein',
    required: 'Bitte gib einen Username ein',
    minLength: `Dein Username muss mindestens ${USERNAME_MIN_LENGTH} Zeichen lang sein`,
    maxLength: `Dein Username darf maximal ${USERNAME_MAX_LENGTH} Zeichen lang sein`,
  },
  email: {
    invalid: 'Bitte gib eine gültige Email-Adresse ein',
    required: 'Bitte gib eine Email-Adresse ein',
  },
  password: {
    required: 'Bitte gib ein Passwort ein',
    minLength: `Dein Passwort muss mindestens ${PASSWORD_MIN_LENGTH} Zeichen lang sein`,
    maxLength: `Dein Passwort darf maximal ${PASSWORD_MAX_LENGTH} Zeichen lang sein`,
    secure:
      'Dein Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Nummer sowie ein Sonderzeichen enthalten',
  },
};

export const registerFormValidationSchema = Yup.object().shape({
  // TODO: Validate invalid special characters in username
  username: Yup.string()
    .min(USERNAME_MIN_LENGTH, formErrors.username.minLength)
    .max(USERNAME_MAX_LENGTH, formErrors.username.maxLength)
    .required(formErrors.username.required),
  email: Yup.string()
    .email(formErrors.email.invalid)
    .required(formErrors.email.required),
  password: Yup.string()
    .min(PASSWORD_MIN_LENGTH, formErrors.password.minLength)
    .max(PASSWORD_MAX_LENGTH, formErrors.password.maxLength)
    .matches(PASSWORD_VERY_SECURE_REGEX, formErrors.password.secure)
    .required(formErrors.password.required),
});

export const loginFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(formErrors.email.invalid)
    .required(formErrors.email.required),
  password: Yup.string().required(formErrors.password.required),
});
