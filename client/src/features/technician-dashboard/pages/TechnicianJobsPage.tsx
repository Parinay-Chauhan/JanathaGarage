import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navigation,
  MapPin,
  KeyRound,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Phone,
} from "lucide-react";
import {
  useGetMyBookingsQuery,
  useUpdateBookingStatusMutation,
} from "../../bookings/api/bookingsApi";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import { Skeleton } from "../../../components/ui/Skeleton";
import { BookingStatus } from "../../../types/api.types";

export const TechnicianJobsPage: React.FC = () => {
  const { data, isLoading } = useGetMyBookingsQuery();
  const [updateStatus, { isLoading: updating }] = useUpdateBookingStatusMutation();

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const bookings = data?.data?.bookings || [];

  const handleAdvanceStatus = async (
    jobId: string,
    currentStatus: BookingStatus
  ) => {
    try {
      if (currentStatus === "ACCEPTED") {
        await updateStatus({ id: jobId, status: "EN_ROUTE" }).unwrap();
      } else if (currentStatus === "EN_ROUTE") {
        await updateStatus({ id: jobId, status: "ARRIVED" }).unwrap();
      } else if (currentStatus === "ARRIVED") {
        // Must verify customer's 4-digit start OTP
        setSelectedJobId(jobId);
        setEnteredOtp("");
        setErrorMsg("");
        setOtpModalOpen(true);
      } else if (currentStatus === "IN_PROGRESS") {
        await updateStatus({ id: jobId, status: "COMPLETED" }).unwrap();
      }
    } catch (err: any) {
      alert(err?.data?.message || "Failed to update job status");
    }
  };

  const handleVerifyOtpAndStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobId || !enteredOtp) {
      setErrorMsg("Please enter the 4-digit start OTP provided by the customer");
      return;
    }

    try {
      setErrorMsg("");
      await updateStatus({
        id: selectedJobId,
        status: "IN_PROGRESS",
        otp: enteredOtp.trim(),
      }).unwrap();
      setOtpModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err?.data?.message || "Invalid OTP code. Please ask the customer.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 dark:text-white">
          Assigned Service Jobs
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Update your arrival and enter customer OTP to unlock job execution.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-36 w-full rounded-2xl" />
          ))}
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((job) => (
            <Card
              key={job.id}
              className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-stone-200/80 dark:border-stone-800"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge status={job.status} size="sm" />
                  <span className="text-xs font-mono font-bold text-stone-400">
                    #{job.bookingNumber}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white">
                  {job.service?.title || "Auto Repair Service"}
                </h3>

                <div className="space-y-1 text-xs text-stone-500">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-500" />
                    <span>Location: {job.serviceAddress || "Address provided"}</span>
                  </p>
                  {job.customer?.user && (
                    <p className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-semibold">
                      <span>Customer: {job.customer.user.fullName}</span>
                      <a
                        href={`tel:${job.customer.user.phone}`}
                        className="text-brand-500 hover:underline flex items-center gap-1 ml-2"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{job.customer.user.phone}</span>
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-100 dark:border-stone-800">
                <div className="text-right mr-4 hidden sm:block">
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">
                    Earnings
                  </span>
                  <span className="text-xl font-mono font-extrabold text-stone-900 dark:text-white">
                    ₹{job.agreedPrice}
                  </span>
                </div>

                {job.status === "ACCEPTED" && (
                  <Button
                    variant="primary"
                    size="sm"
                    isLoading={updating}
                    leftIcon={<Navigation className="w-4 h-4" />}
                    onClick={() => handleAdvanceStatus(job.id, "ACCEPTED")}
                  >
                    Start Journey (En Route)
                  </Button>
                )}

                {job.status === "EN_ROUTE" && (
                  <Button
                    variant="primary"
                    size="sm"
                    isLoading={updating}
                    leftIcon={<MapPin className="w-4 h-4" />}
                    onClick={() => handleAdvanceStatus(job.id, "EN_ROUTE")}
                  >
                    Mark Arrived At Spot
                  </Button>
                )}

                {job.status === "ARRIVED" && (
                  <Button
                    variant="primary"
                    size="sm"
                    isLoading={updating}
                    leftIcon={<KeyRound className="w-4 h-4" />}
                    onClick={() => handleAdvanceStatus(job.id, "ARRIVED")}
                  >
                    Verify Start OTP
                  </Button>
                )}

                {job.status === "IN_PROGRESS" && (
                  <Button
                    variant="primary"
                    size="sm"
                    isLoading={updating}
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    onClick={() => handleAdvanceStatus(job.id, "IN_PROGRESS")}
                  >
                    Complete Repair Job
                  </Button>
                )}

                {job.status === "COMPLETED" && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-bold text-xs border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Job Finished & Billed</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center space-y-3">
          <Calendar className="w-12 h-12 text-stone-300 mx-auto" />
          <h4 className="text-lg font-bold text-stone-800 dark:text-stone-200 font-display">
            No assigned jobs yet
          </h4>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Switch to the <strong>Live Job Radar</strong> to accept incoming customer bookings.
          </p>
          <Link to="/technician/dashboard">
            <Button variant="primary" size="sm">
              Go to Radar
            </Button>
          </Link>
        </Card>
      )}

      {/* Customer Start OTP Verification Modal */}
      <Modal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        title="Verify Customer Start OTP"
        description="Ask the customer for the 4-digit code displayed on their screen"
        maxWidth="sm"
      >
        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleVerifyOtpAndStart} className="space-y-4">
          <Input
            label="4-Digit Start OTP"
            placeholder="e.g. 5432"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
            leftIcon={<KeyRound className="w-4 h-4" />}
            maxLength={4}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            size="lg"
            isLoading={updating}
          >
            Authorize & Begin Repair
          </Button>
        </form>
      </Modal>
    </div>
  );
};
