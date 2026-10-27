import { useState } from "react";
import Typewriter from "../components/Typewriter";
import { cases, casesIntro, casesOutro } from "../content/content";

export default function CasesScreen({ onNext, onRestart }) {
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);

  const text = [
    casesIntro,
    ...cases.map((c) => `${c.name}. ${c.summary}`),
    casesOutro,
  ].join("\n\n");

  return (
    <div className="min-h-screen bg-void px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[13px] uppercase tracking-widest text-alarm">
          Real cases
        </p>

        <div className="mt-6">
          <Typewriter
            text={text}
            skip={skip}
            onDone={() => setDone(true)}
          />
        </div>

        {cases.length === 0 && (
          <p className="mt-6 border border-alarm/50 p-3 font-mono text-[13px] text-alarm">
            No cases added yet. Add verified cases to content.js.
          </p>
        )}

        {!done && (
          <button
            onClick={() => setSkip(true)}
            className="mt-8 px-2 py-2 font-mono text-[13px] uppercase tracking-widest text-muted hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tube"
          >
            Skip
          </button>
        )}

        {done && (
          <div className="mt-10">
            {cases.length > 0 && (
              <div className="border-t border-muted/30 pt-6">
                <p className="font-mono text-[13px] uppercase tracking-widest text-muted">
                  Sources
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {cases.map((c) => (
                    <li key={c.name}>
                      <a
                        href={c.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rights underline underline-offset-4 hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tube"
                      >
                        {c.name}: {c.sourceLabel}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={onNext}
                className="border border-muted/40 bg-concrete px-6 py-3 font-mono text-[13px] uppercase tracking-widest hover:border-alarm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tube"
              >
                What you can do
              </button>
              <button
                onClick={onRestart}
                className="px-6 py-3 font-mono text-[13px] uppercase tracking-widest text-muted hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tube"
              >
                Play again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}