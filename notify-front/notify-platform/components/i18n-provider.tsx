"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import { translations } from "@/lib/translations"

type Language = "pt-BR" | "en-US"

export const I18nContext = createContext({
  language: "pt-BR" as Language,
  setLanguage: (lang: Language) => {},
  t: (key: string) => key,
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      const browserLanguage = navigator.language
      if (browserLanguage.startsWith("en")) {
        setLanguage("en-US")
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
  }, [language])

  const t = (key: string) => {
    return translations[language]?.[key] || key
  }

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}
