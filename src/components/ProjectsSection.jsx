"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Github, X, Info } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Budget Tracker App",
    description:
      "A dynamic budget and expense tracker with visual insights, daily budget monitoring, and goal tracking built with React, TailwindCSS, and Recharts.",
    features: [
      "Add and categorize expenses easily",
      "Set daily/weekly/monthly budgets",
      "Interactive charts for spending insights",
      "Responsive design for all devices",
    ],
    image: "/projects/project1.png",
    tags: ["React", "TailwindCSS", "Recharts", "Framer Motion"],
    demoUrl: "https://expense-tracker-ruddy-eta-36.vercel.app/",
    githubUrl: "https://github.com/MdAyanBadar/expense-tracker",
  },
  {
    id: 2,
    title: "ML Book Recommender",
    description:
      "A Machine Learning powered book recommender system built with Streamlit. It suggests books dynamically using content-based filtering and provides an intuitive UI.",
    features: [
      "Content-based recommendation system",
      "Interactive Streamlit app",
      "Clean and minimal UI",
      "Deployed with Streamlit Cloud",
    ],
    image: "/projects/project2.png",
    tags: ["Python", "Streamlit", "Machine Learning"],
    demoUrl:
      "https://book-recommendation-krraqpcvjfhtojsrwtsrxs.streamlit.app/",
    githubUrl: "https://github.com/MdAyanBadar/book-recommendation",
  },
  {
    id: 3,
    title: "Polling Client",
    description:
      "A real-time polling application for teachers and students built with MERN stack and TypeScript. Teachers can create polls, while students can participate and view live results instantly.",
    features: [
      "Role-based system for teachers and students",
      "Create and participate in polls",
      "Real-time updates with WebSockets",
      "Secure authentication and authorization",
      "Responsive UI with TypeScript + TailwindCSS",
    ],
    image: "/projects/project3.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "TypeScript", "Socket.IO"],
    demoUrl: "https://live-polling-client.onrender.com/", 
    githubUrl: "https://github.com/MdAyanBadar/polling"
  }
];


export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 px-4 relative bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <motion.div
              key={key}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-2xl relative cursor-pointer"
            >
              {/* Image + Hover Overlay */}
              <div className="h-48 overflow-hidden rounded-t-xl relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm flex items-center gap-2 hover:scale-105 transition"
                  >
                    Demo <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    className="px-3 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm flex items-center gap-2 hover:scale-105 transition"
                  >
                    GitHub <Github size={16} />
                  </a>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-white transition"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Improved Know More Button */}
                <button
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition"
                  onClick={() => setSelectedProject(project)}
                >
                  <Info size={16} /> Know More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key="modal"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="w-full h-[90%] md:h-auto md:w-full md:max-w-lg 
                           rounded-t-2xl md:rounded-2xl shadow-xl overflow-hidden relative 
                           border border-white/20 bg-white/10 backdrop-blur-2xl"
                initial={{ y: 100, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                }}
                exit={{ y: 100, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  className="absolute top-4 right-4 text-gray-200 hover:text-white"
                  onClick={() => setSelectedProject(null)}
                >
                  <X size={24} />
                </button>

                {/* Image */}
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6 text-white overflow-y-auto max-h-[calc(100%-4rem)]">
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-medium border border-white/30 rounded-full bg-white/20 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mb-6 opacity-90">{selectedProject.description}</p>

                  {/* Features List */}
                  <ul className="list-disc pl-5 space-y-2 mb-6 text-sm opacity-90">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>

                  {/* Buttons (desktop only) */}
                  <div className="hidden md:flex justify-between">
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition"
                    >
                      Live Demo <ExternalLink size={16} />
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:scale-105 transition"
                    >
                      GitHub <Github size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="text-center mt-12">
          <a
            className="w-fit flex items-center mx-auto gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition"
            target="_blank"
            href="https://github.com/MdAyanBadar"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
