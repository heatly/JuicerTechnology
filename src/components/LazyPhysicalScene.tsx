"use client";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./PhysicalScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-2xl bg-fg/5" aria-hidden />,
});

export function LazyPhysicalScene() {
  return <Scene />;
}
