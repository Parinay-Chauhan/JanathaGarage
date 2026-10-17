import React, { createContext, useContext, useEffect, useState } from "react";

export interface GeoLocation {
  latitude: number | null;
  longitude: number | null;
  city: string;
  address: string;
}

interface LocationContextType {
  location: GeoLocation;
  isLoadingGPS: boolean;
  detectCurrentLocation: () => Promise<void>;
  setManualLocation: (city: string, address: string, lat?: number, lng?: number) => void;
}

const defaultLocation: GeoLocation = {
  latitude: 28.6139,
  longitude: 77.209,
  city: "New Delhi",
  address: "Connaught Place, Central Delhi",
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<GeoLocation>(() => {
    const saved = localStorage.getItem("jg_location");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return defaultLocation;
  });

  const [isLoadingGPS, setIsLoadingGPS] = useState(false);

  useEffect(() => {
    localStorage.setItem("jg_location", JSON.stringify(location));
  }, [location]);

  const detectCurrentLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLoadingGPS(true);
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            city: "Detected Location",
            address: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
          });
          setIsLoadingGPS(false);
          resolve();
        },
        (error) => {
          console.warn("GPS detection failed or denied:", error.message);
          setIsLoadingGPS(false);
          resolve();
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  };

  const setManualLocation = (city: string, address: string, lat?: number, lng?: number) => {
    setLocation({
      city,
      address,
      latitude: lat || location.latitude,
      longitude: lng || location.longitude,
    });
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoadingGPS,
        detectCurrentLocation,
        setManualLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
