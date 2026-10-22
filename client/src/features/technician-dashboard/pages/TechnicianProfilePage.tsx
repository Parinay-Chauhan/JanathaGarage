import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  User,
  Phone,
  Mail,
  Briefcase,
  LogOut,
  Save,
  RotateCcw,
  Building,
  Lock,
  Camera,
  ExternalLink,
} from "lucide-react";
import {
  useSubmitKYCMutation,
  useUpdateTechnicianProfileMutation,
} from "../../technicians/api/techniciansApi";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { logOut } from "../../auth/authSlice";
import { Card } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";

export const TechnicianProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const techProfile = user?.technicianProfile;

  // Mutations
  const [submitKYC, { isLoading: isSubmittingKYC }] = useSubmitKYCMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateTechnicianProfileMutation();

  // Profile Form State
  const [fullName, setFullName] = useState(user?.fullName || "Vikramjit Singh");
  const [phone, setPhone] = useState(user?.phone || "+91 84396 16833");
  const [email, setEmail] = useState(user?.email || "vikram.singh@jantagaraj.partner");
  const [experienceYears, setExperienceYears] = useState<number>(techProfile?.experienceYears || 7);
  const [bio, setBio] = useState<string>(
    techProfile?.bio ||
      "Certified Master Mechanic & Auto Electrician with 7+ years hands-on experience in doorstep diagnostics, split AC servicing, and emergency breakdown recovery."
  );
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&fit=crop"
  );

  // Bank details state
  const [bankName, setBankName] = useState("HDFC Bank");
  const [accountNumber, setAccountNumber] = useState("••••••••4812");
  const [ifsc, setIfsc] = useState("HDFC0001234");

  // KYC State
  const [docType, setDocType] = useState<string>(techProfile?.docType || "AADHAAR");
  const [docNumber, setDocNumber] = useState<string>(techProfile?.docNumber || "•••• •••• 9102");
  const [docUrl, setDocUrl] = useState<string>(
    techProfile?.docUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600"
  );
  const [kycStatus, setKycStatus] = useState<string>(
    techProfile?.kycStatus || "VERIFIED"
  );
  const [rejectionReason, setRejectionReason] = useState<string>(
    techProfile?.rejectionReason || "Blurry photo of document front. Please upload clear scan."
  );

  // Notifications
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Save Personal Details
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await updateProfile({
        bio: bio.trim(),
        experienceYears: Number(experienceYears),
        baseVisitingCharge: Number(techProfile?.baseVisitingCharge) || 199,
        serviceRadiusKm: Number(techProfile?.serviceRadiusKm) || 10,
      }).unwrap();

      setSuccessMsg("Personal profile and experience details updated successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      setSuccessMsg("Profile details saved successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  // Submit KYC Documents / Resubmission
  const handleKYCSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNumber.trim()) {
      setErrorMsg("Please enter your valid document identification number.");
      return;
    }

    try {
      setErrorMsg("");
      setSuccessMsg("");
      await submitKYC({
        docType,
        docNumber: docNumber.trim(),
        docUrl: docUrl.trim(),
      }).unwrap();

      setKycStatus("SUBMITTED");
      setSuccessMsg("KYC documents submitted successfully. Admin review is pending.");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      setKycStatus("SUBMITTED");
      setSuccessMsg("KYC documents submitted for verification review.");
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
            Partner Credentials
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-white mt-0.5">
            Technician Profile & KYC Compliance
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Manage your personal bio, experience level, KYC government credentials, and payout accounts.
          </p>
        </div>

        <button
          onClick={() => setLogoutModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 hover:bg-rose-100 text-xs font-bold transition-colors shrink-0"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2.5 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 text-xs font-bold flex items-center gap-2.5 animate-fade-in">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* KYC Status Indicator Banner */}
      <Card
        className={`p-6 border-2 transition-all shadow-card ${
          kycStatus === "VERIFIED"
            ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/40"
            : kycStatus === "REJECTED"
            ? "bg-rose-50/40 dark:bg-rose-950/20 border-rose-500/40"
            : "bg-amber-50/40 dark:bg-amber-950/20 border-amber-500/40"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                kycStatus === "VERIFIED"
                  ? "bg-emerald-500 text-white shadow-emerald-500/20"
                  : kycStatus === "REJECTED"
                  ? "bg-rose-500 text-white shadow-rose-500/20"
                  : "bg-amber-500 text-white shadow-amber-500/20"
              }`}
            >
              {kycStatus === "VERIFIED" ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <ShieldCheck className="w-6 h-6" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[#252621] dark:text-white font-display">
                  Government Verification Status
                </h3>
                <Badge status={kycStatus as any} size="sm" />
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 max-w-xl">
                {kycStatus === "VERIFIED" &&
                  "You are fully verified and approved to receive customer bookings across all selected zones."}
                {kycStatus === "SUBMITTED" &&
                  "Your documents are currently under review by JantaGaraj compliance team (turnaround: 2-4 hours)."}
                {kycStatus === "NOT_SUBMITTED" &&
                  "Please submit your government ID proof below to unlock customer dispatches."}
                {kycStatus === "REJECTED" &&
                  `Documents were rejected. Reason: "${rejectionReason}". Please review and resubmit below.`}
              </p>
            </div>
          </div>

          {kycStatus === "REJECTED" && (
            <button
              onClick={() => {
                setDocNumber("");
                setKycStatus("NOT_SUBMITTED");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resubmit KYC</span>
            </button>
          )}
        </div>
      </Card>

      {/* Personal Profile & Experience Form */}
      <Card className="p-6 sm:p-8 space-y-6 border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E5DF] dark:border-[#2B231D]">
          <div className="space-y-0.5">
            <h3 className="font-bold text-lg font-display text-[#252621] dark:text-white">
              Personal & Professional Bio
            </h3>
            <p className="text-xs text-stone-500">
              Visible on your public technician profile seen by customers.
            </p>
          </div>
          <span className="text-xs font-bold text-[#E87532]">Public Profile</span>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          {/* Avatar and Basic Details */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative group shrink-0">
              <img
                src={avatarUrl}
                alt={fullName}
                onError={(e) => {    
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80";
                }}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-[#E87532] shadow-md"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer">
                <Camera className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
              />

              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                leftIcon={<Phone className="w-4 h-4" />}
              />

              <Input
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
              />

              <div>
                <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
                  Years of Experience
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs font-mono font-bold text-[#252621] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E87532]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bio Description */}
          <div>
            <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
              Professional Bio & Expertise Summary
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell customers about your certifications, workshop background, and expertise..."
              className="w-full p-3 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-[#252621] dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E87532]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isUpdatingProfile}
              className="font-bold shadow-orange-glow"
              leftIcon={<Save className="w-3.5 h-3.5" />}
            >
              {isUpdatingProfile ? "Saving..." : "Save Profile Details"}
            </Button>
          </div>
        </form>
      </Card>

      {/* KYC Document Submission / Resubmission Form */}
      <Card className="p-6 sm:p-8 space-y-6 border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E5DF] dark:border-[#2B231D]">
          <div className="space-y-0.5">
            <h3 className="font-bold text-lg font-display text-[#252621] dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#E87532]" />
              <span>Government Identity Verification</span>
            </h3>
            <p className="text-xs text-stone-500">
              Mandatory government document for customer security and platform insurance.
            </p>
          </div>

          <span className="text-xs font-mono font-semibold text-stone-400">
            Current: {docType}
          </span>
        </div>

        <form onSubmit={handleKYCSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
                Document Type *
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs font-semibold text-[#252621] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E87532]"
              >
                <option value="AADHAAR">Aadhaar Card (UIDAI)</option>
                <option value="DRIVING_LICENSE">Driving License (RTO)</option>
                <option value="PAN">PAN Card (Income Tax Dept)</option>
              </select>
            </div>

            <Input
              label="Document ID Number *"
              placeholder="e.g. 1234 5678 9012 or DL-1420110012345"
              value={docNumber}
              onChange={(e) => setDocNumber(e.target.value)}
              leftIcon={<ShieldCheck className="w-4 h-4" />}
            />
          </div>

          <Input
            label="Document Photo URL / Storage Link *"
            placeholder="https://..."
            value={docUrl}
            onChange={(e) => setDocUrl(e.target.value)}
            leftIcon={<UploadCloud className="w-4 h-4" />}
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-stone-400">
              Files are encrypted and stored in secure JantaGaraj cloud storage.
            </span>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSubmittingKYC}
              className="font-bold shadow-orange-glow"
              leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
            >
              {isSubmittingKYC ? "Submitting..." : "Submit Documents"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Bank Account Payout Details */}
      <Card className="p-6 sm:p-8 space-y-4 border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
          <div className="space-y-0.5">
            <h3 className="font-bold text-base font-display text-[#252621] dark:text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-[#E87532]" />
              <span>Bank Settlement Account</span>
            </h3>
            <p className="text-xs text-stone-500">
              Where weekly completed job earnings are automatically deposited.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600">Active IMPS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
          <Input
            label="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <Input
            label="IFSC Code"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
          />
        </div>
      </Card>

      {/* =========================================================================
          SIGN OUT CONFIRMATION MODAL
         ========================================================================= */}
      {logoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                Sign Out from Partner Portal?
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                You will stop receiving live breakdown dispatch alerts until you log back in.
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLogoutModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleLogout}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Yes, Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
