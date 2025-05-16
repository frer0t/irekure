"use client";

import { motion } from "framer-motion";
import { SendIcon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <motion.div
      className="flex pt-20 flex-col items-center gap-8 md:gap-16 w-full mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold !leading-tight mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Tanga ibitekerezo byawe, Kurikirana igisubizo cya Leta.
        </h2>

        <motion.p
          className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Irekure ni uburyo bwizewe bwo guha abaturage ijambo mu iterambere
          ry&aposigihugu. Tanga ikibazo cyangwa igitekerezo maze ukurikire
          igisubizo kugeza kirangiye.
        </motion.p>
      </motion.div>
      <Link href="/submit" scroll={true} passHref>
        <motion.div
          className="bg-primary hover:bg-primary/85 text-white font-medium py-3 px-8 rounded-full flex items-center gap-3 cursor-pointer shadow-md shadow-primary/20 border border-primary/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(var(--primary-color), 0.3)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Ohereza Ikibazo Gishya</span>
          <SendIcon size={18} className="animate-pulse" />
        </motion.div>
      </Link>

      <motion.div
        className="  w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-[1px]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
    </motion.div>
  );
}
