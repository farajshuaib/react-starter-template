import React from "react";
import { motion } from "framer-motion";

const animation = {
  initial: { opacity: 0, y: 70 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -70 },
};

interface props {
  children: React.ReactNode;
}

const AnimatedPage: React.FC<props> = ({ children }) => {
  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
