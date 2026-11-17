export default function Flower({ size = 80, className = "", style }) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} className={className} style={style} aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => i * 45).map((a) => (
        <ellipse key={a} cx="0" cy="-22" rx="9" ry="22" fill={a % 90 ? "#f4a6c0" : "#f8c8d8"} opacity=".85" transform={`rotate(${a})`} />
      ))}
      <circle r="8" fill="#e6c27a" />
      <circle r="3.5" fill="#fff4e8" opacity=".9" />
    </svg>
  );
}

export function Flora() {
  return (
    <div className="flora" aria-hidden="true">
      <Flower size={90} className="f1" />
      <Flower size={56} className="f2" />
      <Flower size={70} className="f3" />
    </div>
  );
}
