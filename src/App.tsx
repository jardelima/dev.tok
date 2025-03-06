import { ForYou } from "./components/ForYou";
import { motion } from "framer-motion";
import { useState } from "react";
import { Onboard } from "./components/Onboard";

export const App = () => {
  const [isOnboarded, setIsOnboarded] = useState(
    localStorage.getItem("preferences") !== null
  );

  return (
    <>
      {!isOnboarded && <Onboard onFinish={() => setIsOnboarded(true)} />}
      <motion.div
        style={{
          filter: isOnboarded ? "blur(0px)" : "blur(5px)",
          overflow: isOnboarded ? "initial" : "hidden",
        }}
        animate={{
          filter: isOnboarded ? "blur(0px)" : "blur(5px)",
          overflow: isOnboarded ? "initial" : "hidden",
        }}
      >
        <ForYou />
      </motion.div>
    </>
  );
};
