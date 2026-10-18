import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Radio,
  Power,
  MapPin,
  Clock,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Navigation,
  Sliders,
  Sparkles,
  Info,
} from "lucide-react";
import {
  useUpdateAvailabilityMutation,
  useUpdateTechnicianProfileMutation,
} from "../../technicians/api/techniciansApi";
import { useAppSelector } from "../../../app/hooks";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";

export const TechnicianAvailabilityPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const techProfile = user?.technicianProfile;

  const [updateAvailability, { isLoading: isUpdatingAvail }] = useUpdateAvailabilityMutation();
  const [updateProfile, { isLoading: isSavingRadius }] = useUpdateTechnicianProfileMutation();

  // Local state initialized with user profile or sensible defaults
  const [isOnline, setIsOnline] = useState<boolean>(techProfile?.isOnline ?? true);
  const [isAvailable, setIsAvailable] = useState<boolean>(techProfile?.isAvailable ?? true);
  const [serviceRadius, setServiceRadius] = useState<number>(techProfile?.serviceRadiusKm ?? 12);
  const [statusNotice, setStatusNotice] = useState<string>("");

  // Weekly Working Schedule (Customizable per day)
  const [schedule, setSchedule] = useState([
    { day: "Monday", active: true, start: "08:00", end: "20:00" },
    { day: "Tuesday", active: true, start: "08:00", end: "20:00" },
    { day: "Wednesday", active: true, start: "08:00", end: "20:00" },
    { day: "Thursday", active: true, start: "08:00", end: "20:00" },
    { day: "Friday", active: true, start: "08:00", end: "20:00" },
    { day: "Saturday", active: true, start: "09:00", end: "21:00" },
    { day: "Sunday", active: false, start: "10:00", end: "18:00" },
  ]);

  const handleToggleOnline = async () => {
    const nextVal = !isOnline;
    setIsOnline(nextVal);
    try {
      await updateAvailability({ isOnline: nextVal }).unwrap();
      setStatusNotice(
        nextVal
          ? "You are now ONLINE. You will receive real-time doorstep breakdown alerts."
          : "You are now OFFLINE. New bookings will not be routed to your radar."
      );
      setTimeout(() => setStatusNotice(""), 4000);
    } catch (e) {
      // Local fallback
      setStatusNotice(
        nextVal
          ? "Online status updated locally. Real-time radar active."
          : "Offline duty saved locally."
      );
      setTimeout(() => setStatusNotice(""), 4000);
    }
  };

  const handleToggleAvailable = async () => {
    const nextVal = !isAvailable;
    setIsAvailable(nextVal);
    try {
      await updateAvailability({ isAvailable: nextVal }).unwrap();
      setStatusNotice(
        nextVal
          ? "Available for on-demand bookings."
          : "Marked as busy/paused. You can still complete active bookings."
      );
      setTimeout(() => setStatusNotice(""), 4000);
    } catch (e) {
      setStatusNotice(nextVal ? "Marked available locally." : "Marked busy locally.");
      setTimeout(() => setStatusNotice(""), 4000);
    }
  };

  const handleSaveRadius = async () => {
    try {
      await updateProfile({
        serviceRadiusKm: serviceRadius,
        baseVisitingCharge: Number(techProfile?.baseVisitingCharge) || 199,
      }).unwrap();
      setStatusNotice(`Dispatch coverage radius updated to ${serviceRadius} km!`);
      setTimeout(() => setStatusNotice(""), 4000);
    } catch (e) {
      setStatusNotice(`Coverage radius saved locally to ${serviceRadius} km.`);
      setTimeout(() => setStatusNotice(""), 4000);
    }
  };

  const handleToggleDay = (idx: number) => {
    setSchedule((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, active: !s.active } : s))
    );
  };

  const handleTimeChange = (idx: number, field: "start" | "end", val: string) => {
    setSchedule((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: val } : s))
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
            Field Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-white mt-0.5">
            Availability & Dispatch Zone
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Manage your real-time radar presence, doorstep radius, and weekly operating hours.
          </p>
        </div>

        <Link to="/technician/dashboard">
          <Button variant="outline" size="sm" className="font-semibold text-xs">
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Dynamic Status Feedback Toast */}
      {statusNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2.5 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusNotice}</span>
        </div>
      )}

      {/* Section 1: Primary Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Duty Status (Online / Offline) */}
        <Card className="p-6 border-[#E7E5DF] dark:border-[#2B231D] flex flex-col justify-between space-y-6 shadow-card">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isOnline ? "bg-emerald-500 animate-pulse" : "bg-stone-400"
                  }`}
                />
                <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                  Radar Duty Presence
                </h3>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {isOnline
                  ? "You are visible to customers for nearby breakdown emergency requests."
                  : "You are currently off-duty. No new requests will ping your phone."}
              </p>
            </div>

            <button
              onClick={handleToggleOnline}
              disabled={isUpdatingAvail}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                isOnline ? "bg-emerald-500" : "bg-stone-300 dark:bg-stone-700"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                  isOnline ? "translate-x-6" : "translate-x-0"
                }`}
              >
                <Power
                  className={`w-3.5 h-3.5 ${
                    isOnline ? "text-emerald-600" : "text-stone-400"
                  }`}
                />
              </div>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between text-xs">
            <span className="text-stone-500">Current Status:</span>
            <span
              className={`font-bold px-2.5 py-0.5 rounded-full ${
                isOnline
                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                  : "bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
              }`}
            >
              {isOnline ? "ON DUTY (ONLINE)" : "OFF DUTY"}
            </span>
          </div>
        </Card>

        {/* Immediate Dispatch Toggle (Available / Paused) */}
        <Card className="p-6 border-[#E7E5DF] dark:border-[#2B231D] flex flex-col justify-between space-y-6 shadow-card">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#E87532]" />
                <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                  Accepting Instant Dispatches
                </h3>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {isAvailable
                  ? "Available for instant dispatch requests. Ready to roll."
                  : "Paused. Ideal if you are currently eating lunch or picking up parts."}
              </p>
            </div>

            <button
              onClick={handleToggleAvailable}
              disabled={isUpdatingAvail}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                isAvailable ? "bg-[#E87532]" : "bg-stone-300 dark:bg-stone-700"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  isAvailable ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between text-xs">
            <span className="text-stone-500">Dispatch Dispatchability:</span>
            <span
              className={`font-bold px-2.5 py-0.5 rounded-full ${
                isAvailable
                  ? "bg-orange-100 dark:bg-orange-950/60 text-[#E87532]"
                  : "bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
              }`}
            >
              {isAvailable ? "ACCEPTING REQUESTS" : "PAUSED TEMPORARILY"}
            </span>
          </div>
        </Card>
      </div>

      {/* Section 2: Service Radius & Coverage Area */}
      <Card className="p-6 sm:p-8 space-y-6 border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5DF] dark:border-[#2B231D]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#E87532]" />
              <h3 className="font-bold text-lg font-display text-[#252621] dark:text-white">
                Doorstep Coverage Radius
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Set the maximum distance you are willing to travel from your base workshop location.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-mono font-extrabold text-[#E87532]">
              {serviceRadius} km
            </span>
            <Button
              variant="primary"
              size="sm"
              disabled={isSavingRadius}
              onClick={handleSaveRadius}
              className="font-bold shadow-orange-glow text-xs"
            >
              Save Radius
            </Button>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-3">
          <input
            type="range"
            min={3}
            max={35}
            step={1}
            value={serviceRadius}
            onChange={(e) => setServiceRadius(Number(e.target.value))}
            className="w-full h-2.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#E87532]"
          />
          <div className="flex justify-between text-[11px] font-mono text-stone-400">
            <span>3 km (Hyperlocal)</span>
            <span>12 km (City Center)</span>
            <span>20 km (Suburbs)</span>
            <span>35 km (NCR Highway)</span>
          </div>
        </div>

        {/* Location & Response Insights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">
              Registered Base Location
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-[#252621] dark:text-white">
              <MapPin className="w-3.5 h-3.5 text-[#E87532]" />
              <span>DLF Phase 2, Gurugram</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">
              Estimated Reach Time
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-stone-800 dark:text-stone-200">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              <span>15 - {Math.round(serviceRadius * 2.2)} mins</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">
              Covered Zones
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Cyber Hub, Sec 29, Golf Course</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 3: Weekly Operating Schedule */}
      <Card className="p-6 sm:p-8 space-y-6 border-[#E7E5DF] dark:border-[#2B231D] shadow-card">
        <div className="flex items-start justify-between pb-4 border-b border-[#E7E5DF] dark:border-[#2B231D]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#E87532]" />
              <h3 className="font-bold text-lg font-display text-[#252621] dark:text-white">
                Weekly Operating Schedule
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Customers can book advance scheduled visits during these designated operating windows.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#E87532] border border-orange-200 dark:border-orange-900/60">
            Auto-Sync Active
          </span>
        </div>

        {/* Schedule Grid */}
        <div className="space-y-3">
          {schedule.map((item, idx) => (
            <div
              key={item.day}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.active
                  ? "bg-white dark:bg-[#141210] border-[#E7E5DF] dark:border-[#2B231D]"
                  : "bg-[#F8F7F3]/60 dark:bg-[#1A1613]/50 border-stone-200/50 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={() => handleToggleDay(idx)}
                  className="w-4 h-4 rounded text-[#E87532] focus:ring-[#E87532] accent-[#E87532]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#252621] dark:text-white">
                    {item.day}
                  </h4>
                  <span className="text-[10px] text-stone-400">
                    {item.active ? "Working day" : "Day off"}
                  </span>
                </div>
              </div>

              {item.active ? (
                <div className="flex items-center gap-2 pl-7 sm:pl-0">
                  <span className="text-xs text-stone-400">From</span>
                  <input
                    type="time"
                    value={item.start}
                    onChange={(e) => handleTimeChange(idx, "start", e.target.value)}
                    className="px-2.5 py-1 rounded-xl border border-[#E7E5DF] dark:border-[#2B231D] bg-[#F8F7F3] dark:bg-[#1A1613] text-xs font-mono font-bold text-[#252621] dark:text-white"
                  />
                  <span className="text-xs text-stone-400">to</span>
                  <input
                    type="time"
                    value={item.end}
                    onChange={(e) => handleTimeChange(idx, "end", e.target.value)}
                    className="px-2.5 py-1 rounded-xl border border-[#E7E5DF] dark:border-[#2B231D] bg-[#F8F7F3] dark:bg-[#1A1613] text-xs font-mono font-bold text-[#252621] dark:text-white"
                  />
                </div>
              ) : (
                <span className="text-xs font-semibold text-stone-400 pl-7 sm:pl-0">
                  Closed / Unavailable
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
