"use client"
import { motion } from "framer-motion"

export default function Template({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      // exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {children}
    </motion.div>
  )
}