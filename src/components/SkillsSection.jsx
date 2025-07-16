import React from "react";
import { motion } from "framer-motion";
import ReactIcon from "../assets/skills/react-svgrepo-com.svg?react";
import HtmlIcon from "../assets/skills/html-5-svgrepo-com.svg?react";
import CssIcon from "../assets/skills/css-3-svgrepo-com.svg?react";
import JsIcon from "../assets/skills/js-svgrepo-com.svg?react";
import NodeIcon from "../assets/skills/node-js-svgrepo-com.svg?react";
import MongoIcon from "../assets/skills/mongodb-svgrepo-com.svg?react";
import PythonIcon from "../assets/skills/python-svgrepo-com.svg?react";
import MysqlIcon from "../assets/skills/mysql-svgrepo-com.svg?react";
import KotlinIcon from "../assets/skills/kotlin-svgrepo-com.svg?react";
import NextjsIcon from "../assets/skills/next-js-svgrepo-com.svg?react";
import TailwindIcon from "../assets/skills/tailwind-svgrepo-com.svg?react";
import GithubIcon from "../assets/skills/github-color-svgrepo-com.svg?react";
import GitIcon from "../assets/skills/git-svgrepo-com.svg?react";
import FigmaIcon from "../assets/skills/figma-svgrepo-com.svg?react";
import PhpIcon from "../assets/skills/php-programming-language-icon.svg?react";
import JavaIcon from "../assets/skills/java-svgrepo-com.svg?react";
import AndroidStudioIcon from "../assets/skills/android-studio-icon.svg?react";
import ExpressIcon from "../assets/skills/express-js-icon.svg?react";
import ViteIcon from "../assets/skills/Vite.js.svg?react";
import ThreejsIcon from "../assets/skills/threejs-1.svg?react";

const skills = [
  { name: "React JS", Icon: ReactIcon },
  { name: "Vite", Icon: ViteIcon },
  { name: "Three.js", Icon: ThreejsIcon },
  { name: "HTML", Icon: HtmlIcon },
  { name: "CSS", Icon: CssIcon },
  { name: "JavaScript", Icon: JsIcon },
  { name: "Node.js", Icon: NodeIcon },
  { name: "Express.js", Icon: ExpressIcon },
  { name: "Next.js", Icon: NextjsIcon },
  { name: "MongoDB", Icon: MongoIcon },
  { name: "MySQL", Icon: MysqlIcon },
  { name: "Python", Icon: PythonIcon },
  { name: "Kotlin", Icon: KotlinIcon },
  { name: "Java", Icon: JavaIcon },
  { name: "PHP", Icon: PhpIcon },
  { name: "Android Studio", Icon: AndroidStudioIcon },
  { name: "Tailwind CSS", Icon: TailwindIcon },
  { name: "Git", Icon: GitIcon },
  { name: "GitHub", Icon: GithubIcon },
  { name: "Figma", Icon: FigmaIcon },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const skillVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

const SkillsSection = () => {
  const desktopCols = 8;
  const mobileCols = 4;
  const numSkills = skills.length;

  // Calculate properties for desktop
  const lastRowItemsDesktop = numSkills % desktopCols || desktopCols;
  const firstIndexOfLastRowDesktop = numSkills - lastRowItemsDesktop;
  const desktopStartCol = Math.floor((desktopCols - lastRowItemsDesktop) / 2) + 1;

  // Calculate properties for mobile
  const lastRowItemsMobile = numSkills % mobileCols || mobileCols;
  const firstIndexOfLastRowMobile = numSkills - lastRowItemsMobile;
  const mobileStartCol = Math.floor((mobileCols - lastRowItemsMobile) / 2) + 1;

  return (
    <section id="skills" className="relative z-30 w-full py-20 px-4 flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-black text-center text-gray-800 dark:text-white mb-4 drop-shadow-lg"
      >
        Skills & Tools
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-2xl"
      >
        Technologies and software I use to build, design, and innovate.
      </motion.p>
      <motion.div
        className="grid grid-cols-4 md:grid-cols-8 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {skills.map((skill, idx) => {
          let centeringClass = "";
          // Apply centering for desktop
          if (idx === firstIndexOfLastRowDesktop && desktopStartCol > 1) {
            centeringClass += ` md:col-start-${desktopStartCol}`;
          }
          // Apply centering for mobile
          if (idx === firstIndexOfLastRowMobile && mobileStartCol > 1) {
            centeringClass += ` col-start-${mobileStartCol}`;
          }

          return (
            <motion.div
              key={skill.name}
              variants={skillVariants}
              className={`flex flex-col items-center group ${centeringClass}`}
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -5, rotate: "2.5deg" }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="w-20 h-20 rounded-2xl bg-violet-100/50 dark:bg-violet-900/50 shadow-lg flex items-center justify-center mb-3 backdrop-blur-sm"
              >
                <skill.Icon style={{ width: 56, height: 56 }} />
              </motion.div>
              <span className="mt-2 text-base font-semibold text-gray-700 dark:text-gray-200 group-hover:text-violet-500 transition-colors duration-300">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
        {/* These are needed to make sure Tailwind generates the dynamic classes */}
        <div className="hidden col-start-2 col-start-3 md:col-start-2 md:col-start-3 md:col-start-4"></div>
      </motion.div>
    </section>
  );
};

export default SkillsSection; 