import React from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const isHi = language === "hi";

  return (
    <footer className="bg-[#040404] text-[#A6998E] border-t border-[#2B231D]">
      {/* 01 Trust Elements Bar */}
      <div className="border-b border-[#2B231D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/safety" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center shrink-0 border border-[#E87532]/20 shadow-sm group-hover:bg-[#E87532]/20 transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8F7F3] text-sm group-hover:text-[#E87532] transition-colors">
                {t("footer.verifiedTitle")}
              </h4>
              <p className="text-xs text-[#8F8F85]">{t("footer.verifiedDesc")}</p>
            </div>
          </Link>

          <Link to="/pricing" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center shrink-0 border border-[#E87532]/20 shadow-sm group-hover:bg-[#E87532]/20 transition-colors">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8F7F3] text-sm group-hover:text-[#E87532] transition-colors">
                {t("footer.speedTitle")}
              </h4>
              <p className="text-xs text-[#8F8F85]">{t("footer.speedDesc")}</p>
            </div>
          </Link>

          <Link to="/pricing" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center shrink-0 border border-[#E87532]/20 shadow-sm group-hover:bg-[#E87532]/20 transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8F7F3] text-sm group-hover:text-[#E87532] transition-colors">
                {t("footer.pricingTitle")}
              </h4>
              <p className="text-xs text-[#8F8F85]">{t("footer.pricingDesc")}</p>
            </div>
          </Link>

          <a href="tel:+918439616833" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center shrink-0 border border-[#E87532]/20 shadow-sm group-hover:bg-[#E87532]/20 transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8F7F3] text-sm group-hover:text-[#E87532] transition-colors">
                {t("footer.supportTitle")}
              </h4>
              <p className="text-xs text-[#8F8F85]">{t("footer.supportDesc")}</p>
            </div>
          </a>
        </div>
      </div>

      {/* 02 Main Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Mission Column */}
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

          <div className="flex items-center gap-3 text-xs text-[#8F8F85] pt-1">
            <MapPin className="w-4 h-4 text-[#E87532] shrink-0" />
            <span>
              {isHi
                ? "दिल्ली-एनसीआर, मुंबई, बेंगलुरु, पुणे, हैदराबाद व प्रमुख शहरों में उपलब्ध"
                : "Serving Delhi NCR, Mumbai, Bengaluru, Pune, Hyderabad & Tier-2 Hubs"}
            </span>
          </div>

          {/* Direct WhatsApp & Contact Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href="https://wa.me/918439616833?text=Hi%20JantaGaraj%2C%20I%20need%20doorstep%20assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isHi ? "व्हाट्सएप सहायता" : "WhatsApp Support"}</span>
            </a>
            <a
              href="tel:+918439616833"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#E87532] text-xs font-semibold hover:bg-orange-500/20 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 84396 16833</span>
            </a>
          </div>
        </div>

        {/* Column 2: Popular Services */}
        <div>
          <h4 className="text-[#F8F7F3] font-bold text-sm tracking-wider uppercase mb-4 font-display">
            {t("footer.popularServices")}
          </h4>
          <ul className="space-y-2.5 text-sm text-[#A6998E]">
            <li>
              <Link to="/services?search=Car" className="hover:text-[#E87532] transition-colors flex items-center justify-between group">
                <span>{isHi ? "जनरल कार सर्विस व ट्यूनिंग" : "General Car Service"}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E87532]" />
              </Link>
            </li>
            <li>
              <Link to="/services?search=Breakdown" className="hover:text-[#E87532] transition-colors flex items-center justify-between group">
                <span>{isHi ? "इमरजेंसी रोडसाइड ब्रेकडाउन" : "Roadside Breakdown Assist"}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E87532]" />
              </Link>
            </li>
            <li>
              <Link to="/services?search=Battery" className="hover:text-[#E87532] transition-colors flex items-center justify-between group">
                <span>{isHi ? "बैटरी जंपस्टार्ट व रिप्लेसमेंट" : "Battery Jumpstart Triage"}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E87532]" />
              </Link>
            </li>
            <li>
              <Link to="/services?search=AC" className="hover:text-[#E87532] transition-colors flex items-center justify-between group">
                <span>{isHi ? "स्प्लिट एसी डीप फोम जेट" : "AC Deep Jet Cleaning"}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E87532]" />
              </Link>
            </li>
            <li>
              <Link to="/services?search=Brake" className="hover:text-[#E87532] transition-colors flex items-center justify-between group">
                <span>{isHi ? "ब्रेक व क्लच ओवरहॉल" : "Brake & Clutch Repair"}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E87532]" />
              </Link>
            </li>
            <li>
              <Link to="/services?search=Tyre" className="hover:text-[#E87532] transition-colors flex items-center justify-between group">
                <span>{isHi ? "टायर पंचर व व्हील बैलेंसिंग" : "Tyre Puncture & Balancing"}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E87532]" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: For Technicians */}
        <div>
          <h4 className="text-[#F8F7F3] font-bold text-sm tracking-wider uppercase mb-4 font-display">
            {t("footer.forTechnicians")}
          </h4>
          <ul className="space-y-2.5 text-sm text-[#A6998E]">
            <li>
              <Link to="/register?role=TECHNICIAN" className="hover:text-[#E87532] transition-colors flex items-center justify-between group">
                <span>{isHi ? "मैकेनिक पार्टनर बनें" : "Join as Mechanic Partner"}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E87532]" />
              </Link>
            </li>
            <li>
              <Link to="/safety#kyc" className="hover:text-[#E87532] transition-colors flex items-center justify-between group">
                <span>{isHi ? "4-स्तरीय केवाईसी प्रक्रिया" : "KYC Verification Process"}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E87532]" />
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-[#E87532] transition-colors flex items-center justify-between group">
                <span>{isHi ? "सर्विस रेट कार्ड व कमाई" : "Service Rate Card & Earnings"}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E87532]" />
              </Link>
            </li>
            <li>
              <Link to="/terms#partner-terms" className="hover:text-[#E87532] transition-colors flex items-center justify-between group">
                <span>{isHi ? "पार्टनर आचार संहिता" : "Partner Code of Conduct"}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E87532]" />
              </Link>
            </li>
            <li>
              <Link to="/technician/dashboard" className="hover:text-[#E87532] transition-colors flex items-center justify-between group">
                <span>{isHi ? "मैकेनिक रडार लॉगिन" : "Mechanic Radar Portal"}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E87532]" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Company & Trust */}
        <div>
          <h4 className="text-[#F8F7F3] font-bold text-sm tracking-wider uppercase mb-4 font-display">
            {isHi ? "कंपनी व सुरक्षा" : "Company & Trust"}
          </h4>
          <ul className="space-y-2.5 text-sm text-[#A6998E]">
            <li>
              <Link to="/about" className="hover:text-[#E87532] transition-colors">
                {t("nav.aboutUs")}
              </Link>
            </li>
            <li>
              <Link to="/safety" className="hover:text-[#E87532] transition-colors">
                {isHi ? "सुरक्षा व विश्वास गारंटी" : "Safety & Protection Standards"}
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-[#E87532] transition-colors">
                {isHi ? "पारदर्शी दरें व मूल्य नीति" : "Transparent Pricing Policy"}
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-[#E87532] transition-colors">
                {isHi ? "सहायता व अक्सर पूछे जाने वाले प्रश्न" : "Help & FAQs Center"}
              </Link>
            </li>
            <li>
              <Link to="/technicians" className="hover:text-[#E87532] transition-colors">
                {isHi ? "सत्यापित मैकेनिक खोजें" : "Find Verified Mechanics"}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 03 Bottom Legal Bar */}
      <div className="border-t border-[#2B231D] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#717167]">
          <p>© {new Date().getFullYear()} JantaGaraj. {t("footer.rights")}</p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/privacy" className="hover:text-[#E87532] transition-colors">
              {isHi ? "गोपनीयता नीति" : "Privacy Policy"}
            </Link>
            <span className="text-[#2B231D]">•</span>
            <Link to="/terms" className="hover:text-[#E87532] transition-colors">
              {isHi ? "नियम व शर्तें" : "Terms of Service"}
            </Link>
            <span className="text-[#2B231D]">•</span>
            <Link to="/safety" className="hover:text-[#E87532] transition-colors">
              {isHi ? "सुरक्षा दिशानिर्देश" : "Safety Guidelines"}
            </Link>
            <span className="text-[#2B231D]">•</span>
            <Link to="/pricing" className="hover:text-[#E87532] transition-colors">
              {isHi ? "रेट कार्ड व रिफंड" : "Pricing & Refunds"}
            </Link>
            <span className="text-[#2B231D]">•</span>
            <Link to="/help" className="hover:text-[#E87532] transition-colors">
              {isHi ? "कस्टमर सपोर्ट" : "Support"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
