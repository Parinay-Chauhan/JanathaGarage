import React from "react";
import { Link } from "react-router-dom";
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Clock, Award } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#040404] text-[#A6998E] border-t border-[#2B231D]">
      {/* Trust Elements Bar */}
      <div className="border-b border-[#2B231D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center shrink-0 border border-[#E87532]/20 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8F7F3] text-sm">{t("footer.verifiedTitle")}</h4>
              <p className="text-xs text-[#8F8F85]">{t("footer.verifiedDesc")}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center shrink-0 border border-[#E87532]/20 shadow-sm">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8F7F3] text-sm">{t("footer.speedTitle")}</h4>
              <p className="text-xs text-[#8F8F85]">{t("footer.speedDesc")}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center shrink-0 border border-[#E87532]/20 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8F7F3] text-sm">{t("footer.pricingTitle")}</h4>
              <p className="text-xs text-[#8F8F85]">{t("footer.pricingDesc")}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center shrink-0 border border-[#E87532]/20 shadow-sm">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8F7F3] text-sm">{t("footer.supportTitle")}</h4>
              <p className="text-xs text-[#8F8F85]">{t("footer.supportDesc")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E87532] flex items-center justify-center text-white shadow-orange-glow">
              <Wrench className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-2xl font-extrabold font-display tracking-tight text-[#F8F7F3]">
              Janta<span className="text-[#E87532]">Garaj</span>
            </span>
          </Link>
          <p className="text-[#8F8F85] text-sm max-w-sm leading-relaxed">
            {t("footer.brandDesc")}
          </p>
          <div className="flex items-center gap-3 text-xs text-[#8F8F85] pt-2">
            <MapPin className="w-4 h-4 text-[#E87532] shrink-0" />
            <span>
              {language === "hi"
                ? "दिल्ली-एनसीआर, मुंबई, बेंगलुरु, पुणे व प्रमुख शहरों में उपलब्ध"
                : "Serving Delhi NCR, Mumbai, Bengaluru, Pune & Tier-2 Hubs"}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-[#F8F7F3] font-bold text-sm tracking-wider uppercase mb-4 font-display">
            {t("footer.popularServices")}
          </h4>
          <ul className="space-y-2.5 text-sm text-[#A6998E]">
            <li>
              <Link to="/services" className="hover:text-[#E87532] transition-colors">
                {language === "hi" ? "जनरल कार सर्विस व इंस्पेक्शन" : "General Car Service"}
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#E87532] transition-colors">
                {language === "hi" ? "इमरजेंसी बाइक ब्रेकडाउन" : "Emergency Bike Breakdown"}
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#E87532] transition-colors">
                {language === "hi" ? "ब्रेक व क्लच रिपेयर" : "Brake & Clutch Repair"}
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#E87532] transition-colors">
                {language === "hi" ? "बैटरी जंपस्टार्ट व रिप्लेसमेंट" : "Battery Jumpstart & Replacement"}
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#E87532] transition-colors">
                {language === "hi" ? "टायर पंचर व व्हील बैलेंसिंग" : "Tyre Puncture & Balancing"}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#F8F7F3] font-bold text-sm tracking-wider uppercase mb-4 font-display">
            {t("footer.forTechnicians")}
          </h4>
          <ul className="space-y-2.5 text-sm text-[#A6998E]">
            <li>
              <Link to="/technician/dashboard" className="hover:text-[#E87532] transition-colors">
                {language === "hi" ? "मैकेनिक पार्टनर बनें" : "Join as Mechanic"}
              </Link>
            </li>
            <li>
              <Link to="/technician/dashboard" className="hover:text-[#E87532] transition-colors">
                {language === "hi" ? "केवाईसी सत्यापन" : "KYC Verification"}
              </Link>
            </li>
            <li>
              <Link to="/technician/dashboard" className="hover:text-[#E87532] transition-colors">
                {language === "hi" ? "सर्विस रेट कार्ड" : "Service Pricing Guide"}
              </Link>
            </li>
            <li>
              <Link to="/technician/dashboard" className="hover:text-[#E87532] transition-colors">
                {language === "hi" ? "पार्टनर नियम व शर्तें" : "Mechanic Partner Terms"}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#F8F7F3] font-bold text-sm tracking-wider uppercase mb-4 font-display">
            {t("footer.contactSupport")}
          </h4>
          <ul className="space-y-2.5 text-sm text-[#A6998E]">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#E87532]" />
              <a href="tel:+918439616833" className="hover:text-[#E87532] transition-colors">
                +91 84396 16833
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#E87532]" />
              <span>support@jantagaraj.in</span>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#E87532] transition-colors">
                {t("nav.aboutUs")}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#E87532] transition-colors">
                {language === "hi" ? "सुरक्षा दिशानिर्देश" : "Safety Guidelines"}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2B231D] py-6 text-center text-xs text-[#717167]">
        <p>© {new Date().getFullYear()} {t("footer.rights")}</p>
      </div>
    </footer>
  );
};
