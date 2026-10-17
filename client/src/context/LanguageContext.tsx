import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Language,
  translations,
  categoryTranslations,
  serviceTranslations,
} from "../locales/translations";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
  tc: (categoryName: string) => string;
  ts: (serviceTitle: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("jg_language") as Language;
    if (saved === "hi" || saved === "en") return saved;
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("jg_language", language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "hi" : "en"));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string, defaultText?: string): string => {
    const item = translations[key];
    if (!item) return defaultText || key;
    return item[language] || defaultText || item.en || key;
  };

  const tc = (categoryName: string): string => {
    if (language === "hi" && categoryTranslations[categoryName]) {
      return categoryTranslations[categoryName];
    }
    return categoryName;
  };

  const ts = (serviceTitle: string): string => {
    if (language === "hi" && serviceTranslations[serviceTitle]) {
      return serviceTranslations[serviceTitle];
    }
    return serviceTitle;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
        t,
        tc,
        ts,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
