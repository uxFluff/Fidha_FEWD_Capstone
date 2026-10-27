export default function Placeholder({ title, number, onNext, onRestart, isLast }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
      <p className="font-mono text-[13px] uppercase tracking-widest text-muted">
        Screen {number} of 7
      </p>
      <h1 className="font-display text-5xl md:text-[96px] leading-none">{title}</h1>
      <button
        onClick={isLast ? onRestart : onNext}
        className="bg-panel border border-muted/40 px-6 py-3 font-mono text-[13px] uppercase tracking-widest hover:border-alarm"
      >
        {isLast ? "Back to start" : "Next"}
      </button>
    </div>
  );
}