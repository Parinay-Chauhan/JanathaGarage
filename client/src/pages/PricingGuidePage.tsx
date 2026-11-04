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
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/Button";

export const PricingGuidePage: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  const automotivePricing = [
    {
      title: isHi ? "इमरजेंसी कार/बाइक बैटरी जंपस्टार्ट" : "Emergency Battery Jumpstart",
      desc: isHi ? "ऑन-लोकेशन पोर्टेबल बूस्टर किट व अल्टरनेटर चार्ज टेस्ट" : "On-location heavy-duty booster jumpstart & alternator voltage check",
      price: "₹349",
      time: "20-30 mins",
    },
    {
      title: isHi ? "डोरस्टेप टायर पंचर व ट्यूबलेस पैच" : "Tubeless Tyre Puncture Repair",
      desc: isHi ? "डोरस्टेप पोर्टेबल इन्फ्लेटर, लीकेज टेस्ट व हाई-ग्रेड प्लग" : "High-grade mushroom plug, portable inflator & pressure calibration",
      price: "₹199",
      time: "25-35 mins",
    },
    {
      title: isHi ? "जनरल बाइक/स्कूटर सर्विस व ट्यूनिंग" : "Periodic Two-Wheeler Service",
      desc: isHi ? "इंजन ऑयल रिप्लेसमेंट, स्पार्क प्लग क्लीनिंग, चेन ल्यूब व ब्रेक ट्यून" : "Engine oil change, spark plug tuning, chain lubrication & brake overhaul",
      price: "₹499",
      time: "45-60 mins",
    },
    {
      title: isHi ? "कार 30-पॉइंट कम्प्लीट इंस्पेक्शन" : "Car 30-Point Diagnostic Inspection",
      desc: isHi ? "इंजन, कूलेंट, ब्रेक पैड, सस्पेंशन व इलेक्ट्रिकल का व्यापक चेकअप" : "Complete bumper-to-bumper engine, brake, fluid & OBD scan inspection",
      price: "₹399",
      time: "45 mins",
    },
    {
      title: isHi ? "ब्रेक शू व डिस्क पैड रिप्लेसमेंट लेबर" : "Brake Pad & Disc Replacement Labor",
      desc: isHi ? "दोनों फ्रंट/रियर व्हील्स का ब्रेक सर्विस व फ्लुइड टॉप-अप" : "Front/rear brake pad swap, disc rotor cleaning & caliper lubrication",
      price: "₹299",
      time: "40 mins",
    },
  ];

  const homePricing = [
    {
      title: isHi ? "स्प्लिट एसी डीप फोम जेट सर्विस" : "Split AC Deep Foam Jet Service",
      desc: isHi ? "हाई-प्रेशर जेट वॉश, फिल्टर व कॉइल क्लीनिंग, गैस लीकेज चेक" : "High-pressure jet wash, deep antibacterial coil foam & cooling test",
      price: "₹549",
      time: "45 mins",
    },
    {
      title: isHi ? "शॉर्ट सर्किट व एमसीबी ट्रिप रिपेयर" : "MCB Trip & Electrical Short Circuit Fix",
      desc: isHi ? "मल्टीमीटर डायग्नोसिस, जंक्शन बॉक्स रिपेयर व वायरिंग चेकिंग" : "Complete load triage, burnt junction box fix & circuit isolation",
      price: "₹249",
      time: "35 mins",
    },
    {
      title: isHi ? "कंसील्ड पाइप व नल लीकेज रिपेयर" : "Concealed Pipe & Tap Leakage Fix",
      desc: isHi ? "दीवार के अंदर लीकेज डिटेक्शन, वॉशर व सेनेटरी फिटिंग्स" : "Acoustic leak isolation, spindle replacement & sanitary fitting repair",
      price: "₹199",
      time: "40 mins",
    },
    {
      title: isHi ? "वाशिंग मशीन / फ्रिज डायग्नोसिस व रिपेयर" : "Washing Machine / Refrigerator Repair",
      desc: isHi ? "मोटर, ड्रम, थर्मोस्टेट या पीसीबी फॉल्ट का ऑन-साइट समाधान" : "Motor, drum, compressor, or PCB board diagnosis & repair labor",
      price: "₹399",
      time: "50 mins",
    },
  ];

  return (
    <div className="bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] min-h-screen pb-24 transition-colors">
      {/* Header Banner */}
      <section className="border-b border-[#E7E5DF] dark:border-[#2B231D] bg-white/60 dark:bg-[#141210]/60 backdrop-blur-sm py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-[#2B231D] text-[#E87532] text-xs font-bold uppercase tracking-wider">
            <CreditCard className="w-4 h-4" />
            <span>{isHi ? "तय रेट कार्ड व पारदर्शी मूल्य" : "Transparent Pricing & Rate Card"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#252621] dark:text-[#F5F2EB] leading-tight">
            {isHi ? "बिना किसी गुप्त शुल्क के स्पष्ट तय दरें" : "Fixed Rates. Zero Hidden Charges. Always."}
          </h1>

          <p className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] max-w-2xl mx-auto leading-relaxed">
            {isHi
              ? "JantaGaraj पर कार्य शुरू होने से पहले आपको कुल अनुमानित लागत बताई जाती है। काम से पूर्ण संतुष्ट होने के बाद ही पेमेंट करें।"
              : "Know exactly what you pay before a wrench turns. Every service includes upfront standard rates with satisfaction-guaranteed payment."}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-12">
        {/* Transparent Promise Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-[#E87532]/25 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-[#E87532] font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>{isHi ? "जनता गैराज मूल्य गारंटी" : "The JantaGaraj Pricing Guarantee"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
            {isHi ? "डोरस्टेप विज़िटिंग चार्ज समायोजन नियम" : "Doorstep Inspection Fee Adjustment Policy"}
          </h2>
          <p className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] leading-relaxed">
            {isHi
              ? "हमारा मानक विज़िटिंग व डायग्नोस्टिक शुल्क ₹149 से ₹249 के बीच है। यदि आप तकनीशियन से रिपेयर कार्य करवाते हैं, तो यह विज़िटिंग शुल्क आपके अंतिम बिल में से घटा दिया जाता है (समायोजित हो जाता है), यानी प्रभावी रूप से विज़िटिंग बिल्कुल मुफ्त हो जाती है!"
              : "Our standard doorstep inspection charge is ₹149 - ₹249. If you approve the diagnostic estimate and proceed with the repair work, this visiting fee is 100% waived and credited towards your final labor bill!"}
          </p>
        </div>

        {/* Section 1: Automotive Rate Card */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                {isHi ? "ऑटोमोबाइल व रोडसाइड ब्रेकडाउन रेट कार्ड" : "Automotive & Roadside Breakdown Rates"}
              </h3>
              <p className="text-xs text-[#717167] dark:text-[#9E9488]">
                {isHi ? "कार व दोपहिया वाहनों हेतु प्रमाणित डोरस्टेप रिपेयर दरें" : "Standard labor rates for on-site two-wheeler and four-wheeler service"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {automotivePricing.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-sm text-[#252621] dark:text-[#F5F2EB]">{item.title}</h4>
                    <span className="font-mono font-bold text-lg text-[#E87532] shrink-0">{item.price}</span>
                  </div>
                  <p className="text-xs text-[#717167] dark:text-[#9E9488] mt-1 leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#8F8F85] border-t border-[#E7E5DF]/70 dark:border-[#2B231D] pt-2.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E87532]" />
                    {item.time}
                  </span>
                  <Link to={`/services?search=${encodeURIComponent(item.title.split(" ")[0])}`} className="text-[#E87532] hover:underline">
                    {isHi ? "बुक करें →" : "Book Now →"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Home Care & Appliance Rate Card */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                {isHi ? "एसी, इलेक्ट्रिकल व गृह सेवा रेट कार्ड" : "AC, Electrical & Appliance Rates"}
              </h3>
              <p className="text-xs text-[#717167] dark:text-[#9E9488]">
                {isHi ? "घर के उपकरणों व प्लंबिंग के लिए तय पारदर्शी लेबर दरें" : "Fixed upfront labor rates for home appliances, electricals, and plumbing"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {homePricing.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-sm text-[#252621] dark:text-[#F5F2EB]">{item.title}</h4>
                    <span className="font-mono font-bold text-lg text-[#E87532] shrink-0">{item.price}</span>
                  </div>
                  <p className="text-xs text-[#717167] dark:text-[#9E9488] mt-1 leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#8F8F85] border-t border-[#E7E5DF]/70 dark:border-[#2B231D] pt-2.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E87532]" />
                    {item.time}
                  </span>
                  <Link to={`/services?search=${encodeURIComponent(item.title.split(" ")[0])}`} className="text-[#E87532] hover:underline">
                    {isHi ? "बुक करें →" : "Book Now →"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTA */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "अपने वाहन या घर के लिए अभी सर्विस बुक करें" : "Ready to Book a Verified Technician?"}
            </h3>
            <p className="text-xs sm:text-sm text-[#717167] dark:text-[#9E9488]">
              {isHi ? "30 मिनट में नजदीकी मैकेनिक पहुंचेगा • 100% तय रेट कार्ड" : "Average 30-min doorstep arrival • Pay securely post-service"}
            </p>
          </div>
          <Link to="/services">
            <Button variant="primary" size="lg" className="font-bold shadow-orange-glow px-7">
              {isHi ? "सभी सेवाएं देखें" : "Explore All Services"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
