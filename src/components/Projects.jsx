import React, { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import futurewattImg from '../assets/projects/futurewatt.png';
import motofixImg from '../assets/projects/motofix.png';
import portfolioImg from '../assets/projects/portfolio.png';
import belezzaImg from '../assets/projects/belezza.png';
import imageGenImg from '../assets/projects/imagegenerator.png';
import balanzImg from '../assets/projects/Balanz.png';

// skill icons (SVGR)
import ReactIcon from '../assets/skills/react-svgrepo-com.svg?react';
import NodeIcon from '../assets/skills/node-js-svgrepo-com.svg?react';
import ExpressIcon from '../assets/skills/express-js-icon.svg?react';
import MongoIcon from '../assets/skills/mongodb-svgrepo-com.svg?react';
import TailwindIcon from '../assets/skills/tailwind-svgrepo-com.svg?react';
import JavaIcon from '../assets/skills/java-svgrepo-com.svg?react';
import KotlinIcon from '../assets/skills/kotlin-svgrepo-com.svg?react';
import HtmlIcon from '../assets/skills/html-5-svgrepo-com.svg?react';
import CssIcon from '../assets/skills/css-3-svgrepo-com.svg?react';
import JsIcon from '../assets/skills/js-svgrepo-com.svg?react';
import OpenAIAPIIcon from '../assets/skills/openai-svgrepo-com.svg?react';
import PhpIcon from '../assets/skills/php-programming-language-icon.svg?react';
import MysqlIcon from '../assets/skills/mysql-svgrepo-com.svg?react';
import GitIcon from '../assets/skills/github-color-svgrepo-com.svg?react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    name: 'FutureWatt',
    subtitle: 'Sustainable Energy Management',
    description: 'Sustainable energy management platform with multi-role dashboards, secure payments with Stripe, AI chatbot, and 50+ responsive UI components.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    image: futurewattImg,
    github: 'https://github.com/Man0dya/FutureWatt',
    category: 'Full Stack',
  },
  {
    id: 2,
    name: 'MotoFix',
    subtitle: 'Vehicle Spare Parts Management',
    description: 'A full-stack Java web app for managing vehicle spare parts, customer orders, and admin operations. Built with MVC, JSP, and JavaScript.',
    tags: ['Java', 'JSP', 'HTML', 'CSS', 'JavaScript'],
    image: motofixImg,
    github: 'https://github.com/Man0dya/MotoFix',
    category: 'Full Stack',
  },
  {
    id: 3,
    name: 'Portfolio',
    subtitle: 'Personal Portfolio Website',
    description: 'My personal portfolio website to showcase projects, skills, and contact information. Built with Vite + React and modern web technologies like Framer Motion and GSAP.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Vite', 'Three.js'],
    image: portfolioImg,
    github: 'https://github.com/Man0dya/myportfolio',
    category: 'Frontend',
  },
  {
    id: 4,
    name: 'Belezza',
    subtitle: 'Online Fashion Store',
    description: 'A full-featured e-commerce platform for browsing, purchasing, and managing fashion products, with both customer and admin tools.',
    tags: ['PHP', 'HTML5', 'CSS3', 'JavaScript', 'MySQL'],
    image: belezzaImg,
    github: 'https://github.com/Man0dya/Belezza',
    category: 'Full Stack',
  },
  {
    id: 5,
    name: 'AI Image Generator',
    subtitle: 'AI-Powered Image Creation',
    description: 'A web application that generates images from text prompts using AI. Features user authentication, gallery, and sharing capabilities.',
    tags: ['React', 'Node.js', 'Express', 'OpenAI API'],
    image: imageGenImg,
    github: 'https://github.com/Man0dya/img-gen-1.0',
    category: 'AI/ML',
  },
  {
    id: 6,
    name: 'BalanZ',
    subtitle: 'Personal Finance Tracker',
    description: 'A mobile app built with Kotlin to help users track expenses, set budgets, and visualize their personal finances.',
    tags: ['Kotlin', 'Android'],
    image: balanzImg,
    github: 'https://github.com/Man0dya/BalanZ',
    category: 'Mobile',
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const container = containerRef.current;

    if (!section || !trigger || !container) return;

    // No animation for the header; keep it always visible

    const scrollTween = gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: () => `+=${container.scrollWidth + window.innerWidth * 0.5}`,
        scrub: 1,
        pin: section,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate cards on scroll
    gsap.utils.toArray('.project-card').forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        scale: 0.8,
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: 'left 80%',
          end: 'left 50%',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative z-30 w-full h-screen overflow-hidden bg-gradient-to-b from-transparent via-violet-950/10 to-transparent"
    >
      <div ref={triggerRef} className="h-full">
        {/* Header - Fixed during scroll */}
        <div className="projects-header absolute top-0 left-0 right-0 z-10 pt-12 md:pt-20 pb-8 px-8 pointer-events-none">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
              My Projects
            </h2>
          </div>
        </div>

  {/* Horizontal Scrolling Container */}
  <div className="absolute top-0 left-0 w-full h-full flex items-center pt-32 md:pt-40">
          <div 
            ref={containerRef}
            className="flex gap-8 pl-8 pr-8 md:pl-[15vw] md:pr-[15vw] h-[70vh] items-center"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card flex-shrink-0 w-[85vw] md:w-[500px] h-[480px] group"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-violet-900/20 to-purple-900/20 backdrop-blur-sm border border-violet-500/20 shadow-[0_0_50px_rgba(139,92,246,0.15)] hover:shadow-[0_0_80px_rgba(139,92,246,0.3)] transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative w-full h-[60%] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-violet-600/80 backdrop-blur-md rounded-full text-white text-xs font-semibold uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/95 to-transparent">
                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-violet-300 text-sm font-medium mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech icons */}
                    <div className="flex items-center gap-3 mb-4">
                      {project.tags.slice(0, 4).map((tag, idx) => {
                        const key = tag.toLowerCase();
                        const Icon = (
                          key.includes('react') && ReactIcon ||
                          key.includes('node') && NodeIcon ||
                          key.includes('express') && ExpressIcon ||
                          key.includes('mongo') && MongoIcon ||
                          key.includes('tailwind') && TailwindIcon ||
                          key.includes('java') && JavaIcon ||
                          key.includes('kotlin') && KotlinIcon ||
                          key.includes('html') && HtmlIcon ||
                          key.includes('css') && CssIcon ||
                          (key.includes('script') || key === 'javascript') && JsIcon ||
                          key.includes('openai') && OpenAIAPIIcon ||
                          key.includes('php') && PhpIcon ||
                          key.includes('mysql') && MysqlIcon ||
                          key.includes('git') && GitIcon ||
                          null
                        );

                        return (
                          <div key={idx} title={tag} className="flex items-center justify-center w-9 h-9 rounded-full bg-white/6 border border-white/10 p-1">
                            {Icon ? <Icon className="w-6 h-6" /> : <span className="text-xs text-violet-200">{tag}</span>}
                          </div>
                        );
                      })}

                      {project.tags.length > 4 && (
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/6 border border-white/10 text-xs text-violet-200">
                          +{project.tags.length - 4}
                        </div>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-violet-500/50"
                      >
                        <FaGithub className="text-lg" />
                        <span className="text-sm">View Code</span>
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium transition-all duration-300 border border-white/20"
                      >
                        <FaExternalLinkAlt className="text-sm" />
                        <span className="text-sm">Details</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* View More Projects Card */}
            <div className="project-card flex-shrink-0 w-[85vw] md:w-[500px] h-[480px] group">
              <a
                href="https://github.com/Man0dya"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-sm border-2 border-violet-500/40 shadow-[0_0_50px_rgba(139,92,246,0.2)] hover:shadow-[0_0_100px_rgba(139,92,246,0.4)] transition-all duration-500 flex flex-col items-center justify-center p-8 hover:border-violet-400/60"
              >
                {/* GitHub Icon */}
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  <FaGithub className="text-8xl text-violet-400 group-hover:text-violet-300" />
                </div>
                
                {/* Title */}
                <h3 className="text-4xl font-bold text-white mb-4 text-center group-hover:text-violet-300 transition-colors duration-300">
                  View More Projects
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 text-center text-lg mb-6 max-w-md leading-relaxed">
                  Explore more of my work and open-source contributions on GitHub
                </p>
                
                {/* Arrow Icon */}
                <div className="flex items-center gap-2 text-violet-400 group-hover:text-violet-300 transition-colors duration-300">
                  <span className="text-lg font-semibold">Visit GitHub</span>
                  <FaExternalLinkAlt className="text-xl transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </a>
            </div>

            {/* End Spacer */}
            <div className="flex-shrink-0 w-8" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects; 