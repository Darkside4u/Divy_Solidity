const { ethers } = require("ethers");

const {
  abi: QuoterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/Rj1s_8wj8pcE9dYWRk0wDswBgRzoWjL_"
);

async function getPrice(addressFrom, addressTo, amountInHuman) {
  const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

  const quoterContract = new ethers.Contract(
    quoterAddress,
    QuoterABI,
    provider
  );

  const amountIn = ethers.utils.parseUnits(amountInHuman, 18);

  const quoteAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    addressFrom,
    addressTo,
    3000,
    amountIn.toString(),
    0
  );

  //Output the amount
  const amount = ethers.utils.formatUnits(quoteAmountOut.toString(), 6);

  return amount;
}

const main = async () => {
  const addressFrom = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; //WETH
  const addressTo = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; //USDT
  const amountInHuman = "1";

  const amountOut = await getPrice(addressFrom, addressTo, amountInHuman);
  console.log(amountOut);
};

main();
