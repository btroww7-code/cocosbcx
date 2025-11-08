import { Settings, Wrench, BarChart3, Headphones } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Settings className="h-12 w-12 text-cyan-500" />,
      title: "System Design",
      description: "Custom water treatment systems designed specifically for your unique requirements and environment.",
      features: ["Custom Engineering", "3D Modeling", "Performance Analysis", "Cost Optimization"]
    },
    {
      icon: <Wrench className="h-12 w-12 text-blue-500" />,
      title: "Installation & Maintenance",
      description: "Professional installation and ongoing maintenance services to ensure optimal system performance.",
      features: ["Expert Installation", "Regular Maintenance", "Emergency Repairs", "System Upgrades"]
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-green-500" />,
      title: "Performance Monitoring",
      description: "Advanced monitoring solutions that provide real-time insights into your system's performance.",
      features: ["Real-time Analytics", "Predictive Maintenance", "Quality Reports", "Remote Monitoring"]
    },
    {
      icon: <Headphones className="h-12 w-12 text-purple-500" />,
      title: "24/7 Support",
      description: "Round-the-clock technical support to ensure your systems operate smoothly at all times.",
      features: ["24/7 Availability", "Expert Technicians", "Remote Diagnostics", "Priority Response"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive water technology solutions backed by years of expertise 
            and a commitment to excellence in every project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}