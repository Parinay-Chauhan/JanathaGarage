export type Language = "en" | "hi";

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Navigation / Header
  "nav.services": {
    en: "Services",
    hi: "सेवाएं",
  },
  "nav.howItWorks": {
    en: "How it Works",
    hi: "कैसे काम करता है",
  },
  "nav.technicians": {
    en: "Technicians",
    hi: "मैकेनिक",
  },
  "nav.help": {
    en: "Help",
    hi: "सहायता",
  },
  "nav.bookService": {
    en: "Book a Service",
    hi: "सर्विस बुक करें",
  },
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

  // Common UI keys
  "common.home": {
    en: "Home",
    hi: "होम",
  },
  "common.search": {
    en: "Search",
    hi: "खोजें",
  },
  "common.bookNow": {
    en: "Book Now",
    hi: "अभी बुक करें",
  },
  "common.viewAll": {
    en: "View All",
    hi: "सभी देखें",
  },
  "common.filters": {
    en: "Filters",
    hi: "फिल्टर",
  },
  "common.sort": {
    en: "Sort",
    hi: "सॉर्ट",
  },
  "common.clear": {
    en: "Clear",
    hi: "हटाएं",
  },
  "common.mins": {
    en: "mins",
    hi: "मिनट",
  },
  "common.exp": {
    en: "Exp",
    hi: "अनुभव",
  },
  "common.years": {
    en: "years",
    hi: "वर्ष",
  },
  "common.jobs": {
    en: "jobs",
    hi: "काम",
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

  // Landing Page Specific Keys
  "hero.trustPill1": {
    en: "Doorstep Local Services in 30 Minutes",
    hi: "30 मिनट में घर पर लोकल सेवाएं",
  },
  "hero.trustPill2": {
    en: "100% Verified",
    hi: "100% सत्यापित",
  },
  "hero.titlePart1": {
    en: "Your Home & Vehicle,",
    hi: "आपके घर और वाहन की,",
  },
  "hero.titlePart2": {
    en: "Professionally",
    hi: "पेशेवर तरीके से",
  },
  "hero.titlePart3": {
    en: "Taken Care Of.",
    hi: "देखभाल और रिपेयर।",
  },
  "hero.mainSubtitle": {
    en: "From emergency roadside mechanic assistance to licensed electricians, AC service, and home plumbing — book top-rated local professionals with upfront pricing and real-time arrival tracking.",
    hi: "इमरजेंसी रोडसाइड मैकेनिक सहायता से लेकर लाइसेंस प्राप्त इलेक्ट्रीशियन, एसी सर्विस व प्लंबिंग तक — पारदर्शी तय कीमतों पर टॉप-रेटेड मैकेनिक तुरंत बुक करें।",
  },
  "hero.searchPlaceholder": {
    en: "Search for service (e.g. Electrician, Brake Repair, AC)...",
    hi: "सर्विस खोजें (उदा. इलेक्ट्रीशियन, ब्रेक रिपेयर, एसी सर्विस)...",
  },
  "hero.searchBtn": {
    en: "Search",
    hi: "खोजें",
  },
  "hero.bookBtn": {
    en: "Book a Service",
    hi: "सर्विस बुक करें",
  },
  "hero.findTechBtn": {
    en: "Find Verified Technicians",
    hi: "सत्यापित मैकेनिक खोजें",
  },
  "hero.statPros": {
    en: "Verified Pros",
    hi: "सत्यापित मैकेनिक",
  },
  "hero.statArrival": {
    en: "Avg. Arrival",
    hi: "औसत आगमन समय",
  },
  "hero.statRating": {
    en: "Customer Rating",
    hi: "कस्टमर रेटिंग",
  },
  "hero.statCharges": {
    en: "Hidden Charges",
    hi: "छुपे हुए चार्ज",
  },
  "hero.emergencyRepair": {
    en: "Emergency Repair",
    hi: "इमरजेंसी रिपेयर",
  },
  "hero.instantDispatch": {
    en: "Instant Dispatch",
    hi: "तुरंत रवानगी",
  },
  "hero.availableNow": {
    en: "Available Now",
    hi: "अभी उपलब्ध",
  },
  "hero.directDoorstep": {
    en: "Direct-to-Doorstep Care",
    hi: "डायरेक्ट डोरस्टेप सर्विस",
  },
  "hero.directDesc": {
    en: "Skilled automotive mechanics & certified home technicians equipped with calibrated diagnostic tools.",
    hi: "विशेष टूल्स और आधुनिक उपकरणों के साथ प्रमाणित ऑटो मैकेनिक व होम टेक्निशियन।",
  },
  "hero.reviewsCount": {
    en: "Based on 12,400+ local bookings",
    hi: "12,400+ लोकल बुकिंग्स के आधार पर",
  },

  // Categories Section
  "categories.exploreTag": {
    en: "Explore Services",
    hi: "सर्विस कैटेगरीज",
  },
  "categories.popularTitle": {
    en: "Popular Service Categories",
    hi: "लोकप्रिय सर्विस श्रेणियां",
  },
  "categories.popularSubtitle": {
    en: "Select any category to view available technicians, pricing, and guaranteed delivery times.",
    hi: "उपलब्ध मैकेनिक, तय रेट और आगमन समय देखने के लिए कोई भी कैटेगरी चुनें।",
  },
  "categories.allCategories": {
    en: "All Categories",
    hi: "सभी श्रेणियां",
  },
  "categories.starts": {
    en: "Starts",
    hi: "शुरुआती",
  },
  "categories.pros": {
    en: "Pros",
    hi: "विशेषज्ञ",
  },

  // How It Works
  "howItWorks.tag": {
    en: "Simple & Transparent",
    hi: "सरल और पारदर्शी",
  },
  "howItWorks.title": {
    en: "How JantaGaraj Works",
    hi: "जनतागैराज कैसे काम करता है",
  },
  "howItWorks.subtitle": {
    en: "No endless phone calls or haggling. Get verified local technicians to your doorstep in three straightforward steps.",
    hi: "बिना मोलभाव या अनगिनत फोन कॉल के। तीन आसान चरणों में सत्यापित मैकेनिक घर बुलाएं।",
  },
  "howItWorks.step1Title": {
    en: "Choose a Service",
    hi: "सर्विस चुनें",
  },
  "howItWorks.step1Desc": {
    en: "Browse transparent rate cards for home repairs, electrical tasks, AC servicing, or emergency automotive breakdown. Upfront quotes with zero surprises.",
    hi: "होम रिपेयर, इलेक्ट्रिकल कार्य, एसी सर्विस या आपातकालीन वाहन ब्रेकडाउन के पारदर्शी रेट कार्ड देखें। बिना किसी छुपे चार्ज के स्पष्ट कोट्स।",
  },
  "howItWorks.step2Title": {
    en: "Book a Technician",
    hi: "मैकेनिक बुक करें",
  },
  "howItWorks.step2Desc": {
    en: "Select instant dispatch for emergencies or schedule a preferred time slot. You are matched with a background-checked technician within 3 minutes.",
    hi: "इमरजेंसी के लिए तुरंत रवानगी चुनें या अपनी सुविधानुसार समय तय करें। 3 मिनट के भीतर नजदीकी सत्यापित मैकेनिक से जुड़ें।",
  },
  "howItWorks.step3Title": {
    en: "Get the Work Done",
    hi: "काम पूरा करवाएं",
  },
  "howItWorks.step3Desc": {
    en: "Track arrival live on GPS. The technician inspects, finishes the repair, tests performance, and you pay securely via UPI, Card, or Cash after satisfaction.",
    hi: "लाइव जीपीएस पर आगमन ट्रैक करें। मैकेनिक जांच कर कार्य पूरा करता है, और पूरी तरह संतुष्ट होने पर ही UPI, कार्ड या कैश से भुगतान करें।",
  },

  // Popular Services
  "services.topBookedTag": {
    en: "Top Booked",
    hi: "सर्वाधिक बुक की गई",
  },
  "services.popularTitle": {
    en: "Popular Services",
    hi: "लोकप्रिय सेवाएं",
  },
  "services.popularSubtitle": {
    en: "Fixed upfront prices with doorstep warranty on every booking.",
    hi: "हर बुकिंग पर तय रेट और डोरस्टेप वारंटी का भरोसा।",
  },
  "services.viewAll": {
    en: "View All Services",
    hi: "सभी सेवाएं देखें",
  },
  "services.desc": {
    en: "Doorstep execution by certified technicians with genuine parts and standardized post-service inspection.",
    hi: "असली पार्ट्स और मानकीकृत पोस्ट-सर्विस जांच के साथ प्रमाणित टेक्निशियन द्वारा डोरस्टेप कार्य।",
  },

  // Trusted Technicians
  "techs.tag": {
    en: "Local Verified Talent",
    hi: "स्थानीय प्रमाणित हुनर",
  },
  "techs.title": {
    en: "Meet Our Trusted Technicians",
    hi: "हमारे भरोसेमंद मैकेनिकों से मिलें",
  },
  "techs.subtitle": {
    en: "KYC-verified mechanics and technicians with ratings above 4.8★ and verified customer history.",
    hi: "4.8★ से अधिक रेटिंग और आधार KYC सत्यापित मैकेनिक।",
  },
  "techs.allTechs": {
    en: "All Technicians",
    hi: "सभी मैकेनिक",
  },
  "techs.verifiedPro": {
    en: "Verified Pro",
    hi: "सत्यापित प्रो",
  },
  "techs.visitingFee": {
    en: "Visiting Fee",
    hi: "विजिट फीस",
  },
  "techs.viewProfile": {
    en: "View Profile",
    hi: "प्रोफाइल देखें",
  },

  // Why Choose Us
  "why.tag": {
    en: "Trust & Guarantee",
    hi: "भरोसा और गारंटी",
  },
  "why.title": {
    en: "Why Homeowners & Drivers Choose JantaGaraj",
    hi: "लोग जनतागैराज को क्यों चुनते हैं",
  },
  "why.subtitle": {
    en: "We eliminate the uncertainty, inflated repair bills, and long wait times of unorganized local service markets.",
    hi: "हम अनियंत्रित बाजार के ज्यादा बिल, अनिश्चितता और लंबे इंतजार को खत्म करते हैं।",
  },
  "why.f1Title": {
    en: "100% Verified Professionals",
    hi: "100% सत्यापित प्रोफेशनल्स",
  },
  "why.f1Desc": {
    en: "Govt ID KYC, trade certifications, police verification, and rigorous practical skill assessments before joining.",
    hi: "आधार KYC, ट्रेड सर्टिफिकेट, पुलिस वेरिफिकेशन और व्यावहारिक कौशल जांच के बाद ही ऑनबोर्डिंग।",
  },
  "why.f2Title": {
    en: "Transparent Upfront Pricing",
    hi: "पारदर्शी तय कीमतें",
  },
  "why.f2Desc": {
    en: "Standardized rate cards. You approve the exact cost before work begins. No unexpected surprise bills.",
    hi: "मानकीकृत रेट कार्ड। काम शुरू होने से पहले तय लागत आपकी मंजूरी से। कोई अप्रत्याशित बिल नहीं।",
  },
  "why.f3Title": {
    en: "Live GPS Arrival Tracking",
    hi: "लाइव जीपीएस आगमन ट्रैकिंग",
  },
  "why.f3Desc": {
    en: "See real-time status when your technician is en-route. Direct in-app calling without sharing private phone numbers.",
    hi: "जब आपका मैकेनिक रास्ते में हो तो रीयल-टाइम स्थिति देखें। फोन नंबर शेयर किए बिना डायरेक्ट इन-ऐप संपर्क।",
  },
  "why.f4Title": {
    en: "24/7 Dedicated Support",
    hi: "24/7 समर्पित कस्टमर केयर",
  },
  "why.f4Desc": {
    en: "Emergency direct helpline +91 84396 16833 with doorstep warranty coverage on every repair.",
    hi: "इमरजेंसी डायरेक्ट हेल्पलाइन +91 84396 16833 और हर रिपेयर पर डोरस्टेप वारंटी कवरेज।",
  },

  // Remote Diagnosis
  "remote.tag": {
    en: "Live Video & Chat Triage",
    hi: "लाइव वीडियो व चैट सहायता",
  },
  "remote.title": {
    en: "Can't Wait for a Visit? Get Instant Remote Diagnosis.",
    hi: "विजिट का इंतजार नहीं कर सकते? तुरंत रिमोट डायग्नोसिस पाएं।",
  },
  "remote.desc": {
    en: "Connect with an expert technician via HD video or live chat before they visit. Show your tripped breaker, leaking pipe, or engine noise to get immediate safety advice, troubleshooting steps, or an exact pre-visit cost estimate.",
    hi: "विजिट से पहले एचडी वीडियो या लाइव चैट पर एक्सपर्ट मैकेनिक से जुड़ें। ट्रिप हुआ ब्रेकर, लीक होता पाइप या इंजन की आवाज दिखाकर तुरंत सेफ्टी सलाह या कोट्स पाएं।",
  },
  "remote.s1Title": {
    en: "1. Instant Connect",
    hi: "1. तुरंत संपर्क",
  },
  "remote.s1Desc": {
    en: "Under 60 seconds connection",
    hi: "60 सेकंड में लाइव कनेक्ट",
  },
  "remote.s2Title": {
    en: "2. Visual Triage",
    hi: "2. वीडियो डायग्नोसिस",
  },
  "remote.s2Desc": {
    en: "Show issue via phone camera",
    hi: "फोन कैमरे से समस्या दिखाएं",
  },
  "remote.s3Title": {
    en: "3. Exact Solution",
    hi: "3. सटीक समाधान",
  },
  "remote.s3Desc": {
    en: "DIY guidance or pro dispatch",
    hi: "घर बैठे समाधान या मैकेनिक रवानगी",
  },
  "remote.callBtn": {
    en: "Call Helpline for Diagnosis",
    hi: "डायग्नोसिस के लिए कॉल करें",
  },
  "remote.scheduleBtn": {
    en: "Schedule In-Person Inspection",
    hi: "डोरस्टेप इंस्पेक्शन शेड्यूल करें",
  },
  "remote.statusActive": {
    en: "Remote Support Active",
    hi: "रिमोट सहायता सक्रिय",
  },
  "remote.freeTriage": {
    en: "100% Free Triage",
    hi: "100% नि:शुल्क सलाह",
  },
  "remote.videoCap": {
    en: "Live session with Master Auto Electrician",
    hi: "मास्टर ऑटो इलेक्ट्रीशियन के साथ लाइव सेशन",
  },
  "remote.chatVoice": {
    en: "Chat & Voice Guidance",
    hi: "चैट व वॉइस मार्गदर्शन",
  },
  "remote.techsOnline": {
    en: "Trained Technicians Online",
    hi: "प्रशिक्षित मैकेनिक ऑनलाइन",
  },

  // Customer Reviews
  "reviews.tag": {
    en: "Real Experiences",
    hi: "सच्चे अनुभव",
  },
  "reviews.title": {
    en: "Verified Customer Reviews",
    hi: "सत्यापित ग्राहकों की समीक्षाएं",
  },
  "reviews.subtitle": {
    en: "Genuine feedback from homeowners and drivers across Delhi NCR, Mumbai, and Bengaluru.",
    hi: "दिल्ली-एनसीआर, मुंबई और बेंगलुरु के वाहन मालिकों व ग्राहकों की वास्तविक समीक्षाएं।",
  },
  "reviews.verified": {
    en: "Verified",
    hi: "सत्यापित",
  },

  // Final CTA
  "cta.tag": {
    en: "Book in Under 60 Seconds",
    hi: "60 सेकंड में बुकिंग",
  },
  "cta.title": {
    en: "Ready for Reliable, Hassle-Free Repairs?",
    hi: "विश्वसनीय और सुरक्षित रिपेयर के लिए तैयार हैं?",
  },
  "cta.subtitle": {
    en: "No hidden fees. No endless waiting. Connect with licensed local electricians, car mechanics, plumbers, and technicians right now.",
    hi: "कोई छुपा हुआ चार्ज नहीं। बिना लंबे इंतजार के अपने नजदीकी कुशल मैकेनिक से तुरंत जुड़ें।",
  },
  "cta.bookNow": {
    en: "Book a Service Now",
    hi: "अभी सर्विस बुक करें",
  },
  "cta.callHelp": {
    en: "Call +91 84396 16833",
    hi: "कॉल करें +91 84396 16833",
  },
  "cta.guarantee": {
    en: "Guaranteed doorstep response within 30 minutes in all operational sectors.",
    hi: "सभी मुख्य क्षेत्रों में 30 मिनट के भीतर गारंटीड डोरस्टेप रिस्पांस।",
  },

  // Services Page
  "servicesPage.headerTitle": {
    en: "Reliable Home & Auto Repair Services",
    hi: "भरोसेमंद होम और ऑटो रिपेयर सेवाएं",
  },
  "servicesPage.headerSubtitle": {
    en: "Verified electricians, plumbers, car/bike mechanics, and appliance technicians with guaranteed upfront pricing.",
    hi: "सत्यापित इलेक्ट्रीशियन, प्लंबर, कार/बाइक मैकेनिक और अप्लायंस टेक्निशियन तय दरों पर।",
  },
  "servicesPage.filters": {
    en: "Filters",
    hi: "फिल्टर",
  },
  "servicesPage.active": {
    en: "Active",
    hi: "सक्रिय",
  },
  "servicesPage.sort": {
    en: "Sort",
    hi: "सॉर्ट",
  },
  "servicesPage.featured": {
    en: "Featured",
    hi: "प्रमुख",
  },
  "servicesPage.priceLowHigh": {
    en: "Price: Low to High",
    hi: "कीमत: कम से ज्यादा",
  },
  "servicesPage.priceHighLow": {
    en: "Price: High to Low",
    hi: "कीमत: ज्यादा से कम",
  },
  "servicesPage.rating": {
    en: "Highest Rated",
    hi: "सर्वोच्च रेटिंग",
  },
  "servicesPage.reset": {
    en: "Reset Filters",
    hi: "फिल्टर रीसेट करें",
  },
  "servicesPage.category": {
    en: "Category",
    hi: "श्रेणी",
  },
  "servicesPage.priceRange": {
    en: "Price Range",
    hi: "कीमत रेंज",
  },
  "servicesPage.under250": {
    en: "Under ₹250",
    hi: "₹250 से कम",
  },
  "servicesPage.p250to500": {
    en: "₹250 - ₹500",
    hi: "₹250 - ₹500",
  },
  "servicesPage.p500to1000": {
    en: "₹500 - ₹1000",
    hi: "₹500 - ₹1000",
  },
  "servicesPage.above1000": {
    en: "Above ₹1000",
    hi: "₹1000 से अधिक",
  },
  "servicesPage.instantOnly": {
    en: "Instant Dispatch Only",
    hi: "केवल त्वरित सेवा",
  },
  "servicesPage.showing": {
    en: "Showing",
    hi: "दिखा रहे हैं",
  },
  "servicesPage.of": {
    en: "of",
    hi: "कुल",
  },
  "servicesPage.servicesCount": {
    en: "services",
    hi: "सेवाएं",
  },
  "servicesPage.perVisit": {
    en: "Standard Visit",
    hi: "स्टैंडर्ड विजिट",
  },
  "servicesPage.instantDispatch": {
    en: "Accepting Instant Dispatch",
    hi: "तुरंत रवानगी उपलब्ध",
  },
  "servicesPage.instantDispatchSub": {
    en: "Under 30 minutes doorstep arrival",
    hi: "30 मिनट में घर पर आगमन",
  },
  "servicesPage.doorstepWarranty": {
    en: "Doorstep Warranty",
    hi: "डोरस्टेप वारंटी",
  },
  "servicesPage.warrantyDesc": {
    en: "Every booked service is protected by JantaGaraj satisfaction guarantee and transparent invoice.",
    hi: "प्रत्येक बुकिंग जनतागैराज संतुष्टि गारंटी और पक्के बिल से सुरक्षित है।",
  },
  "servicesPage.allPrices": {
    en: "All Prices",
    hi: "सभी कीमतें",
  },
  "servicesPage.retry": {
    en: "Retry Loading Services",
    hi: "पुनः प्रयास करें",
  },
  "servicesPage.noServicesMatch": {
    en: "No services found matching your criteria",
    hi: "आपकी खोज के अनुसार कोई सर्विस नहीं मिली",
  },
  "servicesPage.adjustSearch": {
    en: "Try adjusting your search query, selecting another category, or broadening your price filter.",
    hi: "अपनी सर्च क्वेरी बदलें, दूसरी कैटेगरी चुनें या प्राइस फिल्टर बढ़ाएं।",
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
  "Electrician": "इलेक्ट्रीशियन",
  "Plumbing": "प्लंबिंग",
  "AC Repair & Service": "एसी रिपेयर व सर्विस",
  "Appliance Repair": "अप्लायंस रिपेयर",
  "Deep Cleaning": "डीप क्लीनिंग",
  "Auto & Garage Repair": "ऑटो व गैराज रिपेयर",
  "Painting & Waterproofing": "पेंटिंग व वॉटरप्रूफिंग",
  "Carpentry & Woodwork": "कारपेंट्री व वुडवर्क",
  "Carpentry & Furniture Care": "कारपेंट्री व फर्नीचर केयर",
  "CCTV & Smart Security": "सीसीटीवी व स्मार्ट सिक्योरिटी",
  "RO Water Purifier Care": "आरओ वॉटर प्यूरीफायर केयर",
  "RO Water Purifier Service": "आरओ वॉटर प्यूरीफायर सर्विस",
  "Car Denting & Painting": "कार डेंटिंग व पेंटिंग",
  "Car Denting & Body Painting": "कार डेंटिंग व बॉडी पेंटिंग",
  "Windshield & Glass Care": "विंडशील्ड व ग्लास केयर",
  "Windshield, Lights & Glass Care": "ग्लास, विंडशील्ड व हेडलाइट",
  "All Categories": "सभी श्रेणियां",
  "Auto Service": "ऑटो सर्विस",
  "AC Repair": "एसी रिपेयर",
  "Appliance": "अप्लायंस",
  "Cleaning": "क्लीनिंग",
  "Service": "सर्विस",
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
  "General Car Inspection & Comprehensive Service": "जनरल कार इंस्पेक्शन व कम्प्लीट सर्विस",
  "Emergency Battery Jumpstart & Diagnostic": "इमरजेंसी बैटरी जंपस्टार्ट व डायग्नोस्टिक",
  "Split AC Deep Foam Jet Service & Gas Check": "स्प्लिट एसी डीप फोम जेट सर्विस व गैस चेक",
  "Complete Home Electrical Short Circuit Triage": "कम्प्लीट होम शॉर्ट सर्किट रिपेयर",
  "Bathroom Tap & Concealed Pipe Leakage Repair": "बाथरूम नल व पाइप लीकेज रिपेयर",
  "Fully Automatic Washing Machine Drum & Motor Repair": "वॉशिंग मशीन ड्रम व मोटर रिपेयर",
  "General Car Inspection & Comprehensive Engine Check": "जनरल कार इंस्पेक्शन व इंजन चेक",
  "Split AC Jet Deep Foam Service": "स्प्लिट एसी जेट डीप फोम सर्विस",
  "MCB Trip & Kitchen Wiring Repair": "एमसीबी ट्रिप व किचन वायरिंग रिपेयर",
  "Emergency Car Jumpstart & Battery Triage": "इमरजेंसी कार जंपस्टार्ट व बैटरी सर्विस",
  "Wall Dampness Treatment & Anti-Fungal Waterproofing": "दीवारों की सीलन रिपेयर व एंटी-फंगल वॉटरप्रूफिंग",
  "Door Lock, Handle & Concealed Hinge Repair": "दरवाजे का लॉक, हैंडल व कंसील्ड कब्जा रिपेयर",
  "Doorstep HD CCTV Camera Installation & Mobile App Config": "डोरस्टेप HD CCTV कैमरा इंस्टॉलेशन व मोबाइल ऐप सेटअप",
  "Comprehensive RO Service & Multi-Stage Filter Replacement": "कम्प्लीट आरओ सर्विस व फिल्टर रिप्लेसमेंट",
  "Paintless Dent Removal & Minor Scratch Buffing": "पेंटलेस डेंट रिमूवल (PDR) व स्क्रैच बफिंग",
  "Windshield Crack Resin Repair & Headlight Polish": "विंडशील्ड क्रैक रेजिन रिपेयर व हेडलाइट पॉलिश",
  "Interior Wall Fresh Coat & Touch-up Painting": "इंटीरियर दीवार फ्रेश कोट व टच-अप पेंटिंग",
  "Exterior Texture & Weather-Shield Protection": "एक्सटीरियर वेदर-शील्ड पेंटिंग व टेक्सचर",
  "Modular Kitchen Cabinet & Drawer Channel Tuning": "मॉड्यूलर किचन कैबिनेट व ड्रावर चैनल ट्यूनिंग",
  "Custom Furniture Assembly & Wooden Polish": "फर्नीचर असेंबली व वुडन पॉलिश",
  "Smart Video Doorbell & Digital Lock Fitting": "स्मार्ट वीडियो डोरबेल व डिजिटल लॉक फिटिंग",
  "Security DVR/NVR Wiring & Mobile App Live Config": "सिक्योरिटी DVR/NVR वायरिंग व लाइव मोबाइल ऐप कॉन्फ़िग",
  "Water TDS Calibration & Booster Pump Check": "वॉटर TDS कैलिब्रेशन व बूस्टर पंप चेकअप",
  "Full Bumper Realignment & Spot Touch-Up": "बंपर री-अलाइनमेंट व स्पॉट टच-अप",
  "Headlight Lens De-Oxidizing & Buffing Polish": "हेडलाइट लेंस डी-ऑक्सीडाइजिंग व बफिंग पॉलिश",
};

