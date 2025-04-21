"use client"

import { useContext } from "react"
import { I18nContext } from "@/components/i18n-provider"

export function useTranslation() {
  return useContext(I18nContext)
}
