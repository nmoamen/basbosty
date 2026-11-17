import { motion } from "framer-motion";
import { config } from "../config.js";
import Moon from "./Moon.jsx";
import { Flora } from "./Flower.jsx";

export default function Welcome({ onOpen }) {
  const { eyebrow, title, subtitle, button } = config.welcome;
  const fade = (d) => ({ initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 1.3, delay: d, ease: "easeOut" } });
  return (
    <motion.section className="screen welcome" exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }} transition={{ duration: 1 }}>
      <div className="moonbeam" aria-hidden="true" />
      <Flora />
      <motion.div className="moon-wrap" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2.2, ease: "easeOut" }}>
        <svg className="ring r1" viewBox="0 0 300 300" fill="none" aria-hidden="true">
          <circle cx="150" cy="150" r="146" stroke="rgba(230,194,122,.5)" strokeDasharray="1.5 9" strokeLinecap="round" />
          <circle cx="150" cy="4" r="3.5" fill="#e6c27a" />
        </svg>
        <svg className="ring r2" viewBox="0 0 300 300" fill="none" aria-hidden="true">
          <circle cx="150" cy="150" r="148" stroke="rgba(248,200,216,.3)" />
          <circle cx="150" cy="2" r="3" fill="#f8c8d8" />
        </svg>
        <Moon size={190} />
      </motion.div>
      <motion.p className="eyebrow en" {...fade(0.9)}>{eyebrow}</motion.p>
      <motion.h1 {...fade(1.5)}>{title}</motion.h1>
      <motion.p className="subtitle" {...fade(2.4)}>{subtitle}</motion.p>
      <motion.button className="btn" onClick={onOpen} {...fade(3.2)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
        {button}
      </motion.button>
    </motion.section>
  );
}
