import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, Sparkles, Workflow, Globe, FileSpreadsheet } from "lucide-react";
import { useTranslation } from "react-i18next";

const skillIcons = [BarChart3, Sparkles, Workflow, Globe, FileSpreadsheet];

export const Skills = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const items = t("skills.items", { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section id="skills" className="py-20 bg-card/50">
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title text-center text-primary text-xl">{t("skills.sectionLabel")}</h2>
          <p className="section-subtitle text-center text-3xl font-mono font-extrabold text-secondary-foreground">
            {t("skills.sectionTitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((skill, index) => {
            const Icon = skillIcons[index];
            return (
              <motion.div key={skill.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 * (index + 1) }} className="glass-card rounded-2xl p-6 text-center hover-lift group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{skill.title}</h3>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
