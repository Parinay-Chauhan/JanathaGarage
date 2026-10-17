import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useGetServicesQuery } from "../../services/api/servicesApi";
import { useUpdateTechnicianServicesMutation } from "../../technicians/api/techniciansApi";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Skeleton } from "../../../components/ui/Skeleton";

export const TechnicianServicesPage: React.FC = () => {
  const { data: servicesData, isLoading } = useGetServicesQuery();
  const [updateServices, { isLoading: saving }] = useUpdateTechnicianServicesMutation();

  const [selectedServices, setSelectedServices] = useState<{ [id: string]: number }>({});
  const [successMsg, setSuccessMsg] = useState("");

  const services = servicesData?.data || [];

  const handleToggleService = (serviceId: string, defaultPrice: number | string) => {
    setSelectedServices((prev) => {
      const copy = { ...prev };
      if (copy[serviceId] !== undefined) {
        delete copy[serviceId];
      } else {
        copy[serviceId] = Number(defaultPrice);
      }
      return copy;
    });
  };

  const handlePriceChange = (serviceId: string, price: string) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: Number(price) || 0,
    }));
  };

  const handleSave = async () => {
    const payload = Object.entries(selectedServices).map(([serviceId, customPrice]) => ({
      serviceId,
      customPrice,
    }));

    try {
      setSuccessMsg("");
      await updateServices({ services: payload }).unwrap();
      setSuccessMsg("Offered services and pricing saved successfully!");
    } catch (e: any) {
      alert(e?.data?.message || "Failed to update services");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 dark:text-white">
            My Service Catalog & Rates
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Choose which auto services you provide and optionally set your custom pricing.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          isLoading={saving}
          onClick={handleSave}
        >
          Save Offered Services
        </Button>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => {
            const isSelected = selectedServices[service.id] !== undefined;
            return (
              <Card
                key={service.id}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  isSelected
                    ? "border-brand-500/50 bg-brand-50/20 dark:bg-brand-950/10"
                    : "border-stone-200/80 dark:border-stone-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleService(service.id, service.defaultPrice)}
                    className="w-5 h-5 rounded-lg text-brand-500 focus:ring-brand-500 border-stone-300"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                      {service.title}
                    </h4>
                    <span className="text-xs text-stone-400">
                      Category: {service.category?.name || "Auto Care"} · Base: ₹{service.defaultPrice}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="flex items-center gap-2 pl-8 sm:pl-0">
                    <span className="text-xs font-semibold text-stone-500">Your Rate (₹):</span>
                    <input
                      type="number"
                      value={selectedServices[service.id]}
                      onChange={(e) => handlePriceChange(service.id, e.target.value)}
                      className="w-28 px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-mono font-bold"
                    />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
