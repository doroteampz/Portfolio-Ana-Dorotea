import { useTranslation } from "react-i18next";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <button
      onClick={() => i18n.changeLanguage(isEn ? "es" : "en")}
      className="flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors text-foreground/70 hover:text-primary hover:bg-primary/5"
      aria-label="Toggle language"
    >
      <span className={isEn ? "text-primary font-bold" : "text-foreground/50"}>EN</span>
      <span className="text-foreground/30 mx-0.5">/</span>
      <span className={!isEn ? "text-primary font-bold" : "text-foreground/50"}>ES</span>
    </button>
  );
};
