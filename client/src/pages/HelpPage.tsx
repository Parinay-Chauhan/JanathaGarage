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
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";

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

  const faqData = [
    {
      id: "f-1",
      category: "BOOKING",
      q: "How do I book an emergency technician on JantaGaraj?",
      a: "Navigate to Services, select your required service (or choose 'Auto Breakdown / Electrician'), enter your current doorstep or road location, and click 'Book Service'. A verified nearby professional will be assigned and dispatched in under 3 minutes.",
    },
    {
      id: "f-2",
      category: "BOOKING",
      q: "Can I cancel or reschedule my service appointment?",
      a: "Yes. You can cancel or reschedule freely anytime before the technician arrives at your location via your Customer Bookings dashboard or by calling our support line. There are zero cancellation charges if cancelled before technician dispatch.",
    },
    {
      id: "f-3",
      category: "PAYMENT",
      q: "What payment methods are supported, and when do I pay?",
      a: "Payment is strictly collected AFTER the technician has completed the repair and verified performance. You can pay via any UPI app (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Card, or direct Cash to the technician.",
    },
    {
      id: "f-4",
      category: "PAYMENT",
      q: "How does the refund process work if a service is cancelled after pre-payment?",
      a: "If you made an online pre-payment and the service was cancelled or couldn't be fulfilled, a 100% refund is initiated automatically back to your source account within 24 to 48 banking hours.",
    },
    {
      id: "f-5",
      category: "SAFETY",
      q: "What is the 4-digit Start OTP and why is it necessary?",
      a: "The Start OTP ensures total customer safety and prevents unauthorized billing. When the technician arrives at your doorstep, you provide the 4-digit OTP shown in your booking card. The technician cannot mark the job started or complete without this OTP.",
    },
    {
      id: "f-6",
      category: "SAFETY",
      q: "What warranty or guarantee do I receive on repairs?",
      a: "All services booked on JantaGaraj come with a standardized 30-day doorstep workmanship warranty. If the same issue reoccurs within 30 days, we dispatch a senior inspector free of charge.",
    },
    {
      id: "f-7",
      category: "TECHNICIAN",
      q: "How can I join JantaGaraj as a registered mechanic or technician partner?",
      a: "Technicians can sign up on our partner portal, upload Govt ID (Aadhaar or Driving License), select their repair trades and operating radius, and complete KYC verification. Once verified by our admin team, you start receiving direct local bookings.",
    },
    {
      id: "f-8",
      category: "TECHNICIAN",
      q: "What should I do if a customer delays payment or has a dispute?",
      a: "Every transaction is tracked on our central ledger. In case of any dispute or payment glitch, immediately tap 'Report Dispute' in your Technician Dashboard or call our dedicated technician helpline (+91 84396 16833). Our desk resolves payment disputes within 2 hours.",
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
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] min-h-screen pb-24 transition-colors">
      {/* Header & Search */}
      <section className="border-b border-[#E7E5DF] dark:border-[#2B231D] bg-white/60 dark:bg-[#141210]/60 backdrop-blur-sm py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-[#2B231D] text-[#E87532] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & Customer Care Center</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-[1.28] text-[#252621] dark:text-[#F5F2EB]">
            How Can We Help You Today?
          </h1>

          <p className="text-sm sm:text-base text-[#717167] dark:text-[#9E9488] max-w-xl mx-auto">
            Search our knowledge base for answers on bookings, cancellations, refund timelines, and technician safety.
          </p>

          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#8F8F85]" />
            <input
              type="text"
              placeholder="Search help topics (e.g. cancellation, refund, OTP, payment)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-sm text-[#252621] dark:text-[#F5F2EB] placeholder:text-[#8F8F85] focus:outline-none focus:ring-2 focus:ring-[#E87532]/20 focus:border-[#E87532] shadow-card"
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Quick Contact Action Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E87532]/10 text-[#E87532] flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#8F8F85] font-semibold uppercase tracking-wider">
                24/7 Phone Support
              </p>
              <a
                href="tel:+918439616833"
                className="text-sm sm:text-base font-bold text-[#252621] dark:text-[#F5F2EB] hover:text-[#E87532] transition-colors"
              >
                +91 84396 16833
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#8F8F85] font-semibold uppercase tracking-wider">
                WhatsApp Desk
              </p>
              <a
                href="https://wa.me/918439616833"
                target="_blank"
                rel="noreferrer"
                className="text-sm sm:text-base font-bold text-[#252621] dark:text-[#F5F2EB] hover:text-emerald-600 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#8F8F85] font-semibold uppercase tracking-wider">
                Official Email
              </p>
              <a
                href="mailto:support@jantagaraj.in"
                className="text-sm sm:text-base font-bold text-[#252621] dark:text-[#F5F2EB] hover:text-sky-600 transition-colors"
              >
                support@jantagaraj.in
              </a>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-[#717167] dark:text-[#9E9488] mt-0.5">
                Clear guidelines on booking, payment safety, and partner policies
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: "ALL", label: "All Topics" },
                { id: "BOOKING", label: "Bookings" },
                { id: "PAYMENT", label: "Payments & Refunds" },
                { id: "SAFETY", label: "Safety & OTP" },
                { id: "TECHNICIAN", label: "For Technicians" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === tab.id
                      ? "bg-[#E87532] text-white shadow-orange-glow"
                      : "bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-[#717167] hover:bg-[#F8F7F3]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl border border-[#E7E5DF] dark:border-[#2B231D] bg-white dark:bg-[#141210] shadow-subtle overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm text-[#252621] dark:text-[#F5F2EB] hover:bg-[#F8F7F3]/50 transition-colors"
                    >
                      <span className="pr-4">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#E87532] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8F8F85] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 text-xs sm:text-sm text-[#717167] dark:text-[#9E9488] leading-relaxed border-t border-[#E7E5DF] dark:border-[#2B231D] bg-[#F8F7F3]/30 dark:bg-[#1A1613]/30">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-[#717167] dark:text-[#9E9488] bg-white dark:bg-[#141210] rounded-2xl border border-[#E7E5DF] dark:border-[#2B231D]">
                No questions found matching your search. Please reach out via the support form below.
              </div>
            )}
          </div>
        </div>

        {/* Contact & Grievance Support Form */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
                Need Direct Assistance?
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-[#F5F2EB]">
                Send Us a Support Message
              </h2>
              <p className="text-xs sm:text-sm text-[#717167] dark:text-[#9E9488] leading-relaxed">
                Whether you have an issue with an ongoing booking, need clarification on an invoice, or want to report an issue with a technician, our central resolution team responds within 2 hours.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-[#252621] dark:text-[#F5F2EB]">
                    Average response under 120 minutes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-[#252621] dark:text-[#F5F2EB]">
                    Assigned support ticket tracking
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-[#252621] dark:text-[#F5F2EB]">
                    Direct manager escalation if dissatisfied
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              {formSubmitted ? (
                <div className="p-8 text-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h3 className="text-lg font-bold text-[#252621] dark:text-[#F5F2EB]">
                    Support Ticket Logged Successfully
                  </h3>
                  <p className="text-xs text-[#717167] dark:text-[#9E9488]">
                    Thank you. Ticket ID #JG-{(Math.random() * 90000 + 10000).toFixed(0)} has been created. A support executive will contact you at {formData.phone || "your number"} shortly.
                  </p>
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
                    className="text-xs font-bold mt-2"
                  >
                    Submit Another Query
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      placeholder="e.g. Parinay Chauhan"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                    <Input
                      label="Mobile Number"
                      placeholder="10-digit phone number"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Booking Number (Optional)"
                      placeholder="e.g. BK-2026-0042"
                      value={formData.bookingNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, bookingNumber: e.target.value })
                      }
                    />
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#252621]/80 dark:text-[#F5F2EB]/80">
                        Issue Type
                      </label>
                      <select
                        value={formData.issueType}
                        onChange={(e) =>
                          setFormData({ ...formData, issueType: e.target.value })
                        }
                        className="w-full rounded-xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-xs sm:text-sm text-[#252621] dark:text-[#F5F2EB] px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E87532]/20 focus:border-[#E87532]"
                      >
                        <option value="BOOKING_HELP">Booking Assistance / Delay</option>
                        <option value="PAYMENT_REFUND">Payment or Refund Query</option>
                        <option value="QUALITY_WARRANTY">Workmanship Warranty Claim</option>
                        <option value="TECHNICIAN_HELP">Technician Partner Support</option>
                        <option value="OTHER">General Feedback / Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#252621]/80 dark:text-[#F5F2EB]/80">
                      Message / Describe The Issue
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please provide details of your issue so we can assist you quickly..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full rounded-xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-xs sm:text-sm text-[#252621] dark:text-[#F5F2EB] p-3.5 focus:outline-none focus:ring-2 focus:ring-[#E87532]/20 focus:border-[#E87532]"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full font-bold shadow-orange-glow py-3"
                    leftIcon={<Send className="w-4 h-4" />}
                  >
                    Submit Support Ticket
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
