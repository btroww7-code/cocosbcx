import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/BnyPcWg1_400x400.jpg" 
                alt="AquaTech Logo" 
                className="h-10 w-10 rounded-lg"
              />
              <span className="ml-3 text-2xl font-bold">AquaTech</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Leading the future of water technology with innovative solutions 
              that make a positive impact on communities worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-cyan-400 transition-colors">Services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">System Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Installation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Maintenance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 AquaTech. All rights reserved. Built with precision and care.
          </p>
        </div>
      </div>
    </footer>
  );
}