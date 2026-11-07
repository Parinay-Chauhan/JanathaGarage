import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Eye,
  MapPin,
  Server,
  UserCheck,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Check,
  ChevronRight,
  Shield,
  Key,
  Cpu,
  Layers,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/Button";

export const PrivacyPolicyPage: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  const coreCommitments = [
    {
      id: "privacy-collect",
      title: isHi ? "1. हम कौन सा डेटा एकत्र करते हैं?" : "1. What Data We Collect",
      desc: isHi
        ? "केवल वही जानकारी जो विश्वसनीय डोरस्टेप रिपेयर और नजदीकी मैकेनिक डिस्पैच के लिए अनिवार्य है।"
        : "Only the essential data points required to facilitate reliable doorstep mechanics and precise telemetry dispatch.",
      icon: Eye,
      points: [
        isHi
          ? "व्यक्तिगत पहचान: नाम, 10-अंकीय मोबाइल नंबर व प्रमाणीकरण ईमेल।"
          : "Personal Identity: Legal name, 10-digit mobile number, and authentication email.",
        isHi
          ? "स्थान व जीपीएस: 30 मिनट में निकटतम तकनीशियन डिस्पैच करने हेतु सटीक सर्विस निर्देशांक।"
          : "Real-Time Location & GPS: Precise coordinates strictly to route the nearest technician in < 30 mins.",
        isHi
          ? "वाहन व उपकरण विनिर्देश: मेक, मॉडल, रजिस्ट्रेशन नंबर व ब्रेकडाउन की डायग्नोस्टिक फोटो।"
          : "Vehicle & Appliance Specs: Make, model, registration number, and diagnostic photographs of the issue.",
        isHi
          ? "फ्लीट पार्टनर सत्यापन: आधार, ड्राइविंग लाइसेंस, पैन व आपराधिक पृष्ठभूमि सत्यापन रिकॉर्ड।"
          : "Technician Fleet KYC: Government identification (Aadhaar, Driving License) and trade certifications.",
      ],
    },
    {
      id: "privacy-use",
      title: isHi ? "2. हम डेटा का उपयोग कैसे करते हैं?" : "2. How We Utilize Your Data",
      desc: isHi
        ? "आपका डेटा केवल लॉजिस्टिक्स, डिजिटल इनवॉइस और सुरक्षा सत्यापन के लिए उपयोग किया जाता है।"
        : "Your information is strictly utilized to power on-demand logistics and maintain marketplace trust.",
      icon: Server,
      points: [
        isHi
          ? "दूरी व विशेषज्ञता के आधार पर निकटतम प्रमाणित मैकेनिक को आपकी बुकिंग से जोड़ना।"
          : "Matching your booking with certified nearby mechanics based on service proximity.",
        isHi
          ? "तय रेट कार्ड के अनुसार डिजिटल जीएसटी इनवॉइस और 30 दिन की लिखित वारंटी स्लिप तैयार करना।"
          : "Generating itemized digital invoices, warranty records, and published rate card breakdowns.",
        isHi
          ? "कार्य प्रारंभ करने और पूर्ण करने के लिए 4-अंकीय दो-चरणीय OTP सत्यापन।"
          : "Enforcing two-factor 4-digit OTP gates before starting and completing any repair work.",
        isHi
          ? "गुणवत्ता बनाए रखने के लिए सर्विस पूर्ण होने के बाद ऑडिटेड रेटिंग व फीडबैक संग्रह।"
          : "Collecting customer quality ratings and performance feedback to maintain engineering standards.",
      ],
    },
    {
      id: "privacy-security",
      title: isHi ? "3. सुरक्षा गारंटी व शून्य डेटा बिक्री" : "3. Security & Zero Third-Party Sale",
      desc: isHi
        ? "हम किसी भी परिस्थिति में आपका व्यक्तिगत डेटा, फोन नंबर या लोकेशन किसी को नहीं बेचते।"
        : "We do not sell, rent, or monetize your personal phone numbers, GPS coordinates, or booking records to advertisers.",
      icon: Lock,
      points: [
        isHi
          ? "शून्य डेटा मुद्रीकरण: आपका डेटा किसी भी विज्ञापन ब्रोकर या थर्ड-पार्टी मार्केटर को नहीं दिया जाता।"
          : "Zero Data Monetization: We never sell or license customer records to data brokers or advertising networks.",
        isHi
          ? "TLS 1.3 एन्क्रिप्शन: सर्वर और ऐप के बीच सभी संचार बैंक-ग्रेड एन्क्रिप्शन से सुरक्षित हैं।"
          : "TLS 1.3 Encryption: All communications are guarded by modern TLS 1.3 cryptographic protocols.",
        isHi
          ? "टोकनयुक्त कुकीज़: सुरक्षित HTTP-Only, SameSite और सिक्योर ब्राउज़र कुकीज़ का उपयोग।"
          : "Tokenized Security: Dual JWT session tokens issued with strict HTTP-Only and SameSite flags.",
        isHi
          ? "मास्क की गई कॉलिंग: तकनीशियन और ग्राहक के बीच गोपनीयता बनाए रखने हेतु वर्चुअल कॉलिंग।"
          : "Masked Communication: Private phone relays to preserve personal contact anonymity.",
      ],
    },
    {
      id: "privacy-rights",
      title: isHi ? "4. आपके अधिकार व 48 घंटे डिलीशन" : "4. Your Rights & 48-Hour Deletion",
      desc: isHi
        ? "आप किसी भी समय अपने प्रोफाइल से डेटा डाउनलोड कर सकते हैं या अकाउंट डिलीट करवा सकते हैं।"
        : "You maintain full autonomy over your records. You may review, export, or request permanent deletion of your profile.",
      icon: UserCheck,
      points: [
        isHi
          ? "डेटा पोर्टेबिलिटी: अपने पूर्व वर्क ऑर्डर्स, वारंटी स्लिप्स और बिलिंग हिस्ट्री का पूर्ण एक्सपोर्ट।"
          : "Data Portability: Export complete archives of your job cards, warranty slips, and billing history.",
        isHi
          ? "48 घंटे में स्थायी डिलीशन: अनुपालन डेस्क को अनुरोध भेजने के 48 घंटों में स्थायी रूप से डेटा नष्ट।"
          : "Permanent Deletion in 48 Hours: Complete removal of user profiles upon verified deletion request.",
        isHi
          ? "ओटीपी एक्सेस नियंत्रण: बिना आपकी अनुमति के तकनीशियन या सपोर्ट आपके खाते को एक्सेस नहीं कर सकते।"
          : "Granular Access Control: Technicians have zero access to your profile history once a job closes.",
        isHi
          ? "स्वतंत्र शिकायत निवारण: समर्पित डेटा प्रोटेक्शन अधिकारी द्वारा शिकायतों का लिखित समाधान।"
          : "Dedicated Grievance Redressal: Direct escalation channel to our Data Protection Officer.",
      ],
    },
  ];

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
      {/* 01 MODERN HERO: OPEN & CONFIDENT GOVERNANCE               */}
      {/* ========================================================= */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-16 sm:pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Quiet Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 text-xs font-medium backdrop-blur-md shadow-sm mb-6 sm:mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span>
            {isHi ? "डेटा सुरक्षा एवं निजता नीति" : "Trust & Data Governance · Bank-Grade Encryption"}
          </span>
        </div>

        {/* Clean, Human Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.14] max-w-3xl mx-auto">
          {isHi ? (
            <>
              आपकी गोपनीयता,{" "}
              <span className="text-slate-400 font-normal">डिज़ाइन से सुरक्षित।</span>
            </>
          ) : (
            <>
              Privacy engineered with{" "}
              <span className="text-slate-400 font-normal">absolute certainty.</span>
            </>
          )}
        </h1>

        {/* Fluid Description */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
          {isHi
            ? "JantaGaraj पर आपका व्यक्तिगत डेटा, लाइव जीपीएस लोकेशन और वाहन डायग्नोस्टिक्स बैंक-ग्रेड एन्क्रिप्शन से सुरक्षित हैं। हम कभी भी आपका डेटा तीसरे पक्षों को नहीं बेचते।"
            : "Your personal information, vehicle diagnostics, and doorstep coordinates belong to you. We protect your data with modern TLS 1.3 encryption, zero third-party monetization, and 48-hour deletion autonomy."}
        </p>

        {/* Version & Date Metadata */}
        <p className="mt-4 text-xs text-slate-500 font-mono">
          {isHi
            ? "प्रभावी संस्करण: v2.4 • अंतिम अद्यतन: 1 नवंबर 2026"
            : "Effective Version: v2.4 · Last Updated: November 1, 2026"}
        </p>

        {/* Key Resolution & Security Metrics Strip */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-left">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              256-bit
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "AES बैंक-ग्रेड एन्क्रिप्शन" : "AES Bank-Grade Encryption"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              0%
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "शून्य थर्ड-पार्टी डेटा बिक्री" : "Zero Data Monetization"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              &lt; 48 hrs
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "अकाउंट डिलीशन निष्पादन" : "Permanent Deletion SLA"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              100%
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "TLS 1.3 सुरक्षित डेटा संचार" : "TLS 1.3 Secure In-Transit"}
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-28">
        {/* ========================================================= */}
        {/* 02 THE 1-2-3 DATA GOVERNANCE PROTOCOL                     */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="uppercase tracking-wider">
                {isHi ? "डेटा गवर्नेंस" : "Governance Protocol"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              {isHi ? "डेटा सुरक्षा के 3 पारदर्शी चरण" : "How we protect your journey in 3 steps."}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
              {isHi
                ? "आवश्यकता पड़ने पर ही डेटा का संग्रह और काम पूरा होते ही पूर्ण अलगाव।"
                : "Just-in-time collection, encrypted routing, and complete customer deletion autonomy."}
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
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {isHi ? "सटीक डिस्पैच हेतु न्यूनतम डेटा" : "Just-in-Time Collection"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "जीपीएस निर्देशांक केवल तब उपयोग होते हैं जब आप सक्रिय बुकिंग करते हैं, ताकि 30 मिनट में नजदीकी वैन पहुंच सके।"
                    : "Coordinates and vehicle specs are accessed only when you confirm a live booking to route the closest technician."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>{isHi ? "केवल सक्रिय समय" : "Active only"}</span>
                <span className="text-slate-500">EPHEMERAL</span>
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
                    <Key className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {isHi ? "4-अंकीय OTP सत्यापन गेट" : "OTP-Gated Verification"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "तकनीशियन आपके वाहन या घर के कार्य को आपके द्वारा साझा किए गए सुरक्षित 4-अंकीय OTP के बिना शुरू नहीं कर सकता।"
                    : "Field mechanics cannot initiate diagnostics or access job data without your explicit 4-digit verification handshake."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>{isHi ? "सुरक्षित 2FA" : "Two-Factor Gate"}</span>
                <span className="text-slate-500">PROTECTED</span>
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
                  {isHi ? "वारंटी सुरक्षा व पूर्ण स्वायत्तता" : "Warranty Records & Deletion"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "जॉब कार्ड्स 30 दिन की लिखित वारंटी के लिए सुरक्षित रखे जाते हैं। आप किसी भी समय स्थायी डिलीशन का अनुरोध कर सकते हैं।"
                    : "Invoices and diagnostic logs are retained securely for your 30-day warranty, with instant permanent deletion rights."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>{isHi ? "48 घंटे में डिलीट" : "&lt; 48h Deletion SLA"}</span>
                <span className="text-slate-500">AUTONOMY</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03 CORE PRIVACY COMMITMENTS (Sleek Floating Cards)        */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="uppercase tracking-wider">
                {isHi ? "नीति विवरण" : "Policy Details"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              {isHi ? "गोपनीयता के चार मुख्य स्तंभ" : "The four core privacy commitments."}
            </h2>
          </div>

          <div className="space-y-6">
            {coreCommitments.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300 shadow-sm space-y-5"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 GRIEVANCE OFFICER & CONTACT BANNER                     */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 text-xs font-medium">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>{isHi ? "ग्रीवेंस एवं अनुपालन अधिकारी" : "Data Protection & Grievance Desk"}</span>
              </span>

              <h3 className="text-2xl font-semibold text-white tracking-tight">
                {isHi ? "गोपनीयता या डेटा संबंधित कोई प्रश्न?" : "Have questions regarding data protection?"}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "डेटा एक्सेस अनुरोध, अकाउंट डिलीशन या सुरक्षा संबंधित किसी भी प्रश्न के लिए हमारे नोडल अधिकारी से संपर्क करें: support@jantagaraj.in"
                  : "For formal data access audits, account deletion requests, or compliance inquiries, reach our dedicated officer directly at support@jantagaraj.in"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/help"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{isHi ? "सहायता केंद्र" : "Help Center"}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <a
                href="mailto:support@jantagaraj.in"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.1] font-medium text-xs sm:text-sm transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>support@jantagaraj.in</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
