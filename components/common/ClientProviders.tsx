"use client";

import React from "react";
import { CompareProvider } from "@/contexts/CompareContext";
import ScrollToTop from "./ScrollToTop";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CompareProvider>
      <ScrollToTop />
      {children}
    </CompareProvider>
  );
}
