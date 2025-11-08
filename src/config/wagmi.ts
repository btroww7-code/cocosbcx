import { createConfig, http } from 'wagmi';
import { mainnet, bsc, polygon, arbitrum, optimism, avalanche, fantom, base } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet, metaMask } from 'wagmi/connectors';

const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID';

export const config = createConfig({
  chains: [mainnet, bsc, polygon, arbitrum, optimism, avalanche, fantom, base],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'CocosBCX' })
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [avalanche.id]: http(),
    [fantom.id]: http(),
    [base.id]: http()
  }
});
