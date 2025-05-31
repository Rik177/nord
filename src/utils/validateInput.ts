import Ajv from 'ajv';
import contactSchema from '../schemas/contact.json';

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  formats: {
    email: true
  }
});

export const validateContactForm = (data: unknown) => {
  const validate = ajv.compile(contactSchema);
  const valid = validate(data);
  
  if (!valid) {
    return {
      valid: false,
      errors: validate.errors
    };
  }
  
  return {
    valid: true,
    data
  };
};