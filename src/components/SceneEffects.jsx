import { motion, useReducedMotion } from "motion/react";
import { STAGE_FX } from "./sceneConfig";

export default function SceneEffects({ stage = 1, ending = null }) {
  const reduce = useReducedMotion();
  const i = Math.min(Math.max(stage, 1), 5) - 1;

  const vignette = ending === "confession" ? 0 : STAGE_FX.vignette[i];
  const tint = ending ? 0 : STAGE_FX.tint[i];
  const dark = STAGE_FX.flickerDark[i];
  const every = STAGE_FX.flickerEvery[i];
  const flicker = !reduce && !ending && every > 0;

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* warm tint */}
      <div
        className="absolute inset-0"
        style={{ background: "#D9B97A", opacity: tint, transition: "opacity 1.2s" }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 46%, transparent 30%, #0A0A0C 95%)",
          opacity: vignette,
          transition: "opacity 1.2s",
        }}
      />

      {/* two flicker layers with different timings, so it never looks regular */}
      {flicker && (
        <>
          <motion.div
            key={`a-${stage}`}
            className="absolute inset-0 bg-void"
            animate={{
              opacity: [0, 0, dark, 0, 0, dark * 0.5, 0, 0, dark * 0.8, 0, 0],
            }}
            transition={{
              duration: every,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.3, 0.31, 0.34, 0.55, 0.56, 0.58, 0.8, 0.81, 0.84, 1],
            }}
          />
          <motion.div
            key={`b-${stage}`}
            className="absolute inset-0 bg-void"
            animate={{ opacity: [0, dark * 0.6, 0, 0, dark * 0.4, 0, 0] }}
            transition={{
              duration: every * 1.618,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.2, 0.23, 0.6, 0.61, 0.65, 1],
            }}
          />
        </>
      )}

      {/* endings */}
      {ending === "confession" && (
        <motion.div
          className="absolute inset-0"
          style={{ background: "#FFF3D6" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ duration: reduce ? 0 : 0.15 }}
        />
      )}
      {ending === "holdout" && (
        <motion.div
          className="absolute inset-0 bg-void"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: reduce ? 0 : 2.5 }}
        />
      )}
    </div>
  );
}