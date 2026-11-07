import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  PhoneCall,
  Phone,
  Clock,
  ArrowRight,
  Lock,
  FileText,
  Check,
  Car,
  Wrench,
  Sparkles,
  MapPin,
  BadgeCheck,
  Eye,
  Shield,
  HelpCircle,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const SafetyGuidelinesPage: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  // 4 Natural & Elegant Safety Metrics
  const safetyMetrics = [
    {
      value: "100% KYC",
      label: isHi ? "सरकारी पहचान व पुलिस सत्यापित" : "Govt ID & Background Verified",
      sub: isHi ? "शून्य समझौता सुरक्षा" : "Zero tolerance standard",
    },
    {
      value: "4-Digit OTP",
      label: isHi ? "दो-तरफा कार्य आरंभ गेट" : "Two-Way Work Start Gate",
      sub: isHi ? "आपकी अनुमति बिना कार्य नहीं" : "No start without client code",
    },
    {
      value: "< 28 min",
      label: isHi ? "हाईवे इमरजेंसी रिस्पांस" : "Highway Emergency Response",
      sub: isHi ? "रियल-टाइम जीपीएस ट्रैकिंग" : "Active dispatch telemetry",
    },
    {
      value: "30-Day SLA",
      label: isHi ? "लिखित स्पेयर व कार्य वारंटी" : "Written Spares & Labor Warranty",
      sub: isHi ? "100% ओरिजिनल पार्ट्स" : "Serialized genuine parts",
    },
  ];

  // 1-2-3 Safety Verification Protocol
  const protocolSteps = [
    {
      step: "01",
      title: isHi ? "प्री-डिस्पैच क्रेडेंशियल मिलान" : "Pre-Dispatch Credential Audit",
      desc: isHi
        ? "बुकिंग कन्फर्म होते ही आपको मैकेनिक का फोटो आईडी, वाहन नंबर, और 4.8+ स्टार रेटिंग रिकॉर्ड प्राप्त होता है।"
        : "Instantly inspect the assigned technician's legal name, photo credential, vehicle license plate, and verified track record before arrival.",
      tag: isHi ? "आगमन से पूर्व" : "Prior to Arrival",
    },
    {
      step: "02",
      title: isHi ? "2-फैक्टर 4-अंकीय OTP गेट" : "2-Factor 4-Digit Work Start Gate",
      desc: isHi
        ? "तकनीशियन आपके वाहन या घर के उपकरणों को तभी छू सकता है जब आप अपने रजिस्टर्ड फोन पर आया गोपनीय 4-अंकीय OTP शेयर करते हैं।"
        : "Technicians cannot initiate diagnostics or disassemble components without you verbalizing the encrypted 4-digit start PIN.",
      tag: isHi ? "सर्विस प्रारंभ" : "Job Initiation",
    },
    {
      step: "03",
      title: isHi ? "डिजिटल जॉब कार्ड व वारंटी लॉक" : "Digital Job Card & Warranty Lock",
      desc: isHi
        ? "कार्य पूर्ण होने पर वास्तविक बदले गए पार्ट्स का सीरियल नंबर, डिजिटल इनवॉइस और 30 दिन की लिखित वारंटी स्लिप तुरंत जनरेट होती है।"
        : "Every genuine spare part serial is logged into a tamper-evident digital GST invoice, backing every repair with an instant 30-day warranty.",
      tag: isHi ? "कार्य पूर्णता" : "Job Handover",
    },
  ];

  // 4 Detailed Safety Pillars
  const safetyPillars = [
    {
      id: "pillar-vetting",
      title: isHi ? "1. 4-स्तरीय फ्लीट सत्यापन प्रक्रिया" : "1. 4-Tier Fleet Verification Architecture",
      subtitle: isHi
        ? "प्रत्येक मैकेनिक को JantaGaraj नेटवर्क में शामिल होने से पूर्व इन 4 चरणों को पास करना अनिवार्य है:"
        : "Every field mechanic undergoes an uncompromising four-stage validation pipeline before taking requests:",
      icon: UserCheck,
      gates: [
        {
          title: isHi ? "गेट 1: आधिकारिक सरकारी पहचान सत्यापन" : "Gate 1: Digital Govt Identity Verification",
          desc: isHi
            ? "आधार, पैन और ड्राइविंग लाइसेंस का आधिकारिक सरकारी डेटाबेस से प्रत्यक्ष एपीआई सत्यापन।"
            : "Direct automated verification of Aadhaar, PAN, and Commercial Driving Licenses against central registries.",
        },
        {
          title: isHi ? "गेट 2: व्यावहारिक ट्रेड व डायग्नोस्टिक टेस्ट" : "Gate 2: Hands-On Trade Diagnostic Audit",
          desc: isHi
            ? "न्यूनतम 3-5 वर्षों का सत्यापित गैराज अनुभव और आधुनिक ओबीडी-II डायग्नोस्टिक टूल्स की परीक्षा।"
            : "Minimum 3-5 years of certified garage tenure plus practical evaluation on modern OBD-II diagnostic scanners.",
        },
        {
          title: isHi ? "गेट 3: पुलिस व चरित्र रिकॉर्ड स्क्रीनिंग" : "Gate 3: Police & Criminal Record Clearance",
          desc: isHi
            ? "शून्य आपराधिक इतिहास, स्थानीय पुलिस सत्यापन और पूर्व सेवा संदर्भों की गहन जांच।"
            : "Clean criminal record certificate, mandatory local police clearance, and formal reference background checks.",
        },
        {
          title: isHi ? "गेट 4: निरंतर 4.5+ स्टार परफॉरमेंस गेट" : "Gate 4: Continuous 4.5+ Star Quality Lock",
          desc: isHi
            ? "4.5 से कम औसत ग्राहक रेटिंग आने पर तकनीशियन को तत्काल ऑटो-पॉज करके दोबारा ट्रेनिंग दी जाती है।"
            : "Technicians dipping below 4.5 average customer score are immediately suspended from live dispatch queues.",
        },
      ],
    },
    {
      id: "pillar-highway",
      title: isHi ? "2. हाईवे व रोडसाइड आपातकालीन सुरक्षा नियम" : "2. Highway & Roadside Breakdown Safety Protocol",
      subtitle: isHi
        ? "यदि एक्सप्रेसवे या सुनसान सड़क पर वाहन बंद हो जाए, तो अपनी और यात्रियों की सुरक्षा के लिए इन नियमों का पालन करें:"
        : "Critical breakdown guidelines to safeguard you, your passengers, and your vehicle during roadside emergencies:",
      icon: AlertTriangle,
      gates: [
        {
          title: isHi ? "सुरक्षित शोल्डर लेन में रुकें" : "Steer to the Leftmost Shoulder Lane",
          desc: isHi
            ? "गाड़ी को तुरंत सड़क के बाईं ओर ले जाएं, हैजर्ड वार्निंग लाइट्स चालू करें और 30-50 मीटर पीछे रिफ्लेक्टिव ट्रायंगल रखें।"
            : "Immediately maneuver to the left shoulder, activate hazard flashers, and position reflective warning triangles 30m behind.",
        },
        {
          title: isHi ? "लाइव जीपीएस लोकेशन शेयरिंग" : "Real-Time Telemetry Location Sharing",
          desc: isHi
            ? "JantaGaraj ऐप पर सटीक पिन शेयर करें ताकि नजदीकी पेट्रोलिंग वैन या मैकेनिक बिना भटके 28 मिनट में पहुंच सके।"
            : "Broadcast your precise GPS coordinates via the app so the nearest emergency dispatch arrives without navigation lag.",
        },
        {
          title: isHi ? "आगमन पर डिजिटल पहचान सत्यापन" : "Identity Verification Upon Arrival",
          desc: isHi
            ? "मैकेनिक के आने पर ऐप में प्रदर्शित चेहरा, नाम और वर्दी बैज का मिलान करें। अज्ञात व्यक्तियों से सहायता न लें।"
            : "Cross-check the technician's uniform badge, photo, and vehicle plate with your active booking screen before engagement.",
        },
        {
          title: isHi ? "सुरक्षित प्रतीक्षा क्षेत्र" : "Safe Wait Zone Behind Crash Barriers",
          desc: isHi
            ? "हाई-स्पीड हाईवे पर वाहन के अंदर बैठने के बजाय क्रैश बैरियर के सुरक्षित पीछे खड़े होकर तकनीशियन की प्रतीक्षा करें।"
            : "On high-speed expressways, remain safely behind the guard rail barrier rather than waiting inside the stalled vehicle.",
        },
      ],
    },
    {
      id: "pillar-doorstep",
      title: isHi ? "3. गृह व ऑफिस डोरस्टेप सर्विस सुरक्षा" : "3. Residential & Commercial Doorstep Safety",
      subtitle: isHi
        ? "घर पर एसी रिपेयर, इलेक्ट्रिकल वर्क या होम ऑटो सर्विस के दौरान पूर्ण पारदर्शिता और परिवार की सुरक्षा:"
        : "Uncompromising privacy and safety guidelines for domestic doorstep maintenance and technician visits:",
      icon: ShieldCheck,
      gates: [
        {
          title: isHi ? "सुरक्षित 4-अंकीय स्टार्ट कोड" : "Encrypted 4-Digit Initiation Code",
          desc: isHi
            ? "आपके व्यक्तिगत फोन पर आए ओटीपी के बिना तकनीशियन सिस्टम में कोई भी सर्विस या चार्ज शुरू नहीं कर सकता।"
            : "Technicians are technologically locked from initiating any work order until you supply your unique start OTP.",
        },
        {
          title: isHi ? "परिवार व महिला सुरक्षा प्राथमिकता" : "Family & Domestic Safety Protocol",
          desc: isHi
            ? "सभी तकनीशियन निर्धारित शालीनता, आईडी बैज और सैनिटाइज्ड टूल्स के साथ कार्य करते हैं। अनचाही बातचीत निषिद्ध है।"
            : "Strict zero-harassment and professional conduct standards. Verified ID badges must be visible throughout the visit.",
        },
        {
          title: isHi ? "पूर्व-स्वीकृत कार्य दायरा" : "Explicit Scope Approval Before Work",
          desc: isHi
            ? "कोई भी अतिरिक्त पुर्जा बदलने से पहले मैकेनिक आपको डिजिटल एस्टीमेट दिखाएगा। आपकी सहमति बिना कोई लागत नहीं।"
            : "Zero unauthorized component replacements. Technicians present an in-app cost estimate prior to touching parts.",
        },
        {
          title: isHi ? "साफ-सफाई व उपकरण स्वच्छता" : "Post-Service Cleanup & Sanitization",
          desc: isHi
            ? "सर्विस पूर्ण होने के बाद कार्य क्षेत्र को स्वच्छ छोड़ना और पुराने बदले गए पार्ट्स ग्राहक को दिखाना अनिवार्य है।"
            : "Technicians leave the workspace clean and hand over all replaced damaged parts in tamper-evident packaging.",
        },
      ],
    },
    {
      id: "pillar-parts",
      title: isHi ? "4. पुर्जों की प्रामाणिकता व 30 दिन की लिखित वारंटी" : "4. Genuine Spares & 30-Day Written Assurance",
      subtitle: isHi
        ? "नकली या डुप्लीकेट पार्ट्स से पूर्ण सुरक्षा—हर पुर्जे का डिजिटल सीरियल नंबर और जीएसटी बिल:"
        : "Guaranteed protection against counterfeit spares with serialized authenticity tracking on every job:",
      icon: BadgeCheck,
      gates: [
        {
          title: isHi ? "100% ओरिजिनल OEM/OES स्पेयर पार्ट्स" : "100% Verified OEM / OES Components",
          desc: isHi
            ? "सभी स्पेयर पार्ट्स सीधे अधिकृत वितरकों से मंगाए जाते हैं और सीलबंद पैकेजिंग में ग्राहक के सामने खोले जाते हैं।"
            : "Components are sourced straight from authorized tier-1 distributors and unboxed directly in front of the customer.",
        },
        {
          title: isHi ? "सीरियल नंबर लिंक्ड इनवॉइस" : "Serialized Digital GST Invoicing",
          desc: isHi
            ? "बदले गए हर बड़े पार्ट का बारकोड/सीरियल नंबर सीधे आपकी डिजिटल रसीद में दर्ज होता है।"
            : "Unique component serial numbers and barcodes are permanently embedded into your cloud GST receipt.",
        },
        {
          title: isHi ? "30 दिन की लिखित वारंटी सुरक्षा" : "30-Day No-Questions-Asked Coverage",
          desc: isHi
            ? "यदि 30 दिनों के भीतर वही समस्या दोबारा आती है, तो बिना किसी अतिरिक्त विजिट शुल्क के तत्काल पुनः समाधान।"
            : "If the repaired fault recurs within 30 days, a senior technician is dispatched free of charge for remediation.",
        },
        {
          title: isHi ? "पारदर्शी डिजिटल रेट कार्ड" : "Published Standardized Rate Cards",
          desc: isHi
            ? "किसी भी प्रकार का छिपा हुआ शुल्क, ऑन-द-स्पॉट बार्गेनिंग या मनमाना चार्ज पूरी तरह प्रतिबंधित है।"
            : "Strict adherence to platform-wide price schedules. Zero cash bargaining or arbitrary on-the-spot markups.",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#080b11] text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950 font-sans relative overflow-hidden pb-24">
      {/* ========================================================= */}
      {/* 00 QUIET, PREMIUM LIGHTING & ATMOSPHERE                   */}
      {/* ========================================================= */}
      {/* Soft, diffuse overhead ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[560px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-15%,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none -z-0" />
      {/* Micro-warm amber accent whisper */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[360px] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(245,158,11,0.035),transparent_65%)] pointer-events-none -z-0" />
      {/* Subtle organic grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* 01 MODERN HERO SECTION                                    */}
      {/* ========================================================= */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-14 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Refined Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{isHi ? "सुरक्षा व विश्वास प्रोटोकॉल" : "Safety & Protection Architecture"}</span>
          </div>

          {/* Crisp Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
            {isHi ? "आपकी सुरक्षा और विश्वास," : "Zero compromises on"}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
              {isHi ? "हमारी पहली प्राथमिकता।" : "fleet safety & customer trust."}
            </span>
          </h1>

          {/* Natural Human Paragraph */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            {isHi
              ? "चाहे आधी रात को हाईवे पर ब्रेकडाउन हो या घर पर इलेक्ट्रीशियन का कार्य—JantaGaraj का 4-स्तरीय सत्यापन और दो-तरफा OTP गेट हर कदम पर आपकी सुरक्षा सुनिश्चित करता है।"
              : "From high-speed highway emergency triage to residential appliance diagnostics, discover the cryptographic checks, background audits, and warranty safety nets protecting every job."}
          </p>

          {/* Refined Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="tel:+918439616833"
              className="inline-flex flex-row items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 shrink-0" />
              <span>{isHi ? "24/7 आपातकालीन हेल्पलाइन" : "24/7 Rapid SOS Helpline"}</span>
            </a>

            <Link
              to="/technicians"
              className="inline-flex flex-row items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.1] hover:border-white/[0.2] font-medium text-xs sm:text-sm transition-all whitespace-nowrap"
            >
              <UserCheck className="w-4 h-4 text-slate-400" />
              <span>{isHi ? "सत्यापित मैकेनिक देखें" : "View Verified Mechanics"}</span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SAFETY METRICS STRIP: Natural & Elegant Typography       */}
        {/* ========================================================= */}
        <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {safetyMetrics.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {stat.label}
              </p>
              <p className="text-[11px] text-slate-500 font-normal">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 02 INTUITIVE 1-2-3 SAFETY PROTOCOL (WORKFLOW)             */}
      {/* ========================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {isHi ? "प्रमाणित सुरक्षा प्रक्रिया" : "The 3-Step Safety Protocol"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
            {isHi ? "हर सर्विस पर 3-स्तरीय सुरक्षा चक्र" : "How Every Booking Is Safeguarded"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
            {isHi
              ? "बुकिंग से लेकर कार्य समाप्ति तक, हर चरण में आपकी पहचान, वाहन और वित्तीय सुरक्षा सुरक्षित रहती है।"
              : "From pre-dispatch verification to job completion, our cryptographic protocols ensure complete accountability."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {protocolSteps.map((item) => (
            <div
              key={item.step}
              className="p-7 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 shadow-sm relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl sm:text-3xl font-mono font-medium text-slate-600 group-hover:text-amber-400/80 transition-colors">
                    {item.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-slate-400">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-100 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80" />
                <span>{isHi ? "सिस्टम द्वारा स्वतः लागू" : "Enforced automatically"}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 03 DETAILED 4 SAFETY PILLARS (FLOATING CARDS)             */}
      {/* ========================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {isHi ? "सुरक्षा स्तंभ" : "Engineering Safeguards"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
            {isHi ? "कठोर सुरक्षा व गुणवत्ता मानक" : "Comprehensive Protection Standards"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
            {isHi
              ? "हाईवे ब्रेकडाउन से लेकर घर की चौखट तक, हमारे विस्तृत सुरक्षा नियमों की जानकारी:"
              : "Deep-dive into the four architectural safety pillars governing all technicians and job dispatches."}
          </p>
        </div>

        <div className="space-y-6">
          {safetyPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                id={pillar.id}
                className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300 shadow-sm space-y-6"
              >
                {/* Pillar Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 shrink-0">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-normal">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4 Detailed Sub-Gates */}
                <div className="pt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pillar.gates.map((gate, gIdx) => (
                    <div
                      key={gIdx}
                      className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.05] hover:border-white/[0.1] transition-all space-y-2 group"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <h4 className="text-sm font-semibold text-white group-hover:text-slate-100 transition-colors">
                          {gate.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal pl-6">
                        {gate.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 04 EMERGENCY SOS & RAPID ASSISTANCE BANNER                */}
      {/* ========================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          {/* Subtle warm accent in corner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 text-xs font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>{isHi ? "24/7 सेंट्रल रोडसाइड डिस्पैच" : "24/7 Rapid Emergency Response"}</span>
              </span>

              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                {isHi ? "सड़क पर तत्काल सुरक्षा या सहायता चाहिए?" : "Stranded or need immediate roadside safety?"}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "यदि आपकी कार, बाइक या वाहन हाईवे अथवा सुनसान मार्ग पर रुक गया है, तो हमारी 24/7 इमरजेंसी हेल्पलाइन से तुरंत संपर्क करें।"
                  : "Our high-priority emergency triage hotline connects you with a rapid roadside rescue unit in under 30 seconds."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:+918439616833"
                className="inline-flex flex-row items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 84396 16833</span>
              </a>

              <Link
                to="/help"
                className="inline-flex flex-row items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.1] font-medium text-xs sm:text-sm transition-all whitespace-nowrap"
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>{isHi ? "हेल्प डेस्क" : "Help Desk"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
