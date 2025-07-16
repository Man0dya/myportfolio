import { motion } from "framer-motion"
import { FaArrowDown } from "react-icons/fa";
import me from "../assets/me.png";
import { useState } from "react";

const HeroSection = () => {

  const [cvHovered, setCvHovered] = useState(false);

  const handleScroll = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="h-screen bg-gradient-to-b from-violet-200 to-white to-[13%] dark:from-violet-900 dark:to-black dark:to-[13%] flex xl:flex-row flex-col-reverse items-center justify-center xl:gap-16 lg:px-24 px-10 relative overflow-hidden">
        {/* Left Side - Text and Buttons */}

        <div className="z-40 xl:mb-0 mb-[20%] text-center xl:text-left">
            <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 25,
                delay: 1.3,
                duration: 1.5,
             }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 z-10 text-gray-800 dark:text-white">
                Hello, <br />
                I'm
                <svg className="h-[1.1em] inline-block align-middle ml-1" viewBox="0 0 450 100">
                    <text
                        className="font-bold [font-size:90px] [font-weight:700] [stroke-width:2] [stroke:#a78bfa] fill-transparent tracking-wide animate-text-stroke"
                        x="50%" y="50%" dy=".35em" textAnchor="middle"
                    >
                        Manodya
                    </text>
                </svg>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="h-1 bg-violet-400 dark:bg-violet-500 rounded-full my-6 w-48 mx-auto xl:mx-0"
            />

            <motion.p
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 25,
                delay: 2.2,
                duration: 1.5,
             }}
            className="text-xl md:text-1xl lg:text-2xl text-gray-600 dark:text-purple-200 max-w-2xl mb-6">
                Data Science Undergraduate | Software Developer | AI Enthusiast
            </motion.p>

            <motion.a
              initial={{ opacity: 0, width: 160, background: 'linear-gradient(to right, #8b5cf6, #a78bfa)' }}
              animate={{ opacity: 1 }}
              href="#" // Replace with your CV file link
              download
              className="inline-flex items-center py-3 pr-8 pl-8 rounded-lg border border-violet-100 dark:border-violet-900 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 overflow-hidden whitespace-nowrap"
              style={{ position: 'relative', minWidth: 160 }}
              whileHover={{ width: 190, paddingRight: 44, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)' }}
              transition={{
                opacity: { delay: 2.2, duration: 1.5, ease: 'easeInOut' },
                width: { type: 'spring', stiffness: 300, damping: 25, duration: 0.4 },
                paddingRight: { type: 'spring', stiffness: 300, damping: 25, duration: 0.4 },
                background: { duration: 0.3 }
              }}
              onMouseEnter={() => setCvHovered(true)}
              onMouseLeave={() => setCvHovered(false)}
            >
              <motion.span
                className="inline-block align-middle whitespace-nowrap"
                initial={false}
                animate={cvHovered ? "hover" : "initial"}
                variants={{
                  initial: { x: 0 },
                  hover: { x: -18 }
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.3 }}
              >
                Download CV
              </motion.span>
              <motion.span
                initial={false}
                animate={cvHovered ? "hover" : "initial"}
                variants={{
                  initial: { opacity: 0, x: 16 },
                  hover: { opacity: 1, x: 0 }
                }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="inline-block align-middle ml-2"
              >
                <motion.span
                  className="flex items-center justify-center w-7 h-7 rounded-full border border-white"
                  initial={false}
                  animate={cvHovered ? { backgroundColor: 'rgba(255,255,255,0)' } : { backgroundColor: 'rgba(255,255,255,0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <FaArrowDown className="w-4 h-4 text-white" />
                </motion.span>
              </motion.span>
            </motion.a>
        </div>
        {/* Right Side - Image */}

        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                delay: 0.5,
                duration: 1.5,
            }}
            className="w-72 h-72 md:w-96 md:h-96 xl:w-[28rem] xl:h-[28rem] rounded-full overflow-hidden border-4 border-violet-400/50 shadow-2xl z-30 mb-8 xl:mb-0"
            >
            <img src={me} alt="Manodya Dissanayake" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40"
        >
            <motion.button
                onClick={handleScroll}
                initial="initial"
                whileHover="hover"
                variants={{
                  initial: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
                  },
                  hover: {
                    backgroundColor: 'rgba(167,139,250,0.25)',
                    boxShadow: '0 8px 32px 0 rgba(167,139,250,0.13)'
                  }
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="p-4 rounded-2xl border border-violet-100 dark:border-violet-900 bg-transparent shadow-md text-violet-500 dark:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
                aria-label="Scroll to about section"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                    }}
                >
                    <FaArrowDown className="h-6 w-6" />
                </motion.div>
            </motion.button>
        </motion.div>
    </section>
  )
}

export default HeroSection
