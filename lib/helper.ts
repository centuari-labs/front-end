export function parseToAmount(
  value: string,
  decimals: number = 6,
  precision: number = 0,
  notation: boolean = true
): string {
  // Convert string to number
  const num = parseFloat(value);

  // Check if it's a valid number
  if (isNaN(num)) {
    return "Invalid number";
  }

  // Divide by token decimals
  const result = num / 10 ** decimals;

  // Format to M/B/T notation with thousand separators
  if (notation) {
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
  } else {
    return addThousandSeparators(result.toFixed(precision));
  }
}

export function parseToRate(value: string): string {
  const num = parseFloat(value);

  // Check if it's a valid number
  if (isNaN(num)) {
    return "Invalid number";
  }

  // Divide by 10^16 and format to 2 decimal places
  const result = num / 10 ** 16;
  return result.toFixed(2);
}

/**
 * Adds thousand separators to a number string
 * @param value The number string to format
 * @returns Formatted string with thousand separators
 */
function addThousandSeparators(value: string): string {
  const parts = value.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

/**
 * Converts a Unix timestamp to a relative time string (e.g., "2 hours ago")
 * @param unixTimestamp - Unix timestamp in seconds
 * @returns A string representing the relative time
 */
export function formatRelativeTime(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 60) {
    return `${diffSeconds} seconds ago`;
  } else if (diffSeconds < 3600) {
    const minutes = Math.floor(diffSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffSeconds < 86400) {
    const hours = Math.floor(diffSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (diffSeconds < 604800) {
    const days = Math.floor(diffSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (diffSeconds < 2592000) {
    const weeks = Math.floor(diffSeconds / 604800);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (diffSeconds < 31536000) {
    const months = Math.floor(diffSeconds / 2592000);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(diffSeconds / 31536000);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
}

export function getCollateralPrice(tokenSymbol: string): number {
  let price = 0;
  switch (tokenSymbol) {
    case "METH":
      price = 2500;
      break;
    case "MBTC":
      price = 90000;
      break;
    case "MSOL":
      price = 200;
      break;
    case "MLINK":
      price = 15;
      break;
    case "MAAVE":
      price = 200;
      break;
    default:
      price = 0;
  }
  return price;
}

export function formatDate(date: string) {
  const result = new Date(Number(date) * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return result;
}
