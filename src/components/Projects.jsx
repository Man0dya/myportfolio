import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaArrowRight, FaTimes } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import futurewattImg from '../assets/projects/futurewatt.png';
import motofixImg from '../assets/projects/motofix.png';
import portfolioImg from '../assets/projects/portfolio.png';
import belezzaImg from '../assets/projects/belezza.png';
import imageGenImg from '../assets/projects/imagegenerator.png';
import balanzImg from '../assets/projects/Balanz.png';
// Skill icons
import ReactIcon from '../assets/skills/react-svgrepo-com.svg?react';
import HtmlIcon from '../assets/skills/html-5-svgrepo-com.svg?react';
import CssIcon from '../assets/skills/css-3-svgrepo-com.svg?react';
import JsIcon from '../assets/skills/js-svgrepo-com.svg?react';
import NodeIcon from '../assets/skills/node-js-svgrepo-com.svg?react';
import MongoIcon from '../assets/skills/mongodb-svgrepo-com.svg?react';
import PythonIcon from '../assets/skills/python-svgrepo-com.svg?react';
import MysqlIcon from '../assets/skills/mysql-svgrepo-com.svg?react';
import KotlinIcon from '../assets/skills/kotlin-svgrepo-com.svg?react';
import NextjsIcon from '../assets/skills/next-js-svgrepo-com.svg?react';
import TailwindIcon from '../assets/skills/tailwind-svgrepo-com.svg?react';
import GithubIcon from '../assets/skills/github-color-svgrepo-com.svg?react';
import GitIcon from '../assets/skills/git-svgrepo-com.svg?react';
import FigmaIcon from '../assets/skills/figma-svgrepo-com.svg?react';
import PhpIcon from '../assets/skills/php-programming-language-icon.svg?react';
import JavaIcon from '../assets/skills/java-svgrepo-com.svg?react';
import AndroidStudioIcon from '../assets/skills/android-studio-icon.svg?react';
import ExpressIcon from '../assets/skills/express-js-icon.svg?react';
// Corrected SVG imports
import JSPIcon from '../assets/skills/jsp-file-format-symbol-svgrepo-com.svg?react';
import FramerMotionIcon from '../assets/skills/framer-motion.svg?react';
import GSAPIcon from '../assets/skills/gsap-logo_svgstack_com_28451752699569.svg?react';
import OpenAIAPIIcon from '../assets/skills/openai-svgrepo-com.svg?react';
import ViteIcon from '../assets/skills/Vite.js.svg?react';
import ThreejsIcon from '../assets/skills/threejs-1.svg?react';

const techIconMap = {
  'React': ReactIcon,
  'React.js': ReactIcon,
  'HTML': HtmlIcon,
  'HTML5': HtmlIcon,
  'CSS': CssIcon,
  'CSS3': CssIcon,
  'JavaScript': JsIcon,
  'Node.js': NodeIcon,
  'Express.js': ExpressIcon,
  'Express': ExpressIcon,
  'MongoDB': MongoIcon,
  'Python': PythonIcon,
  'MySQL': MysqlIcon,
  'Kotlin': KotlinIcon,
  'Next.js': NextjsIcon,
  'Tailwind CSS': TailwindIcon,
  'GitHub': GithubIcon,
  'Git': GitIcon,
  'Figma': FigmaIcon,
  'PHP': PhpIcon,
  'Java': JavaIcon,
  'Android Studio': AndroidStudioIcon,
  'Android': AndroidStudioIcon,
  'JSP': JSPIcon,
  'Framer Motion': FramerMotionIcon,
  'GSAP': GSAPIcon,
  'OpenAI API': OpenAIAPIIcon,
  'Vite': ViteIcon,
  'Three.js': ThreejsIcon,
};

const projects = [
  {
    name: 'FutureWatt – Sustainable Energy Management System',
    description: 'sustainable energy management platform with multi-role dashboards,secure payments with stripe, AI chatbot, and 50+ responsive UI components',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    image: futurewattImg,
    github: 'https://github.com/Man0dya/FutureWatt',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
  },
  {
    name: 'MotoFix – Online Vehicle Spare Parts Management System',
    description: 'A full-stack Java web app for managing vehicle spare parts, customer orders, and admin operations. Built with MVC, JSP, and JavaScript.',
    tags: ['Java', 'JSP', 'HTML', 'CSS', 'JavaScript'],
    image: motofixImg,
    github: 'https://github.com/Man0dya/MotoFix',
    technologies: ['Java', 'JSP', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    name: 'Portfolio Website',
    description: 'My personal portfolio website to showcase my projects, skills, and contact information. Built with Vite + React and modern web technologies like Framer Motion and GSAP. Three.js and spline is used for interactive 3D models.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Vite', 'Three.js'],
    image: portfolioImg,
    github: 'https://github.com/Man0dya/myportfolio',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Vite', 'Three.js'],
  },
  {
    name: 'Belezza – Online Fashion Store',
    description: 'A full-featured e-commerce platform for browsing, purchasing, and managing fashion products, with both customer and admin tools.',
    tags: ['PHP', 'HTML5', 'CSS3', 'JavaScript', 'MySQL'],
    image: belezzaImg,
    github: 'https://github.com/Man0dya/Belezza',
    technologies: ['PHP', 'HTML5', 'CSS3', 'JavaScript', 'MySQL'],
  },
  {
    name: 'AI Image Generator App',
    description: 'A web application that generates images from text prompts using AI. Features user authentication, gallery, and sharing.',
    tags: ['React', 'Node.js', 'Express', 'OpenAI API'],
    image: imageGenImg,
    github: 'https://github.com/Man0dya/img-gen-1.0',
    technologies: ['React', 'Node.js', 'Express', 'OpenAI API'],
  },
  {
    name: 'Personal Finance Tracker App',
    description: 'A mobile app built with Kotlin to help users track expenses, set budgets, and visualize their personal finances.',
    tags: ['Kotlin', 'Android'],
    image: balanzImg,
    github: 'https://github.com/Man0dya/BalanZ',
    technologies: ['Kotlin', 'Android'],
  },
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.2 } },
};

