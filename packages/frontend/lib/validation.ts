import dayjs from 'dayjs';
import * as Yup from 'yup';

// TODO: Research best practices for maximum lengths
export const USERNAME_MIN_LENGTH = 6;
export const USERNAME_MAX_LENGTH = 24;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 24;
// At least one lowercase, one uppercase, one number and one special character
export const PASSWORD_VERY_SECURE_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/;
export const EVENT_TITLE_MIN_LENGTH = 3;
export const EVENT_TITLE_MAX_LENGTH = 255;
export const EVENT_DESCRIPTION_MIN_LENGTH = 40;
export const EVENT_DESCRIPTION_MAX_LENGTH = 5000;

export const testDateIsInFuture = (datetime: string) =>
  dayjs(datetime) > dayjs();

export const testEndDateIsAfterStartDate = (
  startDate: string,
  endDate: string
) => dayjs(endDate) > dayjs(startDate);

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
  eventTitle: {
    required: 'Bitte gib einen Titel für dein Event an',
    minLength: `Der Titel muss mindestes ${EVENT_TITLE_MIN_LENGTH} Zeichen lang sein`,
    maxLength: `Der Titel darf maximal ${EVENT_TITLE_MAX_LENGTH} Zeichen lang sein`,
  },
  eventDescription: {
    required: 'Bitte füge deinem Event eine Beschreibung hinzu',
    minLength: `Die Beschreibung muss mindestens ${EVENT_DESCRIPTION_MIN_LENGTH} Zeichen lang sein`,
    maxLength: `Die Beschreibung darf maximal ${EVENT_DESCRIPTION_MAX_LENGTH} Zeichen lang sein`,
  },
  startDate: {
    required: 'Bitte gib ein Datum für dein Event an',
    inFuture: 'Der Beginn deiner Veranstaltung muss in der Zukunft liegen',
  },
  endDate: {
    inFuture: 'Das Ende deiner Veranstaltung muss in der Zukunft liegen',
    endDateAfterStartDate:
      'Das Ende deiner Veranstaltung muss nach dem Beginn liegen',
  },
  eventCategory: {
    required: `Bitte wähle eine Kategorie für deine Veranstaltung aus`,
  },
  eventVenue: {
    required: 'Bitte wähle einen Ort für deine Veranstaltung aus',
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
  passwordRepeat: Yup.string().required(),
});

export const loginFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(formErrors.email.invalid)
    .required(formErrors.email.required),
  password: Yup.string().required(formErrors.password.required),
});

export const eventCreateFormValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(EVENT_TITLE_MIN_LENGTH, formErrors.eventTitle.minLength)
    .max(EVENT_TITLE_MAX_LENGTH, formErrors.eventTitle.maxLength)
    .required(formErrors.eventTitle.required),
  description: Yup.string()
    .min(EVENT_DESCRIPTION_MIN_LENGTH, formErrors.eventDescription.minLength)
    .max(EVENT_DESCRIPTION_MAX_LENGTH, formErrors.eventDescription.maxLength)
    .required(formErrors.eventDescription.required),
  startDate: Yup.string()
    .test(
      'startdate-in-future',
      formErrors.startDate.inFuture,
      (value) => !value || testDateIsInFuture(value)
    )
    .required(formErrors.startDate.required),
  endDate: Yup.string()
    .test(
      'enddate-in-future',
      formErrors.endDate.inFuture,
      (value) => !value || testDateIsInFuture(value)
    )
    .test(
      'enddate-after-startdate',
      formErrors.endDate.endDateAfterStartDate,
      (value, { parent }) =>
        !value ||
        !parent?.startDate ||
        testEndDateIsAfterStartDate(parent.startDate, value)
    ),
  categoryId: Yup.string().required(formErrors.eventCategory.required),
  venueId: Yup.string().required(formErrors.eventVenue.required),
});
