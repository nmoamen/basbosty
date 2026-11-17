import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { config } from "../config.js";
import Confetti from "./Confetti.jsx";
import { Flora } from "./Flower.jsx";

const arNum = (n) => new Intl.NumberFormat("ar-EG").format(n);

export default function Birthday() {
  const { greeting, caption, ageLine } = config.birthdaySection;
  const { displayDate, turningAge } = config.birthday;
  const rise = (d) => ({ initial: { opacity: 0, y: 24, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { delay: d, duration: 1.3, ease: "easeOut" } });
  return (
    <section className="screen birthday">
      <Confetti />
      <Flora />
      <div className="glow" aria-hidden="true" />
      <motion.p className="eyebrow" {...rise(0.4)}>{displayDate}</motion.p>
      <div className="name-orbit">
        <svg className="ring r1" viewBox="0 0 300 300" fill="none" aria-hidden="true">
          <circle cx="150" cy="150" r="146" stroke="rgba(230,194,122,.45)" strokeDasharray="1.5 9" strokeLinecap="round" />
          <circle cx="150" cy="4" r="3.5" fill="#e6c27a" />
        </svg>
        <svg className="ring r2" viewBox="0 0 300 300" fill="none" aria-hidden="true">
          <circle cx="150" cy="150" r="148" stroke="rgba(248,200,216,.28)" />
          <circle cx="150" cy="2" r="3" fill="#f8c8d8" />
        </svg>
        <div className="name-stack">
          <motion.h2 className="greeting-line" {...rise(0.9)}>{greeting}</motion.h2>
          <motion.h1 className="name" initial={{ opacity: 0, scale: 0.85, filter: "blur(16px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.5, duration: 1.8, ease: "easeOut" }}>
            {config.nickname}
          </motion.h1>
          <motion.p className="latin" {...rise(2.6)}>{config.nicknameLatin}</motion.p>
        </div>
      </div>
      {turningAge && <motion.p className="age" {...rise(3)}>{ageLine.replace("{age}", arNum(turningAge))}</motion.p>}
      <motion.p className="subtitle" {...rise(3.4)}><Sparkles size={16} /> {caption}</motion.p>
      <motion.div className="scroll-hint" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} aria-hidden="true">↓</motion.div>
    </section>
  );
}
