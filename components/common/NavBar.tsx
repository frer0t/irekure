"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Set up navigation items
  const navItems = [
    { href: "/", label: "Ahabanza" },
    { href: "/track", label: "Gukurikirana Ikibazo" },
    { href: "/submit", label: "Gutanga Ikibazo" },
    { href: "/about", label: "Abo Turi Bo" },
  ];

  return (
    <motion.nav
      className={`fixed z-30 flex h-16 w-full justify-center transition-all duration-300 ${
        isScrolled
          ? "border-b border-b-foreground/10 bg-background/90 backdrop-blur-md shadow-md"
          : "bg-background/50 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex w-full max-w-7xl items-center justify-between p-3 px-4 md:px-6">
        <Link href="/" passHref>
          <h2 className="text-3xl font-bold relative">
            <span className="text-primary">i</span>rekure
            <span className="absolute -top-1 -right-2 h-2 w-2 rounded-full bg-primary" />
          </h2>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.href}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 rounded-md font-medium text-sm flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                  passHref
                >
                  {item.label}

                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full mx-3"
                      layoutId="navbar-active-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}

          <div className="pl-2 ml-2 border-l border-foreground/10">
            <Button size="sm" variant="secondary" className="gap-1.5" asChild>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5"
                passHref
              >
                <LogIn className="w-4 h-4" />
                <span>Kwinjira</span>
              </Link>
            </Button>
          </div>
        </div>
        <motion.button
          className="md:hidden p-2 rounded-md hover:bg-muted/50 transition-colors relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMobileMenuOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: isMobileMenuOpen ? -90 : 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: isMobileMenuOpen ? 90 : -90 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border shadow-lg p-4 md:hidden z-20 max-h-[calc(100vh-4rem)] overflow-y-auto"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="py-2 space-y-3">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      passHref
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted/50 text-foreground/80"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-2 mt-2 border-t border-foreground/10"
              >
                <Link
                  href="/login"
                  className="flex items-center justify-between p-3 rounded-lg text-white w-full bg-secondary hover:bg-secondary/80 transition-colors"
                  passHref
                >
                  <div className="flex items-center gap-2">
                    <LogIn className="w-5 h-5" />
                    <span>Kwinjira</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
