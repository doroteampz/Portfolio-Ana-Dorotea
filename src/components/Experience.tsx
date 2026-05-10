import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import embassySummerImage from "@/assets/embassy-summer.jpeg";
import rastrilloAragonImage from "@/assets/rastrillo-aragon.jpg";

export const Experience = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const workItems = t("experience.work", { returnObjects: true }) as { title: string; company: string; description: string }[];
  const volunteerItems = t("experience.volunteer", { returnObjects: true }) as { title: string; company: string; description: string }[];

  return (
    <section id="experience" className="py-20">
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title text-primary text-xl">{t("experience.sectionLabel")}</h2>
          <p className="section-subtitle font-mono font-bold text-3xl text-secondary-foreground">{t("experience.sectionTitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold">{t("experience.workLabel")}</h3>
            </motion.div>

            <div className="space-y-6">
              {workItems.map((exp, index) => (
                <motion.div key={exp.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }} className="glass-card rounded-xl p-6 hover-lift">
                  <h3 className="text-lg font-display font-semibold mb-1">{exp.title}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{exp.company}</p>
                  <p className="text-foreground/70">{exp.description}</p>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="rounded-xl overflow-hidden shadow-soft">
                <img src={embassySummerImage} alt="Equipo de Embassy Summer en Malta" className="w-full h-48 object-cover" />
              </motion.div>
            </div>
          </div>

          {/* Volunteering */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold">{t("experience.volunteeringLabel")}</h3>
            </motion.div>

            <div className="space-y-6">
              {volunteerItems.map((exp, index) => (
                <motion.div key={exp.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }} className="glass-card rounded-xl p-6 hover-lift py-[31px]">
                  <h3 className="text-lg font-display font-semibold mb-1">{exp.title}</h3>
                  <p className="text-sm text-accent font-medium mb-3">{exp.company}</p>
                  <p className="text-foreground/70">{exp.description}</p>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="rounded-xl overflow-hidden shadow-soft">
                <img src={rastrilloAragonImage} alt="Voluntariado en el Rastrillo de Aragón 2021" className="w-full h-48 object-scale-down" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
