// src/utils/evaluator.js
import { evaluate } from 'mathjs';

export const evaluateExpression = (expression) => {
  try {
    return evaluate(expression);
  } catch (error) {
    return 'Error';
  }
};
