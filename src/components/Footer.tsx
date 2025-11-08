import { Twitter, Send, MessageCircle, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-slate-800">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6 group cursor-pointer">
              <img
                src="/BnyPcWg1_400x400.jpg"
                alt="CocosBCX Logo"
                className="h-12 w-12 rounded-xl transition-all duration-300 group-hover:scale-110"
              />
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                CocosBCX
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Powering the future of blockchain gaming with cutting-edge technology,
              lightning-fast transactions, and a thriving global community.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Twitter className="w-5 h-5" />, gradient: 'from-sky-400 to-blue-500' },
                { icon: <Send className="w-5 h-5" />, gradient: 'from-cyan-400 to-blue-500' },
                { icon: <MessageCircle className="w-5 h-5" />, gradient: 'from-indigo-400 to-purple-500' },
                { icon: <Github className="w-5 h-5" />, gradient: 'from-gray-400 to-slate-500' }
              ].map((social, index) => (
                <div
                  key={index}
                  className={`p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-110 cursor-pointer group`}
                >
                  <div className={`text-gray-400 group-hover:bg-gradient-to-br group-hover:${social.gradient} group-hover:bg-clip-text group-hover:text-transparent`}>
                    {social.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Features', 'Tokenomics', 'Ecosystem', 'Roadmap', 'Community'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {['Whitepaper', 'Documentation', 'Developer Portal', 'Brand Assets', 'Media Kit', 'Support'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 CocosBCX. All rights reserved. Built for the gaming revolution.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}