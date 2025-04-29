export function parseToAmount(
  value: string,
  decimals: number = 6,
  precision: number = 0
): string {
  // Convert string to number
  const num = parseFloat(value);

  // Check if it's a valid number
  if (isNaN(num)) {
    return "Invalid number";
  }

  // Divide by token decimals
  const result = num / (10 ** decimals);

  // Format to M/B/T notation
  if (result >= 1_000_000_000_000) {
    return `${(result / 1_000_000_000_000).toFixed(precision)}T`;
  } else if (result >= 1_000_000_000) {
    return `${(result / 1_000_000_000).toFixed(precision)}B`;
  } else if (result >= 1_000_000) {
    return `${(result / 1_000_000).toFixed(precision)}M`;
  } else {
    return result.toFixed(precision);
  }
}
