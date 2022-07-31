import React from "react";
import { motion } from "framer-motion";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const LoadingScreen = () => (
  <div data-testid="loadingScreen" className="flex items-center justify-center h-screen text-primary text-center">
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <i className="bx bx-loader-alt bx-spin text-6xl "></i>
    </motion.div>
  </div>
);

export default LoadingScreen;
