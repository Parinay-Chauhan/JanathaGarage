import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Phone,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap,
  User,
  Wrench,
} from "lucide-react";
import { useSyncUserMutation } from "../features/auth/api/authApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
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

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [syncUser, { isLoading: isSyncing }] = useSyncUserMutation();

  const [selectedRole, setSelectedRole] = useState<"CUSTOMER" | "TECHNICIAN">("CUSTOMER");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated && user) {
      const from = (location.state as any)?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.role === "TECHNICIAN") {
        navigate("/technician/dashboard", { replace: true });
      } else {
        navigate("/customer/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, location]);

  // Resend countdown timer
  useEffect(() => {
    let interval: any;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
        setResendTimer(30);
        setCanResend(false);
      } catch (err: any) {
        console.error("Firebase send OTP error:", err);
        setErrorMsg(
          err?.message ||
            "Unable to dispatch SMS. Please verify your number or use dev bypass."
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
      setResendTimer(30);
      setCanResend(false);
    }, 600);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length < 6) {
      setErrorMsg("Please enter the 6-digit OTP sent to your phone");
      return;
    }

    try {
      setErrorMsg("");
      let firebaseToken = "test_token_123";

      if (cleanOtp === "123456") {
        firebaseToken = "test_token_123";
      } else if (confirmationResult) {
        try {
          const userCredential = await confirmationResult.confirm(cleanOtp);
          firebaseToken = await userCredential.user.getIdToken();
        } catch (firebaseErr: any) {
          console.warn("Firebase confirm error:", firebaseErr);
          if (
            firebaseErr?.code === "auth/invalid-verification-code" ||
            firebaseErr?.message?.includes("invalid-verification-code")
          ) {
            setErrorMsg(
              "Invalid verification code. Please enter the 6-digit SMS code sent to your phone, or use test code 123456."
            );
            return;
          }
          throw firebaseErr;
        }
      }

      const cleanPhone = phone.replace(/\D/g, "").slice(-10) || "8439616833";
      const res = await syncUser({
        firebaseIdToken: firebaseToken,
        fullName: selectedRole === "TECHNICIAN" ? "JantaGaraj Partner" : "JantaGaraj Customer",
        phone: cleanPhone,
        authProvider: "firebase",
        role: selectedRole,
      }).unwrap();

      if (res.data) {
        dispatch(
          setCredentials({
            user: res.data.user,
            accessToken: res.data.accessToken,
          })
        );
      }
    } catch (err: any) {
      setErrorMsg(
        err?.data?.message ||
          err?.message ||
          "Invalid OTP code. Please check and try again."
      );
    }
  };

  const handleDevQuickLogin = async () => {
    try {
      setErrorMsg("");
      const res = await syncUser({
        firebaseIdToken: "test_token_123",
        fullName: selectedRole === "TECHNICIAN" ? "Parinay Chauhan (Partner)" : "Parinay Chauhan",
        phone: "8439616833",
        authProvider: "firebase",
        role: selectedRole,
      }).unwrap();

      if (res.data) {
        dispatch(
          setCredentials({
            user: res.data.user,
            accessToken: res.data.accessToken,
          })
        );
      }
    } catch (err: any) {
      setErrorMsg(err?.data?.message || "Dev login failed");
    }
  };

  const handleDevTechnicianLogin = () => {
    dispatch(
      setCredentials({
        user: {
          id: "tech-vikram-101",
          phone: "+91 84396 16833",
          fullName: "Vikramjit Singh",
          role: "TECHNICIAN",
          isActive: true,
          technicianProfile: {
            id: "tech-vikram-101",
            userId: "tech-vikram-101",
            experienceYears: 7,
            baseVisitingCharge: 249,
            serviceRadiusKm: 15,
            isOnline: true,
            isAvailable: true,
            kycStatus: "VERIFIED",
            docType: "AADHAAR",
            docNumber: "XXXX-XXXX-8921",
            docUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
            avgRating: 4.92,
            totalReviews: 128,
          },
        },
        accessToken: "test_tech_token_123",
      })
    );
    navigate("/technician/dashboard", { replace: true });
  };

  return (
    <div className="bg-[#F8F7F3] dark:bg-[#040404] text-[#252621] dark:text-[#F5F2EB] min-h-screen py-16 px-4 flex items-center justify-center transition-colors">
      {/* Invisible reCAPTCHA container for Firebase Phone Auth */}
      <div id="recaptcha-container" />

      <div className="w-full max-w-md space-y-6">
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
            {step === "phone" ? "Sign In to Your Account" : "Verify Mobile Number"}
          </h1>
          <p className="text-xs text-[#717167] dark:text-[#9E9488]">
            {step === "phone"
              ? selectedRole === "CUSTOMER"
                ? "Access customer bookings, tracking, and invoices with one OTP"
                : "Manage repair jobs, partner earnings & service requests"
              : `Enter the 6-digit OTP code sent to +91 ${phone}`}
          </p>
        </div>

        {/* Auth Card */}
        <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] shadow-card space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === "phone" ? (
            /* Step 1: Phone Number Input */
            <form onSubmit={handleSendOtp} className="space-y-4">
              {/* Account Role Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#252621]/80 dark:text-[#F5F2EB]/80">
                  Select Account Type
                </label>
                <div className="grid grid-cols-2 gap-2.5 p-1 rounded-2xl bg-[#F4F3EE] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("CUSTOMER")}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      selectedRole === "CUSTOMER"
                        ? "bg-[#E87532] text-white shadow-orange-glow"
                        : "text-[#717167] dark:text-[#9E9488] hover:text-[#252621] dark:hover:text-[#F5F2EB]"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Customer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("TECHNICIAN")}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      selectedRole === "TECHNICIAN"
                        ? "bg-[#E87532] text-white shadow-orange-glow"
                        : "text-[#717167] dark:text-[#9E9488] hover:text-[#252621] dark:hover:text-[#F5F2EB]"
                    }`}
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Service Partner</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#252621]/80 dark:text-[#F5F2EB]/80">
                  Mobile Number
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
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full pl-20 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-sm font-mono text-[#252621] dark:text-[#F5F2EB] focus:outline-none focus:ring-2 focus:ring-[#E87532]/20 focus:border-[#E87532]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSendingOtp}
                className="w-full font-bold shadow-orange-glow py-3"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {isSendingOtp ? "Sending OTP..." : "Get Verification Code"}
              </Button>
            </form>
          ) : (
            /* Step 2: OTP Verification */
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold uppercase tracking-wider text-[#252621]/80 dark:text-[#F5F2EB]/80">
                    6-Digit OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setStep("phone");
                      setErrorMsg("");
                    }}
                    className="text-[#E87532] font-semibold hover:underline"
                  >
                    Change Number
                  </button>
                </div>
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

              {/* Resend Timer */}
              <div className="flex items-center justify-between text-xs text-[#717167] dark:text-[#9E9488]">
                <span>Didn't receive SMS?</span>
                {canResend ? (
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    className="font-bold text-[#E87532] hover:underline"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span>Resend in {resendTimer}s</span>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSyncing}
                className="w-full font-bold shadow-orange-glow py-3"
              >
                {isSyncing ? "Verifying..." : "Verify & Sign In"}
              </Button>

              {/* Test Autofill for Rapid Testing */}
              <button
                type="button"
                onClick={() => setOtp("123456")}
                className="w-full text-center text-[11px] text-[#8F8F85] hover:text-[#E87532] underline"
              >
                Auto-fill dev OTP (123456)
              </button>
            </form>
          )}

          {/* Dev 1-Click Fast Bypass */}
          <div className="pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D] space-y-2">
            <button
              type="button"
              onClick={handleDevQuickLogin}
              disabled={isSyncing}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs font-semibold text-[#252621] dark:text-[#F5F2EB] hover:border-[#E87532]/50 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Instant Customer Login (Parinay Chauhan)</span>
            </button>

            <button
              type="button"
              onClick={handleDevTechnicianLogin}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 text-xs font-bold text-[#E87532] hover:bg-orange-100/50 transition-colors"
            >
              <Wrench className="w-3.5 h-3.5 text-[#E87532]" />
              <span>Instant Technician Login (Vikramjit Singh - Partner)</span>
            </button>
          </div>

          {/* New User Navigation */}
          <div className="text-center text-xs text-[#717167] dark:text-[#9E9488] pt-1">
            New to JantaGaraj?{" "}
            <Link
              to="/register"
              className="font-bold text-[#E87532] hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Terms & Privacy */}
        <p className="text-center text-[11px] text-[#8F8F85] leading-relaxed">
          By signing in, you agree to JantaGaraj's{" "}
          <Link to="/about" className="underline hover:text-[#252621]">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/about" className="underline hover:text-[#252621]">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
