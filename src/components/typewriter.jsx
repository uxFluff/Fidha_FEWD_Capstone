import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function Typewriter({ text, speed = 18, skip = false, onDone }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const finished = reduce || skip || count >= text.length;

  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => setCount((c) => c + 1), speed);
    return () => clearInterval(id);
  }, [finished, speed]);

  useEffect(() => {
    if (finished && onDone) onDone();
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  const shown = finished ? text : text.slice(0, count);

  return (
    <p className="whitespace-pre-line font-mono text-base leading-relaxed md:text-lg">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
      <motion.span
        aria-hidden="true"
        className="ml-[2px] inline-block h-[1.1em] w-[0.55em] translate-y-[0.15em] bg-bone"
        animate={reduce ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      />
    </p>
  );
}