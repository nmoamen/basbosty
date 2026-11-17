import { useMemo } from "react";
const palette = ["#f8c8d8", "#e6c27a", "#fff4e8", "#ee8fb0"];

export default function Confetti({ count = 24 }) {
  const pieces = useMemo(() => Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 8, dur: 8 + Math.random() * 6,
    size: 5 + Math.random() * 7, color: palette[i % 4], round: i % 3 === 0,
  })), [count]);
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <span key={i} style={{ left: `${p.left}%`, width: p.size, height: p.round ? p.size : p.size * 1.7,
          borderRadius: p.round ? "50%" : "50% 0", background: p.color, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }} />
      ))}
    </div>
  );
}
