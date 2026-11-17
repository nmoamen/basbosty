export default function Moon({ size = 180 }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="moon" aria-hidden="true">
      <defs>
        <radialGradient id="moonBody" cx="38%" cy="34%"><stop offset="0" stopColor="#fffaf0" /><stop offset="1" stopColor="#efd9ac" /></radialGradient>
        <radialGradient id="moonHalo"><stop offset="0" stopColor="#f8b8cf" stopOpacity=".65" /><stop offset="1" stopColor="#f8b8cf" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill="url(#moonHalo)" />
      <circle cx="100" cy="100" r="50" fill="url(#moonBody)" />
      <circle cx="84" cy="88" r="9" fill="#d8bd8a" opacity=".4" />
      <circle cx="116" cy="108" r="12" fill="#d8bd8a" opacity=".32" />
      <circle cx="100" cy="124" r="5" fill="#d8bd8a" opacity=".35" />
    </svg>
  );
}
