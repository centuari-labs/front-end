export interface ILendingMarketProps {
  market: {
    id: string;
    name: string;
    lending_apy: number;
    marketVolume: number;
    collateralFactor: number;
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
