"use client";

import type { ReactNode } from "react";
import { openBasket } from "@/lib/ui";

export function OrderButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={openBasket} className={className}>
      {children}
    </button>
  );
}
