# DappVote

A Next.js starter that includes all you need to build amazing projects.

## Prerequisites

- Node.js (version 14, 16, or 18)
- Yarn package manager

## Getting Started

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd dappVote-main

2. **Run the following command to install yarn globally using npm:**
   ```sh
   npm install -g yarn

3. **Use nvm to install a compatible version of Node.js:**
   ```sh
   nvm install 18

4. **Use the installed version:**
   ```sh
   nvm use 18

5. **Verify the Node.js version:**
   ```sh
   node -v

6. **Once the installation is complete, navigate back to your project directory   and   run:**
   ```sh
   yarn install

7. **Update the .env file with the following details.**
   ```sh
    NEXT_PUBLIC_COMET_CHAT_APP_ID=<CometChat_APP_ID>
    NEXT_PUBLIC_COMET_CHAT_AUTH_KEY=<Comet_Chat_AUTH_KEY>
    NEXT_PUBLIC_COMET_CHAT_REGION=<CometChat_REGION>
    NEXT_APP_RPC_URL=<http://127.0.0.1:8545>

8. **Start Hardhat Node: Start the Hardhat local blockchain node:**
   ```sh
   yarn hardhat node

9. **Deploy Contracts: In another terminal, deploy your contracts to the local blockchain:**
   ```sh
   yarn hardhat run scripts/deploy.js --network localhost

9. **Run the development server:**
   ```sh
   yarn dev

10. **Open the application: Open your browser and navigate to http://localhost:3000.**

## Additional Information
   1. Ensure that the Hardhat node is running before deploying the contracts.
   2. If you encounter any issues, check the environment variables in the .env file  and ensure the RPC URL is correct.