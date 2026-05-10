import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Dumbbell, Plane, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import futsalImage from "@/assets/futsal.jpeg";
import travelImage from "@/assets/travel.jpeg";

export const About = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const tickerItems = t("about.ticker", { returnObjects: true }) as string[];

  return (
    <section id="about" className="py-20">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-primary text-lg font-medium tracking-wide mb-2">{t("about.sectionLabel")}</h2>
          <p className="font-display font-bold text-3xl md:text-4xl text-secondary-foreground">
            {t("about.sectionTitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-2 bg-card rounded-3xl p-8 shadow-soft border border-border/50"
          >
            <p className="text-foreground/80 leading-relaxed mb-6">{t("about.bio")}</p>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed">{t("about.travelHobby")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-card rounded-3xl overflow-hidden shadow-soft border border-border/50 group h-56 lg:h-auto"
          >
            <img src={futsalImage} alt="Ana Dorotea Marín jugando al fútbol sala" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-primary rounded-3xl p-6 shadow-soft"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4">
              <Dumbbell className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-display font-semibold text-primary-foreground text-lg mb-3">{t("about.activeLifestyle")}</h3>
            <p className="text-primary-foreground/90 text-sm leading-relaxed">{t("about.activeLifestyleDesc")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="bg-card rounded-3xl overflow-hidden shadow-soft border border-border/50 group h-56"
          >
            <img src={travelImage} alt="Ana Dorotea Marín viajando en Chichén Itzá, México" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-3xl p-6 shadow-soft border border-border/50 flex flex-col justify-center"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Plane className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground text-lg mb-3">{t("about.worldExplorer")}</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">{t("about.worldExplorerDesc")}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="overflow-hidden py-6 bg-card rounded-3xl shadow-soft border border-border/50"
        >
          <div className="ticker-wrapper">
            <div className="ticker-content">
              {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
                <span key={index} className="mx-8 text-xl font-display font-medium text-foreground/70 whitespace-nowrap">
                  {item}
                  <span className="ml-8 text-primary">•</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
