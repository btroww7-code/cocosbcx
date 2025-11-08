import { useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config/wagmi';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Tokenomics from './components/Tokenomics';
import Ecosystem from './components/Ecosystem';
import Roadmap from './components/Roadmap';
import Community from './components/Community';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
          <ParticlesBackground />
          <Header />
          <Hero />
          <Features />
          <Tokenomics />
          <Ecosystem />
          <Roadmap />
          <Community />
          <Footer />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;