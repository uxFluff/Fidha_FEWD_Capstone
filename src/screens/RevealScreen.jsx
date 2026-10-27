import { motion, useReducedMotion } from "motion/react";
import { stages, reveal } from "../content/content";

export default function RevealScreen({ result, onNext, onRestart }) {
  const reduce = useReducedMotion();
  if (!result) return null;

  const intro = reveal[result.ending];

  return (
    <div className="min-h-screen bg-void px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        {/* opening */}
        <p className="font-mono text-[13px] uppercase tracking-widest text-muted">
          {intro.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-5xl leading-none md:text-[72px]">
          {intro.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base text-bone/90 md:text-lg">
          {intro.body}
        </p>

        {/* stage by stage replay */}
        <div className="mt-12 flex flex-col gap-6">
          {stages.map((stage, i) => {
            const choice = result.choices.find((c) => c.stageId === stage.id);
            const reached = Boolean(choice);

            return (
              <motion.section
                key={stage.id}
                className={`border border-muted/30 bg-panel p-5 md:p-6 ${
                  reached ? "" : "opacity-60"
                }`}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: reached ? 1 : 0.6, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.03 }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-[13px] uppercase tracking-widest text-muted">
                    Stage {stage.id}
                  </p>
                  <p className="font-mono text-[13px] uppercase tracking-widest text-alarm">
                    {stage.tactic}
                  </p>
                </div>

                <p className="mt-4 text-muted">
                  <span className="font-mono text-[13px] uppercase tracking-widest">
                    He said
                  </span>
                  <span className="mt-1 block text-bone/90">{stage.line}</span>
                </p>

                <div className="mt-4">
                  <p className="font-mono text-[13px] uppercase tracking-widest text-muted">
                    You chose
                  </p>
                  {reached ? (
                    <p className="mt-1">
                      {choice.text}{" "}
                      <span
                        className={`ml-2 font-mono text-[13px] uppercase tracking-widest ${
                          choice.gaveIn ? "text-alarm" : "text-muted"
                        }`}
                      >
                        {choice.gaveIn ? "Gave in" : "Held"}
                      </span>
                    </p>
                  ) : (
                    <p className="mt-1 text-muted">Not reached</p>
                  )}
                </div>

                {/* rights, in cold blue */}
                <div className="mt-5 border-l-2 border-rights pl-4">
                  <p className="font-mono text-[13px] uppercase tracking-widest text-rights">
                    Your rights
                  </p>
                  <p className="mt-1">{stage.rightsNote}</p>
                  <p className="mt-1 font-mono text-[13px] text-muted">
                    {stage.source}
                  </p>
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* why it works */}
        <h2 className="mt-16 font-display text-4xl leading-none md:text-5xl">
          {reveal.whyTitle}
        </h2>
        <div className="mt-6 flex flex-col gap-5">
          {reveal.why.map((item) => (
            <div key={item.head}>
              <p className="font-semibold">{item.head}</p>
              <p className="mt-1 text-bone/80">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 font-mono text-[13px] text-muted">
          {reveal.disclaimer}
        </p>

        {/* navigation */}
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            onClick={onNext}
            className="border border-muted/40 bg-concrete px-6 py-3 font-mono text-[13px] uppercase tracking-widest hover:border-alarm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tube"
          >
            Real cases
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