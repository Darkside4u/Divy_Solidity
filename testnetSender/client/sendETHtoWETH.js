const { ethers } = require("ethers");
const { send } = require("process");

//Testnet Proivder
const providerTestnet = new ethers.providers.JsonRpcBatchProvider(
  "https://eth-goerli.g.alchemy.com/v2/6z9-kBFnryYhSJ5xlHX3_HOxpR73ql0v"
);

//Create Signer
const myAddress = "0x5020598252FE4d3187C8D476B2dAF058a893d864";

const privateKey =
  "9ab3813163ebc939236d13bf422d2da815cd53396e53f5f83d70a54f94f2c82d";

const walletSigner = new ethers.Wallet(privateKey, providerTestnet);

const exchangeETH = async () => {
  const sendValueHuman = "0.01";
  const gasPrice = await providerTestnet.getGasPrice();
  const nonce = 1; //web3.eth.getTransactionCount(myAddress)
  const txBuild = {
    from: myAddress, //From (myAddress)
    to: "0x595DFFf822767c2E14CFB7D5e0b5a5e23eCfACdd", //To (WETH to Goreli Testnet)
    value: ethers.utils.parseUnits(sendValueHuman), //value to send
    nonce: nonce, //nonce
    gasLimit: 30000000, //gas limit
    gasPrice: gasPrice, //gas price
  };

  //Send transaction
  const txSend = await walletSigner.sendTransaction(txBuild);

  console.log("");
  console.log("txSend");
  console.log(txSend);
};

exchangeETH();
