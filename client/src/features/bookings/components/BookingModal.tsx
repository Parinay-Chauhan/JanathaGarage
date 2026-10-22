import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Wrench, AlertCircle, CheckCircle2 } from "lucide-react";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { DateTimePicker } from "../../../components/ui/DateTimePicker";
import { Service } from "../../../types/api.types";
import { useCreateBookingMutation } from "../api/bookingsApi";
import { useLocation } from "../../../context/LocationContext";
import { useAppSelector } from "../../../app/hooks";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onRequireAuth?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  service,
  onRequireAuth,
}) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { location } = useLocation();
  const navigate = useNavigate();

  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const [problemDescription, setProblemDescription] = useState("");
  // Default to tomorrow 10:00 AM
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  defaultDate.setHours(10, 0, 0, 0);

  const [scheduledAt, setScheduledAt] = useState(
    defaultDate.toISOString().slice(0, 16)
  );
  const [address, setAddress] = useState(location.address || "Main Road, Central Area");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onClose();
      onRequireAuth?.();
      return;
    }

    if (!service) return;

    if (!address.trim()) {
      setErrorMsg("Please provide your service location address");
      return;
    }

    try {
      setErrorMsg("");
      const res = await createBooking({
        serviceId: service.id,
        problemDescription: problemDescription.trim() || `Inspection and repair for ${service.title}`,
        scheduledAt: new Date(scheduledAt).toISOString(),
        serviceAddress: address.trim(),
        latitude: location.latitude,
        longitude: location.longitude,
      }).unwrap();

      if (res.data) {
        onClose();
        navigate(`/customer/bookings/${res.data.id}`);
      }
    } catch (err: any) {
      setErrorMsg(err?.data?.message || "Failed to create booking. Please check details.");
    }
  };

  if (!service) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Book ${service.title}`}
      description="Doorstep certified mechanic assistance at upfront transparent pricing"
      maxWidth="lg"
    >
      {errorMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Pricing Summary Box */}
      <div className="p-4 rounded-2xl bg-brand-50 dark:bg-[#1E1712] border border-brand-200 dark:border-[#38281C] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 dark:text-[#FDF6EE] text-sm">
              {service.title}
            </h4>
            <span className="text-xs text-brand-600 dark:text-brand-300 font-semibold">
              Category: {service.category?.name || "General Auto Care"}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-500 dark:text-[#9E938A] block font-medium">
            Starting Price
          </span>
          <span className="text-xl font-extrabold text-stone-900 dark:text-[#FDF6EE] font-mono">
            ₹{service.defaultPrice}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-[#D1C7BD] mb-1.5">
            Describe the vehicle issue (optional)
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Engine making unusual clicking sound, brake pads worn out..."
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            className="w-full rounded-xl bg-white dark:bg-[#16120F] border border-stone-300 dark:border-[#2C221A] text-stone-900 dark:text-[#FDF6EE] placeholder:text-stone-400 dark:placeholder:text-[#6E645A] text-sm p-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
          />
        </div>

        <DateTimePicker
          label="Preferred Appointment Slot"
          value={scheduledAt}
          onChange={(newVal) => setScheduledAt(newVal)}
          helperText="Select a convenient arrival date and 12-hour time window"
        />

        <Input
          label="Service Address / Parking Spot"
          placeholder="House/Apartment #, Landmark, Street"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          leftIcon={<MapPin className="w-4 h-4" />}
          helperText={`Current Area: ${location.city}`}
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            size="lg"
            isLoading={isLoading}
            leftIcon={<CheckCircle2 className="w-5 h-5" />}
          >
            {isAuthenticated ? "Confirm & Book Service" : "Sign In & Complete Booking"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
