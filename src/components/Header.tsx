import { Menu, X, Wallet, ChevronDown, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-950/40 backdrop-blur-2xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10'
          : 'bg-slate-950/20 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-75 blur-lg transition-all duration-500"></div>
              <div className="relative h-12 w-12 rounded-xl bg-slate-900 p-1.5 ring-1 ring-cyan-500/30 group-hover:ring-cyan-400 transition-all duration-300">
                <img
                  src="/BnyPcWg1_400x400.jpg"
                  alt="CocosBCX Logo"
                  className="h-full w-full rounded-lg object-cover transition-all duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              CocosBCX
            </span>
          </div>

          <nav className="hidden md:flex space-x-1">
            {['Home', 'Features', 'Tokenomics', 'Ecosystem', 'Roadmap', 'Community', 'Staking'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-4 py-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 group"
              >
                <span className="relative z-10">{item}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </nav>

          {!isConnected ? (
            <div className="hidden md:block relative">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-xl opacity-75 group-hover:opacity-100 blur transition-all duration-300"></div>
                <button
                  onClick={() => setShowWallets(!showWallets)}
                  className="relative px-6 py-3 font-semibold text-white bg-slate-950 rounded-xl flex items-center gap-2 transition-all duration-300"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Connect</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showWallets ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {showWallets && (
                <div className="absolute top-full mt-2 right-0 w-80 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 p-4 animate-fadeIn">
                  <div className="space-y-2">
                    {connectors.map((connector) => (
                      <button
                        key={connector.id}
                        onClick={() => {
                          connect({ connector });
                          setShowWallets(false);
                        }}
                        className="w-full px-4 py-3 text-left text-white hover:bg-cyan-500/10 rounded-xl transition-all duration-300 flex items-center gap-3 border border-slate-800 hover:border-cyan-500/50 group"
                      >
                        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium">{connector.name}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        window.open('https://t.me/cocosbcx_bot', '_blank');
                        setShowWallets(false);
                      }}
                      className="w-full px-4 py-3 text-left text-white hover:bg-cyan-500/10 rounded-xl transition-all duration-300 flex items-center gap-3 border border-slate-800 hover:border-cyan-500/50 group"
                    >
                      <div className="p-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Send className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium">Telegram Login</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl">
                <span className="text-sm text-cyan-400 font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
              <button
                onClick={() => disconnect()}
                className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white border border-slate-700 hover:border-cyan-500/50 rounded-xl transition-all duration-300"
              >
                Disconnect
              </button>
            </div>
          )}

          <button
            className="md:hidden text-cyan-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="px-2 pt-2 pb-6 space-y-2 bg-slate-900/95 backdrop-blur-xl border-t border-cyan-500/20 rounded-b-2xl">
              {['Home', 'Features', 'Tokenomics', 'Ecosystem', 'Roadmap', 'Community', 'Staking'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              {!isConnected ? (
                <div className="space-y-2 mt-4">
                  <div className="text-sm text-gray-400 px-4 mb-2">Connect Wallet:</div>
                  {connectors.map((connector) => (
                    <button
                      key={connector.id}
                      onClick={() => {
                        connect({ connector });
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-6 py-3 font-semibold text-white bg-slate-800 hover:bg-cyan-500/20 rounded-xl transition-all duration-300 flex items-center gap-3 border border-slate-700 hover:border-cyan-500/50"
                    >
                      <Wallet className="w-5 h-5 text-cyan-400" />
                      {connector.name}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      window.open('https://t.me/cocosbcx_bot', '_blank');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-6 py-3 font-semibold text-white bg-slate-800 hover:bg-cyan-500/20 rounded-xl transition-all duration-300 flex items-center gap-3 border border-slate-700 hover:border-cyan-500/50"
                  >
                    <Send className="w-5 h-5 text-cyan-400" />
                    Telegram Login
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => disconnect()}
                  className="w-full mt-4 px-6 py-3 font-semibold text-white border border-cyan-500/50 rounded-xl hover:bg-cyan-500/10 transition-all duration-300"
                >
                  Disconnect ({address?.slice(0, 6)}...{address?.slice(-4)})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}