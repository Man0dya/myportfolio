import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect, useContext, useRef } from "react";
import logoWhite from "../assets/logo-white.svg";
import logoBlack from "../assets/logo-black.svg";
import { ThemeContext } from "../contexts/ThemeContext";

const Header = ({ onContactClick }) => {
    //toggle menu state open/close
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { theme, toggleTheme } = useContext(ThemeContext);

    // Add scroll state for blur/shadow
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [contactInView, setContactInView] = useState(false);
    useEffect(() => {
      const section = document.getElementById("contact");
      if (!section) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => setContactInView(entry.isIntersecting),
        { threshold: 0.01, rootMargin: "0px 0px 0px 0px" }
      );
      observer.observe(section);
      return () => observer.disconnect();
    }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md bg-white/60 dark:bg-black/60 shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo Section */}

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
          }}
          className="flex items-center"
        >
          <img src={theme === 'dark' ? logoWhite : logoBlack} alt="Logo" className="h-14 w-auto object-contain" />
        </motion.div>

        {/* Navigation Section */}

        <nav className="lg:flex hidden space-x-8">
          {[
            { label: "Home", href: "#" },
            { label: "About", href: "#about" },
            { label: "Projects", href: "#projects" },
            { label: "Contact", href: "#contact" }
          ].map((item, index) => (
            <motion.a
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.7 + index * 0.2,
              }}
              className="relative text-gray-800 dark:text-gray-200 hover:violet-600 dark:hover:text-violet-400 font-medium transition-colors duration-300 group"
              href={item.href}
            >
              {item.label}
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </nav>

        {/* social Button Section */}

        <div className=" md:flex hidden items-center space-x-4">
          <motion.a
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            href="https://github.com/Man0dya"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub className="w-5 h-5" />
          </motion.a>

          <motion.a
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            href="https://www.linkedin.com/in/manodyadissanayake/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiLinkedin className="w-5 h-5" />
          </motion.a>

          {/* Hire me */}
          {!contactInView && (
          <motion.button
            onClick={onContactClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 1.6,
              duration: 0.8,
            }}
            className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition-all duration-500"
          >
            Contact Me
          </motion.button>
          )}

          {/* Theme Toggle */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 1.8,
              duration: 0.8,
            }}
            className="ml-4"
            style={{ outline: 'none', border: 'none', background: 'none' }}
            tabIndex={-1}
          >
            <div
              onClick={toggleTheme}
              className={`relative w-14 h-8 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-colors duration-300 group focus:outline-none`}
              role="switch"
              aria-checked={theme === 'dark'}
            >
              <motion.div
                className={`absolute top-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-colors duration-300 ${theme === 'dark' ? 'bg-violet-500' : 'bg-yellow-400'}`}
                animate={{ x: theme === 'dark' ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                style={{ left: 4, zIndex: 2 }}
              >
                {theme === 'dark' ? <FiMoon className="w-4 h-4 text-white" /> : <FiSun className="w-4 h-4 text-yellow-600" />}
              </motion.div>
              {/* Track icons */}
              <FiSun className="w-4 h-4 text-yellow-500 absolute left-2 top-2 opacity-70" />
              <FiMoon className="w-4 h-4 text-violet-500 absolute right-2 top-2 opacity-70" />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}

        <div className="md:hidden flex items-center">

            <motion.button 
            
            whileTap={{ scale: 0.7 }}
            onClick={toggleMenu}
            className="text-gray-300">
                {isOpen ? (
                    <FiX className="w-6 h-6 "/>
                ) : (
                    <FiMenu className="w-6 h-6 "/>
                )}
            </motion.button>

        </div>

      </div>

      {/* Mobile Menu */}

      <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
      transition={{ duration: 0.5 }}
      className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5">

        <nav className="flex flex-col space-y-3">
          {[
            { label: "Home", href: "#" },
            { label: "About", href: "#about" },
            { label: "Projects", href: "#projects" },
            { label: "Contact", href: "#contact" }
          ].map((item) => (
            <a className="text-gray-800 dark:text-gray-300 font-medium py-2" key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-5">

              <a href="https://github.com/Man0dya" target="_blank" rel="noopener noreferrer">
                <FiGithub className="w-5 h-5 text-gray-800 dark:text-gray-300"/>
              </a>

              <a href="https://www.linkedin.com/in/manodyadissanayake/" target="_blank" rel="noopener noreferrer">
                <FiLinkedin className="w-5 h-5 text-gray-800 dark:text-gray-300"/>
              </a>

            </div>

            <button
              onClick={toggleTheme}
              className="mt-4 block w-full"
              style={{ outline: 'none', border: 'none', background: 'none' }}
              tabIndex={-1}
            >
              <div
                className={`relative w-14 h-8 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-colors duration-300 group focus:outline-none mx-auto`}
                role="switch"
                aria-checked={theme === 'dark'}
              >
                <motion.div
                  className={`absolute top-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-colors duration-300 ${theme === 'dark' ? 'bg-violet-500' : 'bg-yellow-400'}`}
                  animate={{ x: theme === 'dark' ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                  style={{ left: 4, zIndex: 2 }}
                >
                  {theme === 'dark' ? <FiMoon className="w-4 h-4 text-white" /> : <FiSun className="w-4 h-4 text-yellow-600" />}
                </motion.div>
                {/* Track icons */}
                <FiSun className="w-4 h-4 text-yellow-500 absolute left-2 top-2 opacity-70" />
                <FiMoon className="w-4 h-4 text-violet-500 absolute right-2 top-2 opacity-70" />
              </div>
            </button>
        </div>
        
      </motion.div>        
    </header>
  );
};

export default Header;
