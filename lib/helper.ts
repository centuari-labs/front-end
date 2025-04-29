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

  // Format to M/B/T notation with thousand separators
  if (result >= 1_000_000_000_000) {
    const formatted = (result / 1_000_000_000_000).toFixed(precision);
    return `${addThousandSeparators(formatted)}T`;
  } else if (result >= 1_000_000_000) {
    const formatted = (result / 1_000_000_000).toFixed(precision);
    return `${addThousandSeparators(formatted)}B`;
  } else if (result >= 1_000_000) {
    const formatted = (result / 1_000_000).toFixed(precision);
    return `${addThousandSeparators(formatted)}M`;
  } else {
    return addThousandSeparators(result.toFixed(precision));
  }
}

export function parseToRate(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) {
    return "Invalid number";
  }
  const result = num / (10 ** 16);
  return result.toFixed(2)
}

/**
 * Adds thousand separators to a number string
 * @param value The number string to format
 * @returns Formatted string with thousand separators
 */
function addThousandSeparators(value: string): string {
  const parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

