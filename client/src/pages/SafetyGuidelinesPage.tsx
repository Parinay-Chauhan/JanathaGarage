import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  AlertTriangle,
  UserCheck,
  PhoneCall,
  CheckCircle,
  Clock,
  HeartHandshake,
  Award,
  Zap,
  MapPin,
  HelpCircle,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/Button";

export const SafetyGuidelinesPage: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  return (
    <div className="bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] min-h-screen pb-24 transition-colors">
      {/* Header Banner */}
      <section className="border-b border-[#E7E5DF] dark:border-[#2B231D] bg-white/60 dark:bg-[#141210]/60 backdrop-blur-sm py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-[#2B231D] text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{isHi ? "सुरक्षा व विश्वास दिशानिर्देश" : "Safety & Protection Standards"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#252621] dark:text-[#F5F2EB] leading-tight">
            {isHi ? "आपकी सुरक्षा और विश्वास, हमारी पहली प्राथमिकता" : "Your Security & Safety Come First, Always"}
          </h1>

          <p className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] max-w-2xl mx-auto leading-relaxed">
            {isHi
              ? "चाहे आधी रात को हाईवे पर ब्रेकडाउन हो या घर पर इलेक्ट्रीशियन का कार्य—JantaGaraj हर कदम पर कठोर सुरक्षा मानकों का पालन करता है।"
              : "From late-night highway roadside assistance to residential doorstep electrical repairs, discover the rigorous security layers protecting every booking."}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a href="tel:+918439616833">
              <Button variant="primary" size="md" className="font-bold shadow-orange-glow flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                <span>{isHi ? "24/7 आपातकालीन सहायता" : "24/7 Emergency Helpline"}</span>
              </Button>
            </a>
            <Link to="/technicians">
              <Button variant="outline" size="md" className="font-bold">
                {isHi ? "प्रमाणित मैकेनिक देखें" : "View Verified Mechanics"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-12">
        {/* Section 1: 4-Tier Verification */}
        <div id="kyc" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                {isHi ? "1. 4-स्तरीय तकनीशियन सत्यापन प्रक्रिया" : "1. Our 4-Tier Technician Verification"}
              </h2>
              <p className="text-xs text-[#717167] dark:text-[#9E9488]">
                {isHi ? "हर मैकेनिक को प्लेटफॉर्म पर कार्य करने से पूर्व इन 4 चरणों को उत्तीर्ण करना होता है:" : "Every professional is audited across four rigorous background gates before taking jobs:"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1B18] border border-[#E7E5DF] dark:border-[#2B231D] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E87532]">
                <CheckCircle className="w-4 h-4" />
                <span>{isHi ? "चरण 1: सरकारी पहचान पत्र" : "Gate 1: Gov Identity Proof"}</span>
              </div>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {isHi ? "आधार कार्ड, ड्राइविंग लाइसेंस व पैन का आधिकारिक डेटाबेस से डिजिटल मिलान।" : "Digital authentication of Aadhaar, Driving License, and PAN credentials."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1B18] border border-[#E7E5DF] dark:border-[#2B231D] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E87532]">
                <CheckCircle className="w-4 h-4" />
                <span>{isHi ? "चरण 2: तकनीकी कौशल ऑडिट" : "Gate 2: Trade Competence Audit"}</span>
              </div>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {isHi ? "कम से कम 3-5 वर्षों का व्यावहारिक गैराज या ट्रेड अनुभव व डायग्नोस्टिक टेस्ट।" : "Minimum 3-5 years hands-on field experience plus diagnostic equipment validation."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1B18] border border-[#E7E5DF] dark:border-[#2B231D] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E87532]">
                <CheckCircle className="w-4 h-4" />
                <span>{isHi ? "चरण 3: पृष्ठभूमि व चरित्र सत्यापन" : "Gate 3: Police & Criminal Check"}</span>
              </div>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {isHi ? "शून्य आपराधिक रिकॉर्ड व स्थानीय संदर्भों का सत्यापन।" : "Zero active criminal history and comprehensive local police record verification."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1E1B18] border border-[#E7E5DF] dark:border-[#2B231D] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E87532]">
                <CheckCircle className="w-4 h-4" />
                <span>{isHi ? "चरण 4: निरंतर रेटिंग व ऑडिट" : "Gate 4: Continuous Rating Gate"}</span>
              </div>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] leading-relaxed">
                {isHi ? "4.5 से कम रेटिंग पर तत्काल गुणवत्ता समीक्षा व अस्थायी निलंबन।" : "Technicians dipping below 4.5 average customer ratings are automatically paused for retraining."}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Highway & Roadside Safety */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "2. हाईवे व रोडसाइड ब्रेकडाउन सुरक्षा नियम" : "2. Roadside & Highway Breakdown Safety"}
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] space-y-3 leading-relaxed">
            <p>
              {isHi
                ? "यदि आपकी कार या बाइक सड़क या एक्सप्रेसवे पर रुक जाती है, तो इन आवश्यक सुरक्षा कदमों का पालन करें:"
                : "If your vehicle experiences sudden mechanical failure or tyre puncture on the road, follow these life-safety steps:"}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{isHi ? "वाहन को तुरंत सुरक्षित बाईं ओर (शोल्डर लेन) में पार्क करें और हैजर्ड वार्निंग लाइट्स चालू करें।" : "Immediately maneuver the vehicle to the leftmost shoulder lane and engage hazard flashers."}</li>
              <li>{isHi ? "JantaGaraj ऐप पर लोकेशन शेयर करें ताकि मैकेनिक सीधे आपकी लोकेशन पर बिना देरी पहुंच सके।" : "Share your exact live GPS location on JantaGaraj so the nearest technician reaches you accurately."}</li>
              <li>{isHi ? "मैकेनिक के आने पर ऐप में प्रदर्शित नाम व फोटो से पहचान की पुष्टि करें।" : "Verify the technician's name and photo displayed in your active booking status before allowing repair work."}</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Doorstep Service Protocol */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "3. डोरस्टेप गृह सेवा सुरक्षा प्रोटोकॉल" : "3. Residential Doorstep Safety Standards"}
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] space-y-3 leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[#252621] dark:text-[#F5F2EB]">{isHi ? "सुरक्षित ओटीपी सत्यापन:" : "Two-Way OTP Gate:"}</strong>{" "}
                {isHi ? "तकनीशियन कार्य तभी शुरू कर सकता है जब आप अपने फोन पर आया 4-अंकीय ओटीपी उसे बताएंगे।" : "Technicians can only officially initiate a service job by validating the secure OTP sent to your registered phone."}
              </li>
              <li>
                <strong className="text-[#252621] dark:text-[#F5F2EB]">{isHi ? "महिला व पारिवारिक सुरक्षा प्राथमिकता:" : "Customer Safety Priority:"}</strong>{" "}
                {isHi ? "सभी तकनीशियन निर्धारित गरिमा, शालीन व्यवहार व वर्दी/आईडी कार्ड के साथ उपस्थित होते हैं।" : "Technicians are audited for courteous conduct, carrying official identification and sanitized equipment."}
              </li>
              <li>
                <strong className="text-[#252621] dark:text-[#F5F2EB]">{isHi ? "डिजिटल इनवॉइस रिकॉर्ड:" : "Itemized Digital Invoices:"}</strong>{" "}
                {isHi ? "प्रत्येक कार्य व बदले गए स्पेयर पार्ट्स का पारदर्शी डिजिटल रिकॉर्ड ऐप में स्वतः सेव होता है।" : "Every spare part used and labor step performed is logged into a permanent digital invoice for warranty validity."}
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency SOS Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200 dark:border-[#2B231D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "तत्काल आपातकालीन सहायता की आवश्यकता है?" : "Need Immediate Roadside Safety Help?"}
            </h3>
            <p className="text-xs sm:text-sm text-[#717167] dark:text-[#9E9488]">
              {isHi ? "हमारी समर्पित आपातकालीन हेल्पलाइन पर कॉल करें: +91 84396 16833" : "Call our 24/7 dedicated rapid breakdown line: +91 84396 16833"}
            </p>
          </div>
          <a href="tel:+918439616833">
            <Button variant="primary" size="md" className="font-bold shadow-orange-glow flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>{isHi ? "कॉल करें (+91 84396 16833)" : "Call SOS Support"}</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
