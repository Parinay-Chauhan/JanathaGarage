import React from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Car,
  Zap,
  Droplets,
  Wind,
  Wrench,
  HelpCircle,
  FileText,
  Lock,
  Phone,
  Sliders,
  Check,
  Activity,
  Layers,
  Settings,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/Button";

export const PricingGuidePage: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  const automotivePricing = [
    {
      title: isHi ? "इमरजेंसी कार/बाइक बैटरी जंपस्टार्ट" : "Emergency Battery Jumpstart & Diode Test",
      desc: isHi
        ? "ऑन-लोकेशन हेवी-ड्यूटी बूस्टर किट, अल्टरनेटर वोल्टेज आउटपुट टेस्ट व टर्मिनल डी-कोरोज़न।"
        : "Commercial-grade booster cables, alternator voltage load test, and battery terminal cleaning.",
      category: "ROADSIDE RIG",
      price: "₹349",
      time: "20-30 mins",
      icon: Zap,
    },
    {
      title: isHi ? "डोरस्टेप टायर पंचर व ट्यूबलेस पैच" : "Tubeless Tyre Puncture & Valve Seal",
      desc: isHi
        ? "डोरस्टेप पोर्टेबल इन्फ्लेटर, हाई-ग्रेड मशरूम प्लग, लीकेज जांच व प्रेशर कैलिब्रेशन।"
        : "Vulcanized mushroom patch repair, portable compressor inflator, and digital PSI calibration.",
      category: "EMERGENCY",
      price: "₹199",
      time: "25-35 mins",
      icon: Car,
    },
    {
      title: isHi ? "जनरल बाइक/स्कूटर सर्विस व ट्यूनिंग" : "Periodic Two-Wheeler Precision Service",
      desc: isHi
        ? "इंजन ऑयल रिप्लेसमेंट, स्पार्क प्लग गैप ट्यूनिंग, ड्राइव चेन ल्यूब व ब्रेक ओवरहॉल।"
        : "Engine oil drain & replace, spark plug cleaning, drive chain lubrication & brake caliper tuning.",
      category: "PERIODIC",
      price: "₹499",
      time: "45-60 mins",
      icon: Wrench,
    },
    {
      title: isHi ? "कार 30-पॉइंट OBD-II डायग्नोस्टिक" : "Car 30-Point OBD-II Diagnostic Scan",
      desc: isHi
        ? "इंजन फॉल्ट कोड स्कैन, कूलेंट, ब्रेक पैड मोटाई, सस्पेंशन बुश व लाइव फ्लूइड जांच।"
        : "Comprehensive ECU diagnostic scanner analysis, brake pad wear measurement & fluid inspection.",
      category: "DIAGNOSTICS",
      price: "₹399",
      time: "45 mins",
      icon: Activity,
    },
    {
      title: isHi ? "ब्रेक शू व डिस्क पैड सर्विस लेबर" : "Brake Pad & Disc Caliper Service Labor",
      desc: isHi
        ? "दोनों फ्रंट/रियर ब्रेक पैड स्वैप, रोटर डी-ग्लैज़िंग, कैलीपर पिन ग्रीसिंग व फ्लूइड ब्लीड।"
        : "Front/rear brake pad swap, disc rotor cleaning, caliper pin lubrication & fluid top-up.",
      category: "BRAKES",
      price: "₹299",
      time: "40 mins",
      icon: ShieldCheck,
    },
    {
      title: isHi ? "पेंटलेस डेंट रिमूवल व स्क्रैच बफिंग" : "Paintless Dent Removal (PDR) & Buffing",
      desc: isHi
        ? "इंडक्शन डेंट पुलिंग, पैनल अलाइनमेंट, कंपाउंड बफिंग व 2K क्लियर कोट टच-अप।"
        : "Induction PDR dent pulling, panel alignment, high-speed buffing & minor scratch blending.",
      category: "BODYWORK",
      price: "₹699",
      time: "60 mins",
      icon: Sparkles,
    },
  ];

  const homePricing = [
    {
      title: isHi ? "स्प्लिट एसी डीप फोम जेट सर्विस" : "Split AC Deep Foam Jet Service",
      desc: isHi
        ? "हाई-प्रेशर वाटरप्रूफ फनल जेट वॉश, एंटी-बैक्टीरियल फोम, कॉइल व गैस प्रेशर टेस्ट।"
        : "High-pressure waterproof jacket jet wash, antibacterial coil foam & eco-gas pressure check.",
      category: "HVAC",
      price: "₹549",
      time: "45 mins",
      icon: Wind,
    },
    {
      title: isHi ? "शॉर्ट सर्किट व एमसीबी ट्रिप रिपेयर" : "MCB Tripping & Short Circuit Triage",
      desc: isHi
        ? "डिजिटल मल्टीमीटर से न्यूट्रल लीकेज ढूंढना, जंक्शन बॉक्स व वायरिंग लोड बैलेंसिंग।"
        : "Digital multimeter fault trace, neutral isolation, burnt junction fix & circuit load balancing.",
      category: "ELECTRICAL",
      price: "₹249",
      time: "35 mins",
      icon: Layers,
    },
    {
      title: isHi ? "कंसील्ड पाइप व नल लीकेज रिपेयर" : "Concealed Pipe Acoustic Leak Fix",
      desc: isHi
        ? "दीवार के अंदर लीकेज डिटेक्शन, हेवी-ड्यूटी स्पिंडल रिप्लेसमेंट व सेनेटरी फिटिंग्स।"
        : "Non-destructive acoustic leak detection, spindle swap, Teflon sealing & high-pressure fitting.",
      category: "PLUMBING",
      price: "₹199",
      time: "40 mins",
      icon: Droplets,
    },
    {
      title: isHi ? "वाशिंग मशीन / फ्रिज डायग्नोसिस" : "Inverter Appliance Component Diagnosis",
      desc: isHi
        ? "इन्वर्टर मोटर, ड्रेन पंप, थर्मोस्टेट या पीसीबी फॉल्ट का ऑन-साइट समाधान लेबर।"
        : "Component-level motor, drain pump, thermostat, compressor, or PCB board diagnosis labor.",
      category: "APPLIANCE",
      price: "₹399",
      time: "50 mins",
      icon: Settings,
    },
    {
      title: isHi ? "आरओ वॉटर प्यूरीफायर केयर व टीडीएस" : "RO Membrane & Digital TDS Calibration",
      desc: isHi
        ? "सेडिमेंट व कार्बन फिल्टर स्वैप, बूस्टर पंप बार प्रेशर जांच व डिजिटल टीडीएस सेटिंग।"
        : "Sediment & carbon filter flush, booster pump pressure verification & digital TDS meter set.",
      category: "PURIFIER",
      price: "₹299",
      time: "35 mins",
      icon: ShieldCheck,
    },
    {
      title: isHi ? "डोर लॉक व हाइड्रोलिक कब्जा फिक्स" : "Door Lock & Hydraulic Hinge Calibration",
      desc: isHi
        ? "मुख्य दरवाजे का लॉक, हाइड्रोलिक सॉफ्ट-क्लोज कब्जे व मॉड्यूलर कैबिनेट अलाइनमेंट।"
        : "Main mortise lock swap, hydraulic soft-close hinge fitting & modular cabinet leveling.",
      category: "CARPENTRY",
      price: "₹199",
      time: "30 mins",
      icon: Wrench,
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
      {/* 01 MODERN HERO: OPEN & WELCOMING PRICING                  */}
      {/* ========================================================= */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-16 sm:pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Quiet Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 text-xs font-medium backdrop-blur-md shadow-sm mb-6 sm:mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span>
            {isHi ? "तय रेट कार्ड · शून्य गुप्त शुल्क" : "Upfront Standardized Rates · Zero Hidden Fees"}
          </span>
        </div>

        {/* Clean, Human Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.14] max-w-3xl mx-auto">
          {isHi ? (
            <>
              तय दरें। कोई मोलभाव नहीं।{" "}
              <span className="text-slate-400 font-normal">हमेशा पारदर्शी।</span>
            </>
          ) : (
            <>
              Predictable pricing.{" "}
              <span className="text-slate-400 font-normal">No roadside guesswork.</span>
            </>
          )}
        </h1>

        {/* Fluid Description */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
          {isHi
            ? "गाड़ी या घर की मरम्मत शुरू होने से पहले आपको कुल अनुमानित लागत बताई जाती है। प्रमाणित ओईएम पार्ट्स, तय लेबर दरें और 100% विज़िटिंग शुल्क समायोजन गारंटी।"
            : "Know exactly what you pay before a wrench turns. Every service includes standardized labor tariffs, genuine OEM parts at MRP, and a 100% inspection fee waiver when you proceed with service."}
        </p>

        {/* Action Group */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{isHi ? "सर्विस बुक करें" : "Book a Service"}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
          <a
            href="tel:+918439616833"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.1] hover:border-white/[0.2] font-medium text-sm transition-all"
          >
            <Phone className="w-4 h-4 text-slate-400" />
            <span>+91 84396 16833</span>
          </a>
        </div>

        {/* Resolution Metrics Strip: Natural & Elegant Typography */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-left">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              ₹0 Cost
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "रिपेयर करवाने पर विज़िटिंग फ्री" : "Inspection Fee on Repair"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              100% Fixed
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "पूर्व-प्रकाशित तय रेट कार्ड" : "Pre-Published Rate Cards"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              30 Days
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "निःशुल्क वर्कमैनशिप वारंटी" : "Workmanship Guarantee"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Post-Pay
            </p>
            <p className="text-xs text-slate-400">
              {isHi ? "काम से संतुष्ट होने पर भुगतान" : "Settlement After Approval"}
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-28">
        {/* ========================================================= */}
        {/* 02 INSPECTION FEE WAIVER SPOTLIGHT                        */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? "मूल्य गारंटी" : "The JantaGaraj Pricing Offset"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              {isHi
                ? "डोरस्टेप डायग्नोस्टिक शुल्क 100% समायोजित नीति"
                : "100% Diagnostic & Visiting Fee Waiver"}
            </h2>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
              {isHi
                ? "हमारा मानक विज़िटिंग व डायग्नोस्टिक शुल्क ₹149 से ₹249 है, जिसमें मोबाइल वैन का आगमन और डिजिटल मल्टीमीटर / OBD स्कैनर परीक्षण शामिल है। यदि आप तकनीशियन के एस्टीमेट को स्वीकार कर कार्य करवाते हैं, तो यह विज़िटिंग शुल्क आपके अंतिम बिल में से 100% घटा दिया जाता है — यानी प्रभावी रूप से विज़िटिंग ₹0 बिल्कुल मुफ्त हो जाती है!"
                : "Our standard doorstep arrival and OBD-II / electrical diagnostic inspection fee is ₹149 – ₹249. If you approve the itemized repair estimate and proceed with service, this inspection fee is 100% credited against your final labor bill — making your diagnostic visit effectively ₹0 Free."}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{isHi ? "कोई सड़क किनारे मोलभाव नहीं" : "Zero Roadside Bargaining"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{isHi ? "4-अंकीय OTP एस्टीमेट गेट" : "OTP Estimate Gate"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{isHi ? "डिजिटल GST इनवॉइस" : "Digital GST Invoicing"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03 THE 1-2-3 PRICING PROTOCOL                             */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="uppercase tracking-wider">
                {isHi ? "पारदर्शिता नियम" : "Pricing Protocol"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              {isHi ? "मूल्य निर्धारण के 3 सरल चरण" : "How our pricing works in 3 steps."}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
              {isHi
                ? "शुरुआत से अंत तक हर चार्ज पूर्व-निर्धारित और आपकी सहमति से तय होता है।"
                : "Complete financial predictability from your initial booking to final sign-off."}
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
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {isHi ? "तय रेट कार्ड चुनें" : "Locked Rate Card"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "बुकिंग करते ही आपको श्रम और डायग्नोसिस का तय रेट कार्ड दिखता है। कोई छिपा हुआ अतिरिक्त चार्ज नहीं।"
                    : "Select your vehicle and issue. The standardized labor tariff is locked before a technician is ever dispatched."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>{isHi ? "100% तय दरें" : "Published Rates"}</span>
                <span className="text-slate-500">LOCKED</span>
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
                    <Lock className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {isHi ? "OTP एस्टीमेट अनुमोदन" : "OTP Estimate Gate"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "यदि डायग्नोसिस में अतिरिक्त पार्ट आवश्यक होता है, तो आपके 4-अंकीय OTP अनुमोदन के बिना काम नहीं बढ़ सकता।"
                    : "If additional parts or labor are uncovered during diagnosis, work cannot proceed without your explicit OTP verification."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>{isHi ? "शून्य अनधिकृत बिलिंग" : "Zero Ghost Fees"}</span>
                <span className="text-slate-500">SECURE</span>
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
                  {isHi ? "संतुष्टि पर भुगतान व वारंटी" : "Approval Pay & 30D Warranty"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {isHi
                    ? "रिपेयर के बाद टेस्ट-ड्राइव लें। पूर्ण संतुष्टि होने पर ही डिजिटल पेमेंट करें और 30 दिन की लिखित वारंटी पाएं।"
                    : "Test-run the vehicle or appliance in the pro's presence. Settle digitally only after approval, with a 30-day warranty slip."}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>{isHi ? "30 दिन की वारंटी" : "30-Day Guarantee"}</span>
                <span className="text-slate-500">PROTECTED</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 AUTOMOTIVE & ROAD SERVICE RATES (Floating Cards)       */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="uppercase tracking-wider">
                  {isHi ? "ऑटोमोबाइल सेवाएं" : "Automotive Care"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                {isHi ? "वाहन एवं ब्रेकडाउन तय दरें" : "Automotive & roadside breakdown tariff."}
              </h2>
            </div>
            <Link
              to="/services?category=mechanic"
              className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors group shrink-0"
            >
              <span>{isHi ? "सभी वाहन सेवाएं देखें" : "View All Auto Services"}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automotivePricing.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.time}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-base font-semibold text-white font-mono">
                        {item.price}
                      </span>
                      <Link
                        to={`/services?search=${encodeURIComponent(item.title.split(" ")[0])}`}
                        className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>{isHi ? "बुक करें" : "Book"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 05 HVAC, ELECTRICAL & HOME TRADE RATES                    */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="uppercase tracking-wider">
                  {isHi ? "घरेलू व ट्रेड सेवाएं" : "Home Engineering"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                {isHi ? "एसी, इलेक्ट्रिकल व प्लंबिंग दरें" : "HVAC, electrical & plumbing tariff."}
              </h2>
            </div>
            <Link
              to="/services"
              className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors group shrink-0"
            >
              <span>{isHi ? "सभी 100+ सेवाएं देखें" : "View All Categories"}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homePricing.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.time}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-base font-semibold text-white font-mono">
                        {item.price}
                      </span>
                      <Link
                        to={`/services?search=${encodeURIComponent(item.title.split(" ")[0])}`}
                        className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>{isHi ? "बुक करें" : "Book"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 06 THE 4 PRICING PILLARS                                  */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.07] space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="uppercase tracking-wider">
                {isHi ? "मूल्य सुरक्षा" : "Consumer Protection"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              {isHi ? "चार स्तंभ जो आपके पैसों की रक्षा करते हैं" : "Four pillars of pricing integrity."}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-500">01</p>
              <h4 className="text-base font-semibold text-white">
                {isHi ? "तय मानक लेबर घंटे" : "Standardized Labor Hours"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "सभी लेबर दरें आधिकारिक सर्विस मैनुअल पर आधारित हैं, जिससे मनमाना अतिरिक्त समय नहीं जोड़ा जा सकता।"
                  : "Labor tariffs are benchmarked against official manufacturer manuals, preventing arbitrary hour inflation."}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-500">02</p>
              <h4 className="text-base font-semibold text-white">
                {isHi ? "एमआरपी पर असली पार्ट्स" : "OEM Spares at MRP"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "पार्ट्स सीधे अधिकृत वितरकों (Bosch, Tata, MGP) से आते हैं। शून्य मार्कअप और सीरियल बारकोड ट्रैकिंग।"
                  : "Replacement components are sourced directly from verified OEM distributors with serialized barcodes and zero markup."}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-500">03</p>
              <h4 className="text-base font-semibold text-white">
                {isHi ? "4-अंकीय OTP अनुमोदन" : "4-Digit OTP Approval Gate"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "जब तक आप मोबाइल पर आया हुआ 4-अंकीय OTP दर्ज नहीं करते, तकनीशियन कोई नया चार्ज नहीं जोड़ सकता।"
                  : "No technician can add extra parts or repair tasks without you entering an explicit digital verification OTP."}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-500">04</p>
              <h4 className="text-base font-semibold text-white">
                {isHi ? "संतुष्टि उपरांत भुगतान" : "Post-Test Settlement"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {isHi
                  ? "भुगतान केवल तभी करें जब गाड़ी या उपकरण का टेस्ट-रन सफल हो। 30 दिन की निःशुल्क वारंटी तुरंत सक्रिय।"
                  : "Payment is completed strictly after a dual-stage test run in your presence, backed by a 30-day warranty."}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 07 FINAL CALL TO ACTION BANNER                            */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 text-xs font-medium">
              <CreditCard className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? "पारदर्शी बुकिंग" : "Ready to Experience Transparent Service?"}</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
              {isHi
                ? "बिना किसी अप्रत्याशित बिल के अपनी सर्विस अभी बुक करें"
                : "Book with complete pricing certainty today."}
            </h2>

            <p className="text-sm text-slate-400 leading-relaxed font-normal max-w-xl mx-auto">
              {isHi
                ? "औसत 28 मिनट में मोबाइल वैन डिस्पैच, 100% ओईएम पार्ट्स और रिपेयर कराने पर विज़िटिंग शुल्क पूर्णतः फ्री।"
                : "Average 28-minute doorstep mobile dispatch, genuine OEM parts, and a 100% inspection fee waiver on repair."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{isHi ? "सर्विस कैटलॉग ब्राउज़ करें" : "Browse Service Catalog"}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <a
                href="tel:+918439616833"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.1] font-medium text-xs sm:text-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+91 84396 16833</span>
              </a>
            </div>

            <p className="text-xs text-slate-500 font-mono pt-2">
              {isHi
                ? "कोई अग्रिम भुगतान आवश्यक नहीं · काम पूरा होने पर ही भुगतान करें"
                : "NO ADVANCE REQUIRED · PAY DIGITALLY ONLY AFTER TEST-RUN SATISFACTION"}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
