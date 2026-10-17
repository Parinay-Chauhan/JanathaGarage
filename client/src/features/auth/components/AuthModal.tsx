import React, { useState } from "react";
import { Phone, User, KeyRound, Sparkles, AlertCircle, Info, Zap } from "lucide-react";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { useSyncUserMutation } from "../api/authApi";
import { useAppDispatch } from "../../../app/hooks";
import { setCredentials } from "../authSlice";
import { useLanguage } from "../../../context/LanguageContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [syncUser, { isLoading }] = useSyncUserMutation();
  const dispatch = useAppDispatch();
  const { language } = useLanguage();
  const isHi = language === "hi";

  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [errorMsg, setErrorMsg] = useState("");

  const effectivePhone = phone.trim() || "8439616833";

  const handleSendOtp = (e: React.FormEvent) => {
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
    setStep("otp");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setErrorMsg(
        isHi
          ? "कृपया 6-अंकों का OTP दर्ज करें (उदा. 123456)"
          : "Please enter 6-digit OTP (e.g. 123456)"
      );
      return;
    }

    try {
      setErrorMsg("");
      const res = await syncUser({
        firebaseIdToken: "test_token_123",
        fullName: fullName.trim() || "JantaGaraj Customer",
        phone: effectivePhone,
        authProvider: "firebase",
      }).unwrap();

      if (res.data) {
        dispatch(
          setCredentials({
            user: res.data.user,
            accessToken: res.data.accessToken,
          })
        );
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(
        err?.data?.message || (isHi ? "प्रमाणीकरण विफल रहा।" : "Failed to authenticate. Try 1-click login.")
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
        fullName: fullName.trim() || "Parinay Chauhan",
        phone: effectivePhone,
        authProvider: "firebase",
      }).unwrap();

      if (res.data) {
        dispatch(
          setCredentials({
            user: res.data.user,
            accessToken: res.data.accessToken,
          })
        );
        onClose();
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
          ? isHi
            ? "डोरस्टेप गैराज और मैकेनिक सेवाओं के लिए अपना मोबाइल नंबर दर्ज करें"
            : "Enter your mobile number to access doorstep garage services"
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
          <Input
            label={isHi ? "पूरा नाम (नए उपयोगकर्ताओं के लिए)" : "Full Name (for new users)"}
            placeholder={isHi ? "उदा. परिणय चौहान" : "e.g. Parinay Chauhan"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label={isHi ? "मोबाइल नंबर" : "Mobile Number"}
            type="tel"
            placeholder="84396 16833"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            leftIcon={<Phone className="w-4 h-4" />}
            helperText={
              isHi
                ? "डेवलपमेंट मोड: आप अपना 10-अंकों का नंबर दर्ज करके तुरंत लॉगिन कर सकते हैं"
                : "Dev Mode: Enter your mobile number to get instant access"
            }
          />

          <Button type="submit" variant="primary" className="w-full" size="lg">
            {isHi ? "OTP कोड भेजें" : "Send OTP Code"}
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          {/* Clear Dev Mode Notice explaining why telecom SMS is not sent */}
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

          <form onSubmit={handleVerifyOtp} className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-700 dark:text-stone-300">
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
                ? `+91 ${effectivePhone} से लॉगिन करें`
                : `Verify & Continue as +91 ${effectivePhone}`}
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
      <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
        <p className="text-center text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
          {isHi ? "त्वरित टेस्ट लॉगिन" : "Instant Fast Login"}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full border-brand-500/40 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30 font-medium"
          leftIcon={<Sparkles className="w-4 h-4 text-brand-500" />}
          isLoading={isLoading}
          onClick={handleOneClickTestLogin}
        >
          {isHi
            ? `1-क्लिक लॉगिन (+91 ${effectivePhone})`
            : `1-Click Instant Login (+91 ${effectivePhone})`}
        </Button>
      </div>
    </Modal>
  );
};
