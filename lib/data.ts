import { FeucetDataProps } from "@/app/feucets/_components/feucet-list";

// Market data
export const marketData = [
  {
    id: "usdc-eth",
    name: "USDC/ETH",
    lend_token: "USDC",
    collateral_token: "ETH",
    icon: "/placeholder.svg?height=40&width=40",
    lendingAPY: 3.25,
    borrowingAPY: 5.75,
    marketVolume: 1250000,
    ltv: 820000,
    trending: 0.25,
    fixedRate: true,
    collateralFactor: 80,
    liquidationThreshold: 85,
    liquidationPenalty: 5,
    reserveFactor: 10,
    oracle: "Chainlink",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description: "USDC stablecoin paired with Ethereum",
    lendTokenUrl: "https://etherscan.io/token/images/usdc_ofc_32.svg",
    borrowTokenUrl: "https://etherscan.io/token/images/weth_28.png?v=2",
  },
  {
    id: "wbtc-eth",
    name: "WBTC/ETH",
    lend_token: "WBTC",
    collateral_token: "ETH",
    icon: "/placeholder.svg?height=40&width=40",
    lendingAPY: 2.15,
    borrowingAPY: 4.25,
    marketVolume: 950000,
    ltv: 520000,
    trending: -0.15,
    fixedRate: true,
    collateralFactor: 75,
    liquidationThreshold: 80,
    liquidationPenalty: 7.5,
    reserveFactor: 15,
    oracle: "Chainlink",
    contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    description: "Wrapped Bitcoin paired with Ethereum",
    lendTokenUrl: "https://etherscan.io/token/images/usdc_ofc_32.svg",
    borrowTokenUrl: "https://etherscan.io/token/images/weth_28.png?v=2",
  },
  {
    id: "dai-usdc",
    name: "DAI/USDC",
    lend_token: "DAI",
    collateral_token: "USDC",
    icon: "/placeholder.svg?height=40&width=40",
    lendingAPY: 3.85,
    borrowingAPY: 5.25,
    marketVolume: 750000,
    ltv: 450000,
    trending: 0.35,
    fixedRate: true,
    collateralFactor: 85,
    liquidationThreshold: 90,
    liquidationPenalty: 4,
    reserveFactor: 8,
    oracle: "Chainlink",
    contractAddress: "0x7890abcdef1234567890abcdef1234567890abcd",
    description: "DAI stablecoin paired with USDC stablecoin",
    lendTokenUrl: "https://etherscan.io/token/images/usdc_ofc_32.svg",
    borrowTokenUrl: "https://etherscan.io/token/images/weth_28.png?v=2",
  },
  {
    id: "eth-usdt",
    name: "ETH/USDT",
    lend_token: "ETH",
    collateral_token: "USDT",
    icon: "/placeholder.svg?height=40&width=40",
    lendingAPY: 2.95,
    borrowingAPY: 5.15,
    marketVolume: 1100000,
    ltv: 680000,
    trending: 0.45,
    fixedRate: true,
    collateralFactor: 80,
    liquidationThreshold: 85,
    liquidationPenalty: 5,
    reserveFactor: 10,
    oracle: "Chainlink",
    contractAddress: "0xdef1234567890abcdef1234567890abcdef123456",
    description: "Ethereum paired with USDT stablecoin",
    lendTokenUrl: "https://etherscan.io/token/images/usdc_ofc_32.svg",
    borrowTokenUrl: "https://etherscan.io/token/images/weth_28.png?v=2",
  },
  {
    id: "link-eth",
    name: "LINK/ETH",
    lend_token: "LINK",
    collateral_token: "ETH",
    icon: "/placeholder.svg?height=40&width=40",
    lendingAPY: 4.25,
    borrowingAPY: 6.75,
    marketVolume: 450000,
    ltv: 320000,
    trending: 1.25,
    fixedRate: true,
    collateralFactor: 70,
    liquidationThreshold: 75,
    liquidationPenalty: 8,
    reserveFactor: 15,
    oracle: "Chainlink",
    contractAddress: "0x567890abcdef1234567890abcdef1234567890ab",
    description: "Chainlink token paired with Ethereum",
    lendTokenUrl: "https://etherscan.io/token/images/usdc_ofc_32.svg",
    borrowTokenUrl: "https://etherscan.io/token/images/weth_28.png?v=2",
  },
  {
    id: "aave-eth",
    name: "AAVE/ETH",
    lend_token: "AAVE",
    collateral_token: "ETH",
    icon: "/placeholder.svg?height=40&width=40",
    lendingAPY: 5.15,
    borrowingAPY: 7.25,
    marketVolume: 350000,
    ltv: 220000,
    trending: 2.15,
    fixedRate: true,
    collateralFactor: 65,
    liquidationThreshold: 70,
    liquidationPenalty: 10,
    reserveFactor: 20,
    oracle: "Chainlink",
    contractAddress: "0x90abcdef1234567890abcdef1234567890abcdef",
    description: "AAVE token paired with Ethereum",
    lendTokenUrl: "https://etherscan.io/token/images/usdc_ofc_32.svg",
    borrowTokenUrl: "https://etherscan.io/token/images/weth_28.png?v=2",
  },
];

