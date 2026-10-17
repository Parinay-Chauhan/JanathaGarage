import React from "react";
import { Link } from "react-router-dom";
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Clock, Award } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Trust Elements Bar */}
      <div className="border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0 border border-brand-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Verified Technicians</h4>
              <p className="text-xs text-stone-400">Strict KYC & police verified mechanics</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0 border border-brand-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">30-Min Fast Arrival</h4>
              <p className="text-xs text-stone-400">Nearby doorstep breakdown assistance</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0 border border-brand-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Transparent Pricing</h4>
              <p className="text-xs text-stone-400">Fixed rate cards & digital OTP invoicing</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0 border border-brand-500/20">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24x7 SOS Support</h4>
              <p className="text-xs text-stone-400">Emergency highway & roadside assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-glow">
              <Wrench className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-2xl font-extrabold font-display tracking-tight text-white">
              Janta<span className="text-brand-500">Garaj</span>
            </span>
          </Link>
          <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
            India's reliable decentralized vehicle maintenance and emergency mechanic marketplace. Connecting vehicle owners with verified neighborhood mechanics.
          </p>
          <div className="flex items-center gap-3 text-xs text-stone-400 pt-2">
            <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
            <span>Serving Delhi NCR, Mumbai, Bengaluru, Pune & Tier-2 Hubs</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-display">
            Popular Services
          </h4>
          <ul className="space-y-2.5 text-sm text-stone-400">
            <li><Link to="/services" className="hover:text-brand-500 transition-colors">General Car Service</Link></li>
            <li><Link to="/services" className="hover:text-brand-500 transition-colors">Emergency Bike Breakdown</Link></li>
            <li><Link to="/services" className="hover:text-brand-500 transition-colors">Brake & Clutch Repair</Link></li>
            <li><Link to="/services" className="hover:text-brand-500 transition-colors">Battery Jumpstart & Replacement</Link></li>
            <li><Link to="/services" className="hover:text-brand-500 transition-colors">Tyre Puncture & Balancing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-display">
            For Technicians
          </h4>
          <ul className="space-y-2.5 text-sm text-stone-400">
            <li><Link to="/technician/dashboard" className="hover:text-brand-500 transition-colors">Join as Mechanic</Link></li>
            <li><Link to="/technician/dashboard" className="hover:text-brand-500 transition-colors">KYC Verification</Link></li>
            <li><Link to="/technician/dashboard" className="hover:text-brand-500 transition-colors">Service Pricing Guide</Link></li>
            <li><Link to="/technician/dashboard" className="hover:text-brand-500 transition-colors">Mechanic Partner Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-display">
            Contact & Support
          </h4>
          <ul className="space-y-2.5 text-sm text-stone-400">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-500" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-500" />
              <span>support@jantagaraj.in</span>
            </li>
            <li><Link to="/about" className="hover:text-brand-500 transition-colors">About Us</Link></li>
            <li><Link to="/help" className="hover:text-brand-500 transition-colors">Safety Guidelines</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-900 py-6 text-center text-xs text-stone-500">
        <p>© {new Date().getFullYear()} JantaGaraj Technologies Pvt Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};
