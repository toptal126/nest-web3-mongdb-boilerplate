export type T_CROSSWISE_NETWORK_ID = 97 | 137;
export const chainId: T_CROSSWISE_NETWORK_ID = 97;

export const CROSSWISE_NETWORKS: {
  [networkId in T_CROSSWISE_NETWORK_ID]: { name: string; rpc: string };
} = {
  '97': { name: 'mumbai', rpc: 'bsc_testnet_chapel' },
  '137': { name: 'polygon', rpc: 'polygon' },
};

export const CROSSWISE_NETWORK = CROSSWISE_NETWORKS[chainId];

export const HTTP_RPC_URL = `https://rpc.ankr.com/${CROSSWISE_NETWORK.rpc}`;
