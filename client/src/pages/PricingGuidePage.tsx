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
  AlertTriangle,
  Lock,
  Phone,
  Radio,
  Sliders,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/Button";

export const PricingGuidePage: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  const automotivePricing = [
    {
      title: isHi ? "इमरजेंसी कार/बाइक बैटरी जंपस्टार्ट" : "Emergency Battery Jumpstart & Diode Check",
      desc: isHi ? "ऑन-लोकेशन हेवी-ड्यूटी बूस्टर किट, अल्टरनेटर वोल्टेज आउटपुट टेस्ट व टर्मिनल क्लीनिंग" : "On-location heavy-duty booster rig, alternator voltage check & terminal de-corrosion",
      badge: "BOOSTER RIG",
      price: "₹349",
      time: "20-30 mins",
    },
    {
      title: isHi ? "डोरस्टेप टायर पंचर व ट्यूबलेस पैच" : "Tubeless Tyre Puncture & Valve Seal",
      desc: isHi ? "डोरस्टेप पोर्टेबल इन्फ्लेटर, हाई-ग्रेड मशरूम प्लग, लीकेज जांच व प्रेशर कैलिब्रेशन" : "High-grade vulcanized mushroom plug, portable inflator & digital pressure calibration",
      badge: "NON-INVASIVE",
      price: "₹199",
      time: "25-35 mins",
    },
    {
      title: isHi ? "जनरल बाइक/स्कूटर सर्विस व ट्यूनिंग" : "Periodic Two-Wheeler Precision Service",
      desc: isHi ? "इंजन ऑयल रिप्लेसमेंट, स्पार्क प्लग गैप ट्यूनिंग, ड्राइव चेन ल्यूब व ब्रेक ओवरहॉल" : "Engine oil drain & replace, spark plug cleaning, drive chain lube & brake caliper tuning",
      badge: "OEM LUBE SPEC",
      price: "₹499",
      time: "45-60 mins",
    },
    {
      title: isHi ? "कार 30-पॉइंट कम्प्लीट इंस्पेक्शन" : "Car 30-Point OBD-II Diagnostic Inspection",
      desc: isHi ? "इंजन फॉल्ट कोड स्कैन, कूलेंट, ब्रेक पैड मोटाई, सस्पेंशन बुश व लाइव फ्लूइड जांच" : "Bumper-to-bumper OBD-II sensor diagnostics, brake pad wear, suspension & fluid integrity",
      badge: "DIAGNOSTIC SCAN",
      price: "₹399",
      time: "45 mins",
    },
    {
      title: isHi ? "ब्रेक शू व डिस्क पैड रिप्लेसमेंट लेबर" : "Brake Pad & Disc Caliper Service Labor",
      desc: isHi ? "दोनों फ्रंट/रियर ब्रेक पैड स्वैप, रोटर डी-ग्लैज़िंग, कैलीपर पिन ग्रीसिंग व फ्लूइड ब्लीड" : "Front/rear brake pad swap, disc rotor cleaning, caliper pin lubrication & fluid top-up",
      badge: "SAFETY CRITICAL",
      price: "₹299",
      time: "40 mins",
    },
    {
      title: isHi ? "पेंटलेस डेंट रिमूवल व स्क्रैच बफिंग" : "Paintless Dent Removal (PDR) & Buffing",
      desc: isHi ? "इंडक्शन डेंट पुलिंग, पैनल अलाइनमेंट, कंपाउंड बफिंग व 2K क्लियर कोट टच-अप" : "Induction PDR dent pulling, panel alignment, high-speed buffing & minor scratch blending",
      badge: "OEM TOLERANCE",
      price: "₹699",
      time: "60 mins",
    },
  ];

  const homePricing = [
    {
      title: isHi ? "स्प्लिट एसी डीप फोम जेट सर्विस" : "Split AC Deep Foam Jet Service",
      desc: isHi ? "हाई-प्रेशर वाटरप्रूफ फनल जेट वॉश, एंटी-बैक्टीरियल फोम, कॉइल व गैस प्रेशर टेस्ट" : "High-pressure waterproof jacket jet wash, antibacterial coil foam & R32/R410A leak triage",
      badge: "PRESSURE JET",
      price: "₹549",
      time: "45 mins",
    },
    {
      title: isHi ? "शॉर्ट सर्किट व एमसीबी ट्रिप रिपेयर" : "MCB Tripping & Short Circuit Triage",
      desc: isHi ? "डिजिटल मल्टीमीटर से न्यूट्रल लीकेज ढूंढना, जंक्शन बॉक्स व वायरिंग लोड बैलेंसिंग" : "Multimeter load triage, neutral fault trace, burnt junction box fix & circuit isolation",
      badge: "CIRCUIT SAFE",
      price: "₹249",
      time: "35 mins",
    },
    {
      title: isHi ? "कंसील्ड पाइप व नल लीकेज रिपेयर" : "Concealed Pipe & Acoustic Leak Fix",
      desc: isHi ? "दीवार के अंदर लीकेज डिटेक्शन, हेवी-ड्यूटी स्पिंडल रिप्लेसमेंट व सेनेटरी फिटिंग्स" : "Acoustic leak sensor isolation, spindle swap, Teflon sealing & high-pressure fitting repair",
      badge: "NON-INVASIVE",
      price: "₹199",
      time: "40 mins",
    },
    {
      title: isHi ? "वाशिंग मशीन / फ्रिज डायग्नोसिस व रिपेयर" : "Inverter Washer / Refrigerator Diagnostic",
      desc: isHi ? "इन्वर्टर मोटर, ड्रेन पंप, थर्मोस्टेट या पीसीबी फॉल्ट का ऑन-साइट समाधान लेबर" : "Component-level motor, drain pump, thermostat, compressor, or PCB board diagnosis labor",
      badge: "COMPONENT PCB",
      price: "₹399",
      time: "50 mins",
    },
    {
      title: isHi ? "आरओ वॉटर प्यूरीफायर केयर व टीडीएस ट्यून" : "RO Membrane Replacement & TDS Calibration",
      desc: isHi ? "सेडिमेंट व कार्बन फिल्टर स्वैप, बूस्टर पंप बार प्रेशर जांच व डिजिटल टीडीएस सेटिंग" : "Sediment & carbon filter flush, booster pump pressure verification & digital TDS meter set",
      badge: "TDS CERTIFIED",
      price: "₹299",
      time: "35 mins",
    },
    {
      title: isHi ? "डोर लॉक व हाइड्रोलिक कब्जा फिक्स" : "Door Lock & Hydraulic Hinge Calibration",
      desc: isHi ? "मुख्य दरवाजे का लॉक, हाइड्रोलिक सॉफ्ट-क्लोज कब्जे व मॉड्यूलर कैबिनेट अलाइनमेंट" : "Main mortise lock swap, hydraulic soft-close hinge fitting & modular cabinet leveling",
      badge: "PRECISION JIG",
      price: "₹199",
      time: "30 mins",
    },
  ];

  return (
    <div className="bg-[#0b0f17] text-white min-h-screen selection:bg-amber-500 selection:text-slate-950 pb-20 relative">
      {/* Precision Blueprint Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none -z-0" />

      {/* ========================================================= */}
      {/* 01 TOP OPERATIONAL DISPATCH TELEMETRY BAR                 */}
      {/* ========================================================= */}
      <div className="relative z-20 border-b border-slate-800 bg-[#111827] px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 font-mono font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>RATE CARD PROTOCOL: AUDITED</span>
            </span>
            <span className="text-slate-400 hidden sm:inline font-mono">
              STANDARDIZED INDUSTRIAL LABOR &amp; OEM SPARES TARIFF
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto text-slate-400 font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>ESCROW BILLING: ACTIVE</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ZERO SURCHARGE GUARANTEE</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 02 HERO HEADER                                            */}
      {/* ========================================================= */}
      <section className="relative z-10 pt-12 sm:pt-16 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1f2937] border border-slate-800 text-cyan-400 text-xs font-mono font-medium">
            <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wide">
              {isHi ? "तय रेट कार्ड व पारदर्शी मूल्य नीति" : "TRANSPARENT PRICING & RATE CARD"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight">
            {isHi ? "बिना किसी गुप्त शुल्क के स्पष्ट तय दरें" : "Fixed Rates. Zero Hidden Surcharges. Always."}
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {isHi
              ? "सड़क किनारे मोलभाव समाप्त। JantaGaraj पर कार्य शुरू होने से पहले आपको कुल अनुमानित लागत बताई जाती है। काम से पूर्ण संतुष्ट होने के बाद ही पेमेंट करें।"
              : "Know exactly what you pay before a wrench turns. Every service includes upfront standardized labor rates, genuine OEM parts at MRP, and post-service payment."}
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-14">
        {/* ========================================================= */}
        {/* 03 INSPECTION FEE WAIVER POLICY (100% Offset)             */}
        {/* ========================================================= */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#1f2937] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                {isHi ? "जनता गैराज मूल्य गारंटी" : "THE JANTAGARAJ PRICING OFFSET GUARANTEE"}
              </span>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded self-start sm:self-auto">
              100% VISITING FEE WAIVER
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight">
            {isHi ? "डोरस्टेप विज़िटिंग चार्ज समायोजन नियम" : "Doorstep Diagnostic & Inspection Fee Adjustment Policy"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {isHi
              ? "हमारा मानक विज़िटिंग व डायग्नोस्टिक शुल्क ₹149 से ₹249 के बीच है, जिसमें आपके पते पर मोबाइल वैन का आगमन और डिजिटल मल्टीमीटर/OBD स्कैन जांच शामिल है। यदि आप तकनीशियन के डायग्नोस्टिक एस्टीमेट को स्वीकार कर रिपेयर कार्य करवाते हैं, तो यह विज़िटिंग शुल्क आपके अंतिम बिल में से 100% घटा दिया जाता है (क्रेडिट हो जाता है), यानी प्रभावी रूप से विज़िटिंग बिल्कुल मुफ्त हो जाती है!"
              : "Our standard doorstep arrival and OBD-II / electrical diagnostic inspection fee is ₹149 - ₹249. If you approve the itemized repair estimate and proceed with service, this inspection fee is 100% credited against your final labor bill — making your diagnostic visit effectively ₹0 Free!"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-[#111827] border border-slate-800 flex items-center gap-2.5 text-xs font-mono text-slate-300">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Zero Roadside Bargaining</span>
            </div>
            <div className="p-3 rounded-lg bg-[#111827] border border-slate-800 flex items-center gap-2.5 text-xs font-mono text-slate-300">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>OTP Estimate Gate</span>
            </div>
            <div className="p-3 rounded-lg bg-[#111827] border border-slate-800 flex items-center gap-2.5 text-xs font-mono text-slate-300">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Digital GST Invoicing</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 04 SECTION 1: AUTOMOTIVE & BREAKDOWN RATES                */}
        {/* ========================================================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                {isHi ? "ऑटोमोबाइल व रोडसाइड ब्रेकडाउन रेट कार्ड" : "Automotive & Roadside Breakdown Rates"}
              </h3>
              <p className="text-xs text-slate-400">
                {isHi ? "कार व दोपहिया वाहनों हेतु प्रमाणित डोरस्टेप रिपेयर दरें" : "Standardized flat-rate labor tariff for on-site vehicle care & recovery"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {automotivePricing.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#1f2937] border border-slate-800 hover:border-amber-500/50 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded uppercase">
                      {item.badge}
                    </span>
                    <span className="text-base font-mono font-bold text-amber-400">
                      {item.price}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.time}</span>
                  </span>
                  <Link
                    to={`/services?search=${encodeURIComponent(item.title.split(" ")[0])}`}
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <span>{isHi ? "बुक करें" : "Book"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 05 SECTION 2: HVAC, ELECTRICAL & HOME TRADE RATES         */}
        {/* ========================================================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                {isHi ? "एसी, इलेक्ट्रिकल व प्लंबिंग सेवा रेट कार्ड" : "HVAC, Electrical & Home Trade Rates"}
              </h3>
              <p className="text-xs text-slate-400">
                {isHi ? "घर के उपकरणों व प्लंबिंग के लिए तय पारदर्शी लेबर दरें" : "Fixed upfront labor rates for air conditioning, distribution boards & water lines"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {homePricing.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#1f2937] border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded uppercase">
                      {item.badge}
                    </span>
                    <span className="text-base font-mono font-bold text-amber-400">
                      {item.price}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.time}</span>
                  </span>
                  <Link
                    to={`/services?search=${encodeURIComponent(item.title.split(" ")[0])}`}
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <span>{isHi ? "बुक करें" : "Book"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 06 THE 4 INDUSTRIAL PRICING PILLARS                       */}
        {/* ========================================================= */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111827] border border-slate-800 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
              PRICING INTEGRITY
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
              How JantaGaraj Protects Your Wallet
            </h3>
            <p className="text-xs text-slate-400">
              Audited protocols ensuring every rupee charged is accounted for
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#1f2937] border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                <Sliders className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Time-Budgeted Labor</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Labor hours are standardized using OEM service manuals, preventing overcharging for simple repairs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1f2937] border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Genuine Spares at MRP</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Parts sourced strictly from authorized distributors (Bosch, Tata, MGP) with official serial numbers and zero margin markups.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1f2937] border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">OTP Estimate Gate</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No technician can add extra parts or unexpected fees without you entering a 4-digit approval code.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1f2937] border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Post-Inspection Pay</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Settlement is completed only after a dual-stage test-run in your presence. 30-day warranty locked.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 07 ACTION CTA BANNER                                      */}
        {/* ========================================================= */}
        <div className="p-7 sm:p-10 rounded-2xl bg-[#111827] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-white">
              {isHi ? "अपने वाहन या घर के लिए अभी सर्विस बुक करें" : "Ready to Dispatch a Verified Technician?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {isHi ? "30 मिनट में नजदीकी मैकेनिक पहुंचेगा • 100% तय रेट कार्ड" : "Average 30-minute doorstep arrival • 100% upfront flat-rate pricing"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/services">
              <Button
                variant="primary"
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-6 py-2.5 rounded-lg text-xs font-mono uppercase"
              >
                {isHi ? "सभी सेवाएं देखें" : "Explore All Services"}
              </Button>
            </Link>
            <a href="tel:+918439616833">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Phone className="w-3.5 h-3.5 text-amber-400" />}
                className="bg-[#1f2937] hover:bg-slate-800 text-white border border-slate-700 px-5 py-2.5 rounded-lg text-xs font-mono"
              >
                +91 84396 16833
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
