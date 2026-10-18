import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  ShieldCheck,
  Building,
  Home,
  Briefcase,
  Navigation,
  RotateCcw,
  Wrench,
  AlertCircle,
} from "lucide-react";
import { useAddresses, CustomerAddress } from "../hooks/useAddresses";
import { useLocation as useGeoLocation } from "../../../context/LocationContext";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";

export const CustomerAddressesPage: React.FC = () => {
  const {
    addresses,
    defaultAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddresses();

  const { location: gpsLocation, isLoadingGPS, detectCurrentLocation } = useGeoLocation();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [label, setLabel] = useState<"Home" | "Work" | "Other">("Home");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("New Delhi");
  const [pincode, setPincode] = useState("110001");
  const [isDefault, setIsDefault] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenAdd = () => {
    setEditingId(null);
    setLabel("Home");
    setHouseNo("");
    setStreet(gpsLocation.address || "");
    setLandmark("");
    setCity(gpsLocation.city || "New Delhi");
    setPincode("110001");
    setIsDefault(addresses.length === 0);
    setErrorMsg("");
    setModalOpen(true);
  };

  const handleOpenEdit = (addr: CustomerAddress) => {
    setEditingId(addr.id);
    setLabel(addr.label);
    setHouseNo(addr.houseNo);
    setStreet(addr.street);
    setLandmark(addr.landmark || "");
    setCity(addr.city);
    setPincode(addr.pincode);
    setIsDefault(addr.isDefault);
    setErrorMsg("");
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!houseNo.trim()) {
      setErrorMsg("Please enter flat, house, or building number.");
      return;
    }
    if (!street.trim()) {
      setErrorMsg("Please enter street, road, or area name.");
      return;
    }

    if (editingId) {
      updateAddress(editingId, {
        label,
        houseNo: houseNo.trim(),
        street: street.trim(),
        landmark: landmark.trim() || undefined,
        city: city.trim(),
        pincode: pincode.trim(),
        isDefault,
      });
    } else {
      addAddress({
        label,
        houseNo: houseNo.trim(),
        street: street.trim(),
        landmark: landmark.trim() || undefined,
        city: city.trim(),
        pincode: pincode.trim(),
        isDefault,
        latitude: gpsLocation.latitude,
        longitude: gpsLocation.longitude,
      });
    }

    setModalOpen(false);
  };

  const getLabelIcon = (type: "Home" | "Work" | "Other") => {
    switch (type) {
      case "Home":
        return <Home className="w-4 h-4" />;
      case "Work":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87532]">
            Location Preferences
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#252621] dark:text-white mt-0.5">
            Saved Doorstep Addresses
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Manage your service addresses for 1-click mechanic and technician dispatches.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
          className="font-bold shadow-orange-glow self-start sm:self-auto"
        >
          Add New Address
        </Button>
      </div>

      {/* Address Cards Grid */}
      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => {
            return (
              <Card
                key={addr.id}
                className={`p-6 flex flex-col justify-between gap-4 transition-all relative ${
                  addr.isDefault
                    ? "border-[#E87532]/50 ring-2 ring-[#E87532]/10 bg-orange-50/10 dark:bg-orange-950/10"
                    : "border-[#E7E5DF] dark:border-[#2B231D]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-[#252621] dark:text-white">
                        {getLabelIcon(addr.label)}
                        <span>{addr.label}</span>
                      </span>

                      {addr.isDefault && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50">
                          <CheckCircle2 className="w-3 h-3" />
                          Default Address
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(addr)}
                        className="p-1.5 text-stone-400 hover:text-[#E87532] transition-colors"
                        title="Edit Address"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {addresses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => deleteAddress(addr.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Delete Address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 space-y-1">
                    <h3 className="font-bold text-sm text-[#252621] dark:text-white">
                      {addr.houseNo}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      {addr.street}
                    </p>
                    {addr.landmark && (
                      <p className="text-xs text-stone-400">
                        Landmark: {addr.landmark}
                      </p>
                    )}
                    <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                      {addr.city} - {addr.pincode}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D] flex items-center justify-between gap-2">
                  {!addr.isDefault ? (
                    <button
                      type="button"
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-xs font-bold text-[#E87532] hover:underline"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span className="text-[11px] text-stone-400">
                      Primary Delivery Address
                    </span>
                  )}

                  <Link to="/services">
                    <Button variant="outline" size="sm" className="text-xs font-semibold">
                      Book Service Here
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-12 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-bold text-[#252621] dark:text-white font-display">
            No saved addresses
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Add your residential or office location so technicians can reach you without delay.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenAdd}
            className="font-bold"
          >
            Add Address
          </Button>
        </Card>
      )}

      {/* Add / Edit Address Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#141210] border border-[#E7E5DF] dark:border-[#2B231D] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF] dark:border-[#2B231D]">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#E87532]" />
                <h3 className="font-bold text-base font-display text-[#252621] dark:text-white">
                  {editingId ? "Edit Address" : "Add New Doorstep Address"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-3.5">
              {/* GPS Auto-fill */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D]">
                <span className="text-xs text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#E87532]" />
                  <span>Detect using device GPS</span>
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    await detectCurrentLocation();
                    if (gpsLocation.address) {
                      setStreet(gpsLocation.address);
                      setCity(gpsLocation.city || "New Delhi");
                    }
                  }}
                  disabled={isLoadingGPS}
                  className="text-xs font-bold text-[#E87532] hover:underline"
                >
                  {isLoadingGPS ? "Detecting..." : "Auto-fill"}
                </button>
              </div>

              {/* Label selector */}
              <div>
                <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
                  Address Label *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Home", "Work", "Other"] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setLabel(t)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        label === t
                          ? "border-[#E87532] bg-orange-50 text-[#E87532] dark:bg-orange-950/40"
                          : "border-[#E7E5DF] dark:border-[#2B231D] text-stone-600 dark:text-stone-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flat / House */}
              <div>
                <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
                  Flat / House / Floor / Building *
                </label>
                <input
                  type="text"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  placeholder="e.g. Flat 402, Block C, Lotus Tower"
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-[#252621] dark:text-white"
                />
              </div>

              {/* Street & Area */}
              <div>
                <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
                  Street, Colony & Landmark *
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="e.g. Connaught Place, Near Central Metro Station"
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-[#252621] dark:text-white"
                />
              </div>

              {/* City & Pincode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-[#252621] dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F7F3] dark:bg-[#1A1613] border border-[#E7E5DF] dark:border-[#2B231D] text-xs text-[#252621] dark:text-white"
                  />
                </div>
              </div>

              {/* Set Default Checkbox */}
              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="w-4 h-4 accent-[#E87532] rounded"
                />
                <span className="text-xs text-stone-600 dark:text-stone-300">
                  Set as my default service address
                </span>
              </label>

              <div className="pt-3 border-t border-[#E7E5DF] dark:border-[#2B231D] flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="font-bold shadow-orange-glow"
                >
                  Save Address
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
