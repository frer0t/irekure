"use client";

import { motion } from "framer-motion";
import { Building2, ExternalLink, Users } from "lucide-react";

interface FeaturedInstitutionProps {
  name: string;
  logo: string;
  description: string;
  icon?: React.ElementType;
  link?: string;
}

const institutions: FeaturedInstitutionProps[] = [
  {
    name: "Minisiteri y'Ubutegetsi bw'Igihugu",
    logo: "/logos/minema.svg",
    description: "Ishinzwe guhuza ibikorwa by'ubutegetsi bw'igihugu",
    icon: Building2,
    link: "https://minaloc.gov.rw",
  },
  {
    name: "Minisiteri y'Ubuzima",
    logo: "/logos/moh.svg",
    description: "Ishinzwe kubungabunga ubuzima bw'abanyarwanda",
    icon: Users,
    link: "https://moh.gov.rw",
  },
  {
    name: "Ikigo cy'Igihugu Gishinzwe Iterambere",
    logo: "/logos/rdb.svg",
    description: "Gishinzwe iterambere ry'ubukungu mu Rwanda",
    icon: Building2,
    link: "https://rdb.rw",
  },
];

export default function InstitutionsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="w-full pb-16 bg-gradient-to-b from-background to-muted/20 rounded-t-3xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            className="p-3 rounded-full bg-primary/10 mb-4"
            whileHover={{ rotate: -15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Building2 className="w-6 h-6 text-primary" />
          </motion.div>

          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Inzego za Leta Dukorana Nazo
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-primary/30 rounded-full mt-4"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {institutions.map((institution, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card to-background flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 -z-10 rounded-full bg-primary/5 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.5,
                  }}
                />
                <div className="w-20 h-20 mb-6 relative bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  {institution.icon && (
                    <institution.icon className="w-10 h-10 text-primary" />
                  )}
                </div>
              </div>

              <h3 className="font-bold text-xl mb-3">{institution.name}</h3>

              <p className="text-foreground/70 mb-6">
                {institution.description}
              </p>

              {institution.link && (
                <motion.a
                  href={institution.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium group"
                >
                  <span>Reba urubuga rwabo</span>
                  <ExternalLink className="w-4 h-4 " />
                </motion.a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
