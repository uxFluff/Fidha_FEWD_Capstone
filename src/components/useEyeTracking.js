import { useEffect } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";

// returns x/y from -1 to 1 following the pointer, smoothed
export function useEyeTracking() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    function onMove(e) {
      x.set((e.clientX / window.innerWidth - 0.5) * 2);
      y.set((e.clientY / window.innerHeight - 0.5) * 2);
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y]);

  return { x: sx, y: sy };
}