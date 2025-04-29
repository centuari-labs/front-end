export const BASE_URL =
  process.env.NEXT_PUBLIC_ENV === "localhost"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

export const MARKET_API = `${BASE_URL}/api/market`;
export const MARKET_MATURITIES = (id: string, maturity: string) =>
  `${BASE_URL}/api/market/${id}/maturities?maturity=${maturity}`;

export const MARKET_DETAIL_API = (id: string) => `${BASE_URL}/api/market/${id}`;

export const VAULT_API = `${BASE_URL}/api/vault`;