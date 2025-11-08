import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Tokenomics from './components/Tokenomics';
import Ecosystem from './components/Ecosystem';
import Roadmap from './components/Roadmap';
import Community from './components/Community';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  return (
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
  );
}

export default App;