import { motion } from "framer-motion";

type OnboardFinishedProps = {
  onFinish: () => void;
};

export const OnboardFinished = ({ onFinish }: OnboardFinishedProps) => {
  return (
    <motion.div
      style={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -50,
        transition: {
          delay: 1,
        },
      }}
      className="max-w-[500px] px-5 text-balance fixed top-0 z-50 text-center flex flex-col h-dvh items-center justify-center gap-5"
    >
      <h2 className="font-bold text-xl">Great Choice! 😉</h2>
      <p>
        Thanks for sharing your preferences! I'll now tailor recommendations
        just for you, bringing exciting articles that match your interests.
      </p>
      <p>Feel free to explore and enjoy the content we've curated for you!</p>
      <button className="btn btn-outline mt-5" onClick={onFinish}>
        Let's go!
      </button>
    </motion.div>
  );
};
