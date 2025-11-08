import { Droplets, Zap, Shield, Globe } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Droplets className="h-8 w-8 text-cyan-500" />,
      title: "Pure Innovation",
      description: "Advanced filtration systems that deliver crystal-clear water solutions for any environment."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Energy Efficient",
      description: "Cutting-edge technology that reduces energy consumption while maximizing performance."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Reliable Protection",
      description: "Robust systems designed to withstand the toughest conditions and deliver consistent results."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Global Impact",
      description: "Solutions that make a positive difference in communities worldwide through sustainable practices."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About AquaTech
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing water technology with innovative solutions that combine 
            sustainability, efficiency, and cutting-edge design to create a better future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Water Solutions?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust AquaTech for their water technology needs.
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}