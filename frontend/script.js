const contractAddress = "0xD1687f1f34cA0d2a6c3Fc325a9EE96Ec028a249b";

const contractABI = [
  "function round() public view returns (uint256)",
  "function candidate1Votes() public view returns (uint256)",
  "function candidate2Votes() public view returns (uint256)",
  "function vote(uint256 _candidateId) public",
  "function getVotes() public view returns (uint256, uint256)",
  "function checkHasVoted(address _voter) public view returns (bool)",
  "function resetPoll() public"
];

let provider;
let signer;
let contract;
let currentAccount;

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask browser extension!");
    return;
  }
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    currentAccount = await signer.getAddress();

    document.getElementById("walletAddress").innerText = "Connected Account: " + currentAccount;
    document.getElementById("connectBtn").innerText = "✅ Connected to Ganache";

    contract = new ethers.Contract(contractAddress, contractABI, signer);
    await loadPollData();
  } catch (err) {
    console.error(err);
    document.getElementById("txStatus").innerText = "❌ Connection error: " + err.message;
  }
}

async function loadPollData() {
  if (!contract) return;
  try {
    const currentRound = await contract.round();
    const votes = await contract.getVotes();
    const voted = await contract.checkHasVoted(currentAccount);

    document.getElementById("roundNumber").innerText = currentRound.toString();
    document.getElementById("cand1Votes").innerText = votes[0].toString();
    document.getElementById("cand2Votes").innerText = votes[1].toString();
    document.getElementById("voterStatus").innerText = voted
      ? "✅ Already Voted"
      : "🟢 Eligible to Vote";
  } catch (err) {
    console.error(err);
    document.getElementById("txStatus").innerText =
      "⚠️ Make sure MetaMask is switched to your Local Ganache Network (Port 7545).";
  }
}

async function castVote(candidateId) {
  if (!contract) return alert("Please connect MetaMask first!");
  try {
    document.getElementById("txStatus").innerText =
      `⏳ Submitting vote for Candidate ${candidateId}... Confirm in MetaMask.`;
    const tx = await contract.vote(candidateId);
    await tx.wait();
    document.getElementById("txStatus").innerText =
      `🎉 Vote successfully recorded on Ganache for Candidate ${candidateId}!`;
    await loadPollData();
  } catch (err) {
    console.error(err);
    document.getElementById("txStatus").innerText =
      "❌ Transaction rejected or you have already voted in this round!";
  }
}

async function resetPollRound() {
  if (!contract) return alert("Please connect MetaMask first!");
  try {
    document.getElementById("txStatus").innerText =
      "⏳ Resetting poll for a new round... Confirm in MetaMask.";
    const tx = await contract.resetPoll();
    await tx.wait();
    document.getElementById("txStatus").innerText =
      "✅ Poll reset! New voting round started.";
    await loadPollData();
  } catch (err) {
    console.error(err);
    document.getElementById("txStatus").innerText = "❌ Reset transaction failed.";
  }
}