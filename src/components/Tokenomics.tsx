import { PieChart as PieChartIcon, TrendingUp, Lock, Users } from 'lucide-react';
import PieChart from './PieChart';

export default function Tokenomics() {
  const distribution = [
    { label: 'Public Sale', percentage: 30, color: 'from-cyan-400 to-blue-500', value: '300M' },
    { label: 'Ecosystem Development', percentage: 25, color: 'from-blue-400 to-indigo-500', value: '250M' },
    { label: 'Team & Advisors', percentage: 15, color: 'from-purple-400 to-pink-500', value: '150M' },
    { label: 'Marketing & Partnerships', percentage: 15, color: 'from-green-400 to-emerald-500', value: '150M' },
    { label: 'Liquidity Pool', percentage: 10, color: 'from-yellow-400 to-orange-500', value: '100M' },
    { label: 'Reserve Fund', percentage: 5, color: 'from-red-400 to-rose-500', value: '50M' }
  ];

  const metrics = [
    { icon: <PieChartIcon className="w-6 h-6" />, label: 'Total Supply', value: '1,000,000,000' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'Circulating Supply', value: '300,000,000' },
    { icon: <Lock className="w-6 h-6" />, label: 'Locked Tokens', value: '700,000,000' },
    { icon: <Users className="w-6 h-6" />, label: 'Token Holders', value: '125,000+' }
  ];

  return (
    <section id="tokenomics" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950"></div>

      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Tokenomics
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A carefully designed economic model ensuring sustainable growth and long-term value.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="group relative p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-cyan-400 mb-3">{metric.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-sm text-gray-400">{metric.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <PieChart distribution={distribution} />

          <div className="space-y-4">
            {distribution.map((item, index) => (
              <div
                key={index}
                className="group relative p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-102"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.color}`}></div>
                    <span className="text-lg font-semibold text-white">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-400">{item.percentage}%</div>
                    <div className="text-sm text-gray-400">{item.value} COCOS</div>
                  </div>
                </div>
                <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: `${item.percentage}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
