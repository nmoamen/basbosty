import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { config } from "../config.js";
import Heading from "./Heading.jsx";
import Confetti from "./Confetti.jsx";
import { Flora } from "./Flower.jsx";

const isBirthday = () => {
  const d = new Date(), b = config.birthday;
  return d.getMonth() + 1 === b.month && d.getDate() === b.day;
};

export default function Surprise() {
  const s = config.surprise;
  const [open, setOpen] = useState(false);
  const [wished, setWished] = useState(false);
  const [lockedMsg, setLockedMsg] = useState(false);
  const [shake, setShake] = useState(0);
  const locked = config.birthday.surpriseMode === "onBirthday" && !isBirthday();
  const stars = useMemo(() => Array.from({ length: 18 }, (_, k) => ({ x: (Math.random() - 0.5) * 320, d: Math.random() * 0.9, s: 10 + Math.random() * 14, k })), []);
  const hearts = useMemo(() => Array.from({ length: 14 }, (_, k) => ({ x: (Math.random() - 0.5) * 300, y: -(260 + Math.random() * 220), s: 12 + Math.random() * 14, d: 0.3 + Math.random() * 1.2, k })), []);

  const tap = () => {
    if (locked) { setLockedMsg(true); setShake((k) => k + 1); return; }
    setOpen(true);
  };

  return (
    <section className="section surprise" style={{ "--glow": open ? "rgba(248,200,216,.22)" : "rgba(230,194,122,.1)" }}>
      <Flora />
      {open && <Confetti count={44} />}
      <Heading eyebrow={s.eyebrow} title={s.title} />

      {!open && <p className="eyebrow surprise-invitation">لسه في حاجة عايز أقولك عليها…</p>}
      <div className="gift-stage">
        <div className={`rays${open ? " on" : ""}`} aria-hidden="true" />
        <motion.button key={shake} className="gift" onClick={tap} aria-label={s.hint} disabled={open}
          animate={shake && !open ? { x: [0, -8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.5 }}>
          <motion.span className="burst" animate={open ? { opacity: [0, 1, 0.6], scale: [0.4, 2.4, 1.9] } : { opacity: 0.45, scale: [1, 1.18, 1] }}
            transition={open ? { duration: 1.6 } : { repeat: Infinity, duration: 3 }} />
          <motion.span className="lid" animate={open ? { y: -70, rotate: 12, x: 16 } : { y: [0, -5, 0] }}
            transition={open ? { duration: 0.9, ease: "easeOut" } : { repeat: Infinity, duration: 2.4 }} />
          <span className="box" /><span className="ribbon" />
        </motion.button>
        {open && hearts.map((h) => (
          <motion.span key={h.k} className="hfly up" initial={{ opacity: 0, y: 0, x: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], y: h.y, x: h.x, scale: 1 }} transition={{ duration: 4, delay: h.d, ease: "easeOut" }}>
            <Heart size={h.s} fill="currentColor" />
          </motion.span>
        ))}
      </div>

      {!open && !lockedMsg && <p className="eyebrow">{s.hint}</p>}
      {!open && lockedMsg && <p className="eyebrow">{s.locked.replace("{date}", config.birthday.displayDate)}</p>}

      <AnimatePresence>
        {open && (
          <motion.div className="final" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1.6, ease: "easeOut" }}>
            <motion.span animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }}><Sparkles className="gold" size={24} /></motion.span>
            <p className="final-text">{s.message}</p>
            <p className="eyebrow">{s.signature}</p>
            {!wished ? (
              <button className="btn" onClick={() => setWished(true)}>{s.wishButton}</button>
            ) : (
              <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{s.wishDone}</motion.p>
            )}
            <button className="skip" onClick={() => { setOpen(false); setWished(false); }}>{s.close}</button>
            {wished && stars.map((st) => (
              <motion.span key={st.k} className="wish-star" style={{ fontSize: st.s }} initial={{ y: 0, x: st.x, opacity: 0 }}
                animate={{ y: -520, opacity: [0, 1, 0] }} transition={{ duration: 4.5, delay: st.d, ease: "easeOut" }}>✦</motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
