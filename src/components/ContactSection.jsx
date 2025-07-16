import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const socialLinks = [
  {
    icon: <FiGithub className="w-7 h-7" />, link: "https://github.com/Man0dya", label: "GitHub"
  },
  {
    icon: <FiLinkedin className="w-7 h-7" />, link: "https://www.linkedin.com/in/manodyadissanayake/", label: "LinkedIn"
  },
  {
    icon: <FiMail className="w-7 h-7" />, link: "mailto:manodyadissanayake@gmail.com", label: "Email"
  },
];

function GenkubGreetingRobot(props) {
  const group = useRef();
  const { scene } = useGLTF("/src/assets/genkub_greeting_robot.gltf");
  useFrame(({ clock }) => {
    if (group.current) {
      // Add y-offset so the face is front-facing at the start
      group.current.rotation.y = Math.cos(clock.getElapsedTime()) * (Math.PI / 4) - Math.PI / 2;
    }
  });

  // Add colors and materials to the robot
  React.useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Example: Assign materials based on mesh name or index
        if (child.name.toLowerCase().includes("eye")) {
          child.material = new THREE.MeshStandardMaterial({ color: 0xffe066, emissive: 0xffe066, emissiveIntensity: 1, metalness: 0.3, roughness: 0.2 });
        } else if (child.name.toLowerCase().includes("joint") || child.name.toLowerCase().includes("arm") || child.name.toLowerCase().includes("leg")) {
          child.material = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.8, roughness: 0.3 }); // Silver
        } else {
          child.material = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.5, roughness: 0.4 }); // Blue
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive ref={group} object={scene} scale={2.5} {...props} />;
}

const ContactSection = () => {
  return (
    <section id="contact" className="relative z-30 w-full py-20 px-4 flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-black text-center text-gray-800 dark:text-white mb-4 drop-shadow-lg"
      >
        Contact Me
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-2xl"
      >
        Have a question, proposal, or just want to say hi? Fill out the form below or connect with me on social media.
      </motion.p>
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row gap-10 items-stretch justify-center z-30">
        {/* Contact Form - Left */}
        <motion.form
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 backdrop-blur-md border border-violet-100 dark:border-violet-900 z-40 flex flex-col justify-center"
        >
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-500 outline-none" />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-500 outline-none" />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Your Message" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-500 outline-none" />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold shadow-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-500"
          >
            Send Message
          </motion.button>
        </motion.form>
        {/* 3D Model - Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex items-center justify-center min-h-[350px] md:min-h-[400px]"
        >
          <div className="w-full h-72 md:h-96">
            <Canvas camera={{ position: [0, 0, 5], fov: 35 }} shadows>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Suspense fallback={null}>
                <GenkubGreetingRobot />
                <Environment preset="studio" />
                <OrbitControls enablePan={true} enableZoom={false} enableRotate={true} />
              </Suspense>
            </Canvas>
          </div>
        </motion.div>
      </div>
      {/* Social Icons - Centered Below */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col items-center gap-6 md:gap-8 z-40 mt-12"
      >
        <div className="flex flex-row gap-6 md:gap-8">
          {socialLinks.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 8 }}
              whileTap={{ scale: 0.95 }}
              className="text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors duration-300 bg-white/70 dark:bg-gray-800/70 p-3 rounded-full shadow-lg border border-violet-100 dark:border-violet-900"
              aria-label={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection; 