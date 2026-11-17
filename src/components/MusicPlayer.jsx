import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";

// Whispers of Love — the selected licensed piano recording.
// Playback starts from the visitor's click on the gift button.
export default function MusicPlayer({ onRegisterPlay }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(42);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}music/whispers-of-love.mp3`);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = volume / 100;
    audio.addEventListener("ended", () => setPlaying(false));
    audio.addEventListener("error", () => setError(true));
    audioRef.current = audio;
    onRegisterPlay?.(startPlayback);
    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
      setError(false);
    } catch {
      setPlaying(false);
      setError(true);
    }
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
      setError(false);
    } catch {
      setPlaying(false);
      setError(true);
    }
  };

  return (
    <div className="music-player" dir="rtl" aria-label="مشغل الموسيقى">
      <button className="music-toggle" onClick={toggle} aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}>
        {playing ? <Pause size={17} /> : <Play size={17} />}
        <Music2 size={17} />
        <span>{error ? "الموسيقى مش متاحة" : playing ? "البيانو شغال" : "شغّلي موسيقى هديتك"}</span>
      </button>
      <label className="music-volume" aria-label="مستوى الصوت">
        {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
      </label>
    </div>
  );
}
