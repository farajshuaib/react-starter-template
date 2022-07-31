/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface props {
  isVisible: boolean;
  close: () => void;
  children: React.ReactNode
}

const animation = {
  initial: { opacity: 0, y: 70, scale: 0 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -70, scale: 0 },
};

const Modal: React.FC<props> = ({ close, isVisible, children }) => {
  //const [visible, setVisible] = useState<boolean>(false);

  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      close();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => document.removeEventListener("keydown", escFunction);
  }, [escFunction]);

  return (
    <>
      {isVisible && (
        <div className="modal inset-0 fixed z-50 h-screen w-full flex justify-center items-center">
          <motion.div
            variants={animation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Modal;
