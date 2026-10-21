import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, User, KeyRound, Sparkles, AlertCircle, Info, Zap, Wrench } from "lucide-react";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { useSyncUserMutation } from "../api/authApi";
import { useAppDispatch } from "../../../app/hooks";
import { setCredentials } from "../authSlice";
import { useLanguage } from "../../../context/LanguageContext";
import {
  auth,
  isFirebaseConfigured,
  getRecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "../utils/firebase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [syncUser, { isLoading }] = useSyncUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isHi = language === "hi";

  const [selectedRole, setSelectedRole] = useState<"CUSTOMER" | "TECHNICIAN">("CUSTOMER");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const effectivePhone = phone.replace(/\D/g, "").slice(-10) || "8439616833";

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMsg(
        isHi
          ? "कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें"
          : "Please enter a valid 10-digit mobile number"
      );
      return;
    }
    setErrorMsg("");

    // Real Firebase Phone Auth if configured
    if (isFirebaseConfigured && auth) {
      setIsSendingOtp(true);
      try {
        const verifier = getRecaptchaVerifier(auth);
        const cleanPhone = phone.replace(/\D/g, "").slice(-10);
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
          err?.message ||
            (isHi
              ? "SMS भेजने में विफल। कृपया पुनः प्रयास करें।"
              : "Failed to dispatch SMS. Please try again.")
        );
      } finally {
        setIsSendingOtp(false);
      }
      return;
    }

    // Dev Fallback
    setStep("otp");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otp.trim();
    if (!cleanOtp) {
      setErrorMsg(
        isHi
          ? "कृपया 6-अंकों का OTP दर्ज करें (उदा. 123456)"
          : "Please enter 6-digit OTP (e.g. 123456)"
      );
      return;
    }

    try {
      setErrorMsg("");
      let firebaseToken = "test_token_123";

      // If test OTP 123456 is used, bypass Firebase confirmation directly
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
              isHi
                ? "अमान्य OTP कोड। कृपया अपने मोबाइल पर आया सही 6-अंकों का SMS OTP दर्ज करें या त्वरित लॉगिन के लिए 'Auto-Fill 123456' / '1-Click Login' चुनें।"
                : "Invalid verification code. Please enter the 6-digit SMS code sent to your phone, or use 'Auto-Fill 123456' / '1-Click Login'."
            );
            return;
          }
          throw firebaseErr;
        }
      }

      const res = await syncUser({
        firebaseIdToken: firebaseToken,
        fullName: fullName.trim() || (selectedRole === "TECHNICIAN" ? "JantaGaraj Partner" : "JantaGaraj Customer"),
        phone: effectivePhone,
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
        onClose();
        if (res.data.user.role === "TECHNICIAN") {
          navigate("/technician/dashboard");
        } else if (res.data.user.role === "ADMIN") {
          navigate("/admin/dashboard");
        }
      }
    } catch (err: any) {
      setErrorMsg(
        err?.data?.message || err?.message || (isHi ? "प्रमाणीकरण विफल रहा।" : "Failed to authenticate.")
      );
    }
  };

  const handleAutoFillOtp = () => {
    setOtp("123456");
    setErrorMsg("");
  };

  const handleOneClickTestLogin = async () => {
    try {
      setErrorMsg("");
      const res = await syncUser({
        firebaseIdToken: "test_token_123",
        fullName: fullName.trim() || (selectedRole === "TECHNICIAN" ? "Parinay Chauhan (Partner)" : "Parinay Chauhan"),
        phone: effectivePhone,
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
        onClose();
        if (res.data.user.role === "TECHNICIAN") {
          navigate("/technician/dashboard");
        } else if (res.data.user.role === "ADMIN") {
          navigate("/admin/dashboard");
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.data?.message || (isHi ? "लॉगिन विफल रहा।" : "Test login failed."));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        step === "phone"
          ? isHi
            ? "जनतागैराज में लॉगिन करें"
            : "Sign In to JantaGaraj"
          : isHi
          ? "सत्यापन कोड दर्ज करें"
          : "Enter Verification Code"
      }
      description={
        step === "phone"
          ? selectedRole === "CUSTOMER"
            ? isHi
              ? "डोरस्टेप गैराज व होम रिपेयर सेवाओं के लिए अपना मोबाइल नंबर दर्ज करें"
              : "Enter your mobile number to access doorstep garage services"
            : isHi
              ? "मैकेनिक पार्टनर पोर्टल और जॉब्स एक्सेस करने के लिए नंबर दर्ज करें"
              : "Enter your mobile number to access partner portal & jobs"
          : isHi
          ? `नंबर +91 ${effectivePhone} का सत्यापन`
          : `Verifying number +91 ${effectivePhone}`
      }
      maxWidth="md"
    >
      {errorMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {step === "phone" ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          {/* Role Selection Tabs: Customer vs Service Provider */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#717167] dark:text-[#9E9488]">
              {isHi ? "खाता प्रकार चुनें (Account Type)" : "Select Account Type"}
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#F4F3EE] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
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
                <span>{isHi ? "ग्राहक (Customer)" : "Customer"}</span>
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
                <span>{isHi ? "सर्विस पार्टनर (Partner)" : "Service Partner"}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#8F8F85] text-center pt-0.5">
              {selectedRole === "CUSTOMER"
                ? isHi
                  ? "डोरस्टेप रिपेयर बुकिंग और ट्रैकिंग के लिए ग्राहक खाता"
                  : "Book repairs, track live arrival & view upfront quotes"
                : isHi
                  ? "रिपेयर अनुरोध स्वीकार करने और कमाई के लिए मैकेनिक खाता"
                  : "Accept booking requests & manage jobs as a service provider"}
            </p>
          </div>

          <Input
            label={isHi ? "पूरा नाम (नए उपयोगकर्ताओं के लिए)" : "Full Name (for new users)"}
            placeholder={
              selectedRole === "TECHNICIAN"
                ? isHi
                  ? "अपना नाम या वर्कशॉप का नाम दर्ज करें"
                  : "Enter your name or workshop name"
                : isHi
                ? "अपना पूरा नाम दर्ज करें"
                : "Enter your full name"
            }
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label={isHi ? "मोबाइल नंबर" : "Mobile Number"}
            type="tel"
            placeholder={
              isHi
                ? "10 अंकों का मोबाइल नंबर दर्ज करें"
                : "Enter 10-digit mobile number"
            }
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            leftIcon={<Phone className="w-4 h-4" />}
            helperText={
              isHi
                ? "डेवलपमेंट मोड: आप अपना 10-अंकों का नंबर दर्ज करके तुरंत लॉगिन कर सकते हैं"
                : "Dev Mode: Enter your mobile number to get instant access"
            }
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            size="lg"
            isLoading={isSendingOtp}
          >
            {isHi ? "OTP कोड भेजें" : "Send OTP Code"}
          </Button>
          <div id="recaptcha-container"></div>
        </form>
      ) : (
        <div className="space-y-4">
          {/* Show Dev Mode Notice only when real Firebase Web credentials are not configured */}
          {!isFirebaseConfigured && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-semibold">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>
                  {isHi ? "डेवलपमेंट मोड: SMS गेटवे सैंडबॉक्स में है" : "Dev Mode: SMS Gateway is in Sandbox"}
                </span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-stone-600 dark:text-stone-400">
                {isHi
                  ? "लाइव टेलीकॉम SMS अभी कनेक्ट नहीं है, इसलिए सिम कार्ड पर SMS नहीं आएगा। टेस्टिंग के लिए टेस्ट OTP 123456 का उपयोग करें या नीचे बटन दबाएं।"
                  : "Live telecom SMS is not dispatched in dev environment. Use test OTP: 123456 or click Auto-Fill below."}
              </p>
            </div>
          )}

          <form onSubmit={handleVerifyOtp} className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-700 dark:text-[#D1C7BD]">
                  {isHi ? "6-अंकों का OTP" : "6-Digit OTP"}
                </label>
                <button
                  type="button"
                  onClick={handleAutoFillOtp}
                  className="flex items-center gap-1 text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <Zap className="w-3 h-3" />
                  {isHi ? "123456 ऑटो-फिल करें" : "Auto-Fill 123456"}
                </button>
              </div>
              <Input
                placeholder="1 2 3 4 5 6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                leftIcon={<KeyRound className="w-4 h-4" />}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              {isHi
                ? `+91 ${effectivePhone} (${selectedRole === "TECHNICIAN" ? "पार्टनर" : "ग्राहक"}) से लॉगिन करें`
                : `Continue as ${selectedRole === "TECHNICIAN" ? "Partner" : "Customer"} (+91 ${effectivePhone})`}
            </Button>

            <button
              type="button"
              onClick={() => setStep("phone")}
              className="w-full text-center text-xs font-semibold text-brand-500 hover:underline pt-1"
            >
              {isHi ? "नंबर बदलें" : "Change Phone Number"}
            </button>
          </form>
        </div>
      )}

      {/* Instant 1-Click Login Action */}
      <div className="pt-4 border-t border-stone-200 dark:border-[#261E18] space-y-2">
        <p className="text-center text-[11px] uppercase tracking-wider text-stone-500 dark:text-[#8C8075] font-semibold">
          {isHi ? "त्वरित टेस्ट लॉगिन" : "Instant Fast Login"}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full border-brand-500/40 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-[#1C1713] font-medium"
          leftIcon={<Sparkles className="w-4 h-4 text-brand-500" />}
          isLoading={isLoading}
          onClick={handleOneClickTestLogin}
        >
          {isHi
            ? `1-क्लिक ${selectedRole === "TECHNICIAN" ? "पार्टनर" : "ग्राहक"} लॉगिन (+91 ${effectivePhone})`
            : `1-Click ${selectedRole === "TECHNICIAN" ? "Partner" : "Customer"} Login (+91 ${effectivePhone})`}
        </Button>
      </div>
    </Modal>
  );
};
