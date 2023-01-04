const network = {
  experimental: true,
  config: {
    chainId: "testnet",
    chainName: "Regen testing",
    rest: "http://127.0.0.1:1317",
    rpc: "http://127.0.0.1:26657",
    stakeCurrency: {
      coinDenom: "REGEN",
      coinMinimalDenom: "uregen",
      coinDecimals: 6,
      coinGeckoId: "regen",
    },
    bip44: { coinType: 118 },
    bech32Config: {
      bech32PrefixAccAddr: `regen`,
      bech32PrefixAccPub: `regenpub`,
      bech32PrefixValAddr: `regenvaloper`,
      bech32PrefixValPub: `regenvaloperpub`,
      bech32PrefixConsAddr: `regenvalcons`,
      bech32PrefixConsPub: `regenvalconspub`,
    },
    currencies: [
      {
        coinDenom: "REGEN",
        coinMinimalDenom: "uregen",
        coinDecimals: 6,
        coinGeckoId: "regen",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "REGEN",
        coinMinimalDenom: "uregen",
        coinDecimals: 6,
        coinGeckoId: "regen",
      },
    ],
    coinType: 118,
    gasPriceStep: { low: 0.0, average: 0.01, high: 0.2 },
    walletUrlForStaking: "http://localhost:3000/validators",
  },
};

export function isKeplrInstalled() {
  if (window.keplr === undefined) {
    return false;
  }
  return window?.keplr && window?.getOfflineSigner == null ? false : true;
}

export const connectKeplr = async () => {
  try {
    if (!isKeplrInstalled()) {
      throw new Error("Keplr wallet is not installed");
    } else {
      window.keplr.defaultOptions = {
        sign: {
          preferNoSetMemo: true,
          disableBalanceCheck: true,
        },
      };
      if (network.experimental) {
        await window.keplr.experimentalSuggestChain(network.config);
      }
      try {
        const result = await getKeplrWalletAmino(network.config.chainId);
        const walletInfo = await window.keplr.getKey(network.config.chainId);
        return {
          walletInfo: walletInfo,
          result: result,
          network: network,
        };
      } catch (error) {
        throw new Error(error.message || "");
      }
    }
  } catch (error) {
    throw new Error(error.message || "");
  }
};

async function getKeplrWalletAmino(chainID) {
  await window.keplr.enable(chainID);
  const offlineSigner = window.getOfflineSignerOnlyAmino(chainID);
  const accounts = await offlineSigner.getAccounts();
  return [offlineSigner, accounts[0]];
}
