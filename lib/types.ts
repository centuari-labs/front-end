export interface ILendingMarketProps {
  market: {
    id: string;
    name: string;
    lending_apy: number;
    marketVolume: number;
    collateralFactor: number;
    lltv: number;
    fixedRate: boolean;
    borrow_apy: number;
    loan_token: {
      address: string;
      name: string;
      image_uri: string;
      decimal: number;
      symbol: string;
    };
    collateral_token: {
      address: string;
      name: string;
      image_uri: string;
      decimal: number;
      symbol: string;
    };
    maturity: number;
  };
}

export interface IVaultPositionProps {
  amount: string;
  apy: string;
  centuari_prime_token: string;
  centuari_prime_token_name: string;
  centuari_prime_token_symbol: string;
  curator: string;
  name: string;
  token_address: string;
  token_decimal: number;
  token_image_uri: string;
  token_name: string;
  token_symbol: string;
  vault: string;
}

export interface IPosition {
  assets: string;
  centuari_token: string;
  collateral_token: string;
  collateral_token_decimal: number;
  collateral_token_image_uri: string;
  collateral_token_name: string;
  collateral_token_symbol: string;
  loan_token: string;
  loan_token_decimal: number;
  loan_token_image_uri: string;
  loan_token_name: string;
  loan_token_symbol: string;
  market_id: string;
  maturity: string;
  rate: string;
  shares: string;
  trader: string;
}