// Lending positions
export const lendingPositions = [
  {
    id: "lend-1",
    marketId: "usdc-eth",
    marketName: "USDC/ETH",
    marketIcon: "/placeholder.svg?height=40&width=40",
    maturityDate: "2023-09-30T00:00:00Z",
    amount: 10000,
    value: 10000,
    apy: 3.25,
    startDate: "2023-06-15T10:30:00Z",
  },
  {
    id: "lend-2",
    marketId: "dai-usdc",
    marketName: "DAI/USDC",
    marketIcon: "/placeholder.svg?height=40&width=40",
    maturityDate: "2023-09-30T00:00:00Z",
    amount: 5000,
    value: 5000,
    apy: 3.85,
    startDate: "2023-05-22T14:45:00Z",
  },
];

// Borrowing positions
export const borrowingPositions = [
  {
    id: "borrow-1",
    marketId: "eth-usdt",
    marketName: "ETH/USDT",
    marketIcon: "/placeholder.svg?height=40&width=40",
    amount: 2.5,
    value: 5000,
    collateral: "USDT",
    maturityDate: "2023-09-30T00:00:00Z",
    apy: 5.15,
    startDate: "2023-06-10T09:15:00Z",
    healthFactor: 1.85,
    collateralRatio: 150,
  },
];

// Tokenized bonds
export const tokenizedBonds = [
  {
    id: "bond-1",
    marketId: "usdc-eth",
    name: "USDC 90-Day Bond",
    icon: "/placeholder.svg?height=40&width=40",
    yield: 4.25,
    maturityDate: "2023-09-30T00:00:00Z",
    issuanceDate: "2023-07-01T00:00:00Z",
    marketVolume: 500000,
    minAmount: 1000,
    remainingSupply: 350000,
  },
  {
    id: "bond-2",
    marketId: "dai-usdc",
    name: "DAI 180-Day Bond",
    icon: "/placeholder.svg?height=40&width=40",
    yield: 5.75,
    maturityDate: "2023-12-31T00:00:00Z",
    issuanceDate: "2023-07-01T00:00:00Z",
    marketVolume: 300000,
    minAmount: 500,
    remainingSupply: 220000,
  },
  {
    id: "bond-3",
    marketId: "wbtc-eth",
    name: "WBTC 365-Day Bond",
    icon: "/placeholder.svg?height=40&width=40",
    yield: 6.5,
    maturityDate: "2024-06-30T00:00:00Z",
    issuanceDate: "2023-07-01T00:00:00Z",
    marketVolume: 200000,
    minAmount: 0.01,
    remainingSupply: 180000,
  },
];

// My bonds
export const myBonds = [
  {
    id: "my-bond-1",
    marketId: "usdc-eth",
    name: "USDC 90-Day Bond",
    icon: "/placeholder.svg?height=40&width=40",
    yield: 4.25,
    maturityDate: "2023-09-30T00:00:00Z",
    issuanceDate: "2023-07-01T00:00:00Z",
    amount: 5000,
    value: 5000,
  },
];

