import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Sky from "./components/Sky.jsx";
import Petals from "./components/Petals.jsx";
import Sparkles from "./components/Sparkles.jsx";
import Welcome from "./components/Welcome.jsx";
import Birthday from "./components/Birthday.jsx";
import Counter from "./components/Counter.jsx";
import Timeline from "./components/Timeline.jsx";
import Reasons from "./components/Reasons.jsx";
import Letter from "./components/Letter.jsx";
import Surprise from "./components/Surprise.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  return <motion.div className="progress" style={{ scaleX: x }} aria-hidden="true" />;
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const startMusicRef = useRef(null);
  const openGift = () => {
    // Start audio directly inside the visitor's click gesture so the browser allows playback.
    startMusicRef.current?.();
    window.scrollTo(0, 0);
    setOpened(true);
  };
  return (
    <>
      <Sky />
      <Petals />
      <Sparkles />
      <MusicPlayer onRegisterPlay={(play) => { startMusicRef.current = play; }} />
      <AnimatePresence mode="wait">
        {!opened ? (
          <Welcome key="w" onOpen={openGift} />
        ) : (
          <motion.main key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, ease: "easeOut" }}>
            <ProgressBar />
            <Birthday />
            <Counter />
            <Timeline />
            <Reasons />
            <Letter />
            <Surprise />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
