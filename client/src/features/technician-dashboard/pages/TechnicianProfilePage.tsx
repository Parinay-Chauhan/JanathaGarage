import React, { useState } from "react";
import {
  ShieldCheck,
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useSubmitKYCMutation } from "../../technicians/api/techniciansApi";
import { useAppSelector } from "../../../app/hooks";
import { Card } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";

export const TechnicianProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const techProfile = user?.technicianProfile;

  const [submitKYC, { isLoading }] = useSubmitKYCMutation();

  const [docType, setDocType] = useState(techProfile?.docType || "AADHAAR");
  const [docNumber, setDocNumber] = useState(techProfile?.docNumber || "");
  const [docUrl, setDocUrl] = useState(
    techProfile?.docUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600"
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNumber.trim()) {
      setErrorMsg("Please enter your document ID number");
      return;
    }

    try {
      setErrorMsg("");
      setStatusMessage("");
      await submitKYC({
        docType,
        docNumber: docNumber.trim(),
        docUrl: docUrl.trim(),
      }).unwrap();
      setStatusMessage("KYC documents submitted successfully. Admin review pending.");
    } catch (err: any) {
      setErrorMsg(err?.data?.message || "Failed to submit KYC documents");
    }
  };

  const currentStatus = techProfile?.kycStatus || "NOT_SUBMITTED";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 dark:text-white">
          Technician KYC & Verification
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Government ID compliance is mandatory to receive customer service bookings.
        </p>
      </div>

      {/* KYC Status Indicator Banner */}
      <Card
        className={`p-6 border-2 ${
          currentStatus === "VERIFIED"
            ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-500/40"
            : currentStatus === "REJECTED"
            ? "bg-rose-50/60 dark:bg-rose-950/30 border-rose-500/40"
            : "bg-amber-50/60 dark:bg-amber-950/30 border-amber-500/40"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                currentStatus === "VERIFIED"
                  ? "bg-emerald-500 text-white"
                  : currentStatus === "REJECTED"
                  ? "bg-rose-500 text-white"
                  : "bg-amber-500 text-white"
              }`}
            >
              {currentStatus === "VERIFIED" ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <ShieldCheck className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base text-stone-900 dark:text-white font-display">
                  Verification Status
                </h3>
                <Badge status={currentStatus} size="sm" />
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                {currentStatus === "VERIFIED" &&
                  "Congratulations! Your KYC is verified. You can receive all nearby customer bookings."}
                {currentStatus === "SUBMITTED" &&
                  "Your documents are under review by the JantaGaraj compliance team (typically takes 2-4 hours)."}
                {currentStatus === "NOT_SUBMITTED" &&
                  "Please upload your government identification document below to start taking jobs."}
                {currentStatus === "REJECTED" &&
                  `Documents were rejected. Reason: ${techProfile?.rejectionReason || "Blurry document or ID mismatch"}. Please re-submit.`}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Document Upload Form */}
      <Card className="p-6 sm:p-8 space-y-6">
        <h3 className="font-bold text-lg font-display text-stone-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-500" />
          <span>Upload Identification Document</span>
        </h3>

        {statusMessage && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
              Select Document Type
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm p-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="AADHAAR">Aadhaar Card (UIDAI)</option>
              <option value="DRIVING_LICENSE">Driving License (RTO)</option>
              <option value="PAN">PAN Card (Income Tax Dept)</option>
            </select>
          </div>

          <Input
            label="Document ID Number"
            placeholder="e.g. 1234 5678 9012 or DL-1420110012345"
            value={docNumber}
            onChange={(e) => setDocNumber(e.target.value)}
            leftIcon={<ShieldCheck className="w-4 h-4" />}
          />

          <Input
            label="Document Photo URL / Storage Link"
            placeholder="https://..."
            value={docUrl}
            onChange={(e) => setDocUrl(e.target.value)}
            leftIcon={<UploadCloud className="w-4 h-4" />}
            helperText="Direct image URL of front side of the ID"
          />

          {docUrl && (
            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80">
              <span className="text-[11px] font-bold text-stone-400 uppercase block mb-2">
                Document File Preview:
              </span>
              <img
                src={docUrl}
                alt="Document Preview"
                className="h-44 w-auto rounded-xl object-cover border border-stone-300 dark:border-stone-700"
              />
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Submit Documents for Verification
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