// Transaction history
export const transactionHistory = [
  {
    id: "tx-1",
    type: "deposit",
    marketId: "usdc-eth",
    marketName: "USDC/ETH",
    amount: 10000,
    value: 10000,
    timestamp: "2023-06-15T10:30:00Z",
    status: "completed",
    txHash:
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  },
  {
    id: "tx-2",
    type: "deposit",
    marketId: "dai-usdc",
    marketName: "DAI/USDC",
    amount: 5000,
    value: 5000,
    timestamp: "2023-05-22T14:45:00Z",
    status: "completed",
    txHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
  {
    id: "tx-3",
    type: "borrow",
    marketId: "eth-usdt",
    marketName: "ETH/USDT",
    amount: 2.5,
    value: 5000,
    timestamp: "2023-06-10T09:15:00Z",
    status: "completed",
    txHash:
      "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
  },
  {
    id: "tx-4",
    type: "interest",
    marketId: "usdc-eth",
    marketName: "USDC/ETH",
    amount: 25.34,
    value: 25.34,
    timestamp: "2023-06-22T00:00:00Z",
    status: "completed",
    txHash:
      "0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc",
  },
  {
    id: "tx-5",
    type: "withdrawal",
    marketId: "dai-usdc",
    marketName: "DAI/USDC",
    amount: 1000,
    value: 1000,
    timestamp: "2023-06-01T11:20:00Z",
    status: "completed",
    txHash:
      "0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
  },
];

export const tokenIcon = {
  usdc: "https://etherscan.io/token/images/usdc_ofc_32.svg",
  wbtc: "https://etherscan.io/token/images/wrappedbtc_ofc_32.svg",
  weth: "https://etherscan.io/token/images/weth_28.png?v=2",
  dai: "https://etherscan.io/token/images/dai_32.png",
  usdt: "https://etherscan.io/token/images/tethernew_32.svg",
  link: "https://etherscan.io/token/images/chainlink_ofc_32.svg",
  aave: "https://app.aave.com/icons/tokens/aave.svg",
  sol: "https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f536f31313131313131313131313131313131313131313131313131313131313131313131313131313131322f6c6f676f2e706e67",
  bnb: "https://etherscan.io/token/images/bnb_32.png",
  shib: "https://etherscan.io/token/images/shibainu_ofc_32.svg",
  toncoin: "https://etherscan.io/token/images/toncoin_32.svg",
  pepe: "https://etherscan.io/token/images/pepe_32.svg",
  bitgetrplce: "https://etherscan.io/token/images/bitgetrplce_32.svg",
  steth: "https://etherscan.io/token/images/steth_32.svg",
  eth: "https://etherscan.io/token/images/ethereum_32.png",
  bgb: "https://etherscan.io/token/images/bitgetrplce_32.svg",
};

export const feucetData: FeucetDataProps[] = [
  {
    id: "usdc",
    name: "USDC Faucet",
    tokenName: "USDC",
    chain: "Sepolia",
    chainId: 5,
    tokenIcons: [tokenIcon.usdc],
    explorer: "https://sepholia.etherscan.io",
    faucetUrl: "https://faucet.example.com/wbtc",
    claimLimit: 1000000,
    limitTime: "30",
    limitTimeUnit: "minutes",
    status: "active",
  },
  {
    id: "weth",
    name: "WETH Faucet",
    tokenName: "WETH",
    chain: "Sepolia",
    chainId: 5,
    tokenIcons: [tokenIcon.weth],
    explorer: "https://goerli.etherscan.io",
    faucetUrl: "https://faucet.example.com/bgb",
    claimLimit: 1000000,
    limitTime: "30",
    limitTimeUnit: "minutes",
    status: "active",
  },
  {
    id: "wbtc",
    name: "WBTC Faucet",
    tokenName: "WBTC",
    chain: "Sepolia",
    chainId: 5,
    tokenIcons: [tokenIcon.wbtc],
    explorer: "https://goerli.etherscan.io",
    faucetUrl: "https://stargatefaucet.xyz",
    claimLimit: 1000000,
    limitTime: "30",
    limitTimeUnit: "minutes",
    status: "active",
  },
  {
    id: "sol",
    name: "Solana Faucet",
    tokenName: "SOL",
    chain: "Goerli",
    chainId: 5,
    tokenIcons: [tokenIcon.sol],
    explorer: "https://goerli.etherscan.io",
    faucetUrl: "https://faucet.example.com/bnb",
    claimLimit: 1000000,
    limitTime: "30",
    limitTimeUnit: "minutes",
    status: "active",
  },
  {
    id: "link",
    name: "LINK Faucet",
    tokenName: "LINK",
    chain: "Goerli",
    chainId: 5,
    tokenIcons: [tokenIcon.link],
    explorer: "https://goerli.etherscan.io",
    faucetUrl: "https://faucet.example.com/link",
    claimLimit: 1000000,
    limitTime: "30",
    limitTimeUnit: "minutes",
    status: "active",
  },
  {
    id: "aave",
    name: "AAVE Faucet",
    tokenName: "AAVE",
    chain: "Goerli",
    chainId: 5,
    tokenIcons: [tokenIcon.aave],
    explorer: "https://goerli.etherscan.io",
    faucetUrl: "https://faucet.example.com/link",
    claimLimit: 1000000,
    limitTime: "30",
    limitTimeUnit: "minutes",
    status: "active",
  },
];
