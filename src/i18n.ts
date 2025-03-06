import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJson from "./locales/en.json";
import ptJson from "./locales/pt.json";

const getUiLanguage = () => {
	const browserLang = navigator.language;
	const params = new URLSearchParams(window.location.search);

	return params.get("lang") ?? browserLang ?? "en";
};

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: enJson },
		pt: { translation: ptJson },
	},
	lng: getUiLanguage(),
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
