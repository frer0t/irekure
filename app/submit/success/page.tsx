"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const trackingId = searchParams.get("ticket_id") || "";

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border shadow-lg p-8 md:p-12 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-primary" />
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ikibazo Cyawe Cyoherejwe!
        </h2>
        <p className="mb-8 text-muted-foreground">
          Murakoze gutanga ikibazo cyanyu. Uzajya ukurikirana aho ikibazo cyawe
          kigeze ukoresheje nomero y'ihariye ikurikira.
        </p>

        <div className="bg-muted/30 py-6 px-4 rounded-lg mb-8">
          <p className="text-sm mb-2">Nomero y'ihariye</p>
          <p className="text-2xl font-mono font-bold tracking-widest">
            {trackingId}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" passHref>
            <Button variant="outline" className="w-full sm:w-auto">
              Subira Ahabanza
            </Button>
          </Link>

          <Link href={`/track?id=${trackingId}`} passHref>
            <Button className="w-full sm:w-auto">Kurikiranira Hano</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
