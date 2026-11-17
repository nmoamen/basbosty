import { useMemo } from "react";

// Slowly drifting rose petals across the whole page.
export default function Petals({ count = 16 }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100, size: 10 + Math.random() * 14, delay: -Math.random() * 24,
    dur: 16 + Math.random() * 14, drift: (Math.random() - 0.5) * 180, tone: i % 3,
  })), [count]);
  return (
    <div className="petals" aria-hidden="true">
      {items.map((p, i) => (
        <span key={i} className={`fp t${p.tone}`}
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 1.3, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, "--drift": `${p.drift}px` }} />
      ))}
    </div>
  );
}
