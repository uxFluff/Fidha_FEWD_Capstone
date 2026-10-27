import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { rightsCard } from "../content/content";

export default function RightsCardScreen({ onRestart }) {
  const cardRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    if (!cardRef.current) return;
    setSaving(true);
    setError("");
    try {
      // scales the card up so the saved image is about 1080 px wide
      const ratio = 1080 / cardRef.current.offsetWidth;
      const url = await toPng(cardRef.current, {
        pixelRatio: ratio,
        cacheBust: true,
        backgroundColor: "#0A0A0C",
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = "know-your-rights-card.png";
      a.click();
    } catch {
      setError("Couldn't save the image. Try a screenshot instead.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-void px-4 py-10 md:py-14">
      <div className="mx-auto flex max-w-[540px] flex-col items-center gap-6">
        {/* the card (this is what gets saved as an image) */}
        <div
          ref={cardRef}
          className="flex w-full flex-col border border-rights/40 bg-void p-6 md:aspect-[4/5] md:p-8"
        >
          <p className="font-mono text-[13px] uppercase tracking-widest text-rights">
            {rightsCard.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-5xl leading-none md:text-6xl">
            {rightsCard.title}
          </h1>

          <ol className="mt-5 flex flex-col gap-3">
            {rightsCard.lines.map((line, i) => (
              <li key={line.head} className="flex gap-3">
                <span className="font-mono text-[13px] text-rights">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-snug">
                  <span className="font-semibold">{line.head}. </span>
                  <span className="text-bone/85">{line.text}</span>
                  <span className="block font-mono text-[11px] text-muted">
                    {line.source}
                  </span>
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-auto pt-5">
            <div className="border border-rights p-3">
              <p className="font-mono text-[13px] uppercase tracking-widest text-rights">
                {rightsCard.help.label}
              </p>
              <p className="font-display text-4xl leading-none text-bone">
                {rightsCard.help.number}
              </p>
            </div>
            <p className="mt-3 font-mono text-[11px] leading-snug text-muted">
              {rightsCard.disclaimer}
            </p>
            {!rightsCard.reviewed && (
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-alarm">
                Draft, not legally reviewed
              </p>
            )}
          </div>
        </div>

        {error && (
          <p role="alert" className="font-mono text-[13px] text-alarm">
            {error}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="border border-rights bg-concrete px-6 py-3 font-mono text-[13px] uppercase tracking-widest text-rights hover:bg-rights hover:text-void disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tube"
          >
            {saving ? "Saving..." : "Save as image"}
          </button>
          <button
            onClick={onRestart}
            className="px-6 py-3 font-mono text-[13px] uppercase tracking-widest text-muted hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tube"
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  );
}