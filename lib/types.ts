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
