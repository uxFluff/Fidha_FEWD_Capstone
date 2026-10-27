import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SceneStage from "../components/SceneStage";
import { scenario } from "../content/content";

// film grain, drawn as a tiny noise image
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`;

const pad = (n) => String(n).padStart(2, "0");

// a recording clock that starts at 23:47:00 and ticks up
function clockText(seconds) {
  const total = (23 * 3600 + 47 * 60 + seconds) % 86400;
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`;
}

export default function IntroScreen({ onNext }) {
  const reduce = useReducedMotion();
  const [starting, setStarting] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const went = useRef(false);

  // delay helper: no delays if the visitor prefers reduced motion
  const d = (t) => (reduce ? 0 : t);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  function go() {
    if (!starting) setStarting(true);
  }

  // runs when the camera has settled after clicking Play
  function arrived() {
    if (starting && !went.current) {
      went.current = true;
      onNext();
    }
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-void">
      {/* the room, drifting very slowly like a handheld camera */}
      <motion.div
        className="absolute inset-0"
        animate={
          starting || reduce
            ? { scale: 1, x: "0%" }
            : { scale: [1, 1.04, 1], x: ["0%", "-1%", "0%"] }
        }
        transition={
          starting || reduce
            ? { duration: reduce ? 0 : 0.5, ease: "easeOut" }
            : { duration: 24, repeat: Infinity, ease: "easeInOut" }
        }
        onAnimationComplete={arrived}
      >
        <SceneStage stage={1} scale={1} />
      </motion.div>

      {/* now and then the light dips */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-void"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.22, 0, 0, 0.1, 0, 0, 0] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            delay: 4,
            ease: "linear",
            times: [0, 0.3, 0.31, 0.34, 0.6, 0.61, 0.64, 0.8, 1],
          }}
        />
      )}

      {/* film grain */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 opacity-[0.07]"
        style={{ backgroundImage: GRAIN }}
        animate={
          reduce
            ? {}
            : { x: [0, -7, 5, -3, 6, 0], y: [0, 5, -6, 4, -3, 0] }
        }
        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
      />

      {/* camera readout */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-20 flex justify-between px-4 font-mono text-[11px] uppercase tracking-widest text-bone/70 md:px-8 md:text-[13px]"
        style={{ top: "calc(6vh + 1rem)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: starting ? 0 : 1 }}
        transition={{ duration: 1, delay: starting ? 0 : d(1.8) }}
      >
        <span className="flex items-center gap-2">
          <motion.span
            className="inline-block h-2 w-2 rounded-full bg-alarm"
            animate={reduce ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          />
          REC · CAM 02
        </span>
        <span>Interview room 3 · {clockText(seconds)}</span>
      </motion.div>

      {/* title and button */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-4 bg-gradient-to-t from-void via-void/80 to-transparent px-6 pt-28 text-center"
        style={{ paddingBottom: "calc(6vh + 1.5rem)" }}
        animate={{ opacity: starting ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          className="font-display text-5xl leading-none md:text-[96px]"
          initial={
            reduce
              ? false
              : { opacity: 0, y: 24, filter: "blur(14px)", letterSpacing: "0.14em" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.01em" }}
          transition={{ duration: 1.6, delay: d(2) }}
        >
          {scenario.title}
        </motion.h1>

        <motion.p
          className="text-muted"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: d(2.8) }}
        >
          Know your rights in the room.
        </motion.p>

        <motion.p
          className="max-w-xl text-sm text-bone/80 md:text-base"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: d(3.2) }}
        >
          {scenario.setup}
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: d(3.6) }}
        >
          <motion.button
            onClick={go}
            disabled={starting}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            className="border border-muted/40 bg-panel px-8 py-3 font-mono text-[13px] uppercase tracking-widest hover:border-alarm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tube"
          >
            Play
          </motion.button>
          <p className="font-mono text-[13px] uppercase tracking-widest text-muted">
            {scenario.note}
          </p>
        </motion.div>
      </motion.div>

      {/* the tube light flickering on when the page opens */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 bg-void"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0.15, 1, 0.35, 0.9, 0.05, 0.5, 0, 0] }}
          transition={{
            duration: 2.6,
            ease: "linear",
            times: [0, 0.15, 0.18, 0.24, 0.3, 0.36, 0.42, 0.5, 0.56, 1],
          }}
        />
      )}

      {/* letterbox bars sliding in */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-40 bg-void"
        initial={{ height: reduce ? "6vh" : 0 }}
        animate={{ height: "6vh" }}
        transition={{ duration: 1.6, delay: d(0.4), ease: "easeOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-40 bg-void"
        initial={{ height: reduce ? "6vh" : 0 }}
        animate={{ height: "6vh" }}
        transition={{ duration: 1.6, delay: d(0.4), ease: "easeOut" }}
      />
    </div>
  );
}