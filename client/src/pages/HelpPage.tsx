import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle,
  Clock,
  ShieldCheck,
  FileText,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Car,
  Wrench,
  Check,
  Zap,
  Activity,
  Layers,
  Wind,
  Shield,
  LifeBuoy,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/Button";

export const HelpPage: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    bookingNumber: "",
    issueType: "BOOKING_HELP",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  // 6 Sleek Floating Emergency & Service Triage Quick Cards
  const triageCards = [
    {
      id: "triage-battery",
      title: isHi ? "इमरजेंसी बैटरी जंपस्टार्ट" : "Battery Jumpstart & Alternator",
      desc: isHi
        ? "हाईवे या घर पर बैटरी डाउन होने पर 30 मिनट में हेवी-ड्यूटी बूस्टर डिस्पैच।"
        : "Heavy-duty commercial booster cables & alternator diode test dispatched in < 28 mins.",
      category: "BOOKING",
      icon: Zap,
      actionText: isHi ? "तत्काल सहायता" : "Rapid Triage",
      route: "/services?search=battery",
    },
    {
      id: "triage-engine",
      title: isHi ? "इंजन डायग्नोस्टिक व फॉल्ट कोड" : "Engine Diagnostics & Fault Codes",
      desc: isHi
        ? "चेक इंजन लाइट या असामान्य आवाज की लाइव OBD-II स्कैनर से जांच।"
        : "OBD-II CAN-bus scanner analysis, sensor calibration, and verified fault clearing.",
      category: "BOOKING",
      icon: Activity,
      actionText: isHi ? "डायग्नोसिस देखें" : "Scan Support",
      route: "/services?search=engine",
    },
    {
      id: "triage-warranty",
      title: isHi ? "30 दिन की लिखित वारंटी" : "30-Day Warranty Claim",
      desc: isHi
        ? "सर्विस के बाद 30 दिनों में समस्या आने पर ₹0 चार्ज में पुनः जांच।"
        : "Re-inspection and defect rectification at ₹0 charge under our corporate guarantee.",
      category: "WARRANTY",
      icon: ShieldCheck,
      actionText: isHi ? "वारंटी दावा" : "File Claim",
      route: "#ticket-desk",
    },
    {
      id: "triage-cooling",
      title: isHi ? "एसी कूलिंग व गैस लीकेज" : "HVAC Cooling & Gas Leakage",
      desc: isHi
        ? "कार व घर के एसी की जेट क्लीनिंग, गैस प्रेशर टेस्ट व कंप्रेसर जांच।"
        : "High-pressure foam jet flush, eco gas R32/R410A recharge, and vacuum pressure test.",
      category: "BOOKING",
      icon: Wind,
      actionText: isHi ? "कूलिंग जांच" : "HVAC Help",
      route: "/services?search=ac",
    },
    {
      id: "triage-electrical",
      title: isHi ? "शॉर्ट-सर्किट व इनवर्टर फॉल्ट" : "Electrical Circuits & MCB Tripping",
      desc: isHi
        ? "एमसीबी ट्रिपिंग, न्यूट्रल लीकेज डिटेक्शन व हाई-लोड इनवर्टर वायरिंग।"
        : "Phase imbalance triage, insulation resistance check, and dedicated circuit wiring.",
      category: "SAFETY",
      icon: Layers,
      actionText: isHi ? "वायरिंग सहायता" : "Circuit Triage",
      route: "/services?search=electric",
    },
    {
      id: "triage-ratecard",
      title: isHi ? "पारदर्शी तय रेट कार्ड" : "Standardized Rate Cards",
      desc: isHi
        ? "बिना किसी छुपे शुल्क के सभी 100+ सेवाओं के आधिकारिक रेट देखें।"
        : "Pre-published parts and labor rate cards with 100% price transparency and ₹0 hidden fees.",
      category: "PAYMENT",
      icon: FileText,
      actionText: isHi ? "रेट कार्ड देखें" : "View Rates",
      route: "/pricing-guide",
    },
  ];

  const faqData = [
    {
      id: "f-1",
      category: "BOOKING",
      q: isHi
        ? "डोरस्टेप और इमरजेंसी ब्रेकडाउन डिस्पैच कैसे काम करता है?"
        : "How does doorstep and emergency roadside breakdown dispatch work?",
      a: isHi
        ? "सर्विसेज पेज पर जाएं, अपनी समस्या (जैसे बैटरी जंपस्टार्ट, फ्लैट टायर, इंजन डायग्नोस्टिक या इलेक्ट्रिकल शॉर्ट-सर्किट) चुनें, अपनी लाइव लोकेशन दर्ज करें और बुकिंग कन्फर्म करें। हमारा प्रॉक्सिमिटी रडार 3 मिनट के भीतर नजदीकी प्रमाणित मैकेनिक को डिस्पैच करता है।"
        : "Navigate to Services, select your vehicle and issue (such as Battery Jumpstart, Flat Tyre, Engine Diagnostics, or Electrical Short Circuit), enter your doorstep or roadside location, and confirm booking. Our proximity dispatch radar assigns the nearest certified technician equipped with specialized diagnostic tools in under 3 minutes.",
    },
    {
      id: "f-2",
      category: "BOOKING",
      q: isHi
        ? "क्या मैं सर्विस अपॉइंटमेंट रद्द या पुनर्निर्धारित कर सकता हूँ? क्या कोई शुल्क है?"
        : "Can I cancel or reschedule my service appointment? Are there any fees?",
      a: isHi
        ? "हाँ। आप तकनीशियन के आने से पहले अपने ग्राहक पोर्टल से या हेल्पलाइन पर कॉल करके कभी भी सर्विस रद्द या रीशेड्यूल कर सकते हैं। तकनीशियन के आने से पहले रद्द करने पर ₹0 कैंसिलेशन चार्ज है।"
        : "Yes. You can freely reschedule or cancel anytime before the technician arrives at your site directly from your Customer Portal or by calling dispatch at +91 84396 16833. There are strictly ₹0 cancellation charges if cancelled prior to technician arrival.",
    },
    {
      id: "f-3",
      category: "PAYMENT",
      q: isHi
        ? "सर्विस का भुगतान कब करना होता है और कौन से पेमेंट मोड स्वीकार्य हैं?"
        : "When do I pay for my service, and what payment methods are supported?",
      a: isHi
        ? "भुगतान केवल तभी लिया जाता है जब तकनीशियन काम पूरा कर ले, आपके सामने टेस्ट-ड्राइव या जांच कर ले, और आप पूरी तरह संतुष्ट हों। हम यूपीआई (Google Pay, PhonePe, Paytm), डेबिट/क्रेडिट कार्ड, नेट बैंकिंग और नकद स्वीकार करते हैं।"
        : "Payment is strictly collected AFTER the technician has completed the repair, conducted a dual-run verification test in your presence, and you have authorized sign-off. We accept all UPI applications (Google Pay, PhonePe, Paytm, BHIM), Cards, Net Banking, and direct Cash.",
    },
    {
      id: "f-4",
      category: "PAYMENT",
      q: isHi
        ? "यदि ऑनलाइन बुकिंग पूरी नहीं हो पाती है तो रिफंड कैसे मिलता है?"
        : "How does the refund process work if an online booking cannot be fulfilled?",
      a: isHi
        ? "यदि आपने डिजिटल अग्रिम भुगतान किया था और पार्ट्स की अनुपलब्धता या रद्दीकरण के कारण काम नहीं हो सका, तो 100% रिफंड 24 से 48 बैंकिंग घंटों के भीतर मूल भुगतान माध्यम में स्वतः ट्रांसफर कर दिया जाता है।"
        : "If you made an advance digital payment and the work could not be fulfilled due to parts unavailability or cancellation, a 100% refund is initiated automatically to your original payment method within 24 to 48 banking hours with an SMS confirmation slip.",
    },
    {
      id: "f-5",
      category: "SAFETY",
      q: isHi
        ? "4-अंकीय स्टार्ट OTP क्या है और काम शुरू होने से पहले यह क्यों जरूरी है?"
        : "What is the 4-digit Start OTP and why is it mandatory before work begins?",
      a: isHi
        ? "स्टार्ट OTP अनधिकृत बिलिंग को रोकता है और यह सुनिश्चित करता है कि आया हुआ तकनीशियन वही है जो आपके ऐप पर असाइन हुआ है। जब तक आप यह OTP शेयर नहीं करते, तकनीशियन काम शुरू नहीं कर सकता।"
        : "The Start OTP prevents unauthorized billing and verifies that the technician who arrived matches the certified engineer assigned on your dashboard. The technician cannot access your vehicle or start work without you sharing this secure 4-digit OTP from your booking card.",
    },
    {
      id: "f-6",
      category: "WARRANTY",
      q: isHi
        ? "मरम्मत पर मुझे क्या गारंटी या वारंटी मिलती है?"
        : "What guarantee or warranty do I receive on automotive and home repairs?",
      a: isHi
        ? "जनता गैराज पर प्रत्येक रिपेयर 30 दिन की निःशुल्क वर्कमैनशिप वारंटी के साथ आती है। यदि 30 दिनों के भीतर वही समस्या पुनः आती है, तो हमारे सीनियर इंस्पेक्टर बिना किसी विज़िटिंग या सर्विस चार्ज के पुनः जांच और सुधार करते हैं।"
        : "Every repair on JantaGaraj carries a standardized 30-day / 1,000 KM doorstep workmanship warranty. If the exact same issue reoccurs within 30 days, we dispatch a senior inspector to rectify it with zero service or visiting charges.",
    },
    {
      id: "f-7",
      category: "WARRANTY",
      q: isHi
        ? "क्या स्पेयर पार्ट्स असली होते हैं और क्या उन पर निर्माता की वारंटी मिलती है?"
        : "Are replacement spare parts genuine and covered under manufacturer warranty?",
      a: isHi
        ? "हाँ। जनता गैराज के तकनीशियन केवल अधिकृत ओईएम/ओईएस वितरकों (Bosch, Denso, Tata Motors, MGP, Havells) से पार्ट्स लाते हैं। हर इनवॉइस में सीरियल नंबर और 6 महीने से 2 साल तक की वारंटी दर्ज होती है।"
        : "Yes. JantaGaraj technicians source exclusively from verified OEM/OES authorized distributors (Bosch, Denso, Tata Motors, MGP, Schneider, Havells). Every part invoice includes serial tracking and manufacturer warranties ranging from 6 months to 2 years.",
    },
    {
      id: "f-8",
      category: "TECHNICIAN",
      q: isHi
        ? "प्रमाणित मैकेनिक और इलेक्ट्रीशियन जनता गैराज फ्लीट से कैसे जुड़ सकते हैं?"
        : "How can certified mechanics and electricians join the JantaGaraj fleet?",
      a: isHi
        ? "स्वतंत्र तकनीशियन हमारे पार्टनर पोर्टल के जरिए रजिस्टर कर सकते हैं। आपको सरकारी पहचान पत्र, अनुभव प्रमाण और इन-पर्सन डायग्नोस्टिक टेस्ट पास करना होगा। सत्यापन के बाद आपको सीधे ग्राहक बुकिंग्स मिलेंगी।"
        : "Independent technicians and garage owners can register via our Partner Portal. You must submit Government ID (Aadhaar / Driving License), proof of trade experience, and pass an in-person trade assessment. Once verified, you receive direct local dispatch requests.",
    },
    {
      id: "f-9",
      category: "TECHNICIAN",
      q: isHi
        ? "यदि डायग्नोसिस के दौरान अतिरिक्त काम निकलता है तो जनता गैराज इसे कैसे संभालता है?"
        : "How does JantaGaraj handle rate disputes or unexpected additional repairs?",
      a: isHi
        ? "तकनीशियन कोई भी मनमाना शुल्क नहीं ले सकते। यदि डायग्नोसिस में कोई नया पार्ट या श्रम आवश्यक होता है, तो तकनीशियन को डिजिटल वर्क ऑर्डर में दर्ज करना होता है और आपके OTP अनुमोदन के बाद ही आगे काम होता है।"
        : "Technicians cannot charge arbitrary amounts. If an additional part or labor is needed during diagnosis, the technician must log the exact line-item in the digital work order. You will receive an OTP prompt to approve the revised estimate before work continues.",
    },
  ];

  const categories = [
    { id: "ALL", label: isHi ? "सभी विषय" : "All Topics" },
    { id: "BOOKING", label: isHi ? "बुकिंग व डिस्पैच" : "Bookings & Dispatch" },
    { id: "PAYMENT", label: isHi ? "भुगतान व दरें" : "Payments & Pricing" },
    { id: "SAFETY", label: isHi ? "सुरक्षा व OTP" : "Safety & OTP" },
    { id: "WARRANTY", label: isHi ? "वारंटी व दावे" : "Warranty & Claims" },
    { id: "TECHNICIAN", label: isHi ? "फ्लीट पार्टनर" : "Fleet Partners" },
  ];

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [faqData, selectedCategory, searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `JG-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#080b11] text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950 pb-28 font-sans relative overflow-x-hidden">
      {/* ========================================================= */}
      {/* QUIET, PREMIUM LIGHTING & ATMOSPHERE                      */}
      {/* ========================================================= */}
      {/* Soft, diffuse overhead ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[560px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-15%,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none -z-0" />
      {/* Micro-warm amber accent whisper */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[360px] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(245,158,11,0.035),transparent_65%)] pointer-events-none -z-0" />
      {/* Subtle organic grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* 01 MODERN HERO: OPEN & WELCOMING SEARCH                   */}
      {/* ========================================================= */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-16 sm:pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Quiet Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 text-xs font-medium backdrop-blur-md shadow-sm mb-6 sm:mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span>
            {isHi ? "ग्राहक सहायता एवं समाधान केंद्र" : "Customer Support & Incident Resolution"}
          </span>
        </div>

        {/* Clean, Human Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.14] max-w-3xl mx-auto">
          {isHi ? (
            <>
              हम आपकी कैसे <span className="text-slate-400 font-normal">सहायता कर सकते हैं?</span>
            </>
          ) : (
            <>
              How can we <span className="text-slate-400 font-normal">help you today?</span>
            </>
          )}
        </h1>

        {/* Fluid Description */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
          {isHi
            ? "इमरजेंसी ब्रेकडाउन सहायता, रद्दीकरण नियम, तय रेट कार्ड, स्टार्ट OTP सुरक्षा और 30 दिन की लिखित वारंटी के संबंध में तत्काल उत्तर पाएं।"
            : "Search verified service protocols, emergency roadside assistance guidelines, rate cards, and 30-day workmanship warranty claims."}
        </p>

        {/* Floating Glass Search Input */}
        <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
          <div className="relative p-2 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.1] hover:border-white/[0.18] focus-within:border-white/[0.25] shadow-2xl backdrop-blur-xl transition-all flex items-center">
            <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
            <input
              type="text"
              placeholder={
                isHi
                  ? "सवाल या विषय खोजें (उदा. कैंसिलेशन, वारंटी, रिफंड, ओटीपी, रेट कार्ड)..."
                  : "Search topics (e.g. cancellation, refund, OTP, battery warranty, rate card)..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-sm text-white placeholder:text-slate-500 px-3.5 py-2 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-slate-400 hover:text-white px-3 py-1 font-medium transition-colors"
              >
                {isHi ? "हटाएं" : "Clear"}
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-xs text-slate-400 mt-2.5 text-left px-2">
              {isHi
                ? `${filteredFaqs.length} संबंधित परिणाम मिले`
                : `Showing ${filteredFaqs.length} matching guidelines`}
            </p>
          )}
        </div>

        {/* Resolution Metrics Strip: Natural & Elegant Typography (Not Blocky) */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-left">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              &lt; 30 sec
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "औसत हेल्पलाइन कनेक्ट समय" : "Hotline Connection Time"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              &lt; 28 min
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "इमरजेंसी रोडसाइड डिस्पैच" : "Roadside Dispatch SLA"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              99.4%
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "प्रथम विज़िट में समाधान दर" : "First-Visit Resolution Rate"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              ₹0 Cost
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "30 दिन वारंटी पुनः जांच" : "Warranty Re-Inspection Fee"}
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-28">
        {/* ========================================================= */}
        {/* 02 SLEEK FLOATING EMERGENCY & SERVICE TRIAGE CARDS        */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="uppercase tracking-wider">
                  {isHi ? "त्वरित समाधान श्रेणियां" : "Instant Triage"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                {isHi ? "सामान्य आपातकालीन व तकनीकी सहायता" : "Common emergency & technical assistance."}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {triageCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.id}
                  to={card.route}
                  className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {card.category}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-slate-100 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium group-hover:text-white transition-colors flex items-center gap-1">
                      <span>{card.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-slate-600 font-mono">SUPPORT</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03 THE 1-2-3 RESOLUTION PROCESS (Modern & Intuitive)      */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="uppercase tracking-wider">
                {isHi ? "समाधान प्रोटोकॉल" : "Resolution Protocol"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              {isHi ? "त्वरित समाधान के 3 सरल चरण" : "Clear, predictable support in 3 steps."}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
              {isHi
                ? "किसी भी समस्या या सवाल का पारदर्शी और जवाबदेह समाधान।"
                : "Every request is handled with full accountability, logged SLAs, and zero friction."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 01 */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-slate-400 tracking-wider">
                    STEP 01
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                    <Search className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {isHi ? "प्रोटोकॉल व नियम देखें" : "Instant Self-Service"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {isHi
                    ? "हमारे वेरिफाइड नॉलेज बेस में रिफंड, वारंटी क्लेम और फिक्स्ड रेट कार्ड के सभी नियम तुरंत पढ़ें।"
                    : "Access clear operational guidelines on emergency dispatch, rate formulas, cancellations, and warranty rights."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>{isHi ? "24/7 तत्काल उपलब्ध" : "Available 24/7"}</span>
                <span className="text-slate-500">INSTANT</span>
              </div>
            </div>

            {/* Step 02 */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-slate-400 tracking-wider">
                    STEP 02
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {isHi ? "सीधी हॉटलाइन या व्हाट्सएप" : "Direct Priority Escalation"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {isHi
                    ? "सड़क पर फंसे वाहन या लाइव सर्विस में देरी होने पर 24/7 सेंट्रल कंट्रोल डेस्क से तुरंत संपर्क करें।"
                    : "Connect directly with our central dispatch desk for en-route delays, roadside breakdowns, or urgent triage."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>{isHi ? "&lt; 30 सेकंड में कनेक्ट" : "&lt; 30s Phone SLA"}</span>
                <span className="text-slate-500">HOTLINE</span>
              </div>
            </div>

            {/* Step 03 */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-slate-400 tracking-wider">
                    STEP 03
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {isHi ? "120 मिनट समाधान गारंटी" : "120-Minute Resolution SLA"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {isHi
                    ? "हर शिकायत वरिष्ठ ऑपरेशंस मैनेजर को असाइन होती है। 30 दिनों के भीतर समस्या होने पर ₹0 री-विजिट गारंटी।"
                    : "Each ticket is assigned to a senior operations supervisor. If workmanship fails within 30 days, re-dispatch is 100% free."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>{isHi ? "नि:शुल्क पुनः जांच" : "100% Free Re-check"}</span>
                <span className="text-slate-500">GUARANTEED</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 DIRECT CHANNELS (Floating Glass Cards)                  */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="uppercase tracking-wider">
                  {isHi ? "सीधे संपर्क माध्यम" : "Direct Channels"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                {isHi ? "तत्काल सहायता के तीन तरीके" : "Immediate support channels."}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: 24/7 Phone Support */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    24/7 HOTLINE
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isHi ? "24/7 इमरजेंसी हेल्पलाइन" : "24/7 Roadside & Home Hotline"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "सड़क पर फंसे वाहनों, आपातकालीन पावर शॉर्ट-सर्किट और लाइव जॉब स्टेटस के लिए सेंट्रल डिस्पैच से सीधा संपर्क।"
                    : "Direct telephonic link to our central operations room for stranded vehicles, urgent power outages, and active jobs."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                <a
                  href="tel:+918439616833"
                  className="text-sm font-semibold font-mono text-white hover:text-amber-400 transition-colors"
                >
                  +91 84396 16833
                </a>
                <a
                  href="tel:+918439616833"
                  className="px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white border border-white/[0.08] text-xs font-medium transition-colors"
                >
                  {isHi ? "कॉल करें" : "Call Now"}
                </a>
              </div>
            </div>

            {/* Card 2: WhatsApp Live Desk */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    PHOTO &amp; GPS
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isHi ? "व्हाट्सएप ऑपरेशंस डेस्क" : "WhatsApp Operations Desk"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "वाहन के डैशबोर्ड की फोटो, सर्किट ब्रेकर का वीडियो या लाइव जीपीएस लोकेशन भेजकर तुरंत सलाह पाएं।"
                    : "Share dashboard warning light photos, circuit trip videos, or broadcast live GPS coordinates for rapid technician routing."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  {isHi ? "सुबह 8 से रात 11" : "8:00 AM – 11:00 PM"}
                </span>
                <a
                  href="https://wa.me/918439616833"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white border border-white/[0.08] text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Card 3: Warranty & Grievance Desk */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    AUDITED EMAIL
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isHi ? "वारंटी एवं शिकायत ईमेल" : "Warranty & Grievance Desk"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "बिलिंग सुधार, कॉरपोरेट फ्लीट पार्टनरशिप और 30 दिन की लिखित वारंटी के औपचारिक दावों के लिए।"
                    : "For formal invoice rectifications, corporate fleet accounts, and certified 30-day workmanship warranty inspections."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                <a
                  href="mailto:support@jantagaraj.in"
                  className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  support@jantagaraj.in
                </a>
                <a
                  href="mailto:support@jantagaraj.in"
                  className="px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white border border-white/[0.08] text-xs font-medium transition-colors"
                >
                  {isHi ? "ईमेल लिखें" : "Email Desk"}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 05 FAQS KNOWLEDGE BASE (Clean Accordion)                   */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.06]">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="uppercase tracking-wider">
                  {isHi ? "प्रश्नोत्तरी" : "Knowledge Base"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                {isHi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently answered questions."}
              </h2>
            </div>

            {/* Category Filter Pills: Quiet rounded-full styling */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === tab.id
                      ? "bg-white text-slate-950 font-semibold shadow-sm"
                      : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3.5">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "bg-white/[0.04] border-white/[0.14] shadow-md"
                        : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-medium text-sm sm:text-base text-white"
                    >
                      <span className="pr-4 leading-relaxed">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.06]">
                        <p className="pt-4">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-10 text-center text-sm text-slate-400 bg-white/[0.02] rounded-3xl border border-white/[0.06]">
                {isHi
                  ? "कोई परिणाम नहीं मिला। कृपया नीचे दिया गया फॉर्म भरकर टिकट दर्ज करें।"
                  : "No matching guidelines found. You can submit a support ticket below for direct assistance."}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 06 DIRECT TICKET SUBMISSION TERMINAL                      */}
        {/* ========================================================= */}
        <section id="ticket-desk" className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Resolution Commitments */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="uppercase tracking-wider">
                  {isHi ? "टिकट व वारंटी डेस्क" : "Priority Ticket Desk"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight">
                {isHi ? "सेंट्रल ऑपरेशंस टिकट दर्ज करें" : "Submit a priority support ticket."}
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "तकनीशियन की देरी, 30 दिन के वारंटी दावे या बिलिंग विसंगतियों के लिए सीधा टिकट दर्ज करें। हमारे वरिष्ठ सुपरवाइजर लिखित एसएलए के साथ संपर्क करेंगे।"
                  : "Whether you need to report an en-route technician delay, file a 30-day workmanship warranty claim, or dispute a bill, our central operations team logs and tracks every case with complete accountability."}
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">
                      {isHi ? "120 मिनट समाधान एसएलए" : "120-Minute Resolution SLA"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isHi
                        ? "2 घंटे के भीतर वरिष्ठ ऑपरेशंस मैनेजर द्वारा सीधी कॉल।"
                        : "Direct callback from a senior operations manager within 2 hours."}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
                  <ShieldCheck className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">
                      {isHi ? "शून्य-लागत पुनः जांच गारंटी" : "Zero-Cost Re-Inspection"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isHi
                        ? "30 दिनों के भीतर समस्या आने पर पुनः डिस्पैच 100% निःशुल्क।"
                        : "If repair workmanship fails within 30 days, re-dispatch is ₹0."}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
                  <FileText className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">
                      {isHi ? "डिजिटल ऑडिट ट्रेल" : "Permanent Digital Audit Trail"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isHi
                        ? "हर शिकायत आपके जॉब कार्ड और वर्क ऑर्डर से स्थायी रूप से जुड़ी रहती है।"
                        : "Every ticket is tied to your Work Order and logged in our central database."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Ticket Form */}
            <div className="lg:col-span-7">
              {formSubmitted ? (
                <div className="p-8 sm:p-10 text-center rounded-3xl bg-white/[0.02] border border-white/[0.1] space-y-5">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                      {isHi ? "टिकट सफलतापूर्वक दर्ज किया गया" : "Ticket Logged with Central Dispatch"}
                    </span>
                    <h3 className="text-2xl font-bold font-mono text-white">
                      {ticketId}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {isHi ? (
                      <>
                        धन्यवाद, <strong className="text-white">{formData.fullName}</strong>। आपकी शिकायत ऑपरेशंस टीम को सौंप दी गई है। हम 120 मिनट के भीतर आपके नंबर <span className="font-mono text-white">{formData.phone}</span> पर संपर्क करेंगे।
                      </>
                    ) : (
                      <>
                        Thank you, <strong className="text-white">{formData.fullName}</strong>. Your ticket has been routed to our duty supervisor. We will contact you at <span className="font-mono text-white">{formData.phone}</span> within 120 minutes.
                      </>
                    )}
                  </p>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          fullName: "",
                          phone: "",
                          bookingNumber: "",
                          issueType: "BOOKING_HELP",
                          message: "",
                        });
                      }}
                      className="bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.1] text-xs rounded-full px-5 py-2 font-medium"
                    >
                      {isHi ? "दूसरा टिकट दर्ज करें" : "Log Another Ticket"}
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">
                        {isHi ? "आपका पूरा नाम *" : "Your Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isHi ? "उदा. विक्रम मल्होत्रा" : "e.g. Vikram Malhotra"}
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 px-4 py-3 focus:outline-none focus:border-white/[0.25] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">
                        {isHi ? "फोन नंबर *" : "Contact Phone Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={isHi ? "10-अंकीय मोबाइल नंबर" : "10-digit mobile number"}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 px-4 py-3 focus:outline-none focus:border-white/[0.25] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">
                        {isHi ? "जॉब या बुकिंग # (वैकल्पिक)" : "Work Order / Job # (Optional)"}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. JG-4081"
                        value={formData.bookingNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, bookingNumber: e.target.value })
                        }
                        className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 px-4 py-3 focus:outline-none focus:border-white/[0.25] transition-colors font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">
                        {isHi ? "मुद्दे का प्रकार *" : "Issue Classification *"}
                      </label>
                      <select
                        value={formData.issueType}
                        onChange={(e) =>
                          setFormData({ ...formData, issueType: e.target.value })
                        }
                        className="w-full rounded-2xl bg-[#0e131d] border border-white/[0.08] text-sm text-white px-4 py-3 focus:outline-none focus:border-white/[0.25] transition-colors"
                      >
                        <option value="BOOKING_HELP">
                          {isHi ? "तकनीशियन की देरी / नहीं पहुंचना" : "En-route Technician Delay / No-show"}
                        </option>
                        <option value="QUALITY_WARRANTY">
                          {isHi ? "30 दिन की वारंटी का दावा" : "30-Day Workmanship Warranty Claim"}
                        </option>
                        <option value="PAYMENT_REFUND">
                          {isHi ? "बिलिंग या रेट कार्ड विसंगति" : "Billing / Rate Card Discrepancy"}
                        </option>
                        <option value="TECHNICIAN_HELP">
                          {isHi ? "तकनीशियन फ्लीट पार्टनर सपोर्ट" : "Technician Partner Fleet Support"}
                        </option>
                        <option value="OTHER">
                          {isHi ? "सामान्य प्रतिक्रिया / अन्य" : "General Grievance / Feedback"}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      {isHi ? "स्थिति का विवरण दें *" : "Describe the Situation *"}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={
                        isHi
                          ? "कृपया वाहन का मॉडल, स्थान और समस्या का संक्षिप्त विवरण लिखें..."
                          : "Please specify vehicle/equipment model, location, and the specific breakdown or warranty concern..."
                      }
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 p-4 focus:outline-none focus:border-white/[0.25] transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Primary Amber CTA Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.22)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.32)] transition-all hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isHi ? "सपोर्ट टिकट सबमिट करें" : "Submit Priority Support Ticket"}</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
