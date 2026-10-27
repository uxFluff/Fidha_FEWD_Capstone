import SceneStage from "../components/SceneStage";
import { CLOSE_Y, closeScaleFor } from "../components/sceneConfig";
import { endings } from "../content/content";

export default function EndingScreen({ result, onNext }) {
  if (!result) return null;

  const ending = endings[result.ending];
  const body = ending.body.replace("{stage}", result.crackedAt);
  const stage = result.crackedAt ?? 5;

  return (
    <SceneStage
      stage={stage}
      scale={closeScaleFor(stage)}
      y={CLOSE_Y}
      ending={result.ending}
    >
      <div className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-6 md:pb-8">
        <div className="w-full max-w-[720px] border border-muted/30 bg-panel/95 p-5 md:p-6">
          <h1 className="font-display text-5xl leading-none md:text-7xl">
            {ending.title}
          </h1>
          <p className="mt-3 text-base md:text-lg">{body}</p>

          {/* temporary list of your choices, replaced by the replay later */}
          <div className="mt-4 flex flex-col gap-1 font-mono text-[13px] text-muted">
            {result.choices.map((c) => (
              <p key={c.stageId}>
                Stage {c.stageId}: {c.text} {c.gaveIn ? "(gave in)" : "(held)"}
              </p>
            ))}
          </div>

          <button
            onClick={onNext}
            className="mt-5 border border-muted/40 bg-concrete px-6 py-3 font-mono text-[13px] uppercase tracking-widest hover:border-alarm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tube"
          >
            Next
          </button>
        </div>
      </div>
    </SceneStage>
  );
}