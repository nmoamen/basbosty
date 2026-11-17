import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { config } from "../config.js";
import Heading from "./Heading.jsx";

function useTypewriter(text, run, speed = 30) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    setN(0);
    const id = setInterval(() => setN((v) => { if (v >= text.length) { clearInterval(id); return v; } return v + 1; }), speed);
    return () => clearInterval(id);
  }, [run, text, speed]);
  return [n, setN];
}

export default function Letter() {
  const { eyebrow, title, hint, skip, greeting, paragraphs, closing, signature } = config.letter;
  const [open, setOpen] = useState(false);
  const [paper, setPaper] = useState(false);
  const full = useMemo(() => [greeting, ...paragraphs, `${closing}\n${signature}`].join("\n\n"), [greeting, paragraphs, closing, signature]);
  const [n, setN] = useTypewriter(full, paper);
  const done = n >= full.length;
  const openIt = () => { if (open) return; setOpen(true); setTimeout(() => setPaper(true), 1200); };

  return (
    <section className="section" style={{ "--glow": "rgba(230,194,122,.12)" }}>
      <Heading eyebrow={eyebrow} title={title} />
      <div className="envelope-wrap">
        <motion.div className="env-float" animate={open ? { y: 0 } : { y: [0, -9, 0] }} transition={open ? { duration: 0.6 } : { repeat: Infinity, duration: 3.4, ease: "easeInOut" }}>
          <span className="env-glow" aria-hidden="true" />
          <button className="envelope" onClick={openIt} aria-label={hint} disabled={open}>
            <div className="env-back" />
            <motion.div className="env-letter" animate={{ y: open ? -70 : 0 }} transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }} />
            <div className="env-front" />
            <motion.div className="env-flap" animate={{ rotateX: open ? 180 : 0, zIndex: open ? 1 : 4 }} transition={{ duration: 0.8, ease: "easeInOut" }} />
            <motion.span className="seal" animate={open ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: [1, 1.1, 1] }} transition={open ? {} : { repeat: Infinity, duration: 2 }}>
              <Heart size={20} fill="currentColor" />
            </motion.span>
          </button>
        </motion.div>
        {!open && <p className="eyebrow">{hint}</p>}
      </div>
      <AnimatePresence>
        {paper && (
          <motion.article className="paper" initial={{ opacity: 0, y: 50, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1, ease: "easeOut" }}>
            {full.slice(0, n).split("\n\n").map((block, i) => (
              <p key={i} className={i === 0 ? "greeting" : ""}>
                {block.split("\n").map((line, j, a) => <span key={j}>{line}{j < a.length - 1 && <br />}</span>)}
              </p>
            ))}
            {!done && <span className="caret" aria-hidden="true" />}
            {!done && <button className="skip" onClick={() => setN(full.length)}>{skip}</button>}
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
}
