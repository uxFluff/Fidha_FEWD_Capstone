export default function ExitButton({ onExit }) {
  return (
    <button
      onClick={onExit}
      aria-label="Exit the simulation and return to the start"
      className="border border-muted/30 px-3 py-2 font-mono text-[13px] uppercase tracking-widest text-muted hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tube"
    >
      Exit
    </button>
  );
}