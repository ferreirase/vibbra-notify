"use client"

import type React from "react"

import { useEffect } from "react"

export function MSWProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_API_MOCK === "true") {
      import("@/lib/msw").then(({ setupMSW }) => {
        setupMSW()
      })
    }
  }, [])

  return <>{children}</>
}
