import { useEffect, useRef } from "react";

// Twinkling stars, drifting glow-dust and the occasional shooting star.
export default function Sky() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w, h, raf, shoot = null, nextShoot = 4000;
    const size = () => {
      w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const small = w < 640;
    const stars = Array.from({ length: small ? 70 : 140 }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + 0.3,
      p: Math.random() * 6.28, s: Math.random() * 0.0018 + 0.0006,
    }));
    const tints = ["248,200,216", "230,194,122", "255,244,232"];
    const dust = Array.from({ length: small ? 18 : 34 }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2 + 1,
      vy: Math.random() * 0.22 + 0.05, p: Math.random() * 6.28,
      c: tints[Math.floor(Math.random() * 3)],
    }));

    const draw = (t = 0) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = 0.25 + 0.75 * Math.abs(Math.sin(t * s.s + s.p));
        ctx.fillStyle = `rgba(253,243,231,${a})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.fill();
        if (s.r > 1.2) {
          ctx.strokeStyle = `rgba(253,243,231,${a * 0.5})`; ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - s.r * 4, s.y); ctx.lineTo(s.x + s.r * 4, s.y);
          ctx.moveTo(s.x, s.y - s.r * 4); ctx.lineTo(s.x, s.y + s.r * 4);
          ctx.stroke();
        }
      }
      for (const d of dust) {
        if (!reduce) { d.y -= d.vy; d.x += Math.sin(t / 2200 + d.p) * 0.15; if (d.y < -10) { d.y = h + 10; d.x = Math.random() * w; } }
        const a = 0.2 + 0.3 * (0.5 + 0.5 * Math.sin(t / 1300 + d.p));
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 5);
        g.addColorStop(0, `rgba(${d.c},${a})`); g.addColorStop(1, `rgba(${d.c},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 5, 0, 6.28); ctx.fill();
      }
      if (!reduce) {
        nextShoot -= 16;
        if (!shoot && nextShoot < 0) {
          shoot = { x: Math.random() * w * 0.8 + w * 0.2, y: Math.random() * h * 0.3, life: 0 };
          nextShoot = 6000 + Math.random() * 5000;
        }
        if (shoot) {
          shoot.life += 1; shoot.x -= 9; shoot.y += 5;
          const a = 1 - shoot.life / 45;
          const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x + 90, shoot.y - 50);
          g.addColorStop(0, `rgba(253,243,231,${a})`); g.addColorStop(1, "rgba(253,243,231,0)");
          ctx.strokeStyle = g; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x + 90, shoot.y - 50); ctx.stroke();
          if (shoot.life > 45) shoot = null;
        }
        raf = requestAnimationFrame(draw);
      }
    };
    draw();
    addEventListener("resize", size);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); };
  }, []);
  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <canvas ref={ref} className="sky" aria-hidden="true" />
    </>
  );
}
