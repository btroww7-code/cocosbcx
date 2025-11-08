import { Rocket, Briefcase, Code, Globe } from 'lucide-react';

export default function Ecosystem() {
  const partners = [
    {
      icon: <Rocket className="w-10 h-10" />,
      title: "Game Studios",
      count: "50+",
      description: "Leading game developers building on CocosBCX",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "Exchange Partners",
      count: "25+",
      description: "Major exchanges listing COCOS token",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: "Developers",
      count: "5,000+",
      description: "Active developers building amazing dApps",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Global Presence",
      count: "100+",
      description: "Countries with active CocosBCX users",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="ecosystem" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Thriving Ecosystem
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands of partners, developers, and gamers building the future of blockchain gaming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className={`relative z-10 inline-flex p-4 bg-gradient-to-br ${partner.gradient} rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <div className="text-white">
                  {partner.icon}
                </div>
              </div>

              <div className="relative z-10 text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {partner.count}
              </div>

              <h3 className="relative z-10 text-xl font-bold text-white mb-3">
                {partner.title}
              </h3>

              <p className="relative z-10 text-gray-400">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative p-12 bg-gradient-to-br from-slate-900/80 to-blue-900/30 backdrop-blur-sm border border-cyan-500/30 rounded-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Build on CocosBCX?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Access developer tools, documentation, and grants to bring your gaming vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-8 py-4 font-bold text-lg text-white overflow-hidden rounded-xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-gradient-shift"></div>
                <span className="relative z-10">Developer Portal</span>
              </button>
              <button className="px-8 py-4 font-bold text-lg text-cyan-400 border-2 border-cyan-500/50 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                Partnership Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
