"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export interface CompareProduct {
  id: string | number;
  title: string;
  imageUrl: string;
  productUrl: string;
  price: number;
  oldPrice?: number;
  brand?: string;
  status?: string;
  productCode?: string;
  specs?: Record<string, string>;
}

interface CompareContextValue {
  products: CompareProduct[];
  addProduct: (product: CompareProduct) => boolean;
  removeProduct: (id: string | number) => void;
  isInCompare: (id: string | number) => boolean;
  clearCompare: () => void;
  maxProducts: number;
}

const MAX_COMPARE = 4;

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<CompareProduct[]>([]);

  const addProduct = useCallback((product: CompareProduct): boolean => {
    let added = false;
    setProducts((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      added = true;
      return [...prev, product];
    });
    return added;
  }, []);

  const removeProduct = useCallback((id: string | number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const isInCompare = useCallback(
    (id: string | number) => products.some((p) => p.id === id),
    [products],
  );

  const clearCompare = useCallback(() => setProducts([]), []);

  const value = useMemo(
    () => ({
      products,
      addProduct,
      removeProduct,
      isInCompare,
      clearCompare,
      maxProducts: MAX_COMPARE,
    }),
    [products, addProduct, removeProduct, isInCompare, clearCompare],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within a CompareProvider");
  return ctx;
}
