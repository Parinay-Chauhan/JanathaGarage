import { useState, useEffect } from "react";

export interface CustomerAddress {
  id: string;
  label: "Home" | "Work" | "Other";
  houseNo: string;
  street: string;
  landmark?: string;
  city: string;
  pincode: string;
  isDefault: boolean;
  latitude?: number | null;
  longitude?: number | null;
}

const DEFAULT_ADDRESSES: CustomerAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    houseNo: "Flat 402, Block C",
    street: "Lotus Apartments, Connaught Place",
    landmark: "Near Central Metro Station",
    city: "New Delhi",
    pincode: "110001",
    isDefault: true,
    latitude: 28.6304,
    longitude: 77.2177,
  },
  {
    id: "addr-2",
    label: "Work",
    houseNo: "Level 4, Building 10-B",
    street: "DLF Cyber City, Phase 2",
    landmark: "Opposite Rapid Metro",
    city: "Gurugram",
    pincode: "122002",
    isDefault: false,
    latitude: 28.4906,
    longitude: 77.0898,
  },
];

const STORAGE_KEY = "jg_customer_addresses";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<CustomerAddress[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // fallback
    }
    return DEFAULT_ADDRESSES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
    } catch (e) {
      // ignore
    }
  }, [addresses]);

  const addAddress = (newAddr: Omit<CustomerAddress, "id">) => {
    const id = `addr-${Date.now()}`;
    const item: CustomerAddress = {
      ...newAddr,
      id,
    };
    if (newAddr.isDefault) {
      setAddresses((prev) => [
        item,
        ...prev.map((a) => ({ ...a, isDefault: false })),
      ]);
    } else {
      setAddresses((prev) => [...prev, item]);
    }
    return item;
  };

  const updateAddress = (id: string, updated: Partial<CustomerAddress>) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, ...updated };
        }
        if (updated.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

  return {
    addresses,
    defaultAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
};
