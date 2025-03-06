import { motion } from "framer-motion";
import { useState } from "react";
import { Onboard } from "./components/Onboard";
import { Feed } from "./components/Feed";

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
        <Feed />
      </motion.div>
    </>
  );
};
