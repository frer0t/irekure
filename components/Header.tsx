"use client";

import { motion } from "framer-motion";
import { SendIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <motion.div
      className="flex flex-col items-center gap-8 md:gap-16 w-full mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="flex flex-col items-center justify-center relative"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
      >
        <div className="absolute -z-10 w-40 h-40 rounded-full bg-primary/10 blur-xl animate-pulse" />

        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, delay: 0.3 }}
        >
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
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-1 bg-primary/10 px-4 py-1 rounded-full text-primary text-sm mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          Uburyo bwo Gutega Amatwi Abaturage
        </motion.div>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold !leading-tight mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Tanga ibitekerezo byawe. Kurikirana igisubizo cya Leta.
        </h2>

        <motion.p
          className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Irekure ni uburyo bwizewe bwo guha abaturage ijambo mu iterambere
          ry'igihugu. Tanga ikibazo cyangwa igitekerezo maze ukurikire igisubizo
          kugeza kirangiye.
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
        className="my-8 md:my-12 w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-[1px]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
    </motion.div>
  );
}
