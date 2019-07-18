import Vue from 'vue';

export const validateField = (
  fieldName = '',
  formData = {},
  rules = {},
  formErrors = {}
) => {
  let fieldRules = rules[fieldName] || [];

  for (let ruleFunc of fieldRules) {
    let error = ruleFunc(formData[fieldName]);
    let fieldIsValid = typeof error !== 'string';

    if (fieldIsValid) {
      Vue.delete(formErrors, fieldName);
    } else {
      Vue.set(formErrors, fieldName, error);
    }

    if (!fieldIsValid) {
      break;
    }
  }
};

export const validateForm = (formData = {}, rules = {}, formErrors = {}) => {
  for (let fieldName in rules) {
    validateField(fieldName, formData, rules, formErrors);
  }

  let formIsValid = Object.keys(formErrors).length === 0;
  return formIsValid;
};

/* RULES */

export const required = (val, errorMessage) =>
  !!val || errorMessage || 'Field is required';

export const requiredWith = (val, some, errorMessage) =>
  some ? required(val, errorMessage) : true;

export const minLength = (val, min, errorMessage) => {
  let isValidValue = false;

  if (Array.isArray(val) || typeof val === 'string') {
    isValidValue = val.length >= min;
  } else if (typeof val === 'object' && val !== null) {
    isValidValue = Object.keys(val).length >= min;
  }

  return isValidValue || errorMessage || 'Field is required';
};
