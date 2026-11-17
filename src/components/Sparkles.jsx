import { useEffect, useRef } from "react";

// Gold sparkle trail that follows the finger / cursor, plus a burst on tap.
export default function Sparkles() {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = ref.current;
    let last = 0;
    const spawn = (x, y, big = 1) => {
      const s = document.createElement("span");
      s.textContent = "✦";
      s.className = "spark";
      s.style.cssText = `left:${x}px;top:${y}px;font-size:${(8 + Math.random() * 10) * big}px;--dx:${(Math.random() - 0.5) * 70 * big}px;--dy:${(20 + Math.random() * 40) * big}px`;
      host.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
      if (host.children.length > 48) host.firstChild.remove();
    };
    const move = (e) => { const t = performance.now(); if (t - last < 55) return; last = t; spawn(e.clientX, e.clientY); };
    const down = (e) => { for (let i = 0; i < 7; i++) spawn(e.clientX, e.clientY, 1.6); };
    addEventListener("pointermove", move);
    addEventListener("pointerdown", down);
    return () => { removeEventListener("pointermove", move); removeEventListener("pointerdown", down); };
  }, []);
  return <div ref={ref} className="sparks" aria-hidden="true" />;
}
