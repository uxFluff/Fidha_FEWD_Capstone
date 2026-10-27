import { useRef } from "react";
import SceneStage from "../components/SceneStage";
import { CLOSE_SCALE, CLOSE_Y } from "../components/sceneConfig";

export default function ZoomTransition({ onNext }) {
  const done = useRef(false);

  function finish() {
    if (done.current) return;
    done.current = true;
    onNext();
  }

  return (
    <SceneStage
      stage={1}
      fromScale={1}
      scale={CLOSE_SCALE}
      fromY="0%"
      y={CLOSE_Y}
      duration={1.8}
      onZoomDone={finish}
    />
  );
}