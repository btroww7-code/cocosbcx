import { Zap, Shield, Gamepad2, Coins, Users, TrendingUp, Gauge, Lock, Rocket, DollarSign, Globe2, BarChart3 } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Gauge className="w-10 h-10" />,
      title: "Lightning Fast",
      description: "Process thousands of transactions per second with sub-second finality for seamless gaming experiences.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Lock className="w-10 h-10" />,
      title: "Enterprise Security",
      description: "Military-grade encryption and multi-signature protocols protect your assets 24/7.",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <Rocket className="w-10 h-10" />,
      title: "Gaming Optimized",
      description: "Built specifically for gaming with NFT support, in-game assets, and cross-game compatibility.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: "Low Transaction Fees",
      description: "Minimal gas fees ensure maximum value for players and developers in every transaction.",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Globe2 className="w-10 h-10" />,
      title: "Vibrant Community",
      description: "Join a thriving ecosystem of gamers, developers, and investors building the future together.",
      gradient: "from-red-400 to-rose-500"
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Proven Growth",
      description: "Consistent ecosystem expansion with new partnerships and integrations every month.",
      gradient: "from-blue-400 to-indigo-500"
    }
  ];

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Why Choose CocosBCX?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Engineered for performance, built for gamers, designed for the future of decentralized gaming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-scaleIn cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>

              <div className={`relative z-10 inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              <h3 className="relative z-10 text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="relative z-10 text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
