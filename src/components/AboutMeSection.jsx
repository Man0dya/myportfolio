import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaPalette, FaCubes, FaLightbulb, FaBrain, FaCog } from "react-icons/fa";
import { Shapes } from "./Shapes";
import { ThemeContext } from "../contexts/ThemeContext";

const features = [
  {
    icon: <FaCode className="w-7 h-7 text-violet-500" />,
    title: "Web Developer",
    desc: "Building modern, performant web apps."
  },
  {
    icon: <FaPalette className="w-7 h-7 text-pink-400" />,
    title: "UI/UX Enthusiast",
    desc: "Designing beautiful, user-friendly interfaces."
  },
  {
    icon: <FaCubes className="w-7 h-7 text-blue-400" />,
    title: "3D Graphics",
    desc: "Creating interactive 3D experiences."
  },
  {
    icon: <FaLightbulb className="w-7 h-7 text-yellow-400" />,
    title: "Problem Solver",
    desc: "Turning complex ideas into solutions."
  },
];

const roles = [
    { name: "developer", icon: <FaCode className="h-5 w-5" /> },
    { name: "designer", icon: <FaPalette className="h-5 w-5" /> },
    { name: "creator", icon: <FaCubes className="h-5 w-5" /> },
    { name: "thinker", icon: <FaBrain className="h-5 w-5" /> },
    { name: "innovator", icon: <FaLightbulb className="h-5 w-5" /> },
    { name: "engineer", icon: <FaCog className="h-5 w-5" /> },
];

const AboutMeSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prevIndex => (prevIndex + 1) % roles.length);
    }, 4500); // Change role every 5.5 seconds
    return () => clearInterval(interval);
  }, []);

  const cardHoverColor = theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)';

  const cardVariants = {
    initial: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      boxShadow: "0px 0px 0px rgba(0,0,0,0)"
    },
    hover: {
      backgroundColor: cardHoverColor,
      boxShadow: "0 8px 32px 0 rgba(167,139,250,0.15)"
    }
  };

  return (
    <section id="about" className="w-full min-h-[60vh] py-12 px-4 flex flex-col items-center justify-center scroll-mt-16 md:scroll-mt-20 relative">
      <h2 className="text-4xl md:text-5xl font-black text-center text-gray-800 dark:text-white mb-6 drop-shadow-lg">About Me</h2>
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-10 md:gap-16">
        
        {/* 3D Model */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full h-80 md:h-[30rem] z-30"
        >
          <Shapes />
        </motion.div>

        {/* Text & Features */}
        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-xl w-full flex flex-col items-center md:items-start z-30"
        >
          <div className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8 min-h-[120px] md:min-h-[90px] font-medium bg-white/70 dark:bg-gray-900/70 rounded-xl px-6 py-4 shadow-md border border-violet-100 dark:border-violet-900">
            I am a passionate{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex].name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="inline-flex items-center gap-2 font-bold text-violet-500"
              >
                {React.cloneElement(roles[roleIndex].icon, { className: "h-5 w-5" })}
                {roles[roleIndex].name}
              </motion.span>
            </AnimatePresence>
            {" "}who loves turning complex ideas into impactful solutions through creativity, strategy, and precision.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-violet-100 dark:border-violet-900"
              >
                <div>{f.icon}</div>
                <div>
                  <div className="font-bold text-gray-800 dark:text-violet-200 text-lg">{f.title}</div>
                  <div className="text-gray-500 dark:text-gray-300 text-sm">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMeSection; 