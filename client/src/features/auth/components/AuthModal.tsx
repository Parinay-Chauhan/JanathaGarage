import React, { useState } from "react";
import { Phone, User, KeyRound, Sparkles, AlertCircle } from "lucide-react";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { useSyncUserMutation } from "../api/authApi";
import { useAppDispatch } from "../../../app/hooks";
import { setCredentials } from "../authSlice";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [syncUser, { isLoading }] = useSyncUserMutation();
  const dispatch = useAppDispatch();

  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number");
      return;
    }
    setErrorMsg("");
    setStep("otp");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setErrorMsg("Please enter the 6-digit OTP");
      return;
    }

    try {
      setErrorMsg("");
      // Using verified phone simulation
      const res = await syncUser({
        firebaseIdToken: "test_token_123", // triggers test verification on backend
        fullName: fullName.trim() || "JantaGaraj Customer",
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
      setErrorMsg(err?.data?.message || "Failed to authenticate. Try test mode.");
    }
  };

  const handleOneClickTestLogin = async (roleName: string = "Customer") => {
    try {
      setErrorMsg("");
      const res = await syncUser({
        firebaseIdToken: "test_token_123",
        fullName: `${roleName} User`,
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
      setErrorMsg(err?.data?.message || "Test login failed.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === "phone" ? "Sign In to JantaGaraj" : "Enter Verification Code"}
      description={
        step === "phone"
          ? "Enter your mobile number to access doorstep garage services"
          : `We've sent a 6-digit OTP to +91 ${phone}`
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
            label="Full Name (for new users)"
            placeholder="e.g. Rahul Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label="Mobile Number"
            type="tel"
            placeholder="98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            leftIcon={<Phone className="w-4 h-4" />}
            helperText="We will send you a 6-digit OTP for instant phone verification"
          />

          <Button type="submit" variant="primary" className="w-full" size="lg">
            Send OTP Code
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <Input
            label="6-Digit OTP"
            placeholder="1 2 3 4 5 6"
            value={otp}
            onChange={(e) => setOtp(e.target.value.slice(0, 6))}
            leftIcon={<KeyRound className="w-4 h-4" />}
            helperText="Enter any 6 digits for testing"
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            size="lg"
            isLoading={isLoading}
          >
            Verify & Continue
          </Button>

          <button
            type="button"
            onClick={() => setStep("phone")}
            className="w-full text-center text-xs font-semibold text-brand-500 hover:underline"
          >
            Change Phone Number
          </button>
        </form>
      )}

      {/* Instant Demo/Testing Login Action */}
      <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
        <p className="text-center text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-300 font-semibold">
          Fast Demo Mode
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full border-brand-500/40 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30"
          leftIcon={<Sparkles className="w-4 h-4 text-brand-500" />}
          isLoading={isLoading}
          onClick={() => handleOneClickTestLogin("Parinay")}
        >
          Instant 1-Click Login (Test Token Bypass)
        </Button>
      </div>
    </Modal>
  );
};
