# SimplePoll Voting dApp — Truffle & Ganache

**Course:** MG3012 - Blockchain Technology for Business (BSFT - 5th Semester, Fall 2026)  
**Instructor:** Dr. Usama Arshad  
**Assignment:** Assignment 3 — Building and Deploying Smart Contracts using Truffle & Ganache  

---

## Project Overview
In this project, the **SimplePoll** decentralized voting smart contract from Assignment 2 has been migrated from Remix IDE to a local blockchain development environment using the **Truffle Suite** and **Ganache**. 

The project includes a web-based frontend built with **HTML, CSS, JavaScript, and Ethers.js (v5)** that connects to the locally deployed smart contract on Ganache via **MetaMask**, allowing users to cast votes, view live poll results, verify voter eligibility, and reset voting rounds.

---

## Folder Structure
```text
blockchain_assignment3/
├── build/
│   └── contracts/
│       └── SimplePoll.json
├── contracts/
│   └── smartcontract.sol
├── migrations/
│   └── 1_deploy_contract.js
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── screenshots/
│   ├── SS1.png
│   ├── SS2_migrate.png
│   ├── SS3_ganache.png
│   ├── SS4_metamask_tx.png
│   └── SS5_ui_result.png
├── truffle-config.js
└── README.md
```

---

##  Prerequisites
Before running this project, ensure the following tools are installed on your system:
1. **Node.js & npm** (v16+ recommended)
2. **Truffle Suite** (Installed globally via npm)
3. **Ganache GUI** (Local Ethereum blockchain running on `HTTP://127.0.0.1:7545`)
4. **MetaMask Browser Extension** (Connected to the Local Ganache network)
5. **VS Code Live Server Extension** (For serving the frontend locally)

---

##  Step-by-Step Setup & Commands Used

### 1. Install Truffle Globally
Open your terminal/PowerShell and install Truffle:
```bash
npm install -g truffle
```

### 2. Initialize the Truffle Project
Create the project directory and initialize a bare Truffle project:
```bash
mkdir blockchain_assignment3
cd blockchain_assignment3
truffle init
```

### 3. Configure Ganache & `truffle-config.js`
1. Open **Ganache GUI** and click **Quickstart Ethereum**.
2. Verify that the RPC Server is running on `HTTP://127.0.0.1:7545` (Network ID: `5777`).
3. Configure `truffle-config.js` to connect to the local Ganache network and use Solidity compiler version `0.8.0`:
```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    }
  },
};
```

### 4. Compile the Smart Contract
Place `smartcontract.sol` inside the `contracts/` folder and run:
```bash
truffle compile
```
* **Output:** Generates the contract ABI and bytecode inside `build/contracts/SimplePoll.json`.

### 5. Deploy (Migrate) the Smart Contract to Ganache
Create `1_deploy_contract.js` inside the `migrations/` folder and deploy the contract locally:
```bash
truffle migrate --reset
```

####  Local Deployment Details
* **Contract Name:** `SimplePoll`
* **Network:** `development` (Network ID: `5777`)
* **Deployer Account:** `0xF2beA2a7D1673b1597cC1CebfD9aa6e537489F25`
* **Deployed Contract Address:** `0xD1687f1f34cA0d2a6c3Fc325a9EE96Ec028a249b`
* **Transaction Hash:** `0xeda411c59cc7b2da8581576a4b66165d98bd76b68005adf0cd3841cc82e12228`

---

##  How to Test & Interact with the dApp

### Step 1: Connect MetaMask to Ganache
1. Open the **MetaMask** extension in your browser and click **Add Network $\rightarrow$ Add a network manually**.
2. Enter the following details:
   * **Network Name:** `Ganache Local`
   * **New RPC URL:** `http://127.0.0.1:7545`
   * **Chain ID:** `1337`
   * **Currency Symbol:** `ETH`
3. In **Ganache GUI**, click the **Key icon (`🔑`)** next to an account, copy its **Private Key**, and import the account into MetaMask (**Add Account $\rightarrow$ Import Account**).

### Step 2: Launch the Frontend
1. Ensure the `contractAddress` variable in `frontend/script.js` is set to your deployed Ganache contract address (`0xD1687f1f34cA0d2a6c3Fc325a9EE96Ec028a249b`).
2. In VS Code, right-click `frontend/index.html` and select **"Open with Live Server"** (or run `npx live-server frontend`).

### Step 3: Test Smart Contract Functions via UI
1. **Connect Wallet:** Click **"Connect MetaMask (Ganache)"** and approve the connection in MetaMask. The UI will display your connected Ganache wallet address, current poll round (`1`), and eligibility status (`🟢 Eligible to Vote`).
2. **Cast a Vote (`vote`):** Click **"Vote Candidate 1"** or **"Vote Candidate 2"** and confirm the transaction in the MetaMask popup. Once mined on Ganache:
   * The selected candidate's vote count increments by `1`.
   * Your voter status updates to `✅ Already Voted`.
3. **Double-Voting Prevention (`checkHasVoted`):** Attempting to vote a second time from the same address in the same round will trigger a `require` revert (`"You have already voted!"`).
4. **Reset Poll (`resetPoll`):** Click **"Reset Poll (New Round)"** and confirm the transaction in MetaMask. The round counter increments to the next round, vote counts reset to `0`, and accounts become eligible to vote again.

---

##  Screenshots Included
All proof-of-work screenshots are located in the `screenshots/` directory:
* **Compilation:** Terminal output showing successful compilation of `smartcontract.sol` with `solc 0.8.0`.
* **Migration:** Terminal output showing `truffle migrate --reset` deployment details and contract address.
* **Ganache State:** Ganache GUI showing mined blocks, deducted ETH gas fees, and contract creation transactions.
* **Frontend & MetaMask Interaction:** MetaMask transaction confirmation popup and updated vote counts on the web interface.