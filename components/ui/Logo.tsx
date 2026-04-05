"use client";

import Image from "next/image";

export default function Logo({
  color = "white",
  size = "default",
}: {
  color?: "white" | "dark";
  size?: "default" | "large";
}) {
  const height = size === "large" ? 80 : 44;
  const width = size === "large" ? 320 : 176;

  return (
    <Image
      src="/brand/LOGOS/Tresesenta-32.png"
      alt="TRESESENTA Project Management"
      width={width}
      height={height}
      className={`object-contain ${color === "white" ? "brightness-0 invert" : ""}`}
      priority
    />
  );
}
