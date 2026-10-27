import { motion } from "motion/react";

export default function EvidenceCard({ label }) {
  return (
    <motion.div
      className="w-full max-w-[720px] bg-manila px-4 py-3 text-void"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-mono text-[13px] uppercase tracking-widest">
        Claimed evidence
      </p>
      <p className="mt-1 font-semibold">{label}</p>
    </motion.div>
  );
}