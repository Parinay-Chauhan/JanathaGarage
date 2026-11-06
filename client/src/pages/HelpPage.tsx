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
  CreditCard,
  CalendarCheck,
  ShieldAlert,
  Send,
  CheckCircle,
  FileQuestion,
  Wrench,
  Clock,
  Radio,
  MapPin,
  ShieldCheck,
  FileText,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { Button } from "../components/ui/Button";

export const HelpPage: React.FC = () => {
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

  const faqData = [
    {
      id: "f-1",
      category: "BOOKING",
      q: "How does doorstep and emergency roadside breakdown dispatch work?",
      a: "Navigate to Services, select your issue (such as Battery Jumpstart, Flat Tyre, Engine Diagnostic, or Electrical Short Circuit), enter your live doorstep or roadside location, and confirm booking. Our proximity dispatch radar assigns the closest certified technician equipped with diagnostic rigs within 3 minutes.",
    },
    {
      id: "f-2",
      category: "BOOKING",
      q: "Can I cancel or reschedule my service appointment? Are there any fees?",
      a: "Yes. You can freely reschedule or cancel anytime before the technician arrives at your site directly from your Customer Bookings dashboard or by calling dispatch at +91 84396 16833. There are strictly ₹0 cancellation charges if cancelled prior to doorstep arrival.",
    },
    {
      id: "f-3",
      category: "PAYMENT",
      q: "When do I pay for my service, and what payment methods are supported?",
      a: "Payment is strictly collected AFTER the technician has completed the repair, conducted a dual-run verification test in your presence, and you have authorized sign-off. We accept all UPI applications (Google Pay, PhonePe, Paytm, BHIM), Debit/Credit Cards, Net Banking, and direct Cash.",
    },
    {
      id: "f-4",
      category: "PAYMENT",
      q: "How does the refund process work if an online booking cannot be fulfilled?",
      a: "If you made an advance digital payment and the work could not be fulfilled due to parts unavailability or cancellation, a 100% refund is initiated automatically to your original payment method within 24 to 48 banking hours. A digital refund confirmation slip is sent via SMS.",
    },
    {
      id: "f-5",
      category: "SAFETY",
      q: "What is the 4-digit Start OTP and why is it mandatory before work begins?",
      a: "The Start OTP prevents unauthorized billing and verifies that the technician who arrived matches the certified engineer assigned on your dashboard. The technician cannot access your vehicle or start work without you sharing this 4-digit OTP from your booking card.",
    },
    {
      id: "f-6",
      category: "WARRANTY",
      q: "What guarantee or warranty do I receive on automotive and home repairs?",
      a: "Every repair on JantaGaraj carries a standardized 30-day / 1,000 KM doorstep workmanship warranty. If the exact same issue reoccurs within 30 days, we dispatch a senior inspector to rectify it with zero service or visiting charges.",
    },
    {
      id: "f-7",
      category: "WARRANTY",
      q: "Are replacement spare parts genuine and covered under manufacturer warranty?",
      a: "Yes. JantaGaraj technicians source exclusively from verified OEM/OES authorized distributors (Bosch, Denso, Tata Motors, MGP, Schneider, Havells). Every part invoice includes serial tracking and manufacturer warranties ranging from 6 months to 2 years.",
    },
    {
      id: "f-8",
      category: "TECHNICIAN",
      q: "How can certified mechanics and electricians join the JantaGaraj fleet?",
      a: "Independent technicians and garage owners can register via our Partner Portal. You must submit Government ID (Aadhaar / Driving License), proof of trade experience or ITI diploma, and pass an in-person diagnostic trade assessment. Once verified, you receive direct local dispatch requests.",
    },
    {
      id: "f-9",
      category: "TECHNICIAN",
      q: "How does JantaGaraj handle rate disputes or unexpected additional repairs?",
      a: "Technicians cannot charge arbitrary amounts. If an additional part or labor is needed during diagnosis, the technician must log the exact line-item in the digital work order. You will receive an OTP prompt to approve the revised estimate before work continues.",
    },
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
              <span>DISPATCH DESK: ONLINE</span>
            </span>
            <span className="text-slate-400 hidden sm:inline font-mono">
              CENTRAL CUSTOMER RESOLUTION &amp; ROADSIDE ASSISTANCE
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto text-slate-400 font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>RESOLUTION SLA: &lt; 120 MINS</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Phone className="w-3.5 h-3.5" />
              <span>EMERGENCY: 24/7 HOTLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 02 HERO HEADER & SEARCH TERMINAL                          */}
      {/* ========================================================= */}
      <section className="relative z-10 pt-12 sm:pt-16 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1f2937] border border-slate-800 text-cyan-400 text-xs font-mono font-medium">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wide">OPERATIONS &amp; CUSTOMER CARE DESK</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight">
            How Can Our Technical Operations Assist You?
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            Search verified diagnostic protocols, OTP security guidelines, flat-rate pricing rules, and 30-day workmanship warranty claims.
          </p>

          {/* Search Bar Terminal */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative p-1.5 rounded-xl bg-[#1f2937] border border-slate-800 flex items-center">
              <Search className="w-4 h-4 text-slate-500 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Search help topics (e.g. cancellation, refund, OTP, battery warranty, rate card)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs sm:text-sm text-white placeholder:text-slate-500 px-3 py-2 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1"
                >
                  CLEAR
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-[11px] font-mono text-cyan-400 mt-2 text-left px-1">
                Found {filteredFaqs.length} matching guidelines
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-14">
        {/* ========================================================= */}
        {/* 03 FAST ESCALATION CHANNELS                               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: 24/7 Phone Support */}
          <div className="p-5 rounded-xl bg-[#1f2937] border border-slate-800 flex flex-col justify-between group hover:border-amber-500/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded uppercase">
                  &lt; 30 SEC CONNECT
                </span>
              </div>
              <h3 className="text-base font-semibold text-white">24/7 Roadside &amp; Home Hotline</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Direct phone link to central dispatch for stranded vehicles, urgent power outages, and active jobs.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <a
                href="tel:+918439616833"
                className="text-sm font-bold font-mono text-white hover:text-amber-400 transition-colors"
              >
                +91 84396 16833
              </a>
              <a
                href="tel:+918439616833"
                className="px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold font-mono uppercase transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Live Desk */}
          <div className="p-5 rounded-xl bg-[#1f2937] border border-slate-800 flex flex-col justify-between group hover:border-cyan-500/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded uppercase">
                  PHOTO &amp; VIDEO TRIAGE
                </span>
              </div>
              <h3 className="text-base font-semibold text-white">WhatsApp Operations Desk</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Send vehicle diagnostic dashboard photos, circuit breaker video clips, or share live GPS coordinates.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Live 8 AM - 11 PM</span>
              <a
                href="https://wa.me/918439616833"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-md bg-[#111827] hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 text-xs font-semibold font-mono uppercase transition-colors flex items-center gap-1.5"
              >
                <span>Chat Desk</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 3: Warranty & Grievance Desk */}
          <div className="p-5 rounded-xl bg-[#1f2937] border border-slate-800 flex flex-col justify-between group hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded uppercase">
                  AUDITED RESOLUTION
                </span>
              </div>
              <h3 className="text-base font-semibold text-white">Warranty &amp; Grievance Email</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                For formal invoice rectifications, corporate fleet partnerships, and 30-day warranty inspections.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <a
                href="mailto:support@jantagaraj.in"
                className="text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                support@jantagaraj.in
              </a>
              <a
                href="mailto:support@jantagaraj.in"
                className="px-3 py-1.5 rounded-md bg-[#111827] hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold font-mono uppercase transition-colors"
              >
                Write Email
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 04 FAQS KNOWLEDGE BASE                                    */}
        {/* ========================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                VERIFIED OPERATIONAL GUIDELINES
              </span>
              <h2 className="text-2xl font-bold font-display text-white tracking-tight mt-1">
                Frequently Addressed Protocols
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Transparent rules regarding emergency dispatch, rate cards, OTP verification, and warranty claims
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: "ALL", label: "ALL TOPICS" },
                { id: "BOOKING", label: "BOOKINGS & DISPATCH" },
                { id: "PAYMENT", label: "PAYMENTS & RATES" },
                { id: "SAFETY", label: "SAFETY & OTP" },
                { id: "WARRANTY", label: "WARRANTY & CLAIMS" },
                { id: "TECHNICIAN", label: "FLEET PARTNERS" },
              ].map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    selectedCategory === tab.id
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-[#1f2937] border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-xl border transition-colors overflow-hidden ${
                      isOpen
                        ? "bg-[#1f2937] border-amber-500/50"
                        : "bg-[#1f2937] border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-sm text-white"
                    >
                      <span className="pr-4 flex items-center gap-2">
                        <span className="text-xs font-mono text-cyan-400 font-bold">
                          Q{idx + 1}.
                        </span>
                        <span>{faq.q}</span>
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 bg-[#111827]/70">
                        <div className="flex items-start gap-2 pt-2">
                          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs font-mono text-slate-400 bg-[#1f2937] rounded-xl border border-slate-800">
                No matching technical guidelines found. Please log a ticket below for manual review.
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 05 DIRECT TICKET SUBMISSION TERMINAL                      */}
        {/* ========================================================= */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#1f2937] border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Resolution Standards */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                INCIDENT &amp; WARRANTY DESK
              </span>
              <h2 className="text-2xl font-bold font-display text-white tracking-tight">
                Log a Central Support Ticket
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Whether you need to report an en-route technician delay, initiate a 30-day workmanship warranty claim, or dispute an invoice line-item, our central operations supervisor logs and addresses every case with an auditable SLA.
              </p>

              <div className="space-y-3 pt-3">
                <div className="p-3 rounded-lg bg-[#111827] border border-slate-800 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold font-mono text-white">120-Minute Resolution SLA</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Direct phone call from a senior support manager within 2 hours.</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#111827] border border-slate-800 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold font-mono text-white">Zero-Cost Re-Inspection</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">If repair workmanship fails within 30 days, re-dispatch is 100% free.</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#111827] border border-slate-800 flex items-start gap-3">
                  <FileText className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold font-mono text-white">Digital Audit Trail</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Every grievance is tied to your Work Order and recorded in our permanent database.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Ticket Form */}
            <div className="lg:col-span-7">
              {formSubmitted ? (
                <div className="p-8 text-center rounded-xl bg-[#111827] border border-cyan-500/40 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      TICKET LOGGED IN CENTRAL DISPATCH
                    </span>
                    <h3 className="text-xl font-bold font-mono text-white">
                      {ticketId}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. Your ticket has been assigned to a central operations supervisor. We will contact you at <span className="font-mono text-amber-400 font-bold">{formData.phone}</span> within 120 minutes.
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
                      className="bg-[#1f2937] hover:bg-slate-800 text-white border border-slate-700 text-xs font-mono uppercase"
                    >
                      Log Another Ticket
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Malhotra"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#111827] border border-slate-800 text-xs sm:text-sm text-white placeholder:text-slate-500 px-3.5 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#111827] border border-slate-800 text-xs sm:text-sm text-white placeholder:text-slate-500 px-3.5 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                        Work Order / Job # (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. JG-4081"
                        value={formData.bookingNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, bookingNumber: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#111827] border border-slate-800 text-xs sm:text-sm text-white placeholder:text-slate-500 px-3.5 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                        Issue Classification *
                      </label>
                      <select
                        value={formData.issueType}
                        onChange={(e) =>
                          setFormData({ ...formData, issueType: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#111827] border border-slate-800 text-xs sm:text-sm text-white px-3.5 py-2.5 focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="BOOKING_HELP">En Route Technician Delay / No-show</option>
                        <option value="QUALITY_WARRANTY">30-Day Workmanship Warranty Claim</option>
                        <option value="PAYMENT_REFUND">Billing / Rate Card Discrepancy</option>
                        <option value="TECHNICIAN_HELP">Technician Partner Fleet Support</option>
                        <option value="OTHER">General Grievance / Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                      Describe the Situation *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please specify vehicle/equipment model, location, and the specific breakdown or warranty issue..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full rounded-lg bg-[#111827] border border-slate-800 text-xs sm:text-sm text-white placeholder:text-slate-500 p-3.5 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-3 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Central Support Ticket</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
