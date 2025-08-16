export const Og = ({ theme, title }: { theme: string; title: string }) => {
  const bg = theme === "dark" ? "#0b0b0b" : "#ffffff";
  const fg = theme === "dark" ? "#ffffff" : "#111111";

  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: bg,
        color: fg,
        gap: 28,
      }}
    >
      {/** biome-ignore lint/a11y/noSvgWithoutTitle: okay for now*/}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="220"
        height="220"
        fill="none"
        stroke={fg}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M3 6 L9 12 L3 18"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <line x1="12" y1="18" x2="18" y2="18" strokeLinecap="round"></line>
      </svg>

      <div
        style={{
          fontFamily: "Satoshi, system-ui, sans-serif",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        {title}
      </div>
    </div>
  );
};
