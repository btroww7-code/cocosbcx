import { Twitter, Send, MessageCircle, Github } from 'lucide-react';

export default function Community() {
  const socials = [
    {
      icon: <Twitter className="w-8 h-8" />,
      name: 'Twitter',
      handle: '@CocosBCX',
      followers: '250K+',
      gradient: 'from-sky-400 to-blue-500'
    },
    {
      icon: <Send className="w-8 h-8" />,
      name: 'Telegram',
      handle: 'CocosBCX Official',
      followers: '180K+',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      name: 'Discord',
      handle: 'CocosBCX Community',
      followers: '120K+',
      gradient: 'from-indigo-400 to-purple-500'
    },
    {
      icon: <Github className="w-8 h-8" />,
      name: 'GitHub',
      handle: 'cocosbcx',
      followers: '15K+',
      gradient: 'from-gray-400 to-slate-500'
    }
  ];

  return (
    <section id="community" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950"></div>

      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Join the Community
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Connect with thousands of gamers, developers, and blockchain enthusiasts worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {socials.map((social, index) => (
            <div
              key={index}
              className="group relative p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className={`relative z-10 inline-flex p-4 bg-gradient-to-br ${social.gradient} rounded-xl mb-6 group-hover:scale-110 transition-all duration-500`}>
                <div className="text-white">
                  {social.icon}
                </div>
              </div>

              <h3 className="relative z-10 text-xl font-bold text-white mb-2">
                {social.name}
              </h3>

              <p className="relative z-10 text-cyan-400 mb-2">
                {social.handle}
              </p>

              <p className="relative z-10 text-gray-400 text-sm">
                {social.followers} followers
              </p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        <div className="relative p-12 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm border border-cyan-500/30 rounded-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-white mb-6">
              Stay Updated
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our newsletter and never miss important updates, events, and announcements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm"
              />
              <button className="group relative px-8 py-4 font-bold text-white overflow-hidden rounded-xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-gradient-shift"></div>
                <span className="relative z-10">Subscribe</span>
              </button>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              Join 50,000+ subscribers receiving weekly updates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
