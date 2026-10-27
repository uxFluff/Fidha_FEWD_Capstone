export default function ChoiceButton({ label, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="min-h-12 w-full rounded-[2px] border border-muted/40 bg-concrete px-4 py-3 text-left text-base hover:border-alarm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tube"
    >
      <span className="mr-3 font-mono text-[13px] text-muted">{label}</span>
      {children}
    </button>
  );
}