import React, { useState } from "react";
import { User, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useUpdateProfileMutation } from "../../auth/api/authApi";
import { updateUser } from "../../auth/authSlice";
import { Card } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";

export const CustomerProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [updateProfileMutation, { isLoading }] = useUpdateProfileMutation();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Full name cannot be empty");
      return;
    }

    try {
      setErrorMsg("");
      setSuccessMsg("");
      const res = await updateProfileMutation({ fullName: fullName.trim() }).unwrap();
      if (res.data) {
        dispatch(updateUser({ fullName: res.data.fullName }));
        setSuccessMsg("Profile details updated successfully!");
      }
    } catch (err: any) {
      setErrorMsg(err?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 dark:text-white">
          My Account Settings
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Manage your personal identity and verified contact phone.
        </p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-stone-200/80 dark:border-stone-800">
          <div className="w-16 h-16 rounded-3xl bg-brand-500/10 text-brand-500 font-extrabold flex items-center justify-center text-2xl border border-brand-500/20">
            {user?.fullName?.charAt(0) || "U"}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold font-display text-stone-900 dark:text-white">
                {user?.fullName}
              </h3>
              <Badge status={user?.role} size="sm" />
            </div>
            <p className="text-xs text-stone-500 font-mono">
              Account ID: {user?.id}
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label="Verified Mobile Number (Firebase Auth)"
            value={user?.phone || ""}
            disabled
            leftIcon={<Phone className="w-4 h-4" />}
            helperText="Phone number is secured by Firebase OTP and cannot be modified directly"
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full sm:w-auto"
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
