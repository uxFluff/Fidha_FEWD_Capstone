import { motion } from "motion/react";

export default function DialogueBox({ speaker, line, children }) {
  return (
    <motion.div
      className="w-full max-w-[720px] border border-muted/30 bg-panel/95 p-5 md:p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="font-mono text-[13px] uppercase tracking-widest text-alarm">
        {speaker}
      </p>
      <p className="mt-2 text-base md:text-lg">{line}</p>
      <div className="mt-5 flex flex-col gap-3">{children}</div>
    </motion.div>
  );
}