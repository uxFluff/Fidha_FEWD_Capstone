import { useState } from "react";
import IntroScreen from "./screens/IntroScreen";
import ZoomTransition from "./screens/ZoomTransition";
import InterrogationScreen from "./screens/InterrogationScreen";
import EndingScreen from "./screens/EndingScreen";
import RevealScreen from "./screens/RevealScreen";
import CasesScreen from "./screens/CasesScreen";
import RightsCardScreen from "./screens/RightsCardScreen";

const screens = [
  IntroScreen,
  ZoomTransition,
  InterrogationScreen,
  EndingScreen,
  RevealScreen,
  CasesScreen,
  RightsCardScreen,
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState(null);
  const Screen = screens[index];

  const next = () => setIndex((i) => Math.min(i + 1, screens.length - 1));
  const restart = () => {
    setResult(null);
    setIndex(0);
  };

  return (
    <Screen
      result={result}
      onNext={next}
      onRestart={restart}
      onFinish={(r) => {
        setResult(r);
        next();
      }}
      isLast={index === screens.length - 1}
    />
  );
}