# Centuari Front-End

Centuari is a Central Limit Order Book (CLOB) powered lending platform that aims to bring the best of both Traditional Finance (TradFi) and decentralization technology. Our platform powers fixed-rate loans – delivering stable, predictable yields for both lenders and borrowers – and provide tailored and advanced financial solutions through our curator-managed vaults and uncollateralized lending products.

## Key Features

- **Lending & Borrowing**: Lend or borrow crypto assets through an order book system.
- **Vaults**: Manage assets and earn yield through vaults.
- **Tokenized Bonds**: Explore and manage tokenized bonds.
- **Faucet**: Get testnet tokens for testing.
- **Position Dashboard**: Monitor your lending, borrowing, and vault positions.
- **Order Book & Chart**: View real-time order book and market charts.

## Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Wagmi & Viem** (Web3 hooks & utilities)

## Directory Structure

- `/app` — Pages and main routes (Next.js App Router)
- `/components`
- `/hooks`
- `/lib`
- `/public` — Static assets
- `/styles` — Global styles

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/centuari-fe.git
   cd centuari-fe
   ```

2. **Install dependencies**  
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update the variables in `.env.local`:
   ```
   DATABASE_URL=test
   NEXT_PUBLIC_BASE_URL=http:/localhost:3000
   NEXT_PUBLIC_ENV=localhost
   ```

4. **Run development server**  
   ```bash
   pnpm dev
   ```
   Access at [http://localhost:3000](http://localhost:3000)

5. **Build for production**  
   ```bash
   pnpm build
   pnpm start
   ```

## Deployment

The application can be deployed to various platforms:

- **Vercel** (Recommended)
  ```bash
  vercel
  ```

## Notes

- This project uses Next.js 15+ and React.
- For smart contract development, refer to the backend/smart contract repository.
- API documentation can be found in the `/app/api` folder.

## Contributing

1. Fork this repository
2. Create a new feature/bugfix branch
3. Pull request to main branch

## License

MIT

---
