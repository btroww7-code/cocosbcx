import { Check, Circle, Clock } from 'lucide-react';

export default function Roadmap() {
  const phases = [
    {
      quarter: 'Q1 2024',
      status: 'completed',
      title: 'Foundation',
      items: [
        'Token Launch & Initial DEX Offering',
        'Core Blockchain Infrastructure',
        'First Gaming Partnerships',
        'Community Building Initiatives'
      ]
    },
    {
      quarter: 'Q2 2024',
      status: 'completed',
      title: 'Expansion',
      items: [
        'Major CEX Listings',
        '10+ Game Integrations',
        'NFT Marketplace Launch',
        'Developer SDK Release'
      ]
    },
    {
      quarter: 'Q3 2024',
      status: 'in-progress',
      title: 'Innovation',
      items: [
        'Cross-Chain Bridge Implementation',
        'Mobile Wallet Launch',
        'Gaming Tournaments Platform',
        'Staking & Rewards Program'
      ]
    },
    {
      quarter: 'Q4 2024',
      status: 'upcoming',
      title: 'Global Scale',
      items: [
        'Enterprise Gaming Partnerships',
        'Layer 2 Scaling Solutions',
        'Metaverse Integration',
        'Governance Token Launch'
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <Check className="w-6 h-6" />;
    if (status === 'in-progress') return <Clock className="w-6 h-6" />;
    return <Circle className="w-6 h-6" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'from-green-400 to-emerald-500';
    if (status === 'in-progress') return 'from-cyan-400 to-blue-500';
    return 'from-gray-400 to-slate-500';
  };

  return (
    <section id="roadmap" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Roadmap to Success
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our journey to revolutionize blockchain gaming, milestone by milestone.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-slate-800 hidden lg:block"></div>

          <div className="space-y-16">
            {phases.map((phase, index) => (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="flex-1 w-full">
                  <div className="group relative p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-500 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 bg-gradient-to-br ${getStatusColor(phase.status)} rounded-xl`}>
                          {getStatusIcon(phase.status)}
                        </div>
                        <div>
                          <div className="text-sm text-cyan-400 font-semibold">{phase.quarter}</div>
                          <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                        </div>
                      </div>

                      <ul className="space-y-3 mt-6">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3 text-gray-300">
                            <div className={`mt-1 w-2 h-2 rounded-full bg-gradient-to-r ${getStatusColor(phase.status)} flex-shrink-0`}></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getStatusColor(phase.status)} flex items-center justify-center border-4 border-slate-950 shadow-lg`}>
                    {getStatusIcon(phase.status)}
                  </div>
                </div>

                <div className="flex-1 w-full lg:h-32"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
