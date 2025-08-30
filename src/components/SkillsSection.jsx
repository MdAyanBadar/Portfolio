"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiSqlite,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiSass,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiJson,
  SiGit,
  SiDocker,
  SiPostman,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiKubernetes,
  SiVercel,
  SiHeroku,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
} from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export const skills = [
  // 🌐 Languages
  { name: "Python", category: "languages", icon: <SiPython className="text-yellow-500" />, desc: "Python is versatile and widely used in AI, data science, and web development." },
  { name: "JavaScript", category: "languages", icon: <SiJavascript className="text-yellow-400" />, desc: "The backbone of the web, used for frontend and backend." },
  { name: "TypeScript", category: "languages", icon: <SiTypescript className="text-blue-500" />, desc: "Adds type safety to JavaScript, great for scalable apps." },
  { name: "SQL", category: "languages", icon: <SiSqlite className="text-sky-600" />, desc: "SQL is the standard language for managing relational databases." },
  { name: "Bash / Shell", category: "languages", icon: "🖥️", desc: "Scripting for automation, deployment, and system management." },

  // 🎨 Web Development
  { name: "HTML5", category: "web", icon: <SiHtml5 className="text-orange-500" />, desc: "Markup language for structuring web content." },
  { name: "CSS3", category: "web", icon: <SiCss3 className="text-blue-600" />, desc: "Stylesheet language to design modern web interfaces." },
  { name: "Bootstrap", category: "web", icon: <SiBootstrap className="text-purple-600" />, desc: "Frontend CSS framework for responsive websites." },
  { name: "Sass", category: "web", icon: <SiSass className="text-pink-500" />, desc: "A CSS preprocessor for more powerful stylesheets." },
  { name: "Tailwind CSS", category: "web", icon: <SiTailwindcss className="text-cyan-400" />, desc: "Utility-first CSS framework for fast UI design." },
  { name: "React.js", category: "web", icon: <SiReact className="text-cyan-400" />, desc: "A library for building modern, component-driven UIs." },
  { name: "Next.js", category: "web", icon: <SiNextdotjs className="text-black dark:text-white" />, desc: "React framework for SSR and static site generation." },
  { name: "Vite", category: "web", icon: <SiVite className="text-purple-500" />, desc: "Next-gen frontend tooling for fast development." },
  { name: "Node.js", category: "web", icon: <SiNodedotjs className="text-green-500" />, desc: "JavaScript runtime for server-side development." },
  { name: "Express.js", category: "web", icon: <SiExpress className="text-gray-800 dark:text-white" />, desc: "Fast, minimalist web framework for Node.js." },
  { name: "REST APIs", category: "web", icon: <SiJson className="text-gray-700" />, desc: "Standard for client-server communication." },
  
  // 🔧 Tools & DevOps
  { name: "Git", category: "tools", icon: <SiGit className="text-red-500" />, desc: "Version control system to track code changes." },
  { name: "GitHub", category: "tools", icon: <FaGithub className="text-gray-800 dark:text-white" />, desc: "Code hosting and collaboration platform." },
  { name: "Docker", category: "tools", icon: <SiDocker className="text-blue-500" />, desc: "Containerization platform for portable apps." },
  { name: "Postman", category: "tools", icon: <SiPostman className="text-orange-500" />, desc: "API testing and debugging tool." },
  { name: "PostgreSQL", category: "tools", icon: <SiPostgresql className="text-blue-700" />, desc: "Powerful relational database system." },
  { name: "MySQL", category: "tools", icon: "🗄️", desc: "Popular relational database management system." },
  { name: "MongoDB", category: "tools", icon: <SiMongodb className="text-green-700" />, desc: "NoSQL database for scalable apps." },
  
  // 🤖 AI / ML
  { name: "PyTorch", category: "ai", icon: <SiPytorch className="text-red-500" />, desc: "Deep learning framework for AI and neural networks." },
  { name: "TensorFlow", category: "ai", icon: <SiTensorflow className="text-orange-500" />, desc: "Machine learning framework for scalable AI models." },
  { name: "scikit-learn", category: "ai", icon: <SiScikitlearn className="text-green-500" />, desc: "Python library for classical machine learning algorithms." },
  { name: "NumPy", category: "ai", icon: <SiNumpy className="text-blue-400" />, desc: "Python library for numerical computing." },
  { name: "Pandas", category: "ai", icon: <SiPandas className="text-blue-500" />, desc: "Python library for data manipulation and analysis." },
  { name: "Hugging Face", category: "ai", icon: "🤗", desc: "AI/ML models hub for NLP, transformers, and more." },

  // ⚡ Core CS Concepts
  { name: "Problem Solving", category: "core", icon: "⚡", desc: "Breaking down problems into efficient solutions." },
  { name: "Data Structures", category: "core", icon: "🧩", desc: "Organizing data for optimized access and manipulation." },
  { name: "Algorithms", category: "core", icon: "📊", desc: "Step-by-step procedures for solving computational problems." },
  { name: "OOP", category: "core", icon: "📦", desc: "Object-Oriented Programming principles for scalable code." },
  { name: "System Design", category: "core", icon: "🏗️", desc: "Designing efficient software architectures." },
  { name: "Networking Fundamentals", category: "core", icon: "🌐", desc: "Understanding protocols, sockets, and network communication." },
  { name: "Operating Systems Basics", category: "core", icon: "🖥️", desc: "Processes, memory management, and concurrency concepts." },


];

const categories = ["all", "languages", "web", "tools", "ai", "core"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  const selectedSkill = selectedIndex !== null ? filteredSkills[selectedIndex] : null;

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === filteredSkills.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? filteredSkills.length - 1 : prev - 1
    );
  };

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        {/* Category Filter */}
        <div className="relative flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, key) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedIndex(null);
                }}
                className={cn(
                  "relative px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300",
                  isActive
                    ? "text-white scale-105"
                    : "bg-secondary/70 text-foreground hover:bg-secondary/90"
                )}
              >
                {category}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-primary shadow-md -z-10"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="relative bg-gradient-to-br from-card to-secondary/40 backdrop-blur-sm px-6 py-6 
                         rounded-2xl shadow-sm hover:shadow-xl transition transform hover:scale-105
                         border border-transparent hover:border-primary/40 text-center group cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="flex justify-center items-center text-4xl mb-3">
                {skill.icon}
              </div>
              <h3 className="font-semibold text-lg">{skill.name}</h3>
              <span className="text-xs mt-2 inline-block px-2 py-1 rounded-full bg-primary/10 text-primary">
                {skill.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card max-w-md w-full p-6 rounded-2xl shadow-lg relative text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-primary"
                onClick={() => setSelectedIndex(null)}
              >
                <X size={24} />
              </button>

              {/* Icon */}
              <div className="text-5xl mb-4 flex justify-center">{selectedSkill.icon}</div>

              {/* Name */}
              <h3 className="text-2xl font-bold mb-2">{selectedSkill.name}</h3>

              {/* Category */}
              <span className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                {selectedSkill.category.toUpperCase()}
              </span>

              {/* Description */}
              <p className="text-gray-300 text-base leading-relaxed">{selectedSkill.desc}</p>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center mt-6">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={20} /> Prev
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80"
                  onClick={handleNext}
                >
                  Next <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
