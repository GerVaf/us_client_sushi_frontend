"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function AnimatedDiv() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // The animation only triggers once
    threshold: 0.5, // Trigger when 50% of the div is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 20,
        x: 20,
        opacity: 1,
        transition: { duration: 1, ease: "easeOut" },
      });
    }
  }, [controls, inView]);

  return (
    <div className="overflow-hidden relative shadow-lg rounded-lg col-span-2 w-full">
      <motion.div
        ref={ref}
        className="absolute md:top-20 text-white border-b-2"
        initial={{ x: 100, y: 20, opacity: 0 }}
        animate={controls}
      >
        Feel the taste of Japanese foods
      </motion.div>
      <img
        className="object-cover w-full h-full"
        src="/assets/semi_hero2.jpg"
        alt="heroimg"
      />
    </div>
  );
}

export default AnimatedDiv;
