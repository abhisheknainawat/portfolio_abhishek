"use client";
import React from "react";
import BlobCursor from "@/components/BlobCursor";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlobCursor />
      {children}
    </>
  );
}
