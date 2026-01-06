"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Github, X, Info } from "lucide-react";

/* ---------- your projects ---------- */
/* ---------- your projects (updated: Nexora added) ---------- */
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
      "Info-hub: current weather, currency converter and a daily motivational quote bundled into a clean dashboard. Built with React & public APIs.",
    features: [
      "Current weather widget",
      "Live currency converter",
      "Daily motivational quote",
      "Lightweight and responsive UI",
    ],
    image: "/projects/project4.png",
    tags: ["React", "APIs", "Weather", "Currency"],
    demoUrl: "https://ayan-info-hub.vercel.app/",
    githubUrl: "https://github.com/MdAyanBadar/InfoHub",
  },

  /* NEW: Nexora */
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
    image: "/projects/project5.png", // put your image at public/projects/nexora.png or change the path
    tags: ["React", "Node.js", "NeonDB", "Clerk", "Google Gemini", "ClipDrop"],
    demoUrl: "https://nexora-saas-tau.vercel.app",
    githubUrl: "https://github.com/MdAyanBadar/Nexora",
  },
];
/* ---------------------------------------------------------- */

/* ------------------------------------ */

function getCardsCountForWidth(width) {
  if (width < 640) return 1;
  if (width < 768) return 2;
  if (width < 1024) return 3;
  return 4;
}

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const isHoverRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const speedRef = useRef(40); // px/sec - increase to speed up
  const startedRef = useRef(false);

  // duplicate for seamless looping
  const doubled = [...baseProjects, ...baseProjects];

  // set CSS var --cards so widths compute correctly before images load
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

  // helper: wait for all images inside the container to be loaded (or error)
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

  // main auto-scroll logic that waits for layout stabilization
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Start only once (prevents multiple RAF loops on HMR/fast reload)
    if (startedRef.current) return;
    startedRef.current = true;

    let half = 0;

    // initialize after images/layout settled
    const initAndStart = async () => {
      // wait for images to load, and for two frames so layout stabilizes
      await waitForImages(node);
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));

      // compute half now that images and sizes are final
      half = node.scrollWidth / 2 || 1;

      // set a safe start position somewhere in first half so the loop is smooth
      node.scrollLeft = Math.min(Math.max(1, Math.floor(half / 2)), Math.max(1, half - 1));

      let last = performance.now();

      function step(now) {
        const dt = (now - last) / 1000;
        last = now;

        if (!isHoverRef.current && !isPointerDownRef.current) {
          node.scrollLeft += speedRef.current * dt;

          // re-compute half if content changed (rare), but don't over-query every frame
          if (!half || node.scrollWidth / 2 !== half) {
            half = node.scrollWidth / 2 || 1;
          }

          // preserve remainder when wrapping (smooth)
          if (node.scrollLeft >= half) {
            // keep the fractional part when subtracting half
            node.scrollLeft = node.scrollLeft - half;
          } else if (node.scrollLeft <= 0) {
            node.scrollLeft = node.scrollLeft + half;
          }
        }

        rafRef.current = requestAnimationFrame(step);
      }

      rafRef.current = requestAnimationFrame(step);
    };

    initAndStart().catch((err) => {
      // in case of unexpected errors, still start the loop with a safe fallback
      console.error("Carousel init error:", err);
      if (!rafRef.current) {
        let last = performance.now();
        rafRef.current = requestAnimationFrame(function loop(now) {
          const dt = (now - last) / 1000;
          last = now;
          if (!isHoverRef.current && !isPointerDownRef.current) node.scrollLeft += speedRef.current * dt;
          rafRef.current = requestAnimationFrame(loop);
        });
      }
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [doubled.length]);

  // pause on hover
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

  // pointer/touch drag handling (pauses auto-scroll while dragging)
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

  // image fallback to avoid layout collapse
  const handleImgError = (e) => {
    e.currentTarget.src =
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='480'><rect width='100%' height='100%' fill='%23111'/><text x='50%' y='50%' fill='%23aaa' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18'>Image not found</text></svg>";
  };

  return (
    <section id="projects" className="py-24 px-0 relative">
      <div className="w-full max-w-full px-0">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Swipe, hover to pause, or let it glide — it's an infinite carousel.
        </p>

        {/* CAROUSEL: note --cards default provided inline so width calc never NaN */}
        <div
          ref={containerRef}
          aria-label="projects carousel"
          style={{ ["--cards"]: 4, minHeight: 420 }}
          className="no-scrollbar overflow-x-auto flex gap-6 px-6 py-6 flex-nowrap"
        >
          {doubled.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="flex-shrink-0 box-border px-2"
              style={{
                width: "calc(100% / var(--cards))",
                maxWidth: "100%",
                height: "520px", // fixed card height so all cards equal
              }}
            >
              <motion.div
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="h-full flex flex-col bg-white dark:bg-card rounded-xl overflow-hidden shadow-md relative"
              >
                <div className="relative h-44 md:h-56 overflow-hidden rounded-t-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{ display: "block" }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-4">
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm flex items-center gap-2">
                      Demo <ExternalLink size={16} />
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm flex items-center gap-2">
                      GitHub <Github size={16} />
                    </a>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((t, i) => (
                      <span key={i} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold mb-2 line-clamp-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>

                  <div className="mt-auto">
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white" onClick={() => setSelectedProject(project)}>
                      <Info size={16} /> Know More
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ===== REPLACED MODAL: glassy centered modal (matches your original) ===== */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key="modal"
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                aria-hidden="true"
              />

              {/* Modal Card */}
              <motion.div
                className="relative z-10 w-full max-w-2xl mx-4 md:mx-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 220, damping: 22 } }}
                exit={{ y: 40, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  aria-label="Close project details"
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/8 transition"
                >
                  <X size={20} className="text-white/90" />
                </button>

                {/* Top image - keeps same aspect and fills width */}
                <div className="w-full h-56 md:h-64 overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'><rect width='100%' height='100%' fill='%23202026'/><text x='50%' y='50%' fill='%23aaa' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20'>Image not found</text></svg>";
                    }}
                    className="w-full h-full object-cover"
                    style={{ display: "block" }}
                  />
                </div>

                {/* Glassy content area */}
                <div className="p-6 md:p-8 bg-gradient-to-b from-white/5 to-white/3 backdrop-blur-sm text-white">
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-3">
                    {selectedProject.title}
                  </h3>

                  {/* tags */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/6"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* description */}
                  <p className="text-center text-sm md:text-base text-white/90 mb-6 max-w-[46rem] mx-auto">
                    {selectedProject.description}
                  </p>

                  {/* features list */}
                  <ul className="list-disc pl-5 max-w-xl mx-auto mb-6 space-y-2 text-sm text-white/85">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>

                  {/* Action buttons */}
                  <div className="flex gap-4 justify-between items-center max-w-xl mx-auto">
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:brightness-105 transition text-white font-semibold"
                    >
                      Live Demo <ExternalLink size={16} />
                    </a>

                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-white/6 hover:bg-white/9 transition text-white font-medium"
                    >
                      GitHub <Github size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* ===== end modal replacement ===== */}

        <div className="text-center mt-8">
          <a className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white" target="_blank" rel="noreferrer" href="https://github.com/MdAyanBadar">Check My Github <ArrowRight size={16} /></a>
        </div>
      </div>

      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .grabbing { cursor: grabbing !important; cursor: -webkit-grabbing !important; }
        /* clamp fallback if you don't have Tailwind's line-clamp plugin */
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </section>
  );
};
