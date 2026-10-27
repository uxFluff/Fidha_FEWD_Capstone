import { motion, useReducedMotion } from "motion/react";
import Scene from "./Scene";
import SceneEffects from "./SceneEffects";
import { HEAD_ORIGIN } from "./sceneConfig";

export default function SceneStage({
  stage = 1,
  scale = 1,
  fromScale,
  y = "0%",
  fromY,
  duration = 0,
  ending = null,
  eyes = true,
  onZoomDone,
  children,
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-void">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          style={{
            width: "max(100vw, 177.78vh)",
            height: "max(56.25vw, 100vh)",
            flexShrink: 0,
            transformOrigin: HEAD_ORIGIN,
          }}
          initial={{ scale: fromScale ?? scale, y: fromY ?? y }}
          animate={{ scale, y }}
          transition={{
            duration: reduce ? 0 : duration,
            ease: [0.65, 0, 0.35, 1],
          }}
          onAnimationComplete={onZoomDone}
        >
          <Scene stage={stage} />
          {}
        </motion.div>
      </div>

      <SceneEffects stage={stage} ending={ending} />
      {children}
    </div>
  );
}