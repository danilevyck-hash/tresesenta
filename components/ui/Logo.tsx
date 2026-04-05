"use client";

import Image from "next/image";

export default function Logo({
  color = "white",
  size = "default",
}: {
  color?: "white" | "dark";
  size?: "default" | "large";
}) {
  const height = size === "large" ? 60 : 40;
  const width = size === "large" ? 240 : 160;

  return (
    <Image
      src="/logo-dark.png"
      alt="TRESESENTA Project Management"
      width={width}
      height={height}
      className={color === "white" ? "brightness-0 invert" : ""}
      priority
    />
  );
}
