import React from "react";
import { Link } from "react-router-dom";
import { Wrench, Instagram, Facebook, Linkedin } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const isHi = language === "hi";

  return (
    <footer className="bg-[#121214] text-[#8E8E93] border-t border-[#222225] selection:bg-[#E87532] selection:text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-12 sm:pb-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10">
          {/* Brand & Description Column (Spans 2 cols on desktop) */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-[#E87532] group-hover:border-[#E87532] transition-colors">
                <Wrench className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-display">
                Janta<span className="text-[#E87532]">Garaj</span>
              </span>
            </Link>

            <p className="text-xs sm:text-[13px] text-[#8E8E93] leading-relaxed max-w-xs">
              {isHi
                ? "भारत का विश्वसनीय ऑन-डिमांड डोरस्टेप ऑटो गैराज व होम मेंटेनेंस नेटवर्क। प्रमाणित मैकेनिक 30 मिनट में आपके पास।"
                : "India's trusted on-demand doorstep automotive garage & home maintenance network. Certified mechanics at your doorstep in 30 minutes."}
            </p>

            {/* Social Links Row (Exact Reference Image Style) */}
            <div className="flex items-center gap-4 pt-2 text-[#71717A]">
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Product / Services */}
          <div className="col-span-1">
            <h4 className="text-white font-medium text-sm tracking-normal mb-4">
              {isHi ? "सेवाएं (Services)" : "Services"}
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px]">
              <li>
                <Link
                  to="/services?search=Car"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "जनरल कार सर्विस" : "General Car Service"}
                </Link>
              </li>
              <li>
                <Link
                  to="/services?search=Breakdown"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "रोडसाइड ब्रेकडाउन" : "Roadside Breakdown"}
                </Link>
              </li>
              <li>
                <Link
                  to="/services?search=Battery"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "बैटरी जंपस्टार्ट" : "Battery Jumpstart"}
                </Link>
              </li>
              <li>
                <Link
                  to="/services?search=AC"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "एसी फोम जेट सर्विस" : "AC Foam Jet Service"}
                </Link>
              </li>
              <li>
                <Link
                  to="/services?search=Brake"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "ब्रेक व क्लच ओवरहॉल" : "Brake & Clutch Repair"}
                </Link>
              </li>
              <li>
                <Link
                  to="/services?search=Tyre"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "टायर व व्हील केयर" : "Tyre & Wheel Care"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="col-span-1">
            <h4 className="text-white font-medium text-sm tracking-normal mb-4">
              {isHi ? "संसाधन (Resources)" : "Resources"}
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px]">
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "पारदर्शी रेट कार्ड" : "Pricing Rate Card"}
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "सुरक्षा दिशानिर्देश" : "Safety Guidelines"}
                </Link>
              </li>
              <li>
                <Link
                  to="/safety#kyc"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "4-स्तरीय केवाईसी" : "KYC Verification"}
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "सहायता व अक्सर पूछे जाने वाले सवाल" : "Help & Documentation"}
                </Link>
              </li>
              <li>
                <Link
                  to="/technicians"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "सत्यापित मैकेनिक खोजें" : "Verified Mechanics"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="col-span-1">
            <h4 className="text-white font-medium text-sm tracking-normal mb-4">
              {isHi ? "कंपनी (Company)" : "Company"}
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px]">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "हमारे बारे में" : "About Us"}
                </Link>
              </li>
              <li>
                <Link
                  to="/register?role=TECHNICIAN"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "पार्टनर बनें" : "Join as Partner"}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms#partner-terms"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "आचार संहिता" : "Partner Code of Conduct"}
                </Link>
              </li>
              <li>
                <a
                  href="tel:+918439616833"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "संपर्क: +91 84396 16833" : "Contact: +91 84396 16833"}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918439616833?text=Hi%20JantaGaraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "व्हाट्सएप सपोर्ट" : "WhatsApp Support"}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div className="col-span-1">
            <h4 className="text-white font-medium text-sm tracking-normal mb-4">
              {isHi ? "कानूनी (Legal)" : "Legal"}
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px]">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "गोपनीयता नीति" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "सेवा की शर्तें" : "Terms of Service"}
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "सुरक्षा मानक" : "Safety Standards"}
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing#guarantee"
                  className="hover:text-white transition-colors block"
                >
                  {isHi ? "रिफंड व वारंटी" : "Refund & Warranty"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar (Exact Reference Image Style) */}
      <div className="border-t border-[#222225] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
          {/* Copyright */}
          <p>
            © {new Date().getFullYear()} JantaGaraj. {isHi ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
          </p>

          {/* Operational Status (Matching Reference Image) */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#8E8E93]">
              {isHi ? "स्थिति: सभी सिस्टम सामान्य रूप से चालू हैं" : "Status: All Systems Operational"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
