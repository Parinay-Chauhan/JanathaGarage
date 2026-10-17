import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Eye,
  AlertCircle,
  Phone,
} from "lucide-react";
import {
  useGetPendingKYCApplicationsQuery,
  useUpdateTechnicianKYCStatusMutation,
} from "../api/adminApi";
import { TechnicianProfile } from "../../../types/api.types";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";
import { Skeleton } from "../../../components/ui/Skeleton";

export const AdminKYCVerificationPage: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechnicianProfile | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [viewDocModalOpen, setViewDocModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { data, isLoading } = useGetPendingKYCApplicationsQuery({
    status: "SUBMITTED",
  });

  const [updateKYC, { isLoading: updating }] = useUpdateTechnicianKYCStatusMutation();

  const technicians = data?.data?.technicians || [];

  const handleApprove = async (id: string) => {
    try {
      await updateKYC({ id, status: "VERIFIED" }).unwrap();
    } catch (err: any) {
      alert(err?.data?.message || "Failed to approve KYC");
    }
  };

  const handleOpenReject = (tech: TechnicianProfile) => {
    setSelectedTech(tech);
    setRejectionReason("");
    setErrorMsg("");
    setRejectModalOpen(true);
  };

  const handleConfirmReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTech) return;
    if (!rejectionReason.trim()) {
      setErrorMsg("Rejection reason is mandatory when declining KYC documents");
      return;
    }

    try {
      setErrorMsg("");
      await updateKYC({
        id: selectedTech.id,
        status: "REJECTED",
        rejectionReason: rejectionReason.trim(),
      }).unwrap();
      setRejectModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err?.data?.message || "Failed to reject KYC application");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 dark:text-white">
          Technician KYC Compliance Desk
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Verify government ID numbers and document scans before activating mechanic partner accounts.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      ) : technicians.length > 0 ? (
        <div className="space-y-4">
          {technicians.map((tech) => (
            <Card
              key={tech.id}
              className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-stone-200/80 dark:border-stone-800"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge status={tech.kycStatus} size="sm" />
                  <span className="text-xs font-mono font-bold text-stone-400">
                    ID: {tech.id.slice(0, 8)}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white">
                  {tech.user?.fullName || "Mechanic Partner"}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1 font-semibold text-stone-700 dark:text-stone-300">
                    <Phone className="w-3.5 h-3.5 text-brand-500" />
                    <span>{tech.user?.phone}</span>
                  </span>
                  <span>Doc Type: <strong>{tech.docType || "AADHAAR"}</strong></span>
                  <span>Number: <strong>{tech.docNumber || "N/A"}</strong></span>
                  <span>Experience: {tech.experienceYears} Years</span>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-100 dark:border-stone-800">
                {tech.docUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Eye className="w-4 h-4" />}
                    onClick={() => {
                      setSelectedTech(tech);
                      setViewDocModalOpen(true);
                    }}
                  >
                    View Document
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="border-rose-300 text-rose-600 hover:bg-rose-50"
                  leftIcon={<XCircle className="w-4 h-4" />}
                  onClick={() => handleOpenReject(tech)}
                >
                  Reject
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                  isLoading={updating}
                  onClick={() => handleApprove(tech.id)}
                >
                  Approve KYC
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="text-lg font-bold text-stone-900 dark:text-white font-display">
            KYC Verification Queue is Clear
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            All submitted technician identification documents have been audited and verified.
          </p>
        </Card>
      )}

      {/* Document View Modal */}
      <Modal
        isOpen={viewDocModalOpen}
        onClose={() => setViewDocModalOpen(false)}
        title="Identification Document Preview"
        description={`${selectedTech?.user?.fullName} · ${selectedTech?.docType}: ${selectedTech?.docNumber}`}
        maxWidth="lg"
      >
        <div className="space-y-4">
          {selectedTech?.docUrl ? (
            <img
              src={selectedTech.docUrl}
              alt="KYC ID"
              className="w-full max-h-96 object-contain rounded-2xl bg-stone-950 p-2"
            />
          ) : (
            <p className="text-sm text-stone-500">No image file link available</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewDocModalOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
              onClick={() => {
                if (selectedTech) handleApprove(selectedTech.id);
                setViewDocModalOpen(false);
              }}
            >
              Verify This Partner
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reject with Reason Modal */}
      <Modal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Decline KYC Submission"
        description="Please provide the specific reason so the technician can rectify and re-upload"
        maxWidth="md"
      >
        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleConfirmReject} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
              Rejection Reason (Mandatory)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Document image is blurry and ID number is unreadable, please re-upload clear photo."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm p-3 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setRejectModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="danger"
              size="sm"
              isLoading={updating}
            >
              Confirm Rejection
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