const Projects = () => {
  const [selected, setSelected] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  useGSAP(() => {
    gsap.from('.project-card', {
      opacity: 0,
      y: 40,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section id="projects" className="relative z-30 w-full min-h-screen flex flex-col items-center justify-center py-20 px-4">
      <h2 className="text-4xl md:text-5xl font-black text-center text-gray-100 mb-10 drop-shadow-lg">Projects</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.name}
            className="rounded-xl cursor-pointer aspect-[1.2/1] border border-violet-400/30 shadow-[0_0_15px_rgba(167,139,250,0.2)]"
            variants={cardVariants}
            whileHover={{ scale: 1.04, y: -5, boxShadow: '0 0 30px rgba(167,139,250,0.4)' }}
            onClick={() => setSelected(project)}
            layoutId={`card-container-${project.name}`}
            onHoverStart={() => setHoveredProject(project.name)}
            onHoverEnd={() => setHoveredProject(null)}
          >
            <div className="w-full h-full flex items-center justify-center relative">
              <motion.img
                src={project.image}
                alt={project.name}
                className="w-[90%] h-[90%] object-cover rounded-lg"
                layoutId={`card-image-${project.name}`}
              />
              <div className="absolute bottom-[5%] w-[90%] p-2 bg-black/50 backdrop-blur-sm rounded-b-lg">
                <div className="text-white text-center font-semibold flex flex-col items-center justify-center">
                  <span>{project.name}</span>
                  <AnimatePresence>
                    {hoveredProject === project.name && (
                      <motion.div
                        className="font-normal text-sm flex flex-col items-center"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>show details</span>
                        <FaArrowRight className="mt-1 text-xs" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative bg-black/80 backdrop-blur-sm border border-violet-400/30 rounded-xl shadow-[0_0_30px_rgba(167,139,250,0.3)] flex flex-col md:flex-row p-6 md:p-10 gap-8 min-w-[320px] max-w-[1050px] w-[95vw] h-[520px] md:h-[520px]"
              layoutId={`card-container-${selected.name}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full md:w-[440px] md:flex-none bg-black/20 backdrop-blur-sm border border-violet-400/20 p-4 rounded-xl shadow-[inset_0_0_20px_rgba(167,139,250,0.1)] aspect-[1.2/1] flex items-center justify-center">
                <motion.img
                    layoutId={`card-image-${selected.name}`}
                    src={selected.image}
                    alt={selected.name}
                    className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } }}
                exit={{ opacity: 0, y: 30, transition: { duration: 0.2 } }}
                className="flex-1 flex flex-col justify-center gap-3 text-gray-800 dark:text-gray-100"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-1">{selected.name}</h3>
                <p className="text-base md:text-lg mb-2">{selected.description}</p>
                <div className="text-sm md:text-base mb-2">
                  <span className="font-semibold">Technologies used:</span>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {selected.technologies.map(tech => {
                      const Icon = techIconMap[tech] || null;
                      return Icon ? (
                        <span key={tech} title={tech} className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm border border-violet-400/20 rounded-xl shadow-[inset_0_0_10px_rgba(167,139,250,0.1)]">
                          <Icon style={{ width: 28, height: 28 }} />
                        </span>
                      ) : (
                        <span key={tech} className="px-2 py-1 bg-white/10 backdrop-blur-sm border border-violet-400/20 rounded text-xs font-semibold">{tech}</span>
                      );
                    })}
                  </div>
                </div>
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-violet-400/20 text-gray-100 rounded-lg flex items-center gap-2 w-fit hover:bg-white/20 hover:border-violet-400/40 transition-all duration-300"
                >
                  <GithubIcon style={{ width: 32, height: 32 }} /> github
                </a>
              </motion.div>
              <motion.button
                  onClick={() => setSelected(null)}
                  className="absolute top-2 right-2 text-white bg-black/20 backdrop-blur-sm border border-violet-400/20 hover:bg-black/40 hover:border-violet-400/40 rounded-full p-3 transition-all duration-300"
                  aria-label="Close"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
                  exit={{ opacity: 0 }}
                >
                  <FaTimes size={24} />
                </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects; 