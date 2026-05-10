import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Award, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import graduationImage from "@/assets/graduation.jpeg";
import icijaLogo from "@/assets/icija-logo.png";

const achievementIcons = [Award, Award, Users];

export const Education = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const timeline = t("education.timeline", { returnObjects: true }) as { year: string; title: string; institution: string; description: string }[];
  const achievements = t("education.achievements", { returnObjects: true }) as string[];

  return (
    <section id="education" className="py-20">
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title text-xl text-primary">{t("education.sectionLabel")}</h2>
          <p className="section-subtitle text-secondary-foreground font-mono font-bold text-4xl">
            {t("education.sectionTitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {timeline.map((item, index) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 * (index + 1) }} className="timeline-item">
                <div className="mb-1">
                  <span className="text-sm font-semibold text-primary">{item.year}</span>
                </div>
                <h3 className="text-xl font-display font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground font-medium mb-2">{item.institution}</p>
                <p className="text-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="relative">
            <div className="sticky top-24">
              <img src={graduationImage} alt="Ana Dorotea Marín en su ceremonia de graduación" className="w-full h-80 lg:h-96 object-cover object-top rounded-2xl shadow-elevated" />
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="mt-12 flex flex-wrap gap-4 justify-center">
          {achievements.map((label, index) => {
            const Icon = achievementIcons[index];
            return (
              <div key={index} className="achievement-badge">
                <Icon className="w-4 h-4" />
                {label}
              </div>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }} className="mt-12 flex flex-col items-center gap-4">
          <img src={icijaLogo} alt="Logo de ICIJA" className="w-16 h-16 object-contain" />
          <a href="https://www.youtube.com/@icija-spain5628" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:shadow-elevated transition-all hover-lift">
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {t("education.watchICIJA")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
