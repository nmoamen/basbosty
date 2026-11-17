import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { config } from "../config.js";
import Heading from "./Heading.jsx";
import { parseDate } from "./Counter.jsx";

const arNum = (n) => new Intl.NumberFormat("ar-EG", { useGrouping: false }).format(n);
const fmt = (d) => d.toLocaleDateString("ar-EG", { month: "long", year: "numeric" });

export default function Timeline() {
  const { eyebrow, title, chapters, labels, ongoing } = config.timeline;
  const start = parseDate(config.startDate), now = new Date();
  const shift = (n) => { const d = new Date(start); d.setFullYear(start.getFullYear() + n); return d; };
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  return (
    <section className="section">
      <Heading eyebrow={eyebrow} title={title} />
      <div className="timeline" ref={ref}>
        <div className="thread" aria-hidden="true"><motion.i style={{ scaleY: fill }} /></div>
        {chapters.map((c, i) => {
          const from = shift(i), to = shift(i + 1);
          const live = now >= from && now < to;
          return (
            <motion.article key={i} className={`chapter ${i % 2 ? "alt" : ""}`}
              initial={{ opacity: 0, x: i % 2 ? -70 : 70, scale: 0.96 }} whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ type: "spring", stiffness: 70, damping: 16 }}>
              <span className="numeral" aria-hidden="true">{arNum(i + 1)}</span>
              <p className="eyebrow">{labels[i]} · {fmt(from)} — {fmt(to)}{live && ` · ${ongoing}`}</p>
              <h3>{c.title}</h3>
              <ul>{c.memories.map((m, j) => <li key={j}>{m}</li>)}</ul>
              <p className="note">{c.note}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
