"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ];

  const contactInfo = [
    { icon: Phone, text: "+250 123 456 789", href: "tel:+250123456789" },
    { icon: Mail, text: "info@irekure.rw", href: "mailto:info@irekure.rw" },
    {
      icon: MapPin,
      text: "Kigali, Rwanda",
      href: "https://maps.google.com/?q=Kigali,Rwanda",
    },
  ];

  const footerLinks = [
    {
      title: "Ibikurikizwa",
      links: [
        { href: "/privacy", text: "Politiki y'Ibanga" },
        { href: "/terms", text: "Amabwiriza" },
        { href: "/faq", text: "Ibibazo Bikunze Kubazwa" },
      ],
    },
    {
      title: "Serivisi",
      links: [
        { href: "/submit", text: "Gutanga Ikibazo" },
        { href: "/track", text: "Gukurikirana Ikibazo" },
        { href: "/institutions", text: "Inzego za Leta" },
      ],
    },
    {
      title: "Abo Turi Bo",
      links: [
        { href: "/about", text: "Abo Turi Bo" },
        { href: "/contact", text: "Twandikire" },
        { href: "/help", text: "Ubufasha" },
      ],
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
  if (pathname.includes("dashboard")) {
    return null;
  }
  return (
    <motion.footer
      className="w-full border-t border-t-foreground/10 py-12 bg-muted/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Brand & Contact Info */}
          <div className="col-span-1 md:col-span-4">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link href="/" className="inline-flex items-center">
                <h2 className="text-3xl font-bold relative">
                  <span className="text-primary">i</span>rekure
                  <motion.span
                    className="absolute -top-1 -right-2 h-2 w-2 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </h2>
              </Link>
            </motion.div>

            <motion.p
              className="text-sm text-foreground/70 mb-6 max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Irekure ni uburyo bwizewe bwo gutega amatwi abaturage. Gutanga
              igitekerezo cyawe bigufasha kwigira uruhare mu iterambere
              r'y'igihugu.
            </motion.p>

            <motion.div
              className="space-y-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 1.1,
                  },
                },
              }}
            >
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                  variants={itemVariants}
                >
                  <item.icon className="w-4 h-4 text-primary/70" />
                  <span>{item.text}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="col-span-1 md:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerLinks.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + sectionIndex * 0.1 }}
                >
                  <h3 className="font-medium mb-4 text-foreground">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={linkIndex}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Link
                          href={link.href}
                          className="text-sm text-foreground/70 hover:text-primary transition-colors"
                        >
                          {link.text}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="col-span-1 md:col-span-2">
            <motion.h3
              className="font-medium mb-4 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              Dukurikire
            </motion.h3>

            <motion.div
              className="flex space-x-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 1.3,
                  },
                },
              }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 rounded-full bg-foreground/5 hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <social.icon className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="pt-8 mt-8 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <p className="text-sm text-foreground/60">
            &copy; {currentYear} irekure. Uburenganzira bwose bwihariwe.
          </p>

          <p className="text-sm text-foreground/60">
            Yakozwe na{" "}
            <Link
              href="https://www.frerot.dev"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              frérot
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};
