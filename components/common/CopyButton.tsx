import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={copyToClipboard}
      className={cn(
        "ml-1 p-1 rounded-md transition-colors",
        copied ? "text-green-500" : "text-muted-foreground hover:text-primary"
      )}
      aria-label={copied ? "Copied!" : "Copy ticket ID"}
      title={copied ? "Copied!" : "Copy ticket ID"}
    >
      {copied ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      <span className="sr-only">{copied ? "Copied!" : "Copy ticket ID"}</span>
    </motion.button>
  );
};
export default CopyButton;
