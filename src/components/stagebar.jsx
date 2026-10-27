export default function StageBar({ current, total }) {
  return (
    <div className="flex items-center gap-3" aria-label={`Stage ${current} of ${total}`}>
      <span className="hidden font-mono text-[13px] uppercase tracking-widest text-muted sm:inline">
        Stage {current}/{total}
      </span>
      <div className="flex gap-[6px]">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-[4px] w-6 sm:w-10 ${i < current ? "bg-alarm" : "bg-muted/30"}`}
            style={{ transition: "background-color 0.6s" }}
          />
        ))}
      </div>
    </div>
  );
}