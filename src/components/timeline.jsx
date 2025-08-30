"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="px-8 py-16 md:px-16 md:py-32" ref={containerRef}>
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        My Work <span className="text-primary">Experience</span>
      </h2>

      <div ref={ref} className="relative">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-start md:gap-10 pt-10 md:pt-40"
          >
            {/* Timeline Dot and Desktop Text */}
            <div className="sticky top-40 flex flex-col items-center self-start max-w-xs md:max-w-sm md:flex-row w-full z-40">
              {/* Timeline Dot */}
              <div className="absolute -left-4 w-10 h-10 rounded-full flex items-center justify-center bg-gray-700">
                <div className="w-4 h-4 rounded-full bg-neutral-800 border border-neutral-700" />
              </div>

              {/* Desktop Timeline Text */}
              <div className="hidden md:flex flex-col gap-2 pl-20 font-bold ">
                <h3 className="text-lg">{item.date}</h3>
                <h3 className="text-2xl ">{item.title}</h3>
                <h3 className="text-xl">{item.job}</h3>
              </div>
            </div>

            {/* Mobile Timeline Text */}
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="block md:hidden mb-4 font-bold ">
                <h3 className="text-lg">{item.date}</h3>
                <h3 className="text-xl">{item.job}</h3>
              </div>

              {/* Content */}
              {item.contents.map((content, idx) => (
                <p
                  key={idx}
                  className="mb-3 text-base md:text-lg font-normal"
                >
                  {content}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Timeline Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-1 md:left-1 top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-neutral-700 to-transparent mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-purple-300/50 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
