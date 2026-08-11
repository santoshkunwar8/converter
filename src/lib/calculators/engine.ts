import type {
  CalculatorDefinition,
  CalculatorInput,
  CalculatorInputValues,
  CalculatorResultValues,
} from "./types";

export type CalculatorRunResult =
  | { success: true; result: CalculatorResultValues }
  | {
      success: false;
      errors: Partial<Record<string, string>>;
      formError?: string;
    };

/** The only two fields runCalculator needs — lets a Client Component pass just
 *  the serializable `inputs` (from props) plus a lazily-loaded `calculate`
 *  function, without needing the whole CalculatorDefinition in scope. */
type CalculatorSpec = Pick<CalculatorDefinition, "inputs" | "calculate">;

/**
 * Validates and coerces raw (string) form input against a calculator's
 * declared `inputs`, then runs `calculate`. Keeps validation rules
 * (required/min/max/number-parsing) out of every individual calculator.
 */
export function runCalculator(
  def: CalculatorSpec,
  rawInputs: Record<string, string>,
): CalculatorRunResult {
  const errors: Partial<Record<string, string>> = {};
  const coerced: CalculatorInputValues = {};

  for (const input of def.inputs) {
    const raw = rawInputs[input.id];
    const isEmpty = raw === undefined || raw === "";

    if (isEmpty) {
      if (input.required) {
        errors[input.id] = `${input.label} is required.`;
      } else if (input.defaultValue !== undefined) {
        coerced[input.id] = input.defaultValue;
      }
      continue;
    }

    if (input.type === "number") {
      const num = Number(raw);
      if (Number.isNaN(num)) {
        errors[input.id] = `${input.label} must be a number.`;
        continue;
      }
      if (input.min !== undefined && num < input.min) {
        errors[input.id] = `${input.label} must be at least ${input.min}.`;
        continue;
      }
      if (input.max !== undefined && num > input.max) {
        errors[input.id] = `${input.label} must be at most ${input.max}.`;
        continue;
      }
      coerced[input.id] = num;
    } else {
      coerced[input.id] = raw;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const outcome = def.calculate(coerced);
  if (!outcome.ok) {
    return { success: false, errors: {}, formError: outcome.error };
  }

  return { success: true, result: outcome.values };
}

/** Builds the default raw-input map (as strings, for controlled form inputs) from a definition. */
export function getDefaultRawInputs(inputs: CalculatorInput[]): Record<string, string> {
  const defaults: Record<string, string> = {};
  for (const input of inputs) {
    if (input.defaultValue !== undefined) {
      defaults[input.id] = String(input.defaultValue);
    } else if (input.type === "select" && input.options?.[0]) {
      defaults[input.id] = input.options[0].value;
    } else {
      defaults[input.id] = "";
    }
  }
  return defaults;
}
