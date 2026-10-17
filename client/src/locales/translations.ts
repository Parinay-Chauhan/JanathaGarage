export type Language = "en" | "hi";

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Navigation / Header
  "nav.allServices": {
    en: "All Services",
    hi: "सभी सेवाएं",
  },
  "nav.findMechanics": {
    en: "Find Mechanics",
    hi: "मैकेनिक खोजें",
  },
  "nav.aboutUs": {
    en: "About Us",
    hi: "हमारे बारे में",
  },
  "nav.bookNow": {
    en: "Book Repair",
    hi: "सर्विस बुक करें",
  },
  "nav.login": {
    en: "Login / Sign Up",
    hi: "लॉगिन / साइन अप",
  },
  "nav.logout": {
    en: "Log Out",
    hi: "लॉग आउट",
  },
  "nav.tagline": {
    en: "Auto Services & Repairs",
    hi: "डोरस्टेप ऑटो रिपेयर व मेंटेनेंस",
  },
  "nav.gpsDetect": {
    en: "GPS",
    hi: "जीपीएस",
  },
  "nav.detecting": {
    en: "Detecting...",
    hi: "सर्च हो रहा है...",
  },
  "nav.switchLanguage": {
    en: "हिंदी",
    hi: "English",
  },
  "nav.customerDashboard": {
    en: "Customer Portal",
    hi: "ग्राहक पोर्टल",
  },
  "nav.technicianDashboard": {
    en: "Mechanic Radar",
    hi: "मैकेनिक रडार",
  },
  "nav.adminDashboard": {
    en: "Admin Desk",
    hi: "एडमिन डेस्क",
  },

  // Hero Section
  "hero.badge": {
    en: "India's #1 On-Demand Auto Garage Network",
    hi: "भारत का #1 ऑन-डिमांड ऑटो गैराज नेटवर्क",
  },
  "hero.title1": {
    en: "Your Neighborhood Mechanic, At Your Doorstep in",
    hi: "आपके पड़ोस का भरोसेमंद मैकेनिक, आपके घर पर",
  },
  "hero.titleHighlight": {
    en: "30 Mins.",
    hi: "30 मिनट में।",
  },
  "hero.subtitle": {
    en: "From sudden highway breakdowns to periodic car maintenance and two-wheeler tuning—book verified, background-checked mechanics with upfront transparent pricing.",
    hi: "अचानक हाईवे ब्रेकडाउन से लेकर नियमित कार सर्विस और टू-व्हीलर ट्यूनिंग तक—पारदर्शी और तय दरों पर सत्यापित मैकेनिक तुरंत बुक करें।",
  },
  "hero.bookButton": {
    en: "Book A Service Now",
    hi: "अभी सर्विस बुक करें",
  },
  "hero.joinTechnician": {
    en: "Join as Mechanic Partner",
    hi: "मैकेनिक पार्टनर बनें",
  },
  "hero.stat1Value": {
    en: "30 Mins",
    hi: "30 मिनट",
  },
  "hero.stat1Label": {
    en: "Avg Response Time",
    hi: "औसत रिस्पांस टाइम",
  },
  "hero.stat2Value": {
    en: "100% KYC",
    hi: "100% सत्यापित",
  },
  "hero.stat2Label": {
    en: "Certified Mechanics",
    hi: "प्रमाणित मैकेनिक",
  },
  "hero.stat3Value": {
    en: "Fixed Rates",
    hi: "तय रेट कार्ड",
  },
  "hero.stat3Label": {
    en: "Zero Hidden Charges",
    hi: "कोई अतिरिक्त चार्ज नहीं",
  },

  // Categories Section
  "categories.eyebrow": {
    en: "Complete Automotive Care",
    hi: "सम्पूर्ण वाहन देखभाल",
  },
  "categories.title": {
    en: "Service Categories",
    hi: "हमारी सर्विस कैटेगरीज",
  },
  "categories.subtitle": {
    en: "Select from our specialized diagnostic and roadside assistance packages tailored for Indian road conditions.",
    hi: "भारतीय सड़कों के अनुरूप तैयार किए गए हमारे खास रिपेयर और इमरजेंसी रोडसाइड पैकेजेस में से चुनें।",
  },
  "categories.viewServices": {
    en: "View Services",
    hi: "सेवाएं देखें",
  },
  "categories.specializedRepairs": {
    en: "specialized repairs & diagnostic packages",
    hi: "विशेष रिपेयर व डायग्नोस्टिक पैकेज",
  },

  // Trending Packages Section
  "trending.eyebrow": {
    en: "Instant Doorstep Booking",
    hi: "त्वरित डोरस्टेप बुकिंग",
  },
  "trending.title": {
    en: "Trending Repair Packages",
    hi: "लोकप्रिय रिपेयर पैकेज",
  },
  "trending.subtitle": {
    en: "Select a service below to book a nearby mechanic with secure OTP verification.",
    hi: "सुरक्षित OTP वेरिफिकेशन के साथ नजदीकी मैकेनिक बुक करने के लिए नीचे से सर्विस चुनें।",
  },
  "trending.duration": {
    en: "~45 min repair",
    hi: "~45 मिनट कार्य",
  },
  "trending.bookBtn": {
    en: "Book Service",
    hi: "सर्विस बुक करें",
  },
  "trending.desc": {
    en: "Doorstep diagnosis, certified parts, and clean execution by our nearest available technician.",
    hi: "हमारे नजदीकी मैकेनिक द्वारा डोरस्टेप डायग्नोसिस, असली पार्ट्स और पारदर्शी रिपेयर कार्य।",
  },

  // Verified Mechanics Section
  "mechanics.badge": {
    en: "Certified Garage Network",
    hi: "सत्यापित गैराज नेटवर्क",
  },
  "mechanics.title": {
    en: "Meet Verified Mechanics In Your Neighborhood",
    hi: "अपने क्षेत्र के प्रमाणित मैकेनिकों से मिलें",
  },
  "mechanics.desc": {
    en: "Every technician on JantaGaraj undergoes strict Government ID (Aadhaar / DL) KYC verification and background checks before they can accept bookings.",
    hi: "जनतागैराज पर प्रत्येक मैकेनिक बुकिंग स्वीकार करने से पहले सख्त सरकारी आईडी (आधार / ड्राइविंग लाइसेंस) और बैकग्राउंड वेरिफिकेशन से गुजरता है।",
  },
  "mechanics.p1": {
    en: "Police & KYC Verified",
    hi: "पुलिस व आधार सत्यापित",
  },
  "mechanics.p2": {
    en: "Transparent Rate Cards",
    hi: "पारदर्शी रेट कार्ड",
  },
  "mechanics.p3": {
    en: "OTP Secure Job Start",
    hi: "OTP सुरक्षित कार्य प्रारंभ",
  },
  "mechanics.p4": {
    en: "Live Booking Tracking",
    hi: "लाइव बुकिंग ट्रैकिंग",
  },
  "mechanics.browseAll": {
    en: "Browse All Mechanics",
    hi: "सभी मैकेनिक देखें",
  },
  "mechanics.joinBtn": {
    en: "Join as Technician Partner",
    hi: "मैकेनिक पार्टनर बनें",
  },
  "mechanics.nearYou": {
    en: "Available Mechanics Near You",
    hi: "आपके आसपास उपलब्ध मैकेनिक",
  },
  "mechanics.nearYouSubtitle": {
    en: "Live verified mechanics ready for doorstep repair & emergency assist",
    hi: "डोरस्टेप रिपेयर व आपातकालीन सहायता के लिए तैयार मैकेनिक",
  },
  "mechanics.experience": {
    en: "Years Automotive Exp",
    hi: "वर्षों का ऑटोमोबाइल अनुभव",
  },
  "mechanics.visitFee": {
    en: "Visit Fee",
    hi: "विजिट फीस",
  },
  "mechanics.viewProfile": {
    en: "Profile",
    hi: "प्रोफाइल",
  },

  // How It Works Flow
  "howItWorks.eyebrow": {
    en: "Frictionless Process",
    hi: "सरल और सुरक्षित प्रक्रिया",
  },
  "howItWorks.title": {
    en: "How JantaGaraj Works",
    hi: "जनतागैराज कैसे काम करता है",
  },
  "howItWorks.step1Title": {
    en: "Choose Service",
    hi: "सर्विस चुनें",
  },
  "howItWorks.step1Desc": {
    en: "Select the required vehicle maintenance package or describe your emergency breakdown issue.",
    hi: "आवश्यक व्हीकल मेंटेनेंस पैकेज चुनें या अपनी आपातकालीन ब्रेकडाउन समस्या बताएं।",
  },
  "howItWorks.step2Title": {
    en: "Select Time & Spot",
    hi: "समय और स्थान चुनें",
  },
  "howItWorks.step2Desc": {
    en: "Pick your preferred time slot and service location or roadside GPS pin.",
    hi: "अपना पसंदीदा समय, घर का पता या हाईवे/रोडसाइड GPS लोकेशन चुनें।",
  },
  "howItWorks.step3Title": {
    en: "Mechanic Dispatched",
    hi: "मैकेनिक रवाना",
  },
  "howItWorks.step3Desc": {
    en: "Nearest certified technician accepts the job and arrives with necessary tools and parts.",
    hi: "नजदीकी प्रमाणित मैकेनिक जॉब स्वीकार करता है और जरूरी औजारों के साथ पहुंचता है।",
  },
  "howItWorks.step4Title": {
    en: "OTP Verification & Pay",
    hi: "OTP सत्यापन व भुगतान",
  },
  "howItWorks.step4Desc": {
    en: "Share your 4-digit start OTP. Pay digitally or cash after 100% satisfactory completion.",
    hi: "अपना 4-अंकों का स्टार्ट OTP साझा करें। संतुष्ट होने पर ऑनलाइन या कैश में भुगतान करें।",
  },

  // Services Page
  "servicesPage.title": {
    en: "Explore Auto Services",
    hi: "ऑटो सेवाएं देखें",
  },
  "servicesPage.subtitle": {
    en: "Find certified mechanics for scheduled maintenance, emergency repairs, and full vehicle diagnostics.",
    hi: "नियमित रख-रखाव, इमरजेंसी रिपेयर और फुल व्हीकल डायग्नोस्टिक्स के लिए प्रमाणित मैकेनिक खोजें।",
  },
  "servicesPage.searchPlaceholder": {
    en: "Search repairs e.g. Brake, Battery, Oil Change...",
    hi: "सर्विस खोजें जैसे ब्रेक, बैटरी, ऑइल चेंज, पंचर...",
  },
  "servicesPage.allServices": {
    en: "All Services",
    hi: "सभी सेवाएं",
  },
  "servicesPage.noServices": {
    en: "No services found",
    hi: "कोई सर्विस नहीं मिली",
  },
  "servicesPage.tryDifferent": {
    en: "Try searching with different keywords or switch categories.",
    hi: "अलग कीवर्ड से खोजें या दूसरी कैटेगरी चुनें।",
  },
  "servicesPage.visitDuration": {
    en: "30-45 min visit",
    hi: "30-45 मिनट में विजिट",
  },

  // Technicians Page
  "techPage.badge": {
    en: "Government ID Verified",
    hi: "सरकारी पहचान पत्र सत्यापित",
  },
  "techPage.title": {
    en: "Certified Mechanics Network",
    hi: "प्रमाणित मैकेनिक नेटवर्क",
  },
  "techPage.subtitle": {
    en: "Browse verified automotive technicians available for doorstep and roadside breakdown assistance in your area.",
    hi: "अपने क्षेत्र में डोरस्टेप और आपातकालीन रोडसाइड सहायता के लिए उपलब्ध सत्यापित मैकेनिक देखें।",
  },
  "techPage.online": {
    en: "Online",
    hi: "ऑनलाइन",
  },
  "techPage.offline": {
    en: "Offline",
    hi: "ऑफलाइन",
  },
  "techPage.reviews": {
    en: "reviews",
    hi: "समीक्षाएं",
  },
  "techPage.autoExp": {
    en: "Years Auto Experience",
    hi: "साल का ऑटो अनुभव",
  },
  "techPage.baseVisitFee": {
    en: "Base Visit Fee",
    hi: "बेस विजिट चार्ज",
  },
  "techPage.viewProfile": {
    en: "View Profile",
    hi: "प्रोफाइल देखें",
  },
  "techPage.noMechanics": {
    en: "No Verified Mechanics Available",
    hi: "फिलहाल कोई मैकेनिक उपलब्ध नहीं है",
  },

  // About Page
  "aboutPage.eyebrow": {
    en: "The JantaGaraj Mission",
    hi: "जनतागैराज का मिशन",
  },
  "aboutPage.title": {
    en: "Reinventing Vehicle Repair For Every Indian Citizen",
    hi: "हर भारतीय नागरिक के लिए वाहन रिपेयर को आसान और पारदर्शी बनाना",
  },
  "aboutPage.subtitle": {
    en: "Built to empower local skilled mechanics with digital discovery and to protect vehicle owners from opaque workshop pricing and sudden highway breakdowns.",
    hi: "स्थानीय कुशल मैकेनिकों को डिजिटल पहचान देने और वाहन मालिकों को वर्कशॉप की मनमानी कीमतों व हाईवे ब्रेकडाउन से बचाने के लिए निर्मित।",
  },

  // Footer
  "footer.verifiedTitle": {
    en: "Verified Technicians",
    hi: "सत्यापित मैकेनिक",
  },
  "footer.verifiedDesc": {
    en: "Strict KYC & police verified mechanics",
    hi: "सख्त आधार KYC व पुलिस सत्यापित",
  },
  "footer.speedTitle": {
    en: "30-Min Fast Arrival",
    hi: "30 मिनट में त्वरित आगमन",
  },
  "footer.speedDesc": {
    en: "Nearby doorstep breakdown assistance",
    hi: "आपके पास से डोरस्टेप ब्रेकडाउन सेवा",
  },
  "footer.pricingTitle": {
    en: "Transparent Pricing",
    hi: "पारदर्शी तय कीमतें",
  },
  "footer.pricingDesc": {
    en: "Fixed rate cards & digital OTP invoicing",
    hi: "फिक्स्ड रेट कार्ड व डिजिटल OTP बिलिंग",
  },
  "footer.supportTitle": {
    en: "24x7 SOS Support",
    hi: "24x7 आपातकालीन सहायता",
  },
  "footer.supportDesc": {
    en: "Emergency highway & roadside assistance",
    hi: "हाईवे व रोडसाइड इमरजेंसी सपोर्ट",
  },
  "footer.brandDesc": {
    en: "India's reliable decentralized vehicle maintenance and emergency mechanic marketplace. Connecting vehicle owners with verified neighborhood mechanics.",
    hi: "भारत का भरोसेमंद डोरस्टेप वाहन मेंटेनेंस व इमरजेंसी मैकेनिक मार्केटप्लेस। वाहन मालिकों को उनके पड़ोस के कुशल मैकेनिकों से तुरंत जोड़ता है।",
  },
  "footer.popularServices": {
    en: "Popular Services",
    hi: "लोकप्रिय सेवाएं",
  },
  "footer.forTechnicians": {
    en: "For Technicians",
    hi: "मैकेनिकों के लिए",
  },
  "footer.contactSupport": {
    en: "Contact & Support",
    hi: "संपर्क व सहायता",
  },
  "footer.rights": {
    en: "JantaGaraj Technologies. All rights reserved. Made for Indian roads.",
    hi: "जनतागैराज टेक्नोलॉजीज। सर्वाधिकार सुरक्षित। भारतीय सड़कों के लिए समर्पित।",
  },
};

