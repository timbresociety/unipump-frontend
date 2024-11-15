import { baseSepolia } from "viem/chains";

const BASE_EURC = {
  name: "EURC",
  address: "0x808456652fdb597867f38412077A9182bf77359F",
  decimals: 6,
  image: "/tokens/eurc.png",
  symbol: "EURC",
};
const BASE_USDC = {
  name: "USDC",
  address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  decimals: 6,
  image: "/tokens/usdc.png",
  symbol: "USDC",
};

export const TOKENS_ON_CHAIN = {
  [baseSepolia.id]: [BASE_EURC, BASE_USDC],
};
