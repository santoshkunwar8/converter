/**
 * A small, dependency-free recursive-descent math expression evaluator.
 * Deliberately does NOT use eval()/Function() — those would let arbitrary
 * user input execute as JavaScript, a code-injection risk. This parser only
 * understands numbers, + - * / ^ %, parentheses, a fixed set of named
 * functions, and two named constants.
 */

type Token =
  | { type: "num"; value: number }
  | { type: "op"; value: "+" | "-" | "*" | "/" | "^" | "%" }
  | { type: "lparen" }
  | { type: "rparen" }
  | { type: "comma" }
  | { type: "ident"; value: string };

const OPERATORS = new Set(["+", "-", "*", "/", "^", "%"]);

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (/[0-9.]/.test(ch)) {
      let j = i;
      let sawDot = false;
      while (j < input.length && /[0-9.]/.test(input[j])) {
        if (input[j] === ".") {
          if (sawDot) throw new Error("Invalid number format.");
          sawDot = true;
        }
        j++;
      }
      const raw = input.slice(i, j);
      const value = Number(raw);
      if (Number.isNaN(value)) throw new Error(`Invalid number: "${raw}".`);
      tokens.push({ type: "num", value });
      i = j;
      continue;
    }

    if (/[a-zA-Z]/.test(ch)) {
      let j = i;
      while (j < input.length && /[a-zA-Z]/.test(input[j])) j++;
      tokens.push({ type: "ident", value: input.slice(i, j).toLowerCase() });
      i = j;
      continue;
    }

    if (OPERATORS.has(ch)) {
      tokens.push({ type: "op", value: ch as "+" | "-" | "*" | "/" | "^" | "%" });
      i++;
      continue;
    }

    if (ch === "(") {
      tokens.push({ type: "lparen" });
      i++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ type: "rparen" });
      i++;
      continue;
    }
    if (ch === ",") {
      tokens.push({ type: "comma" });
      i++;
      continue;
    }

    throw new Error(`Unexpected character: "${ch}".`);
  }

  return tokens;
}

const CONSTANTS: Record<string, number> = { pi: Math.PI, e: Math.E };

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

const FUNCTIONS: Record<string, (...args: number[]) => number> = {
  sin: (x) => Math.sin(toRadians(x)),
  cos: (x) => Math.cos(toRadians(x)),
  tan: (x) => Math.tan(toRadians(x)),
  asin: (x) => toDegrees(Math.asin(x)),
  acos: (x) => toDegrees(Math.acos(x)),
  atan: (x) => toDegrees(Math.atan(x)),
  sqrt: (x) => Math.sqrt(x),
  log: (x) => Math.log10(x),
  ln: (x) => Math.log(x),
  abs: (x) => Math.abs(x),
  exp: (x) => Math.exp(x),
  round: (x) => Math.round(x),
  floor: (x) => Math.floor(x),
  ceil: (x) => Math.ceil(x),
  min: (...xs) => Math.min(...xs),
  max: (...xs) => Math.max(...xs),
};

class ExpressionParser {
  private pos = 0;

  constructor(private tokens: Token[]) {}

  parse(): number {
    const result = this.parseExpression();
    if (this.pos < this.tokens.length) throw new Error("Unexpected trailing input.");
    return result;
  }

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private next(): Token {
    const token = this.tokens[this.pos];
    this.pos++;
    return token;
  }

  private parseExpression(): number {
    let value = this.parseTerm();
    while (this.peek()?.type === "op" && ["+", "-"].includes((this.peek() as { value: string }).value)) {
      const op = (this.next() as { value: string }).value;
      const rhs = this.parseTerm();
      value = op === "+" ? value + rhs : value - rhs;
    }
    return value;
  }

  private parseTerm(): number {
    let value = this.parseUnary();
    while (
      this.peek()?.type === "op" &&
      ["*", "/", "%"].includes((this.peek() as { value: string }).value)
    ) {
      const op = (this.next() as { value: string }).value;
      const rhs = this.parseUnary();
      if (op === "*") value *= rhs;
      else if (op === "/") {
        if (rhs === 0) throw new Error("Division by zero.");
        value /= rhs;
      } else {
        value %= rhs;
      }
    }
    return value;
  }

  private parseUnary(): number {
    const token = this.peek();
    if (token?.type === "op" && token.value === "-") {
      this.next();
      return -this.parseUnary();
    }
    if (token?.type === "op" && token.value === "+") {
      this.next();
      return this.parseUnary();
    }
    return this.parsePower();
  }

  private parsePower(): number {
    const base = this.parseAtom();
    if (this.peek()?.type === "op" && (this.peek() as { value: string }).value === "^") {
      this.next();
      const exponent = this.parseUnary();
      return Math.pow(base, exponent);
    }
    return base;
  }

  private parseAtom(): number {
    const token = this.peek();
    if (!token) throw new Error("Unexpected end of expression.");

    if (token.type === "num") {
      this.next();
      return token.value;
    }

    if (token.type === "lparen") {
      this.next();
      const value = this.parseExpression();
      if (this.peek()?.type !== "rparen") throw new Error('Expected ")".');
      this.next();
      return value;
    }

    if (token.type === "ident") {
      this.next();
      const name = token.value;
      if (name in CONSTANTS) return CONSTANTS[name];

      if (name in FUNCTIONS) {
        if (this.peek()?.type !== "lparen") throw new Error(`Expected "(" after "${name}".`);
        this.next();
        const args: number[] = [this.parseExpression()];
        while (this.peek()?.type === "comma") {
          this.next();
          args.push(this.parseExpression());
        }
        if (this.peek()?.type !== "rparen") throw new Error('Expected ")".');
        this.next();
        return FUNCTIONS[name](...args);
      }

      throw new Error(`Unknown name: "${name}".`);
    }

    throw new Error("Unexpected token in expression.");
  }
}

/** Safely evaluates a math expression string. Throws a human-readable Error on invalid input. */
export function evaluateExpression(input: string): number {
  const tokens = tokenize(input);
  if (tokens.length === 0) throw new Error("Enter a math expression.");
  const result = new ExpressionParser(tokens).parse();
  if (!Number.isFinite(result)) throw new Error("The result is not a finite number.");
  return result;
}
