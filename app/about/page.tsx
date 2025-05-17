"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle,
  Clock,
  Handshake,
  MessageCircle,
  Users,
} from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="flex w-full flex-1 flex-col items-center">
      {/* Header section */}
      <section className="w-full py-10 md:py-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ibyerekeye{" "}
            <p className="inline-flex items-center">
              <h2 className="font-bold relative">
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
            </p>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Irekure ni urubuga rugamije kunoza uburyo abaturage baganira
            n'inzego za Leta, hagamijwe kubaha ijwi no kubafasha gukemura
            ibibazo byabo mu buryo bworoshye kandi bwihuse.
          </motion.p>
        </div>
      </section>

      {/* Mission section */}
      <section className="w-full py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              <Handshake className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Icyo Tugamije
            </h2>
            <div className="w-20 h-1 bg-primary/30 rounded-full mt-4"></div>
          </motion.div>

          <Card className="mb-12 shadow-md border-muted/50">
            <CardContent className="p-8">
              <div className="space-y-6">
                <motion.p
                  className="text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Intego yacu ni ukubaka umuryango aho abaturage bashobora:
                </motion.p>
                <div className="space-y-4">
                  {[
                    {
                      icon: MessageCircle,
                      text: "Gutanga ibibazo n'ibitekerezo byabo ku nzego za Leta mu buryo bworoshye",
                    },
                    {
                      icon: Clock,
                      text: "Gukurikirana aho ibibazo byabo bigeze nta ngorane",
                    },
                    {
                      icon: CheckCircle,
                      text: "Kubona ibisubizo byihuse kandi bifatika ku bibazo byabo",
                    },
                    {
                      icon: Handshake,
                      text: "Kugira uruhare mu iterambere ry'igihugu no kunoza imiyoborere",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-base">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core values section */}
      <section className="w-full py-12 bg-muted/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Indangagaciro Zacu
            </h2>
            <div className="w-20 h-1 bg-primary/30 rounded-full mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Gukorera mu Mucyo",
                description:
                  "Dushyira imbere gukorera mu mucyo no guha abaturage amakuru yose bakeneye mu buryo bwihuse kandi bwumvikana.",
                icon: Users,
              },
              {
                title: "Gukora neza kandi vuba",
                description:
                  "Tuzirikana ko igihe cy'abaturage ari igiciro, bityo tukaba twiyemeje gutanga serivisi zihuse kandi zinoze.",
                icon: Clock,
              },
              {
                title: "Kwita ku Baturage",
                description:
                  "Abaturage nibo ishingiro ry'umurimo wacu. Dushyira imbere ibyo bakeneye kandi tukabaha agaciro.",
                icon: Handshake,
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                className="bg-card rounded-xl border border-muted/30 p-6 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <motion.h3
                  className="text-2xl font-bold mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Fatanya natwe kubaka Rwanda rushya
                </motion.h3>
                <motion.p
                  className="text-lg mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Tanga igitekerezo cyawe cyangwa ikibazo. Uzahabwa uburyo bwo
                  gukurikirana aho kigeze.
                </motion.p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/submit">
                  <Button size="lg" className="w-full sm:w-auto">
                    Tanga Ikibazo
                  </Button>
                </Link>
                <Link href="/track">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Gukurikirana Ikibazo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
