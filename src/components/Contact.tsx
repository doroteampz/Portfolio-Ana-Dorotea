import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { ChatWindow } from "./ChatWindow";

const contactIcons = [Linkedin, Mail, Phone, MapPin];
const contactData = [
  { labelKey: "contact.linkedin", value: "ana-dorotea-marín-pérez", action: "link" as const, href: "https://www.linkedin.com/in/ana-dorotea-marín-pérez", copyValue: "" },
  { labelKey: "contact.email", value: "adoroteampz@gmail.com", action: "copy" as const, href: "", copyValue: "adoroteampz@gmail.com" },
  { labelKey: "contact.phone", value: "+34 687 900 997", action: "copy" as const, href: "", copyValue: "+34687900997" },
  { labelKey: "contact.location", value: "Zaragoza, Spain", action: "none" as const, href: "", copyValue: "" },
];

export const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: `${label} ${t("contact.copied")}`,
      description: `${value} ${t("contact.copiedDesc")}`,
    });
  };

  return (
    <section id="contact" className="py-20 bg-card/50">
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center border-dotted bg-transparent rounded-none shadow-none">
          <h2 className="section-title text-primary bg-transparent">{t("contact.sectionTitle")}</h2>
          <p className="section-subtitle font-mono text-xl font-extrabold text-secondary-foreground bg-transparent">{t("contact.sectionSubtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {contactData.map((item, index) => {
            const Icon = contactIcons[index];
            const label = t(item.labelKey);
            return (
              <motion.div
                key={item.labelKey}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className={`glass-card rounded-xl p-6 text-center hover-lift ${item.action !== "none" ? "cursor-pointer" : ""}`}
                onClick={() => {
                  if (item.action === "copy" && item.copyValue) handleCopy(item.copyValue, label);
                  else if (item.action === "link" && item.href) window.open(item.href, "_blank", "noopener,noreferrer");
                }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-1">{label}</h3>
                <p className="text-sm text-muted-foreground break-all">{item.value}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.6 }} className="text-center text-muted-foreground mt-12">
          {t("contact.copyright", { year: new Date().getFullYear() })}
        </motion.p>
      </div>

      <ChatWindow />
    </section>
  );
};