// Category English-to-Hindi mapping dictionary
export const categoryTranslations: Record<string, string> = {
  "Car Periodic Maintenance": "कार पीरियोडिक मेंटेनेंस",
  "Emergency Roadside SOS": "इमरजेंसी रोडसाइड ब्रेकडाउन (SOS)",
  "Two-Wheeler Repair & Care": "टू-व्हीलर सर्विस व रिपेयर",
  "Brakes, Clutch & Suspension": "ब्रेक्स, क्लच और सस्पेंशन",
  "Battery & Electrical Diagnostics": "बैटरी व इलेक्ट्रिकल डायग्नोस्टिक्स",
  "Tyres, Wheels & Puncture Care": "टायर, व्हील व पंचर केयर",
  "Detailing, Foam Wash & Spa": "फोम वॉश, पॉलिश व डिटेलिंग स्पा",
};

// Service titles English-to-Hindi mapping dictionary
export const serviceTranslations: Record<string, string> = {
  "Standard Car Engine Oil & Filter Service": "स्टैंडर्ड कार इंजन ऑइल व फिल्टर सर्विस",
  "Comprehensive 50-Point Car Health Inspection": "50-पॉइंट कम्प्लीट कार हेल्थ इंस्पेक्शन",
  "Complete AC Gas Refill & Cooling Coil Flush": "कार AC गैस रिफिल व कूलिंग कॉइल सर्विस",
  "Emergency Highway Battery Jumpstart Assist": "इमरजेंसी हाईवे बैटरी जंपस्टार्ट असिस्ट",
  "Flat Tyre Tube/Tubeless Puncture & Stepney Fit": "पंचर रिपेयर व स्टेपनी फिटिंग सेवा",
  "Emergency On-Spot Fuel Delivery (5 Litres Petrol/Diesel)": "इमरजेंसी ऑन-स्पॉट पेट्रोल/डीजल डिलीवरी (5 लीटर)",
  "Full Two-Wheeler General Servicing & Tuning": "कम्प्लीट टू-व्हीलर जनरल सर्विस व ट्यूनिंग",
  "Bike Carburetor/Injector Ultrasonic Clean": "बाइक कार्बोरेटर / इंजेक्टर क्लीनिंग",
  "Motorcycle Drive Chain Tension, Clean & Lube": "मोटरसाइकिल ड्राइव चेन क्लीन व ल्यूब",
  "Front Disc Brake Pads Replacement & Bleed": "फ्रंट डिस्क ब्रेक पैड रिप्लेसमेंट व ब्लीडिंग",
  "Clutch Plate Overhaul & Cable Replacement": "क्लच प्लेट ओवरहाल व केबल रिप्लेसमेंट",
  "Front & Rear Suspension Bushing & Shock Absorber Check": "सस्पेंशन बुश व शॉक एब्जॉर्बर इंस्पेक्शन",
  "OBD-II Computerized Engine Diagnostics Scan": "OBD-II कंप्यूटराइज्ड इंजन डायग्नोस्टिक स्कैन",
  "Alternator & Starter Motor Health Diagnostics": "अल्टरनेटर व सेल्फ स्टार्टर मोटर चेकअप",
  "Tubeless Puncture Repair (Doorstep 2 Plugs)": "डोरस्टेप ट्यूबलेस पंचर रिपेयर (2 प्लग)",
  "Wheel Balancing & Alignment Check (Doorstep)": "व्हील बैलेंसिंग व अलाइनमेंट चेकअप",
  "Doorstep Foam Wash & Deep Interior Vacuuming": "डोरस्टेप फोम वॉश व इंटीरियर वैक्यूमिंग",
  "Ceramic Coating Polish & Hydrophobic Shield": "सिरेमिक कोटिंग पॉलिश व हाइड्रोफोबिक शील्ड",
};
