/* eslint-disable no-param-reassign */
/* eslint-disable new-cap */
/* eslint max-classes-per-file: ["error", 4] */

const mapping = {
  invalidUrl: class ValidationError extends Error {},
  notUnique: class NotUniqueError extends Error {},
  parsingError: class ParsingError extends Error {},
  defaultError: class DefaultError extends Error {},
};

const errorHandler = (type, state) => {
  switch (type) {
    case 'invalidUrl':
      console.log(state);
      state.inputType = type;
      throw new mapping.invalidUrl('Invalid url');
    case 'notUnique':
      state.inputType = type;
      throw new mapping.notUnique('This RSS was uploaded earlier');
    case 'parseError':
      throw new mapping.parsingError('Error when parsing XML');
    default:
      throw new mapping.defaultError('Something went wrong');
  }
};

export { mapping, errorHandler };
