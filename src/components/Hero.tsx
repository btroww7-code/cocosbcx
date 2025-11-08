import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15), transparent 40%)`
        }}
      />

      <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-cyan-500 rounded-full opacity-10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-8 backdrop-blur-sm animate-fadeIn">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-300 font-medium">Revolutionary Blockchain Gaming Token</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slideUp">
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient">
            The Future of
          </span>
          <span className="block mt-2 bg-gradient-to-r from-blue-300 via-cyan-400 to-blue-300 bg-clip-text text-transparent animate-gradient" style={{ animationDelay: '0.2s' }}>
            Gaming Finance
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed animate-slideUp" style={{ animationDelay: '0.3s' }}>
          CocosBCX powers the next generation of blockchain gaming with lightning-fast transactions,
          minimal fees, and seamless NFT integration for millions of gamers worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <button className="group relative px-8 py-4 font-bold text-lg text-white overflow-hidden rounded-xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-gradient-shift"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              Explore Ecosystem
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          <button className="group px-8 py-4 font-bold text-lg text-cyan-400 border-2 border-cyan-500/50 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
            <span className="flex items-center gap-2">
              Read Whitepaper
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { value: '$250M+', label: 'Market Cap' },
            { value: '500K+', label: 'Active Users' },
            { value: '2M+', label: 'Transactions' },
            { value: '50+', label: 'Game Partners' }
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative p-6 bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}