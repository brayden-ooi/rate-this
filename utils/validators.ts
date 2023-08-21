export function isString(input: unknown): string {
  if (!input) {
    throw new TypeError("Invalid input");
  }

  if (typeof input != "string") {
    throw new TypeError("Invalid input");
  }

  if (!input.length) {
    throw new TypeError("Invalid input");
  }

  return input;
}
