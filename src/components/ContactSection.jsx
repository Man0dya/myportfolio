import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import emailjs from "emailjs-com";

const socialLinks = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 -0.5 48 48" xmlns="http://www.w3.org/2000/svg" aria-label="GitHub">
        <g fill="none" fillRule="evenodd">
          <g fill="#3E75C3">
            <path d="M723.9985,560 C710.746,560 700,570.787092 700,584.096644 C700,594.740671 706.876,603.77183 716.4145,606.958412 C717.6145,607.179786 718.0525,606.435849 718.0525,605.797328 C718.0525,605.225068 718.0315,603.710086 718.0195,601.699648 C711.343,603.155898 709.9345,598.469394 709.9345,598.469394 C708.844,595.686405 707.2705,594.94548 707.2705,594.94548 C705.091,593.450075 707.4355,593.480194 707.4355,593.480194 C709.843,593.650366 711.1105,595.963499 711.1105,595.963499 C713.2525,599.645538 716.728,598.58234 718.096,597.964902 C718.3135,596.407754 718.9345,595.346062 719.62,594.743683 C714.2905,594.135281 708.688,592.069123 708.688,582.836167 C708.688,580.205279 709.6225,578.054788 711.1585,576.369634 C710.911,575.759726 710.0875,573.311058 711.3925,569.993458 C711.3925,569.993458 713.4085,569.345902 717.9925,572.46321 C719.908,571.928599 721.96,571.662047 724.0015,571.651505 C726.04,571.662047 728.0935,571.928599 730.0105,572.46321 C734.5915,569.345902 736.603,569.993458 736.603,569.993458 C737.9125,573.311058 737.089,575.759726 736.8415,576.369634 C738.3805,578.054788 739.309,580.205279 739.309,582.836167 C739.309,592.091712 733.6975,594.129257 728.3515,594.725612 C729.2125,595.469549 729.9805,596.939353 729.9805,599.18773 C729.9805,602.408949 729.9505,605.006706 729.9505,605.797328 C729.9505,606.441873 730.3825,607.191834 731.6005,606.9554 C741.13,603.762794 748,594.737659 748,584.096644 C748,570.787092 737.254,560 723.9985,560" transform="translate(-700, -560)"/>
          </g>
        </g>
      </svg>
    ),
    link: "https://github.com/Man0dya",
    label: "GitHub"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-label="LinkedIn">
        <path fill="#0A66C2" d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"/>
      </svg>
    ),
    link: "https://www.linkedin.com/in/manodyadissanayake/",
    label: "LinkedIn"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-label="Gmail">
        <rect width="512" height="512" rx="15%" fill="#ffffff"/>
        <path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"/>
        <path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"/>
        <path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"/>
        <path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"/>
        <path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"/>
      </svg>
    ),
    link: "mailto:manodyadissanayake@gmail.com",
    label: "Email"
  },
];

function GenkubGreetingRobot(props) {
  const group = useRef();
  const { scene } = useGLTF(import.meta.env.BASE_URL + "genkub_greeting_robot.gltf");
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
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setError(null);
    setSent(false);

    emailjs.sendForm(
      "service_anq4c67",    // Provided EmailJS service ID
      "template_y6zn08t",   // Auto-responder EmailJS template ID
      form.current,
      "UHg50ysvrcUGuUVCZ"     // Provided EmailJS public key
    )
    .then(
      (result) => {
        setSent(true);
        form.current.reset();
      },
      (error) => {
        setError("Failed to send message. Please try again.");
      }
    );
  };

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
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 backdrop-blur-md border border-violet-100 dark:border-violet-900 z-40 flex flex-col justify-center"
        >
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-500 outline-none" required />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-500 outline-none" required />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Your Message" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-violet-400 focus:border-violet-500 outline-none" required />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold shadow-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-500"
          >
            Send Message
          </motion.button>
          {sent && <p className="text-green-600 mt-2">Message sent successfully!</p>}
          {error && <p className="text-red-600 mt-2">{error}</p>}
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