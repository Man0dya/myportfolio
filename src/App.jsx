import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import AboutMeSection from "./components/AboutMeSection"
import CustomCursor from "./components/CustomCursor"
import StarsCanvas from "./components/StarsCanvas"
import Projects from "./components/Projects"
import SkillsSection from "./components/SkillsSection"
import Footer from "./components/Footer"
import ContactSection from "./components/ContactSection"
import FloatingRobot from "./components/FloatingRobot"
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function App() {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const openContactForm = () => setContactFormOpen(true);
  const closeContactForm = () => setContactFormOpen(false);

  return (
    <>
      <StarsCanvas />
      <Header onContactClick={openContactForm}/>
      <HeroSection/>
      <AboutMeSection/>
      <Projects />
      <SkillsSection />
      <ContactSection />
      <CustomCursor/>
      <FloatingRobot />
      <Footer />

      {/* Contact Modal at root level */}
      <AnimatePresence>
        {contactFormOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: 30, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 30, duration: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300">
                  Contact Me
                </h1>
                <button onClick={closeContactForm}>
                  <FiX className="w-5 h-5 text-gray-800 dark:text-gray-300 font-extrabold" /> 
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input 
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="e-mail" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                    E-mail
                  </label>
                  <input 
                    type="email"
                    id="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea 
                    rows="4"
                    type="text"
                    id="message"
                    placeholder="Your message"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white" />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 text-white font-bold rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-500">
                  Send message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}