import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Info, ArrowRight, X, Sparkles, Sun, Moon } from 'lucide-react';

const baseProjects = [
  {
    id: 1,
    title: "FinTrack - Expense Tracker",
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
    demoUrl: "https://fin-track-steel-chi.vercel.app/",
    githubUrl: "https://github.com/MdAyanBadar/finTrack",
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
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "TypeScript",
      "Socket.IO",
    ],
    demoUrl: "https://live-polling-client.onrender.com/",
    githubUrl: "https://github.com/MdAyanBadar/polling",
  },
  {
  id: 4,
  title: "Info-hub",
  description:
    "Info-hub is an all-in-one information dashboard that brings together daily-use utilities like weather updates, currency conversion, inspirational quotes, recipe discovery, movie exploration, and country insights. Built with React and multiple public APIs, it offers a clean, responsive, and user-friendly experience.",
  features: [
    "Current weather widget (real-time updates)",
    "Live currency converter",
    "Daily motivational quote",
    "Recipe finder with search functionality",
    "Movie discovery and details (ratings, overview, etc.)",
    "Country finder with key information (capital, region, population, flag)",
    "Modular, lightweight, and responsive UI",
  ],
  image: "/projects/project4.png",
  tags: [
    "React",
    "APIs",
    "Weather",
    "Currency",
    "Recipes",
    "Movies",
    "Countries",
  ],
  demoUrl: "https://ayan-info-hub.vercel.app/",
  githubUrl: "https://github.com/MdAyanBadar/InfoHub",
},

  {
    id: 5,
    title: "Nexora",
    description:
      "Nexora is a modern SaaS platform that provides AI-driven creative tools, subscription-based premium access, and a community space to share and explore creative work.",
    features: [
      "Authentication with Clerk (email/password + social)",
      "Subscription management and payments",
      "AI-powered creative tools via Google Gemini & ClipDrop",
      "Community creations tab to explore user content",
    ],
    image: "/projects/project5.png",
    tags: ["React", "Node.js", "NeonDB", "Clerk", "Google Gemini", "ClipDrop"],
    demoUrl: "https://nexora-saas-tau.vercel.app",
    githubUrl: "https://github.com/MdAyanBadar/Nexora",
  },
  {
    id: 6,
    title: "InterviewPrep - AI Platform",
    description:
      "A sophisticated AI-driven interview preparation platform that uses LLMs to provide real-time feedback, scoring, and topic-wise performance analytics.",
    features: [
      "AI-powered subjective answer evaluation using Gemini 1.5 Flash",
      "Hybrid grading system for instant MCQs and subjective feedback",
      "Dynamic analytics dashboard for performance tracking",
      "Secure JWT authentication and MongoDB session management",
    ],
    image: "/projects/project6.png",
    tags: ["React", "Node.js", "MongoDB", "Google Gemini", "TailwindCSS"],
    demoUrl: "https://interview-prep-b9m7.vercel.app",
    githubUrl: "https://github.com/MdAyanBadar/interview-prep",
  },
];

