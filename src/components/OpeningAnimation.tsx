import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const OpeningAnimation = () => {
  const [hasOpenedAnimation, setHasOpenedAnimation] = useState(
    sessionStorage.getItem("openedAnimation") === "true"
  );

  const onAnimationFinish = () => {
    setHasOpenedAnimation(true);
    sessionStorage.setItem("openedAnimation", "true");
  };

  return (
    <AnimatePresence>
      {!hasOpenedAnimation && (
        <>
          <motion.div className="fixed h-screen w-full flex flex-col justify-center items-center z-50">
            <motion.div
              className={"w-full h-full absolute top-0 left-0"}
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
            <div className="absolute">
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
                onAnimationComplete={onAnimationFinish}
                src="/logo-full.svg"
                alt="logo"
                className="w-40"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
