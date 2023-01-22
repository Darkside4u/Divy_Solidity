const ethers = require("ethers");

const {
  addressFactory,
  addressRouter,
  addressFrom,
  addressTo,
} = require("./AddressList");

const { erc20Abi, factoryAbi, pairAbi, routerAbi } = require("./AbiList");

//Standerd Provider

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/Rj1s_8wj8pcE9dYWRk0wDswBgRzoWjL_"
);

//Connect To Factory

const contractFactory = new ethers.Contract(
  addressFactory,
  factoryAbi,
  provider
);

//Connect To Router
const contractRouter = new ethers.Contract(addressRouter, routerAbi, provider);

//Call BlockChain

const GetPrice = async (amountInHuman) => {
  //Convert the amountIn
  const contractToken = new ethers.Contract(addressFrom, erc20Abi, provider);
  const decimals = await contractToken.decimals();
  const amountIn = ethers.utils.parseUnits(amountInHuman, decimals).toString();
  //console.log(amountIn);

  //Get AmountsOut

  const amountsOut = await contractRouter.getAmountsOut(amountIn, [
    addressFrom,
    addressTo,
  ]);

  //Convert Amount out - decimals
  const contractToken2 = new ethers.Contract(addressTo, erc20Abi, provider);
  const decimals2 = await contractToken2.decimals();

  //Convert Amount out - HumanReadable
  const amountsOutHuman = ethers.utils.formatUnits(
    amountsOut[1].toString(),
    decimals2
  );

  //Log OutPut
  console.log(amountsOutHuman);
};

const amountInHuman = "1";
GetPrice(amountInHuman);
