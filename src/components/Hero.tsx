import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import portraitImage from "@/assets/portrait.jpeg";

export const Hero = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const roles = t("hero.roles", { returnObjects: true }) as string[];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset typing animation on language change
  useEffect(() => {
    setDisplayText("");
    setIsDeleting(false);
    setCurrentRoleIndex(0);
  }, [i18n.language]);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  const copyEmail = () => {
    navigator.clipboard.writeText("adoroteampz@gmail.com");
    toast({
      title: t("contact.email") + " " + t("contact.copied"),
      description: "adoroteampz@gmail.com " + t("contact.copiedDesc"),
    });
  };

  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl transform -rotate-6"></div>
              <img
                src={portraitImage}
                alt="Retrato profesional de Ana Dorotea Marín"
                className="relative w-80 h-96 object-cover object-top rounded-3xl shadow-elevated"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-6">
              Ana Dorotea{" "}
              <span className="text-primary">Marín</span>
            </h1>

            <div className="h-12 mb-8">
              <p className="text-xl md:text-2xl text-muted-foreground">
                {displayText}
                <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse"></span>
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="/CV_Ana_Dorotea_Marin.pdf" download>
                <Button
                  size="lg"
                  className="rounded-full gap-2 shadow-soft hover:shadow-elevated transition-shadow"
                >
                  <Download className="w-5 h-5" />
                  {t("hero.downloadResume")}
                </Button>
              </a>

              <a
                href="https://www.linkedin.com/in/ana-dorotea-marín-pérez"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile of Ana Dorotea Marín"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full aspect-square p-0 hover-lift"
                  aria-label="Open LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
              </a>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full aspect-square p-0 hover-lift"
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