function getCardsCountForWidth(width) {
  if (width < 640) return 1;
  if (width < 768) return 2;
  if (width < 1024) return 3;
  return 4;
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const isHoverRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const speedRef = useRef(50);
  const startedRef = useRef(false);

  const tripled = [...baseProjects, ...baseProjects, ...baseProjects];

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const setVar = () => {
      node.style.setProperty("--cards", String(getCardsCountForWidth(window.innerWidth)));
    };
    setVar();
    window.addEventListener("resize", setVar);
    return () => window.removeEventListener("resize", setVar);
  }, []);

  const waitForImages = (parent) => {
    const imgs = parent ? Array.from(parent.querySelectorAll("img")) : [];
    const promises = imgs.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) return resolve();
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        })
    );
    return Promise.all(promises);
  };

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (startedRef.current) return;
    startedRef.current = true;

    let segmentWidth = 0;

    const initAndStart = async () => {
      await waitForImages(node);
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));

      segmentWidth = node.scrollWidth / 3 || 1;
      node.scrollLeft = segmentWidth;

      let last = performance.now();

      function step(now) {
        const dt = (now - last) / 1000;
        last = now;

        if (!isHoverRef.current && !isPointerDownRef.current) {
          node.scrollLeft += speedRef.current * dt;

          if (!segmentWidth || node.scrollWidth / 3 !== segmentWidth) {
            segmentWidth = node.scrollWidth / 3 || 1;
          }

          if (node.scrollLeft >= segmentWidth * 2) {
            node.scrollLeft = node.scrollLeft - segmentWidth;
          } else if (node.scrollLeft <= segmentWidth * 0.1) {
            node.scrollLeft = node.scrollLeft + segmentWidth;
          }
        }

        rafRef.current = requestAnimationFrame(step);
      }

      rafRef.current = requestAnimationFrame(step);
    };

    initAndStart().catch((err) => {
      console.error("Carousel init error:", err);
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const enter = () => (isHoverRef.current = true);
    const leave = () => (isHoverRef.current = false);
    node.addEventListener("pointerenter", enter);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointerenter", enter);
      node.removeEventListener("pointerleave", leave);
    };
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let startX = 0;
    let startScroll = 0;
    let dragging = false;

    function down(e) {
      dragging = true;
      isPointerDownRef.current = true;
      startX = e.pageX ?? e.touches?.[0]?.pageX ?? 0;
      startScroll = node.scrollLeft;
      node.classList.add("grabbing");
    }
    function move(e) {
      if (!dragging) return;
      const x = e.pageX ?? e.touches?.[0]?.pageX ?? 0;
      const dx = x - startX;
      node.scrollLeft = startScroll - dx;
    }
    function up() {
      dragging = false;
      isPointerDownRef.current = false;
      node.classList.remove("grabbing");
    }

    node.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    node.addEventListener("touchstart", down, { passive: true });
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);

    return () => {
      node.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      node.removeEventListener("touchstart", down);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, []);

  const handleImgError = (e) => {
    e.currentTarget.src =
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='480'><rect width='100%' height='100%' fill='%23111'/><text x='50%' y='50%' fill='%23aaa' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18'>Image not found</text></svg>";
  };

  return (
    <section id="projects" className={`py-24 relative overflow-hidden ${isDark ? 'dark' : ''}`}>
      {/* Theme Toggle Button */}
      
      <div className="w-full max-w-full px-0 relative">
        <div className="text-center mb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Featured <span className="text-primary">Projects</span>
            </h2>
          </motion.div>
        </div>

        <div
          ref={containerRef}
          aria-label="projects carousel"
          style={{ ["--cards"]: 4, minHeight: 500 }}
          className="no-scrollbar overflow-x-auto flex gap-6 px-6 py-8 flex-nowrap cursor-grab"
        >
          {tripled.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="flex-shrink-0 box-border"
              style={{
                width: "calc(100% / var(--cards) - 24px)",
                maxWidth: "100%",
                minWidth: "280px"
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (idx % 5) * 0.1 }}
                whileHover={{ y: -8 }}
                className="h-full flex flex-col rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 card-hover group"
              >
                {/* Image container with overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60" />
                  
                  {/* Hover overlay with buttons */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium flex items-center gap-2 shadow-lg"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2 border border-white/20"
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                  </div>

                  {/* Sparkle indicator */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
                    <Sparkles size={14} className="text-white" />
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedProject(project)}
                    >
                      <Info size={16} />
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key="modal-backdrop"
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all border border-border"
                >
                  <X size={20} className="text-foreground" />
                </motion.button>

                {/* Hero Image */}
                <div className="relative w-full h-72 md:h-96 overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating tags on image */}
                  <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-4 py-2 text-sm font-semibold rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  >
                    {selectedProject.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-foreground/80 text-lg mb-8 leading-relaxed"
                  >
                    {selectedProject.description}
                  </motion.p>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                  >
                    <h4 className="text-xl font-bold mb-4 text-foreground">Key Features</h4>
                    <div className="grid gap-3">
                      {selectedProject.features.map((feat, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <span className="text-foreground/80 leading-relaxed">{feat}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <motion.a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      <ExternalLink size={20} />
                      View Live Demo
                    </motion.a>

                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-card text-foreground font-bold border-2 border-border hover:border-primary transition-all"
                    >
                      <Github size={20} />
                      View Source Code
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 px-4"
        >
          <motion.a
            href="https://github.com/MdAyanBadar"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Github size={20} />
            Explore More on GitHub
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
        .no-scrollbar::-webkit-scrollbar { 
          display: none; 
        }
        .grabbing { 
          cursor: grabbing !important; 
          cursor: -webkit-grabbing !important; 
        }
        .line-clamp-3 { 
          display: -webkit-box; 
          -webkit-line-clamp: 3; 
          -webkit-box-orient: vertical; 
          overflow: hidden; 
        }
      `}</style>
    </section>
  );
}