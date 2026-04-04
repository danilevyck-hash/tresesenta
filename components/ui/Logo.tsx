"use client";

export default function Logo({
  color = "white",
  size = "default",
}: {
  color?: "white" | "dark";
  size?: "default" | "large";
}) {
  const textColor = color === "white" ? "#FFFFFF" : "#231F20";
  const tealColor = "#00807E";
  const scale = size === "large" ? 1.5 : 1;

  return (
    <div className="flex items-center gap-3" style={{ transform: `scale(${scale})`, transformOrigin: "left center" }}>
      {/* Icon: T+L architectural mark */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* T vertical */}
        <rect x="8" y="4" width="4" height="32" fill={tealColor} />
        {/* T horizontal */}
        <rect x="4" y="4" width="20" height="4" fill={tealColor} />
        {/* L vertical */}
        <rect x="20" y="12" width="4" height="24" fill={textColor} />
        {/* L horizontal */}
        <rect x="20" y="32" width="16" height="4" fill={textColor} />
        {/* Right angle accent */}
        <rect x="28" y="4" width="8" height="2" fill={tealColor} opacity="0.5" />
        <rect x="34" y="4" width="2" height="14" fill={tealColor} opacity="0.5" />
      </svg>

      {/* Text */}
      <div className="flex flex-col">
        <span
          className="font-montserrat font-semibold text-xl tracking-[0.3em] uppercase leading-tight"
          style={{ color: textColor }}
        >
          TRESESENTA
        </span>
        <span
          className="font-montserrat font-bold text-[0.5rem] tracking-[0.25em] uppercase"
          style={{ color: tealColor }}
        >
          PROJECT MANAGEMENT
        </span>
      </div>
    </div>
  );
}
