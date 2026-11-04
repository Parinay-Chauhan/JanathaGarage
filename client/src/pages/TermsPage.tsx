import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Scale,
  ShieldCheck,
  CreditCard,
  RotateCcw,
  Briefcase,
  HelpCircle,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/Button";

export const TermsPage: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  return (
    <div className="bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] min-h-screen pb-24 transition-colors">
      {/* Header Banner */}
      <section className="border-b border-[#E7E5DF] dark:border-[#2B231D] bg-white/60 dark:bg-[#141210]/60 backdrop-blur-sm py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-[#2B231D] text-[#E87532] text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>{isHi ? "नियम व सेवा शर्तें" : "Terms & Conditions of Service"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#252621] dark:text-[#F5F2EB] leading-tight">
            {isHi ? "JantaGaraj उपयोगकर्ता व पार्टनर अनुबंध" : "JantaGaraj Platform Agreement"}
          </h1>

          <p className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] max-w-2xl mx-auto leading-relaxed">
            {isHi
              ? "JantaGaraj के माध्यम से सर्विस बुक करने या पार्टनर के रूप में कार्य करने से पहले कृपया इन नियमों व शर्तों को ध्यानपूर्वक पढ़ें।"
              : "Clear, transparent, and fair legal terms designed to protect vehicle owners, households, and trade technicians alike."}
          </p>

          <p className="text-xs text-[#8F8F85] pt-2">
            {isHi ? "अंतिम संशोधन: 1 नवंबर 2026 • आधिकारिक नियम संहिता" : "Last Updated: November 1, 2026 • Official Code of Terms"}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-12">
        {/* Section 1: Platform Role */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "1. प्लेटफॉर्म की भूमिका व स्वरूप" : "1. Nature of the Platform"}
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] space-y-3 leading-relaxed">
            <p>
              {isHi
                ? "JantaGaraj एक टेक्नोलॉजी मार्केटप्लेस है जो ग्राहकों को स्वतंत्र, पृष्ठभूमि-सत्यापित (KYC-verified) ऑटोमोबाइल मैकेनिकों, इलेक्ट्रीशियन व गृह सेवा तकनीशियनों से जोड़ता है।"
                : "JantaGaraj operates as a two-sided digital marketplace connecting vehicle owners and households with independent, KYC-verified trade mechanics and technicians."}
            </p>
            <p>
              {isHi
                ? "सभी तकनीशियन पृष्ठभूमि सत्यापन के बाद प्लेटफॉर्म पर लिस्ट होते हैं, किंतु वे स्वतंत्र सेवा प्रदाता के रूप में कार्य करते हैं।"
                : "Every professional listed on JantaGaraj has undergone identity credential audits and agrees to honor our standardized rate cards and quality benchmarks."}
            </p>
          </div>
        </div>

        {/* Section 2: Pricing & Payment Policy */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "2. पारदर्शी दरें व भुगतान नियम" : "2. Transparent Pricing & Payment Rules"}
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] space-y-3 leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[#252621] dark:text-[#F5F2EB]">{isHi ? "तय विज़िटिंग चार्ज:" : "Standard Visiting Fee:"}</strong>{" "}
                {isHi ? "डोरस्टेप विज़िटिंग शुल्क ₹149 से ₹249 तक होता है। यदि रिपेयर कार्य कराया जाता है, तो यह राशि कुल बिल में समायोजित (adjust) कर दी जाती है।" : "Standard visiting charges range from ₹149 to ₹249. If repair work is executed, this inspection fee is credited towards the final invoice."}
              </li>
              <li>
                <strong className="text-[#252621] dark:text-[#F5F2EB]">{isHi ? "कार्य पूर्ण होने के बाद भुगतान:" : "Pay After Satisfaction:"}</strong>{" "}
                {isHi ? "ग्राहक को रिपेयर कार्य पूर्ण होने व संतुष्ट होने के बाद ही भुगतान करना होता है। आप यूपीआई (Google Pay, PhonePe, Paytm), कार्ड या नकद से भुगतान कर सकते हैं।" : "Payments are collected only after the service is successfully executed and performance is tested. Customers can pay via UPI, Card, or Cash."}
              </li>
              <li>
                <strong className="text-[#252621] dark:text-[#F5F2EB]">{isHi ? "शून्य गुप्त शुल्क:" : "Zero Hidden Surcharges:"}</strong>{" "}
                {isHi ? "किसी भी अतिरिक्त स्पेयर पार्ट या कार्य के लिए ग्राहक की पूर्व सहमति अनिवार्य है।" : "Technicians are strictly barred from demanding unquoted surcharges. Any extra spare parts required must be quoted and approved in advance."}
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3: Cancellation & Rescheduling */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "3. रद्दीकरण व रीशेड्यूल नीति" : "3. Cancellation & Rescheduling Policy"}
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] space-y-3 leading-relaxed">
            <p>
              {isHi
                ? "हम समझते हैं कि आपातकालीन स्थितियों में योजनाएं बदल सकती हैं:"
                : "We recognize that breakdown scenarios and schedules fluctuate:"}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{isHi ? "तकनीशियन के निकलने से पूर्व रद्दीकरण पर कोई शुल्क नहीं लिया जाता (100% Free Cancellation)।" : "Zero cancellation charges apply if the request is cancelled prior to technician dispatch."}</li>
              <li>{isHi ? "यदि तकनीशियन आपके दरवाजे/लोकेशन पर पहुंच चुका है, तो केवल न्यूनतम विज़िटिंग शुल्क (₹149) देय होगा।" : "If the technician has physically arrived at your designated location, a nominal visiting travel fee (₹149) is payable."}</li>
              <li>{isHi ? "आप कस्टमर पोर्टल से किसी भी समय अपॉइंटमेंट रीशेड्यूल कर सकते हैं।" : "Appointments can be rescheduled at no additional cost directly via your Customer Dashboard."}</li>
            </ul>
          </div>
        </div>

        {/* Section 4: 30-Day Service Guarantee */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "4. 30-दिन की सर्विस वारंटी" : "4. 30-Day Workmanship Warranty"}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] leading-relaxed">
            {isHi
              ? "JantaGaraj पर किए गए सभी योग्य रिपेयर कार्यों (जैसे एसी गैस लीकेज, वायरिंग रिपेयर, ब्रेक एडजस्टमेंट) पर 30 दिनों की फ्री री-विज़िट वारंटी दी जाती है। यदि 30 दिन के भीतर वही समस्या पुनः उत्पन्न होती है, तो तकनीशियन बिना किसी अतिरिक्त सर्विस चार्ज के उसे ठीक करेगा।"
              : "All qualifying repair services booked through JantaGaraj carry our 30-day workmanship assurance. If the exact diagnosed issue recurs within 30 days of service completion, a senior technician is dispatched for re-inspection and repair with zero additional service labor fees."}
          </p>
        </div>

        {/* Section 5: Technician Partner Obligations */}
        <div id="partner-terms" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "5. तकनीशियन पार्टनर आचार संहिता" : "5. Technician Partner Code of Conduct"}
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] space-y-3 leading-relaxed">
            <p>
              {isHi
                ? "JantaGaraj पर कार्यरत सभी मैकेनिक व तकनीशियन निम्नलिखित नियमों का पालन करने के लिए बाध्य हैं:"
                : "All certified technicians onboarded onto the JantaGaraj Radar agree to maintain strict professionalism:"}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{isHi ? "मान्य सरकारी पहचान पत्र (आधार, डीएल) व सही बैंक खाता विवरण प्रस्तुत करना।" : "Maintain valid, up-to-date KYC credentials and background verification clearances."}</li>
              <li>{isHi ? "ग्राहकों से प्लेटफॉर्म के बाहर अनुचित नकदी या अनधिकृत अतिरिक्त चार्ज न मांगना।" : "Refrain from demanding off-platform unitemized cash payments or bypassing platform rate cards."}</li>
              <li>{isHi ? "ग्राहकों के साथ शालीन, पेशेवर व सुरक्षित व्यवहार सुनिश्चित करना।" : "Adhere to the highest standards of safety, courtesy, and punctuality during doorstep visits."}</li>
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 sm:p-8 rounded-3xl bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200 dark:border-[#2B231D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "क्या आपके कोई विशेष प्रश्न हैं?" : "Need Assistance With Service Terms?"}
            </h3>
            <p className="text-xs sm:text-sm text-[#717167] dark:text-[#9E9488]">
              {isHi ? "हमारी कस्टमर सपोर्ट टीम 24/7 आपकी सहायता के लिए तैयार है।" : "Our support team is available 24/7 to resolve disputes or answer queries."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/help">
              <Button variant="primary" size="md" className="font-bold shadow-orange-glow">
                {isHi ? "सपोर्ट से संपर्क करें" : "Contact Support"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
