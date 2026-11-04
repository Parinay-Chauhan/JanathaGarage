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
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/Button";

export const PrivacyPolicyPage: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  return (
    <div className="bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] min-h-screen pb-24 transition-colors">
      {/* Header Banner */}
      <section className="border-b border-[#E7E5DF] dark:border-[#2B231D] bg-white/60 dark:bg-[#141210]/60 backdrop-blur-sm py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-[#2B231D] text-[#E87532] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{isHi ? "डेटा सुरक्षा व गोपनीयता नीति" : "Privacy & Data Protection Policy"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#252621] dark:text-[#F5F2EB] leading-tight">
            {isHi ? "आपकी गोपनीयता, हमारा सर्वोच्च संकल्प" : "Your Privacy is Our Core Foundation"}
          </h1>

          <p className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] max-w-2xl mx-auto leading-relaxed">
            {isHi
              ? "JantaGaraj (जनता गैराज) पर आपकी व्यक्तिगत जानकारी, जीपीएस लोकेशन व पेमेंट विवरण 256-बिट एन्क्रिप्शन के साथ सुरक्षित रखे जाते हैं।"
              : "At JantaGaraj, your personal data, live location, and booking telemetry are protected with bank-grade encryption. We never sell your data."}
          </p>

          <p className="text-xs text-[#8F8F85] pt-2">
            {isHi ? "अंतिम संशोधन: 1 नवंबर 2026 • प्रभावी संस्करण: v2.4" : "Last Updated: November 1, 2026 • Effective Version: v2.4"}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-12">
        {/* Section 1: Information We Collect */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "1. हम कौन सी जानकारी एकत्र करते हैं?" : "1. Information We Collect"}
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] space-y-3 leading-relaxed">
            <p>
              {isHi
                ? "जब आप JantaGaraj पर सर्विस बुक करते हैं या पार्टनर के रूप में जुड़ते हैं, तो हम निम्नलिखित आवश्यक डेटा एकत्र करते हैं:"
                : "When you interact with the JantaGaraj ecosystem, we collect only necessary data points required to facilitate reliable doorstep repairs:"}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[#252621] dark:text-[#F5F2EB]">{isHi ? "व्यक्तिगत पहचान:" : "Personal Identity:"}</strong>{" "}
                {isHi ? "आपका नाम, 10-अंकीय मोबाइल नंबर, और ईमेल पता (अकाउंट निर्माण व ओटीपी वेरिफिकेशन हेतु)।" : "Full legal name, 10-digit mobile number, and email address for account authentication."}
              </li>
              <li>
                <strong className="text-[#252621] dark:text-[#F5F2EB]">{isHi ? "स्थान व जीपीएस डेटा:" : "Real-Time Location & GPS:"}</strong>{" "}
                {isHi ? "आपका पिकअप/सर्विस पता व लाइव निर्देशांक, ताकि 30 मिनट के भीतर निकटतम मैकेनिक को भेजा जा सके।" : "Precise latitude, longitude, and physical doorstep address to dispatch nearby technicians within 30 minutes."}
              </li>
              <li>
                <strong className="text-[#252621] dark:text-[#F5F2EB]">{isHi ? "वाहन व उपकरण विवरण:" : "Vehicle & Appliance Specs:"}</strong>{" "}
                {isHi ? "कार/बाइक का मेक, मॉडल, रजिस्ट्रेशन नंबर, समस्या का विवरण व आवश्यकतानुसार फोटो/वीडियो।" : "Vehicle make, model, appliance specifications, and diagnostic photographs of the breakdown."}
              </li>
              <li>
                <strong className="text-[#252621] dark:text-[#F5F2EB]">{isHi ? "टेक्नीशियन केवाईसी (केवल पार्टनर्स के लिए):" : "Technician KYC (Partners Only):"}</strong>{" "}
                {isHi ? "आधार कार्ड, ड्राइविंग लाइसेंस, पैन व पुलिस सत्यापन रिपोर्ट की डिजिटल प्रतियां।" : "Government identification proofs (Aadhaar, Driving License, PAN) and trade certifications."}
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2: How We Use Your Data */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "2. हम आपकी जानकारी का उपयोग कैसे करते हैं?" : "2. How We Utilize Your Data"}
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] space-y-3 leading-relaxed">
            <p>
              {isHi
                ? "हम आपके डेटा का उपयोग केवल उत्कृष्ट सेवा प्रदान करने व प्लेटफॉर्म सुरक्षा बनाए रखने के लिए करते हैं:"
                : "Your data is strictly utilized to provide seamless logistics and maintain marketplace trust:"}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{isHi ? "निकटतम प्रमाणित मैकेनिक को आपकी बुकिंग से जोड़ना व लाइव ट्रैकिंग सक्षम करना।" : "Matching your booking request with certified nearby mechanics based on service proximity."}</li>
              <li>{isHi ? "पारदर्शी डिजिटल इनवॉइस व वर्क वारंटी स्लिप तैयार करना।" : "Generating itemized digital invoices, warranty records, and rate card breakdowns."}</li>
              <li>{isHi ? "ओटीपी-आधारित सुरक्षित कार्य प्रारंभ व समापन सत्यापन सुनिश्चित करना।" : "Two-factor OTP confirmation before starting and completing repair tasks."}</li>
              <li>{isHi ? "सर्विस पूर्ण होने के बाद रेटिंग व फीडबैक संग्रह।" : "Collecting customer quality ratings and performance feedback to maintain service standards."}</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Data Security & Zero Third-Party Sale */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "3. सुरक्षा गारंटी व शून्य डेटा बिक्री" : "3. Security Guarantee & Zero Third-Party Sale"}
            </h2>
          </div>
          <div className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] space-y-3 leading-relaxed">
            <p className="font-semibold text-[#252621] dark:text-[#F5F2EB]">
              {isHi
                ? "हम किसी भी परिस्थिति में आपका व्यक्तिगत डेटा, फोन नंबर या लोकेशन किसी थर्ड-पार्टी एडवरटाइजर या ब्रोकर को नहीं बेचते।"
                : "We do not sell, rent, or monetize your personal phone numbers, GPS coordinates, or booking records to third-party marketers under any circumstance."}
            </p>
            <p>
              {isHi
                ? "सभी ट्रांजेक्शन TLS 1.3 एन्क्रिप्शन के जरिए प्रोसेस होते हैं। टोकनयुक्त सुरक्षित कुकीज (SameSite=None, Secure=true) का उपयोग होता है।"
                : "All client-server communications are guarded by TLS 1.3 encryption. Dual JWT tokens are issued with strict HTTP-Only, SameSite, and Secure browser cookies."}
            </p>
          </div>
        </div>

        {/* Section 4: User Rights & Data Deletion */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#E87532] flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "4. आपके अधिकार व अकाउंट डिलीशन" : "4. Your Rights & Data Deletion"}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] leading-relaxed">
            {isHi
              ? "आप किसी भी समय अपने प्रोफाइल से व्यक्तिगत जानकारी अपडेट कर सकते हैं या अकाउंट पूर्णतः डिलीट करने हेतु अनुरोध कर सकते हैं। डेटा डिलीशन रिक्वेस्ट प्राप्त होने के 48 घंटों के भीतर आपका पूरा रिकॉर्ड डेटाबेस से परमानेंट रिमूव कर दिया जाता है।"
              : "You maintain full autonomy over your data. You may review, export, or request immediate permanent deletion of your profile and booking history by contacting our compliance desk. Requests are executed within 48 hours."}
          </p>
        </div>

        {/* Contact Grievance Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200 dark:border-[#2B231D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-[#252621] dark:text-[#F5F2EB]">
              {isHi ? "गोपनीयता या डेटा संबंधित प्रश्न?" : "Questions About Data Privacy?"}
            </h3>
            <p className="text-xs sm:text-sm text-[#717167] dark:text-[#9E9488]">
              {isHi ? "हमारे ग्रीवेंस ऑफिसर से सीधे संपर्क करें: support@jantagaraj.in" : "Contact our Grievance Officer directly at support@jantagaraj.in"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/help">
              <Button variant="primary" size="md" className="font-bold shadow-orange-glow">
                {isHi ? "हेल्प डेस्क" : "Help Center"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

