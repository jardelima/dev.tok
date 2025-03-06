import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type OnboardFinishedProps = {
  onFinish: () => void;
};

export const OnboardFinished = ({ onFinish }: OnboardFinishedProps) => {
  const { t } = useTranslation();

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
      <h2 className="font-bold text-xl">{t("onboarding.finishTitle")}</h2>
      <p>{t("onboarding.finishDescription")}</p>
      <p>{t("onboarding.finishExplore")}</p>
      <button className="btn btn-outline mt-5" onClick={onFinish}>
        {t("onboarding.letsGo")}
      </button>
    </motion.div>
  );
};
