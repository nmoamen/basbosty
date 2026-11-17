import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { config } from "../config.js";
import Heading from "./Heading.jsx";

const arNum = (n) => new Intl.NumberFormat("ar-EG").format(n);

export default function Reasons() {
  const { eyebrow, title, hint, next, again, items } = config.reasons;
  const [i, setI] = useState(0);
  const [burst, setBurst] = useState(0);
  const atEnd = i === items.length - 1;
  const hearts = useMemo(() => Array.from({ length: 10 }, () => ({
    x: (Math.random() - 0.5) * 240, y: -(120 + Math.random() * 160), r: (Math.random() - 0.5) * 70, s: 12 + Math.random() * 12, d: Math.random() * 0.3,
  })), [burst]);
  const go = () => { setI(atEnd ? 0 : i + 1); setBurst((b) => b + 1); };

  return (
    <section className="section" style={{ "--glow": "rgba(248,200,216,.14)" }}>
      <Heading eyebrow={eyebrow} title={title} />
      <div className="reason-stage">
        <div className="ghost g1" aria-hidden="true" /><div className="ghost g2" aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.div key={i} className="reason-card" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.5}
            onDragEnd={(_, info) => Math.abs(info.offset.x) > 80 && go()}
            initial={{ opacity: 0, rotateY: -75, y: 20 }} animate={{ opacity: 1, rotateY: 0, y: 0 }} exit={{ opacity: 0, rotateY: 75, y: -10 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>
            <span className="count">{arNum(i + 1)} / {arNum(items.length)}</span>
            <p>{items[i]}</p>
            <motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <Heart size={20} fill="currentColor" className="rose" />
            </motion.span>
          </motion.div>
        </AnimatePresence>
        {burst > 0 && (
          <div className="hearts" key={burst} aria-hidden="true">
            {hearts.map((h, k) => (
              <motion.span key={k} className="hfly" initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 0], x: h.x, y: h.y, rotate: h.r, scale: 1 }} transition={{ duration: 1.7, delay: h.d, ease: "easeOut" }}>
                <Heart size={h.s} fill="currentColor" />
              </motion.span>
            ))}
          </div>
        )}
      </div>
      <div className="dots" aria-hidden="true">{items.map((_, k) => <i key={k} className={k <= i ? "on" : ""} />)}</div>
      <motion.button className="btn" onClick={go} whileTap={{ scale: 0.95 }}>{atEnd ? again : next}</motion.button>
      <p className="eyebrow muted">{hint}</p>
    </section>
  );
}
