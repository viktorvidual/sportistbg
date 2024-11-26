"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div>
      <motion.div
        className="w-8 h-8 border-4 border-primary rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
