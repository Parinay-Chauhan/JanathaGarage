import React, { useState } from "react";
import {
  Radio,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  DollarSign,
  Star,
  ShieldCheck,
} from "lucide-react";
import {
  useGetAvailableJobsQuery,
  useRespondToBookingMutation,
} from "../../bookings/api/bookingsApi";
import { useUpdateAvailabilityMutation } from "../../technicians/api/techniciansApi";
import { useAppSelector } from "../../../app/hooks";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Skeleton } from "../../../components/ui/Skeleton";

export const TechnicianDashboardPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const techProfile = user?.technicianProfile;

  const [isOnline, setIsOnline] = useState(techProfile?.isOnline ?? true);
  const [isAvailable, setIsAvailable] = useState(techProfile?.isAvailable ?? true);

  const { data: availableJobsData, isLoading: jobsLoading } = useGetAvailableJobsQuery(
    undefined,
    { pollingInterval: 10000 } // Poll every 10s for incoming dispatch
  );

  const [respondToBooking, { isLoading: responding }] = useRespondToBookingMutation();
  const [updateAvailability, { isLoading: updatingStatus }] = useUpdateAvailabilityMutation();

  const handleToggleOnline = async () => {
    const nextStatus = !isOnline;
    setIsOnline(nextStatus);
    try {
      await updateAvailability({ isOnline: nextStatus }).unwrap();
    } catch (e) {
      setIsOnline(!nextStatus);
    }
  };

  const handleToggleAvailable = async () => {
    const nextStatus = !isAvailable;
    setIsAvailable(nextStatus);
    try {
      await updateAvailability({ isAvailable: nextStatus }).unwrap();
    } catch (e) {
      setIsAvailable(!nextStatus);
    }
  };

  const handleAcceptJob = async (id: string) => {
    try {
      await respondToBooking({ id, action: "ACCEPT" }).unwrap();
    } catch (err: any) {
      alert(err?.data?.message || "Failed to accept booking.");
    }
  };

  const handleRejectJob = async (id: string) => {
    try {
      await respondToBooking({ id, action: "REJECT" }).unwrap();
    } catch (err: any) {
      alert(err?.data?.message || "Failed to decline booking.");
    }
  };

  const availableJobs = availableJobsData?.data || [];

  return (
    <div className="space-y-8">
      {/* Top Console Status Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge status={techProfile?.kycStatus || "SUBMITTED"} size="sm" />
            <span className="text-xs text-stone-400 font-mono">
              Mechanic ID: {techProfile?.id ? techProfile.id.slice(0, 8) : "Active"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Technician Job Radar
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Turn your status ON to receive instant customer breakdown requests within your 10km radius.
          </p>
        </div>

        {/* Live Duty Toggles */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleOnline}
            disabled={updatingStatus}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs transition-all ${
              isOnline
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-500/30"
                : "bg-stone-800 text-stone-400 border border-stone-700"
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isOnline ? "bg-white animate-pulse" : "bg-stone-500"
              }`}
            />
            <span>{isOnline ? "Duty ON (Receiving)" : "Duty OFF (Offline)"}</span>
          </button>

          <button
            onClick={handleToggleAvailable}
            disabled={updatingStatus}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl font-semibold text-xs border transition-all ${
              isAvailable
                ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                : "border-amber-500/40 text-amber-400 bg-amber-500/10"
            }`}
          >
            <span>{isAvailable ? "Available" : "Busy"}</span>
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-500">Incoming Requests</p>
            <p className="text-2xl font-bold font-mono text-stone-900 dark:text-white">
              {availableJobs.length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-500">Base Visit Fee</p>
            <p className="text-2xl font-bold font-mono text-stone-900 dark:text-white">
              ₹{techProfile?.baseVisitingCharge || 199}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-500">Mechanic Rating</p>
            <p className="text-2xl font-bold font-mono text-stone-900 dark:text-white">
              4.9★
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-brand-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-500">KYC Status</p>
            <Badge status={techProfile?.kycStatus || "SUBMITTED"} size="sm" />
          </div>
        </Card>
      </div>

      {/* Incoming Job Radar Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-500 animate-ping" />
            <h3 className="text-xl font-bold font-display text-stone-900 dark:text-white">
              Available Customer Dispatches ({availableJobs.length})
            </h3>
          </div>
          <span className="text-xs text-stone-400 font-medium">
            Auto-refreshing every 10s
          </span>
        </div>

        {jobsLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-44 w-full rounded-3xl" />
            ))}
          </div>
        ) : availableJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableJobs.map((job) => (
              <Card
                key={job.id}
                className="p-6 flex flex-col justify-between space-y-4 border-2 border-brand-500/20 hover:border-brand-500/40"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-brand-600 bg-brand-50 dark:bg-brand-950 px-2.5 py-1 rounded-full">
                      #{job.bookingNumber}
                    </span>
                    <span className="text-lg font-mono font-extrabold text-stone-900 dark:text-white">
                      ₹{job.agreedPrice}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold font-display text-stone-900 dark:text-white">
                    {job.service?.title || "Auto Repair Service"}
                  </h4>

                  <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                      <span>Scheduled for: {new Date(job.scheduledAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{job.serviceAddress || "Address provided"}</span>
                    </div>

                    {job.problemDescription && (
                      <p className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 italic text-stone-500 mt-2">
                        "{job.problemDescription}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Accept / Decline CTA Buttons */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-rose-300 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    leftIcon={<XCircle className="w-4 h-4" />}
                    disabled={responding}
                    onClick={() => handleRejectJob(job.id)}
                  >
                    Decline
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    disabled={responding}
                    onClick={() => handleAcceptJob(job.id)}
                  >
                    Accept Job
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center space-y-3">
            <Radio className="w-12 h-12 text-brand-500/40 mx-auto" />
            <h4 className="text-lg font-bold text-stone-800 dark:text-stone-200 font-display">
              No pending jobs in your area right now
            </h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Keep your Duty status ON. When a customer nearby books an auto service, it will flash here instantly.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
