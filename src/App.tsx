import { ForYou } from "./components/ForYou";
import { motion } from "framer-motion";
import { OpeningAnimation } from "./components/OpeningAnimation";

export const App = () => {
  const alreadyHadAnimation =
    sessionStorage.getItem("openedAnimation") === "true";

  return (
    <>
      <OpeningAnimation />
      <motion.div
        style={{
          filter: alreadyHadAnimation ? "blur(0px)" : "blur(5px)",
        }}
        animate={{
          filter: "blur(0px)",
        }}
        transition={{
          duration: 2,
          delay: 6,
        }}
      >
        <ForYou />
      </motion.div>
    </>
  );
};
