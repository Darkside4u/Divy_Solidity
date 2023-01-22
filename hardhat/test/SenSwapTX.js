const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const {
  addressFactory,
  addressRouter,
  addressFrom,
  addressTo,
} = require("../utils/AddressList");

const { erc20Abi, factoryAbi, routerAbi } = require("../utils/AbiList");

describe("Read And Write To The Bloackchain", () => {
  let provider,
    contractFactory,
    contractRouter,
    contractToken,
    decimals,
    amountIn,
    amountOut;

  //coonecting to provider
  provider = new ethers.providers.JsonRpcBatchProvider(
    "https://eth-mainnet.g.alchemy.com/v2/Rj1s_8wj8pcE9dYWRk0wDswBgRzoWjL_"
  );

  //contract address
  contractFactory = new ethers.Contract(addressFactory, factoryAbi, provider);
  contractRouter = new ethers.Contract(addressRouter, routerAbi, provider);
  contractToken = new ethers.Contract(addressFrom, erc20Abi, provider);

  const amountInHuman = "1";
  amountIn = ethers.utils.parseUnits(amountInHuman, decimals);

  //get price information
  const getAmountOut = async () => {
    decimals = await contractToken.decimals();

    const amountsOut = await contractRouter.getAmountsOut(amountIn, [
      addressFrom,
      addressTo,
    ]);

    return amountsOut[1].toString();
  };

  it("Connect to a provider , factory , token and router", () => {
    assert(provider._isProvider);

    expect(contractFactory.address).to.equal(
      "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
    );
    expect(contractRouter.address).to.equal(
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    );
    expect(contractToken.address).to.equal(
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    );
  });
  it("gets the price of the amountOut", async () => {
    const amount = await getAmountOut();
    assert(amount);
  });

  it("sends a transactions, i.e swaps token", async () => {
    const [ownerSigner] = await ethers.getSigners();

    const mainnetForkUniswapRouter = new ethers.Contract(
      addressRouter,
      routerAbi,
      provider
    );

    const myAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    const amountOut = await getAmountOut();

    const txswap = await mainnetForkUniswapRouter.swapExactTokensForTokens(
      amountIn, //amountIn,
      amountOut, //amountOut,
      [addressFrom, addressTo], //path,
      myAddress, //addressTo,
      Date.now() + 1000 * 60 * 5, //deadLine,
      {
        gasLimit: 2000000,
        gasPrice: ethers.utils.parseUnits("11.0", "gwei"),
      } //gas,
    );
  });
});
