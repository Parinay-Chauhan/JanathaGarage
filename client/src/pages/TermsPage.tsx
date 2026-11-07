import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Scale,
  FileText,
  CreditCard,
  RotateCcw,
  ShieldCheck,
  Briefcase,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Clock,
  Sparkles,
  Phone,
  Mail,
  ChevronRight,
  ExternalLink,
  Lock,
  Layers,
  HelpCircle,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const TermsPage: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Four natural, elegant key metrics
  const keyMetrics = [
    {
      metric: "₹0",
      label: isHi ? "शून्य गुप्त शुल्क" : "Zero Hidden Surcharges",
      subtext: isHi
        ? "पारदर्शी तय रेट कार्ड, पूर्व लिखित स्वीकृति के बिना कोई अतिरिक्त बिलिंग नहीं"
        : "Pre-published standard rate cards. No arbitrary unquoted labor fees.",
    },
    {
      metric: "100%",
      label: isHi ? "फ्री प्री-डिस्पैच रद्दीकरण" : "Free Pre-Dispatch Cancel",
      subtext: isHi
        ? "मैकेनिक के निकलने से पहले शून्य रद्दीकरण शुल्क"
        : "Zero penalty cancellation prior to technician physical departure.",
    },
    {
      metric: "30-Day",
      label: isHi ? "लिखित सर्विस वारंटी" : "Workmanship Warranty",
      subtext: isHi
        ? "समान तकनीकी समस्या की पुनरावृत्ति पर फ्री री-विज़िट व लेबर गारंटी"
        : "Free re-inspection and labor rework if the diagnosed fault recurs.",
    },
    {
      metric: "100%",
      label: isHi ? "सत्यापित पार्टनर फ्लीट" : "KYC & Background Cleared",
      subtext: isHi
        ? "पुलिस व सरकारी पहचान पत्र सत्यापित स्वतंत्र ट्रेड विशेषज्ञ"
        : "Every pro passes government ID and credential audits before dispatch.",
    },
  ];

  // 1-2-3 Service Agreement Workflow
  const agreementProcess = [
    {
      step: "01",
      title: isHi ? "पारदर्शी प्री-बुकिंग सहमति" : "Pre-Dispatch Transparency",
      description: isHi
        ? "बुकिंग पुष्टिकरण से पहले सभी विज़िटिंग और बेस सर्विस चार्ज स्पष्ट रूप से दिखाए जाते हैं। कोई छिपा हुआ चार्ज नहीं।"
        : "Standard inspection and base repair rates are displayed upfront before you confirm. Zero hidden fees or unsolicited quotes.",
      badge: isHi ? "दर पारदर्शिता" : "Upfront Rates",
    },
    {
      step: "02",
      title: isHi ? "4-अंकीय OTP कार्य प्राधिकरण" : "4-Digit OTP Work Authorization",
      description: isHi
        ? "तकनीशियन द्वारा स्थल पर निदान के बाद आपके द्वारा OTP साझा करने व कार्य क्षेत्र स्वीकृत करने पर ही सर्विस शुरू होती है।"
        : "No technician begins work or installs spare parts without your digital authorization and verified diagnostic breakdown.",
      badge: isHi ? "सुरक्षित प्रमाणीकरण" : "Client Gated",
    },
    {
      step: "03",
      title: isHi ? "संतुष्टि उपरांत सुरक्षित भुगतान" : "Pay Post-Satisfaction & Testing",
      description: isHi
        ? "कार्य पूर्ण होने व टेस्ट ड्राइव/परीक्षण के बाद ही इनवॉइस का भुगतान करें। 30 दिन की लिखित डिजिटल वारंटी स्लिप प्राप्त करें।"
        : "Inspect completed repairs and road test before settling invoices. Receive an itemized digital GST bill and 30-day warranty slip.",
      badge: isHi ? "संतुष्टि गारंटी" : "Verified Complete",
    },
  ];

  // Terms Clauses Data
  const clauses = [
    {
      id: "platform-role",
      category: "role",
      num: "01",
      icon: FileText,
      title: isHi ? "प्लेटफॉर्म की भूमिका व स्वरूप" : "Nature of the Platform & Scope",
      tagline: isHi
        ? "एक दो-तरफ़ा सत्यापित डिजिटल ऑटो-टेक मार्केटप्लेस"
        : "A verified two-sided automotive logistics and dispatch marketplace",
      summary: isHi
        ? "JantaGaraj एक डिजिटल तकनीक प्लेटफॉर्म है जो वाहन स्वामियों व गृह स्वामियों को निकटतम स्वतंत्र, पृष्ठभूमि-सत्यापित ऑटोमोबाइल मैकेनिकों व तकनीशियनों से जोड़ता है।"
        : "JantaGaraj operates as an on-demand technology marketplace bridging private vehicle owners and fleet managers with certified, independent trade technicians.",
      points: [
        {
          label: isHi ? "स्वतंत्र सर्विस पार्टनर" : "Independent Professional Status",
          text: isHi
            ? "प्लेटफॉर्म पर लिस्टेड सभी तकनीशियन स्वतंत्र पेशेवर हैं। वे JantaGaraj के कर्मचारी नहीं हैं, किंतु वे हमारे कड़े गुणवत्ता मानकों और मानकीकृत रेट कार्ड से बंधे हैं।"
            : "Technicians listed on JantaGaraj operate as independent service contractors who have bound themselves to our quality benchmarks, background audits, and uniform rate cards.",
        },
        {
          label: isHi ? "सख्त पृष्ठभूमि जांच" : "Credential & Background Audits",
          text: isHi
            ? "प्रत्येक मैकेनिक का सरकारी पहचान पत्र (आधार, ड्राइविंग लाइसेंस), व्यापार प्रमाण पत्र और आपराधिक रिकॉर्ड सत्यापन अनिवार्य रूप से किया जाता है।"
            : "Every partner undergoes Aadhaar and driving license verification alongside criminal record checks before receiving telemetry dispatch privileges.",
        },
        {
          label: isHi ? "डिजिटल लॉजिस्टिक्स मध्यस्थता" : "Technology & Dispatch Mediation",
          text: isHi
            ? "JantaGaraj रियल-टाइम जीपीएस ट्रैकिंग, सुरक्षित ओटीपी प्रमाणीकरण, डिजिटल इनवॉइसिंग और ग्राहक विवाद निवारण की पूरी तकनीकी जिम्मेदारी लेता है।"
            : "We provide algorithmic proximity matching, two-way telemetry tracking, automated dispute mediation, and unified warranty enforcement.",
        },
      ],
      pills: [
        isHi ? "स्वतंत्र सत्यापित पार्टनर" : "Vetted Contractors",
        isHi ? "100% डिजिटल ट्रैकिंग" : "Telemetry Monitored",
        isHi ? "मानकीकृत रेट कार्ड" : "Standardized Rate Cards",
      ],
    },
    {
      id: "pricing-payments",
      category: "pricing",
      num: "02",
      icon: CreditCard,
      title: isHi ? "पारदर्शी दरें, विज़िटिंग शुल्क व भुगतान" : "Transparent Pricing & Payment Rules",
      tagline: isHi
        ? "पूर्व-प्रकाशित दरें और संतुष्टि उपरांत भुगतान नीति"
        : "Pre-published labor rates and pay-after-satisfaction protocols",
      summary: isHi
        ? "ग्राहकों को अप्रत्याशित ओवरचार्जिंग और अनुचित लेबर चार्ज से बचाने के लिए JantaGaraj स्पष्ट, तय मूल्य निर्धारण नीति का पालन करता है।"
        : "To eliminate predatory roadside pricing and surprise invoices, JantaGaraj enforces pre-published rate cards and transparent inspection adjustment rules.",
      points: [
        {
          label: isHi ? "विज़िटिंग व डायग्नोस्टिक समायोजन" : "Visiting Fee Adjustment Rule",
          text: isHi
            ? "डोरस्टेप विज़िटिंग व डायग्नोस्टिक शुल्क ₹149 से ₹249 के बीच होता है। यदि आप तकनीशियन से रिपेयर कार्य करवाते हैं, तो यह विज़िटिंग शुल्क आपके कुल अंतिम बिल में 100% समायोजित (deduct) कर दिया जाता है।"
            : "Standard visiting charges (₹149 - ₹249) cover doorstep travel and expert diagnosis. If any repair work is authorized and executed, 100% of this fee is credited against your final invoice.",
        },
        {
          label: isHi ? "संतुष्टि उपरांत भुगतान" : "Pay-After-Satisfaction Enforcement",
          text: isHi
            ? "आपको कार्य पूर्ण होने और परीक्षण/टेस्ट ड्राइव से पूर्ण संतुष्ट होने के बाद ही भुगतान करना होता है। आप यूपीआई (GPay, PhonePe, Paytm), क्रेडिट/डेबिट कार्ड या नकद से भुगतान कर सकते हैं।"
            : "Payments are collected only after repair execution has been demonstrated, tested, and validated by the client. We accept UPI, Card, and Cash.",
        },
        {
          label: isHi ? "स्पेयर पार्ट्स की मूल रसीद" : "Original Spare Parts Transparency",
          text: isHi
            ? "यदि किसी कंपोनेंट को बदलने की आवश्यकता है, तो तकनीशियन को काम शुरू करने से पहले पार्ट का नाम, ब्रांड और एमआरपी ग्राहक से स्वीकृत करानी होगी। अनधिकृत अतिरिक्त शुल्क प्रतिबंधित है।"
            : "Technicians must disclose replacement part brands, OEM serials, and exact MRP to the client prior to installation. Hidden markups are strictly forbidden.",
        },
      ],
      pills: [
        isHi ? "100% विज़िट शुल्क समायोजन" : "Fee Offset on Repair",
        isHi ? "कार्य समाप्ति पर भुगतान" : "Post-Testing Payment",
        isHi ? "डिजिटल जीएसटी रसीद" : "Itemized GST Billing",
      ],
    },
    {
      id: "cancellation-reschedule",
      category: "cancellation",
      num: "03",
      icon: RotateCcw,
      title: isHi ? "रद्दीकरण व रीशेड्यूल नीति" : "Cancellation & Reschedule Policy",
      tagline: isHi
        ? "लचीली नीतियां जो आपकी परिस्थितियों का सम्मान करती हैं"
        : "Fair, accommodating guidelines that respect real-world schedule changes",
      summary: isHi
        ? "हम समझते हैं कि वाहन ब्रेकडाउन या दैनिक योजनाओं में अचानक बदलाव हो सकते हैं। हमारी रद्दीकरण नीति पूरी तरह उचित व न्यायसंगत है।"
        : "Breakdown situations are unpredictable. Our policies protect customer flexibility while ensuring technician travel costs are responsibly covered.",
      points: [
        {
          label: isHi ? "प्री-डिस्पैच शून्य शुल्क" : "Free Pre-Dispatch Cancellation",
          text: isHi
            ? "तकनीशियन के अपनी लोकेशन से निकलने से पहले बुकिंग रद्द करने पर शून्य शुल्क (100% Free Cancellation) लागू होता है। कोई कैंसिलेशन पेनल्टी नहीं काटी जाएगी।"
            : "Zero cancellation fee is assessed if the request is withdrawn prior to technician dispatch. Any prepaid online payments are refunded within 24-48 business hours.",
        },
        {
          label: isHi ? "स्थल आगमन उपरांत यात्रा शुल्क" : "On-Site Nominal Travel Fee",
          text: isHi
            ? "यदि तकनीशियन आपके बताए स्थान पर पहुँच चुका है और फिर बुकिंग रद्द की जाती है, तो तकनीशियन के ईंधन व समय की भरपाई हेतु केवल न्यूनतम विज़िटिंग शुल्क (₹149) देय होगा।"
            : "If the technician has physically reached the breakdown coordinates before cancellation, a nominal travel convenience fee (₹149) applies to reimburse fuel and transit time.",
        },
        {
          label: isHi ? "निःशुल्क रीशेड्यूल सुविधा" : "One-Tap Reschedule Freedom",
          text: isHi
            ? "आप अपनी बुकिंग को ग्राहक डैशबोर्ड या व्हाट्सएप सहायता से बिना किसी अतिरिक्त चार्ज के आगामी समय के लिए रीशेड्यूल कर सकते हैं।"
            : "Clients may reschedule scheduled services to any convenient future slot with zero penalty directly from the Customer Dashboard or Help Desk.",
        },
      ],
      pills: [
        isHi ? "100% फ्री प्री-डिस्पैच" : "Zero Cancellation Fee",
        isHi ? "तत्काल ऑनलाइन रीशेड्यूल" : "One-Tap Rescheduling",
        isHi ? "उचित ईंधन प्रतिपूर्ति" : "Fair Transit Offsets",
      ],
    },
    {
      id: "workmanship-warranty",
      category: "warranty",
      num: "04",
      icon: ShieldCheck,
      title: isHi ? "30-दिन की कारीगरी वारंटी" : "30-Day Workmanship Warranty",
      tagline: isHi
        ? "हर योग्य रिपेयर पर लिखित सुरक्षा और री-विज़िट गारंटी"
        : "Written warranty commitments backing eligible repairs across India",
      summary: isHi
        ? "JantaGaraj पर किए गए सभी योग्य रिपेयर कार्यों पर 30 दिनों की फ्री री-विज़िट कारीगरी वारंटी प्रदान की जाती है।"
        : "Every qualifying repair executed via our certified network carries an enforceable 30-day labor assurance for complete peace of mind.",
      points: [
        {
          label: isHi ? "समान समस्या पर शून्य शुल्क री-विज़िट" : "Zero-Labor Re-dispatch",
          text: isHi
            ? "यदि 30 दिनों के भीतर वही डायग्नोस की गई समस्या (जैसे एसी कूलिंग, वायरिंग शॉर्ट, ब्रेक एडजस्टमेंट) दोबारा उत्पन्न होती है, तो वरिष्ठ मैकेनिक बिना किसी अतिरिक्त सर्विस चार्ज के समाधान करेगा।"
            : "If the diagnosed failure recurs within 30 days of initial service completion, a senior specialist is dispatched for re-inspection with 100% waived labor charges.",
        },
        {
          label: isHi ? "मूल स्पेयर पार्ट्स वारंटी" : "OEM Manufacturer Warranties",
          text: isHi
            ? "हमारे माध्यम से लगाए गए नए ओरिजिनल स्पेयर पार्ट्स (जैसे एक्साइड/अमारा राजा बैटरी, बॉस स्पार्क प्लग) संबंधित निर्माता की आधिकारिक 1-3 वर्ष की वारंटी नीति द्वारा सुरक्षित रहते हैं।"
            : "New components installed via verified inventory channels retain complete OEM manufacturer warranty coverage (ranging from 12 to 36 months).",
        },
        {
          label: isHi ? "डिजिटल वारंटी प्रमाण" : "Digital Service Ledger Record",
          text: isHi
            ? "आपकी प्रत्येक सर्विस और वारंटी वैधता आपके JantaGaraj खाते में डिजिटल रूप से सुरक्षित रहती है, जिससे वारंटी क्लेम करना बेहद सहज और झंझट-मुक्त हो जाता है।"
            : "Detailed diagnostic photographs, odometer milestones, and technician notes are permanently archived in your account for instantaneous claim validation.",
        },
      ],
      pills: [
        isHi ? "30-दिन फ्री री-विज़िट" : "30-Day Free Rework",
        isHi ? "OEM मूल पार्ट्स वारंटी" : "OEM Parts Coverage",
        isHi ? "डिजिटल सर्विस रिकॉर्ड" : "Paperless Claims",
      ],
    },
    {
      id: "partner-code-of-conduct",
      category: "conduct",
      num: "05",
      icon: Briefcase,
      title: isHi ? "तकनीशियन पार्टनर आचार संहिता" : "Technician Partner Code of Conduct",
      tagline: isHi
        ? "विश्वसनीयता, व्यावसायिकता और नागरिक सुरक्षा की बाध्यकारी संहिता"
        : "Binding standards ensuring courtesy, physical safety, and ethical practice",
      summary: isHi
        ? "JantaGaraj नेटवर्क से जुड़े सभी पेशेवर कड़े आचरण नियमों से बंधे हैं ताकि हर ग्राहक को सुरक्षित व सम्मानजनक सेवा का अनुभव मिले।"
        : "Our fleet partners are held to stringent behavioral and commercial protocols that prioritize customer dignity, honest assessments, and safe operations.",
      points: [
        {
          label: isHi ? "अनधिकृत नकद मांग पर पूर्ण प्रतिबंध" : "Anti-Gouging & Cash Diversion Ban",
          text: isHi
            ? "तकनीशियन को प्लेटफॉर्म के बाहर अनधिकृत नकद राशि मांगने या बिना इनवॉइस के अतिरिक्त शुल्क वसूलने की सख्त मनाही है। इसका उल्लंघन करने पर पार्टनर का लाइसेंस तुरंत निलंबित कर दिया जाता है।"
            : "Soliciting off-platform unitemized cash payments or manipulating rate cards results in immediate termination, blacklisting, and escrow forfeitures.",
        },
        {
          label: isHi ? "शून्य सहिष्णुता सुरक्षा नीति" : "Zero-Tolerance Safety Protocol",
          text: isHi
            ? "ग्राहकों के साथ अभद्र व्यवहार, नशे की हालत में सेवा देना, या सुरक्षा मानकों की अनदेखी करना बर्दाश्त नहीं किया जाता। ऐसे मामलों में तत्काल पुलिस रिपोर्ट व ब्लैकलिस्टिंग की जाती है।"
            : "Intoxication, harassment, disrespectful conduct, or careless vehicle handling triggers instantaneous permanent revocation and law enforcement escalation.",
        },
        {
          label: isHi ? "व्यावसायिक टूलकिट व स्वच्छता" : "Certified Toolkits & PPE Compliance",
          text: isHi
            ? "सभी पार्टनर आधुनिक डायग्नोस्टिक स्कैनर, कैलिब्रेटेड रिंच और स्वच्छ कार्यस्थल मानकों का पालन करने के लिए अनिवार्य रूप से सुसज्जित होते हैं।"
            : "Technicians must carry certified OBD-II diagnostic equipment, calibrated tools, protective floor mats, and maintain immaculate vehicle cleanliness.",
        },
      ],
      pills: [
        isHi ? "अनधिकृत चार्जिंग निषेध" : "Anti-Gouging Standard",
        isHi ? "शून्य नशा सहिष्णुता" : "Zero-Tolerance Safety",
        isHi ? "आधुनिक स्कैनर टूलकिट" : "Calibrated Toolkits",
      ],
    },
  ];

  // Category filter list
  const categories = [
    { id: "all", label: isHi ? "सभी नियम संहिता" : "All Sections" },
    { id: "role", label: isHi ? "प्लेटफॉर्म भूमिका" : "Platform Role" },
    { id: "pricing", label: isHi ? "दरें व भुगतान" : "Pricing & Fees" },
    { id: "cancellation", label: isHi ? "रद्दीकरण नीति" : "Cancellation" },
    { id: "warranty", label: isHi ? "30-दिन वारंटी" : "Warranty" },
    { id: "conduct", label: isHi ? "पार्टनर आचार संहिता" : "Code of Conduct" },
  ];

  // Filter clauses based on category and search query
  const filteredClauses = clauses.filter((c) => {
    const matchesCategory = activeTab === "all" || c.category === activeTab;
    const matchesQuery =
      searchQuery.trim() === "" ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.points.some(
        (p) =>
          p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="bg-[#080b11] text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950 font-sans relative overflow-hidden pb-24">
      {/* ========================================================= */}
      {/* ATMOSPHERIC OVERHEAD LIGHTING & SUBTLE TEXTURE            */}
      {/* ========================================================= */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none -z-0" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(59,130,246,0.04),transparent_70%)] pointer-events-none -z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* MODERN, WELCOMING HERO SECTION                            */}
      {/* ========================================================= */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-12 sm:pb-16 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Subtle status tag with refined amber micro-dot */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium backdrop-blur-md">
            <Scale className="w-3.5 h-3.5 text-slate-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>
              {isHi
                ? "आधिकारिक प्लेटफॉर्म नियम व उपयोगकर्ता अनुबंध"
                : "Official Terms of Service & Platform Agreement"}
            </span>
          </div>

          {/* Crisp, authoritative headline */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              {isHi ? (
                <>
                  पारदर्शिता और विश्वास पर आधारित{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                    उचित नियम
                  </span>
                </>
              ) : (
                <>
                  Fair, transparent terms{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                    built on mutual trust.
                  </span>
                </>
              )}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
              {isHi
                ? "वाहन स्वामियों और प्रमाणित ट्रेड मैकेनिकों के हितों की रक्षा हेतु तैयार की गई स्पष्ट, निष्पक्ष व पारदर्शी कानूनी संहिता। तय दरें, ओटीपी सुरक्षा और 30-दिन की कार्य वारंटी।"
                : "Clear legal guardrails engineered to safeguard vehicle owners and independent certified technicians alike. Published standard rates, 4-digit OTP work gating, and a 30-day workmanship assurance."}
            </p>
          </div>

          {/* Metadata badges strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-400 pt-2 font-normal">
            <div className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? "संस्करण: 2.4 (नवंबर 2026)" : "Version: 2.4 (November 2026)"}</span>
            </div>
            <span className="text-white/[0.15] hidden sm:inline">•</span>
            <div className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? "उपभोक्ता संरक्षण अधिनियम 2019 सम्मत" : "Consumer Protection Act 2019 Compliant"}</span>
            </div>
            <span className="text-white/[0.15] hidden sm:inline">•</span>
            <div className="inline-flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? "विवाद समाधान SLA < 24 घंटे" : "Dispute Resolution SLA < 24 Hrs"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4 NATURAL METRICS STRIP                                   */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {keyMetrics.map((item, idx) => (
            <div
              key={idx}
              className="group p-5 rounded-2xl bg-[#0d121c]/70 border border-white/[0.06] backdrop-blur-md hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {item.metric}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                {item.label}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 1-2-3 SERVICE AGREEMENT PROTOCOL WORKFLOW                 */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="text-center space-y-2 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? "कार्यप्रणाली व सुरक्षा चक्र" : "How Our Terms Protect You"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {isHi ? "तीन चरणों में सुरक्षित व पारदर्शी सर्विस" : "Three-Step Fair Service Protocol"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            {isHi
              ? "बुकिंग से लेकर कार्य समाप्ति तक हर कदम पर आपके हितों का कानूनी व तकनीकी संरक्षण।"
              : "End-to-end procedural transparency engineered into every booking on JantaGaraj."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {agreementProcess.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-2xl bg-[#0d121c]/50 border border-white/[0.06] hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white/[0.12] group-hover:text-amber-400/30 transition-colors font-mono">
                  {step.step}
                </span>
                <span className="text-[11px] font-semibold text-slate-300 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  {step.badge}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SEARCH & CLAUSE FILTER BAR                                */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0d121c]/60 border border-white/[0.06] backdrop-blur-md">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    active
                      ? "bg-amber-500 text-slate-950 font-semibold shadow-sm"
                      : "bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.04]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick Clause Search Input */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHi ? "नियम या शर्त खोजें..." : "Search terms or clauses..."}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/60 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* DETAILED TERMS CLAUSES - FLOATING CARDS                   */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {filteredClauses.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-[#0d121c]/40 border border-white/[0.06]">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <p className="text-sm text-slate-300 font-medium">
              {isHi
                ? "आपके खोज मानदंड से मेल खाती कोई शर्त नहीं मिली।"
                : "No matching clauses found for your search query."}
            </p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="mt-3 text-xs text-amber-400 hover:text-amber-300 font-medium underline underline-offset-4"
            >
              {isHi ? "सभी नियम पुनः देखें" : "Clear filters and view all"}
            </button>
          </div>
        ) : (
          filteredClauses.map((clause) => {
            const IconComponent = clause.icon;
            return (
              <div
                key={clause.id}
                id={clause.id}
                className="group p-6 sm:p-8 rounded-3xl bg-[#0d121c]/70 border border-white/[0.06] backdrop-blur-md hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300 space-y-6"
              >
                {/* Clause Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center shrink-0 group-hover:border-amber-400/40 transition-colors">
                      <IconComponent className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold text-amber-400 uppercase tracking-wider">
                          Section {clause.num}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {clause.title}
                      </h3>
                    </div>
                  </div>

                  {/* Pills strip */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {clause.pills.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[11px] font-medium text-slate-300 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtitle / summary */}
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  {clause.summary}
                </p>

                {/* Point by Point Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                  {clause.points.map((point, ptIdx) => (
                    <div
                      key={ptIdx}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <h4 className="text-xs font-semibold text-white tracking-tight">
                          {point.label}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* ========================================================= */}
      {/* GRIEVANCE OFFICER & DISPUTE RESOLUTION BANNER             */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0d121c] via-[#111724] to-[#0d121c] border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 font-medium">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? "कानूनी विवाद निवारण व शिकायत अधिकारी" : "Grievance Officer & Legal Recourse"}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {isHi
                ? "क्या आपकी सर्विस या बिलिंग से संबंधित कोई शिकायत है?"
                : "Have a billing query or service dispute?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              {isHi
                ? "सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश व डिजिटल मीडिया आचार संहिता) नियम 2021 के अनुसार नियुक्त हमारे शिकायत अधिकारी से संपर्क करें। हम 24 घंटे के भीतर प्रत्येक शिकायत की जांच शुरू करते हैं।"
                : "Under the Information Technology Act & Consumer Protection Rules, our designated Grievance Officer initiates formal investigation of escalated tickets within 24 hours of lodgement."}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 font-medium">
              <a
                href="mailto:support@jantagaraj.in"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>support@jantagaraj.in</span>
              </a>
              <span className="text-white/[0.15]">•</span>
              <a
                href="tel:+918439616833"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+91 84396 16833 (24/7 Helpline)</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <Link to="/help" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>{isHi ? "सहायता डेस्क पर जाएं" : "Go to Help Desk"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link to="/privacy" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>{isHi ? "गोपनीयता नीति पढ़ें" : "Read Privacy Policy"}</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
