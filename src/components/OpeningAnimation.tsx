import { AnimatePresence, motion } from "framer-motion";

type OpeningAnimationProps = {
  onContinue: () => void;
};

export const OpeningAnimation = ({ onContinue }: OpeningAnimationProps) => {
  return (
    <AnimatePresence>
      <div className="fixed h-dvh w-full flex flex-col justify-center items-center z-50">
        <div className="absolute flex flex-col items-center">
          <motion.p
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
            transition={{
              delay: 2,
            }}
            className="font-['bayon'] text-4xl"
          >
            Welcome to
          </motion.p>
          <motion.img
            style={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              y: -50,
              opacity: 0,
              transition: {
                delay: 1.5,
              },
            }}
            transition={{
              delay: 3,
              duration: 2,
            }}
            src="/logo-full.svg"
            alt="logo"
            className="w-40"
          />
          <motion.button
            style={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 1.5,
              },
            }}
            transition={{
              delay: 5,
            }}
            className="btn mt-5 btn-outline"
            onClick={onContinue}
          >
            Thanks!
          </motion.button>
        </div>
      </div>
    </AnimatePresence>
  );
};
