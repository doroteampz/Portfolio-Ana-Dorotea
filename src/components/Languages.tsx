import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const percentages = [100, 85, 50];

export const Languages = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const items = t("languages_section.items", { returnObjects: true }) as { name: string; level: string }[];

  return (
    <section id="languages" className="py-20 bg-card/50">
      <div className="section-container max-w-4xl" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title text-center text-xl text-primary">{t("languages_section.sectionLabel")}</h2>
          <p className="section-subtitle text-center font-mono text-secondary-foreground font-bold text-3xl">
            {t("languages_section.sectionTitle")}
          </p>
        </motion.div>

        <div className="space-y-8">
          {items.map((language, index) => {
            const percentage = percentages[index];
            const isNative = percentage === 100;
            return (
              <motion.div key={language.name} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 * (index + 1) }} className="glass-card rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-display font-semibold">{language.name}</h3>
                    {!isNative && (
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        {language.level}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    {isNative ? t("languages_section.native") : `${percentage}%`}
                  </span>
                </div>
                <div className="skill-bar">
                  <motion.div className="skill-bar-fill" initial={{ width: 0 }} animate={isInView ? { width: `${percentage}%` } : {}} transition={{ duration: 1, delay: 0.3 * (index + 1) }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
