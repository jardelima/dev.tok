import { useState } from "react";
import { OpeningAnimation } from "./OpeningAnimation";
import { PreferencesSelection } from "./PreferencesSelection";
import { motion } from "framer-motion";
import { OnboardFinished } from "./OnboardFinished";

type OnboardProps = {
  onFinish: () => void;
};

export const Onboard = ({ onFinish }: OnboardProps) => {
  const [step, setStep] = useState(0);

  const CurrentStep = [
    <OpeningAnimation onContinue={() => setStep(1)} />,
    <PreferencesSelection onFinish={() => setStep(2)} />,
    <OnboardFinished onFinish={onFinish} />,
  ];

  return (
    <div className="fixed h-dvh w-full flex flex-col justify-center items-center z-50">
      <motion.div
        className={"w-full h-full absolute top-0 left-0 z-20"}
        style={{
          y: "100%",
          opacity: 0,
        }}
        transition={{
          bounce: 0,
          duration: 2,
          transition: {
            delay: 1,
          },
        }}
        exit={{
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1.5,
          background:
            "linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
      {CurrentStep[step]}
    </div>
  );
};
