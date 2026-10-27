import { useState } from "react";
import { AnimatePresence } from "motion/react";
import SceneStage from "../components/SceneStage";
import DialogueBox from "../components/dialoguebox";
import ChoiceButton from "../components/choicebutton";
import StageBar from "../components/stagebar";
import EvidenceCard from "../components/evidencecard";
import ExitButton from "../components/exitbutton";
import { CLOSE_Y, closeScaleFor } from "../components/sceneConfig";
import { stages, scenario } from "../content/content";

export default function InterrogationScreen({ onFinish, onRestart }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const stage = stages[stageIndex];

  function choose(option) {
    const gaveIn = option.leadsTo === "confession";
    const newChoices = [
      ...choices,
      { stageId: stage.id, text: option.text, gaveIn },
    ];

    if (gaveIn) {
      onFinish({ ending: "confession", crackedAt: stage.id, choices: newChoices });
    } else if (stageIndex === stages.length - 1) {
      onFinish({ ending: "holdout", crackedAt: null, choices: newChoices });
    } else {
      setChoices(newChoices);
      setStageIndex(stageIndex + 1);
    }
  }

  return (
    <SceneStage
      stage={stage.id}
      scale={closeScaleFor(stage.id)}
      y={CLOSE_Y}
      duration={1.6}
    >
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-6">
        <StageBar current={stage.id} total={stages.length} />
        <ExitButton onExit={onRestart} />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-4 pb-6 md:pb-8">
        <AnimatePresence>
          {stage.evidence && (
            <EvidenceCard key="evidence" label={stage.evidence} />
          )}
        </AnimatePresence>

        <DialogueBox
          key={stage.id}
          speaker={scenario.interrogator}
          line={stage.line}
        >
          {stage.options.map((option, i) => (
            <ChoiceButton
              key={option.text}
              label={String.fromCharCode(65 + i)}
              onClick={() => choose(option)}
            >
              {option.text}
            </ChoiceButton>
          ))}
        </DialogueBox>
      </div>
    </SceneStage>
  );
}