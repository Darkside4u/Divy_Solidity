const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/Rj1s_8wj8pcE9dYWRk0wDswBgRzoWjL_"
);

const addressFactory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

const abi = [
  "function getPool( address tokenA, address tokenB, uint24 fee) external view returns (address pool)",
];

const contractFactory = new ethers.Contract(addressFactory, abi, provider);

const addressUSDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

const addressWETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

const getPool = async () => {
  const addressPool = await contractFactory.getPool(
    addressWETH,
    addressUSDT,
    3000
  );
  console.log(addressPool);
};

getPool();
