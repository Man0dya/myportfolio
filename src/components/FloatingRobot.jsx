import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";
import ChatPopup from "./ChatPopup";

const FloatingRobot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Floating Robot Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed bottom-0 right-0 z-50 flex items-end justify-end"
        style={{ width: '280px', height: '340px', pointerEvents: 'auto' }}
        title="Chat with me!"
      >
        {/* Hover Popup */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 bottom-32 transform translate-x-12 mb-2"
              style={{ zIndex: 60 }}
            >
              <div className="bg-violet-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap relative">
                Click me!
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-violet-600"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full flex items-end justify-end"
          style={{ overflow: 'visible' }}
        >
          <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible', display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
            <div
              style={{ transform: 'scale(0.5) translateY(55px)', transformOrigin: 'bottom right', width: '100%', height: '100%', position: 'relative', cursor: 'pointer' }}
              onClick={() => setIsChatOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              title="Chat with me!"
            >
              <Spline scene="https://prod.spline.design/Ug0KxAMon4oXCxi6/scene.splinecode" style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }} />
              <div style={{
                position: 'absolute',
                left: '50%',
                bottom: '18px',
                transform: 'translateX(-50%)',
                width: '220px',
                height: '48px',
                background: '#fff',
                borderRadius: '12px',
                zIndex: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Chat Popup Modal */}
      <ChatPopup
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};

export default FloatingRobot; 