import { motion } from "framer-motion";
import Flower from "./Flower.jsx";

const rise = { hide: { opacity: 0, y: 22, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } };

export default function Heading({ eyebrow, title }) {
  return (
    <motion.header className="heading" initial="hide" whileInView="show" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.18 }}>
      {eyebrow && <motion.p className="eyebrow en" variants={rise} transition={{ duration: 1 }}>{eyebrow}</motion.p>}
      <motion.h2 variants={rise} transition={{ duration: 1.1 }}>{title}</motion.h2>
      <span className="rule" aria-hidden="true">
        <motion.i className="ln" style={{ originX: 1 }} variants={{ hide: { scaleX: 0 }, show: { scaleX: 1 } }} transition={{ duration: 1.2, delay: 0.5 }} />
        <motion.span variants={{ hide: { scale: 0, rotate: -90 }, show: { scale: 1, rotate: 0 } }} transition={{ duration: 0.9, delay: 0.4, type: "spring" }}>
          <Flower size={24} />
        </motion.span>
        <motion.i className="ln r" style={{ originX: 0 }} variants={{ hide: { scaleX: 0 }, show: { scaleX: 1 } }} transition={{ duration: 1.2, delay: 0.5 }} />
      </span>
    </motion.header>
  );
}
