"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FormPageLayoutProps {
  children: ReactNode;
}

export default function SubmitFormLayout({ children }: FormPageLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Gutanga Ikibazo Cyawe
          </h1>
          <p className="text-center max-w-lg dark:text-zinc-500">
            Uzuza ubu buryo bwo gutanga ikibazo cyangwa igitekerezo ku nzego za
            Leta. Uzahabwa nomero y'ibiranga kugira ngo ukurikirane aho ikibazo
            cyawe kigeze.
          </p>
        </div>
        <Card className="shadow-lg bg-background">
          <CardContent className="p-6 md:p-8">{children}</CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
