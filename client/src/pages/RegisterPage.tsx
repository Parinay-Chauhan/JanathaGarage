import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Wrench,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { useSyncUserMutation } from "../features/auth/api/authApi";
import { useOnboardTechnicianMutation } from "../features/technician-dashboard/api/technicianDashboardApi";
import { useAppDispatch } from "../app/hooks";
import { setCredentials } from "../features/auth/authSlice";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  auth,
  isFirebaseConfigured,
  getRecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "../features/auth/utils/firebase";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [syncUser, { isLoading: isSyncing }] = useSyncUserMutation();

  // Role: CUSTOMER or TECHNICIAN
  const [selectedRole, setSelectedRole] = useState<"CUSTOMER" | "TECHNICIAN">("CUSTOMER");
  const [step, setStep] = useState<"details" | "otp">("details");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Delhi NCR");
  const [address, setAddress] = useState("");
  const [otp, setOtp] = useState("");

  // Technician Specific
  const [specialty, setSpecialty] = useState("mechanic");
  const [experienceYears, setExperienceYears] = useState("5");
  const [visitingCharge, setVisitingCharge] = useState("199");

  const [errorMsg, setErrorMsg] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const handleStartRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full legal name");
      return;
    }
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number");
      return;
    }

    setErrorMsg("");
    setIsSendingOtp(true);

    if (isFirebaseConfigured && auth) {
      try {
        const verifier = getRecaptchaVerifier(auth);
        const confirmation = await signInWithPhoneNumber(
          auth,
          `+91${cleanPhone}`,
          verifier
        );
        setConfirmationResult(confirmation);
        setStep("otp");
      } catch (err: any) {
        console.error("Firebase send OTP error:", err);
        setErrorMsg(
          err?.message || "Failed to dispatch SMS. Please try dev bypass."
        );
      } finally {
        setIsSendingOtp(false);
      }
      return;
    }

    // Dev Fallback
    setTimeout(() => {
      setIsSendingOtp(false);
      setStep("otp");
    }, 500);
  };

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setErrorMsg("Please enter the 6-digit verification code");
      return;
    }

    try {
      setErrorMsg("");
      let firebaseToken = "test_token_123";

      if (confirmationResult) {
        const userCredential = await confirmationResult.confirm(otp);
        firebaseToken = await userCredential.user.getIdToken();
      }

      const cleanPhone = phone.replace(/\D/g, "").slice(-10) || "8439616833";
      const res = await syncUser({
        firebaseIdToken: firebaseToken,
        fullName: fullName.trim(),
        phone: cleanPhone,
        authProvider: "firebase",
      }).unwrap();

      if (res.data) {
        const loggedUser = res.data.user;
        dispatch(
          setCredentials({
            user: loggedUser,
            accessToken: res.data.accessToken,
          })
        );

        if (selectedRole === "TECHNICIAN") {
          navigate("/technician/dashboard", { replace: true });
        } else {
          navigate("/customer/dashboard", { replace: true });
        }
      }
    } catch (err: any) {
      setErrorMsg(
        err?.data?.message || err?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] min-h-screen py-16 px-4 flex items-center justify-center transition-colors">
      <div id="recaptcha-container" />

      <div className="w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-[#E87532] flex items-center justify-center text-white shadow-orange-glow group-hover:scale-105 transition-transform">
              <span className="font-mono font-extrabold text-base">JG</span>
            </div>
            <span className="text-2xl font-extrabold font-display tracking-tight text-[#252621] dark:text-[#F5F2EB]">
              Janta<span className="text-[#E87532]">Garaj</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold font-display text-[#252621] dark:text-[#F5F2EB] pt-1">
            Create Your Account
          </h1>
          <p className="text-xs text-[#717167] dark:text-[#9E9488]">
            Join thousands of happy homeowners or start earning as a certified technician
          </p>
        </div>

        {/* Card */}
        <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === "details" ? (
            <form onSubmit={handleStartRegistration} className="space-y-5">
              {/* Account Type Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#252621]/80 dark:text-[#F5F2EB]/80">
                  Select Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("CUSTOMER")}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedRole === "CUSTOMER"
                        ? "border-[#E87532] bg-orange-50/60 dark:bg-orange-950/30 text-[#E87532]"
                        : "border-[#E7E5DF] dark:border-[#2B231D] text-[#717167] dark:text-[#9E9488] hover:bg-[#F8F7F3]"
                    }`}
                  >
                    <User className="w-5 h-5 mb-1.5" />
                    <p className="font-bold text-xs text-[#252621] dark:text-[#F5F2EB]">
                      Customer
                    </p>
                    <p className="text-[10px] text-[#8F8F85]">
                      Book home & auto repairs
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("TECHNICIAN")}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedRole === "TECHNICIAN"
                        ? "border-[#E87532] bg-orange-50/60 dark:bg-orange-950/30 text-[#E87532]"
                        : "border-[#E7E5DF] dark:border-[#2B231D] text-[#717167] dark:text-[#9E9488] hover:bg-[#F8F7F3]"
                    }`}
                  >
                    <Wrench className="w-5 h-5 mb-1.5" />
                    <p className="font-bold text-xs text-[#252621] dark:text-[#F5F2EB]">
                      Technician Partner
                    </p>
                    <p className="text-[10px] text-[#8F8F85]">
                      Offer repair services & earn
                    </p>
                  </button>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <Input
                  label="Full Legal Name"
                  placeholder="e.g. Parinay Chauhan"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#252621]/80 dark:text-[#F5F2EB]/80">
                    Mobile Number (For Verification OTP)
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center gap-1 text-xs font-bold text-[#252621] dark:text-[#F5F2EB] border-r border-[#E7E5DF] dark:border-[#2B231D] pr-2.5">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="w-full pl-20 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-sm font-mono text-[#252621] dark:text-[#F5F2EB] focus:outline-none focus:ring-2 focus:ring-[#E87532]/20 focus:border-[#E87532]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Operating City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    label="Area / Landmark"
                    placeholder="e.g. Sector 62 / Andheri East"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* Technician Specific Fields */}
              {selectedRole === "TECHNICIAN" && (
                <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] space-y-3.5 animate-in fade-in duration-300">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#E87532] flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Technician Trade Information
                  </p>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold uppercase text-[#717167]">
                      Primary Trade Specialization
                    </label>
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="w-full rounded-xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] text-xs py-2 px-3 focus:outline-none focus:border-[#E87532]"
                    >
                      <option value="mechanic">Automotive Mechanic (Cars/Bikes)</option>
                      <option value="electrician">Licensed Electrician</option>
                      <option value="plumbing">Plumbing Specialist</option>
                      <option value="ac-repair">HVAC & AC Service Technician</option>
                      <option value="appliance">Home Appliance Specialist</option>
                      <option value="cleaning">Deep Cleaning & Sanitization</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Experience (Years)"
                      type="number"
                      min="1"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                    />
                    <Input
                      label="Base Visiting Fee (₹)"
                      type="number"
                      min="99"
                      value={visitingCharge}
                      onChange={(e) => setVisitingCharge(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSendingOtp}
                className="w-full font-bold shadow-orange-glow py-3"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {isSendingOtp ? "Sending Verification SMS..." : "Proceed to Phone Verification"}
              </Button>
            </form>
          ) : (
            /* Step 2: Verification */
            <form onSubmit={handleCompleteRegistration} className="space-y-5">
              <div className="text-center space-y-1">
                <span className="text-xs text-[#8F8F85]">
                  Verification Code sent to
                </span>
                <p className="font-mono font-bold text-sm text-[#252621] dark:text-[#F5F2EB]">
                  +91 {phone}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs text-center font-semibold uppercase tracking-wider text-[#252621]/80 dark:text-[#F5F2EB]/80">
                  Enter 6-Digit OTP
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full text-center tracking-[0.5em] text-xl font-mono font-extrabold py-3 rounded-xl bg-white dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-[#252621] dark:text-[#F5F2EB] focus:outline-none focus:ring-2 focus:ring-[#E87532]/20 focus:border-[#E87532]"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSyncing}
                className="w-full font-bold shadow-orange-glow py-3"
              >
                {isSyncing ? "Creating Account..." : "Confirm & Complete Account"}
              </Button>

              <button
                type="button"
                onClick={() => setOtp("123456")}
                className="w-full text-center text-[11px] text-[#8F8F85] hover:text-[#E87532] underline"
              >
                Auto-fill dev OTP (123456)
              </button>
            </form>
          )}

          {/* Login Link */}
          <div className="text-center text-xs text-[#717167] dark:text-[#9E9488] pt-1">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-[#E87532] hover:underline">
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
