import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { config } from "../config.js";
import Heading from "./Heading.jsx";

const arNum = (n) => new Intl.NumberFormat("ar-EG").format(n);
export const parseDate = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };

// Calendar-accurate difference: years → months → days → h/m/s
export function elapsed(from, to) {
  let y = to.getFullYear() - from.getFullYear();
  let a = new Date(from); a.setFullYear(from.getFullYear() + y);
  if (a > to) { y--; a = new Date(from); a.setFullYear(from.getFullYear() + y); }
  let m = (to.getFullYear() - a.getFullYear()) * 12 + to.getMonth() - a.getMonth();
  let b = new Date(a); b.setMonth(a.getMonth() + m);
  if (b > to) { m--; b = new Date(a); b.setMonth(a.getMonth() + m); }
  let ms = to - b;
  const d = Math.floor(ms / 864e5); ms %= 864e5;
  const h = Math.floor(ms / 36e5); ms %= 36e5;
  const mi = Math.floor(ms / 6e4); ms %= 6e4;
  return { y, m, d, h, mi, s: Math.floor(ms / 1000), total: Math.floor((to - from) / 864e5) };
}

export default function Counter() {
  const start = parseDate(config.startDate);
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const t = elapsed(start, now);
  const tiles = [
    ["سنين", t.y], ["شهور", t.m], ["أيام", t.d], ["ساعات", t.h], ["دقايق", t.mi], ["ثواني", t.s],
  ];
  const since = start.toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" });

  return (
    <section className="section">
      <Heading eyebrow={config.counter.eyebrow} title={config.counter.title} />
      <div className="tiles" role="timer" aria-live="off">
        {tiles.map(([label, v], i) => (
          <motion.div key={label} className="tile" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}>
            <div className="num">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={v} initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} transition={{ duration: 0.35 }}>
                  {arNum(v)}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="lbl">{label}</span>
          </motion.div>
        ))}
      </div>
      <p className="eyebrow">{arNum(t.total)} يوم من {since}</p>
    </section>
  );
}
