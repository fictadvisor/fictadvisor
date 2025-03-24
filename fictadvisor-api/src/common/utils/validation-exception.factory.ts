import { ValidationError } from '@nestjs/common';
import { InvalidBodyException } from '../exceptions/invalid-body.exception';

const flattenValidationErrors = (errors: ValidationError[], parent = 'obj'): string[] => {
  const results = [];

  for (const { property, constraints, children } of errors) {
    if (constraints) {
      results.push(...Object.values(constraints).map((c) => `${parent}.${property}: ${c}`));
    }
    if (children.length !== 0) {
      results.push(...flattenValidationErrors(children, `${parent}.${property}`));
    }
  }

  return results;
};

export const validationExceptionFactory = () => (errors: ValidationError[]) => {
  return new InvalidBodyException(flattenValidationErrors(errors));
};
