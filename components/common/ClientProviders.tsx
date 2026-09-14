"use client";

import React from "react";
import { CompareProvider } from "@/contexts/CompareContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <CompareProvider>{children}</CompareProvider>;
}
