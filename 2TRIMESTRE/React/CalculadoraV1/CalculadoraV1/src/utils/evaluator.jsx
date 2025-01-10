// Usamos la función evaluate para calcular el resultado de 
// una operación matamática que se pasa como string 
import { evaluate } from 'mathjs';

// Definimos la función evaluateExpression y la pasamos expression como parámetro
export const evaluateExpression = (expression) => {
  try {
    // Llama a la función evaluate y le pasamos exrpession como argumento 
    // Si la expression es válida me devuelve el resultado del cálculo
    return evaluate(expression);
  } catch (error) {
    return 'Error';
  }
};
