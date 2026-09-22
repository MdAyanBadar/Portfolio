import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const baseProjects = [
  {
    id: 1,
    title: "InterviewPrep",
    kicker: "LLM evaluation",
    description:
      "An AI interview coach: Gemini generates questions, grades free-text answers, and explains what was missing — so practice feels closer to a real interviewer than a quiz.",
    features: [
      "LLM-generated technical questions and MCQs by topic",
      "Subjective answers evaluated by Gemini Flash with written feedback",
      "Dashboards for topic-wise accuracy and progress over time",
      "JWT auth, secure REST APIs, and indexed MongoDB queries",
    ],
    image: "/projects/project6.png",
    tags: ["Gemini API", "LLMs", "React", "Node.js", "MongoDB", "JWT"],
    demoUrl: "https://interview-prep-b9m7.vercel.app",
    githubUrl: "https://github.com/MdAyanBadar/interview-prep",
  },
  {
    id: 2,
    title: "Nexora",
    kicker: "Generative AI SaaS",
    description:
      "A full-stack AI SaaS product that bundles content generation, image processing, and resume analysis behind real auth and paid subscriptions.",
    features: [
      "Gemini-powered article and title generation",
      "AI image generation and editing (background & object removal)",
      "Resume analysis with actionable feedback",
      "Clerk auth with Free and Premium subscription tiers",
      "Node.js + PostgreSQL backend with a community gallery",
    ],
    image: "/projects/project5.png",
    tags: ["Google Gemini", "React", "Node.js", "PostgreSQL", "Clerk"],
    demoUrl: "https://nexora-saas-tau.vercel.app",
    githubUrl: "https://github.com/MdAyanBadar/Nexora",
  },
  {
    id: 3,
    title: "Book Recommender",
    kicker: "Machine learning",
    description:
      "A collaborative-filtering recommender that suggests books from what similar readers liked, with precomputed similarity so results come back instantly.",
    features: [
      "Collaborative filtering over book rating data",
      "Cosine similarity for low-latency recommendations",
      "Precomputed similarity matrices to keep the app fast",
      "Large datasets cleaned and processed with Pandas & NumPy",
      "Interactive Streamlit UI, deployed on Streamlit Cloud",
    ],
    image: "/projects/project2.png",
    tags: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
    demoUrl:
      "https://book-recommendation-krraqpcvjfhtojsrwtsrxs.streamlit.app/",
    githubUrl: "https://github.com/MdAyanBadar/book-recommendation",
  },
  {
    id: 4,
    title: "FinTrack",
    kicker: "Full-stack PWA",
    description:
      "A personal finance app built around payday: it budgets from salary day to salary day, reads bank alerts so spending logs itself, and tells you how much is safe to spend today.",
    features: [
      "Auto-imports transactions from bank emails and SMS — parser for HDFC, SBI, ICICI, Axis, Kotak, slice and UPI alerts, de-duplicated by bank reference",
      "Salary-day pay cycles with a daily allowance, recurring bills, per-category limits, and unspent budget rolling into savings",
      "Push notifications for overspending, category limits, and bills due tomorrow, sent daily by a GitHub Actions scheduler",
      "Installable home-screen app with insights: category breakdown, spending calendar, streaks, and cycle-by-cycle trends",
    ],
    image: "/projects/project1.png",
    tags: ["React", "Node.js", "Express", "Prisma", "PostgreSQL", "Web Push", "PWA"],
    demoUrl: "https://fin-track-steel-chi.vercel.app/",
    githubUrl: "https://github.com/MdAyanBadar/finTrack",
  },
  {
    id: 5,
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
  id: 6,
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
];

const featured = baseProjects.slice(0, 4);
const more = baseProjects.slice(4);

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55 },
};

const handleImgError = (e) => {
  e.currentTarget.style.visibility = "hidden";
};

const LinkButtons = ({ project, compact = false }) => (
  <div className={compact ? "flex gap-2" : "flex flex-wrap gap-3"}>
    <a
      href={project.demoUrl}
      target="_blank"
      rel="noreferrer"
      className={
        compact
          ? "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          : "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium shadow-sm hover:shadow-[0_0_16px_hsl(var(--primary)/0.5)] hover:scale-105 transition-all"
      }
    >
      <ExternalLink size={compact ? 14 : 16} />
      {compact ? "Demo" : "Live Demo"}
    </a>
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noreferrer"
      className={
        compact
          ? "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors"
          : "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary text-primary font-medium hover:bg-primary/10 transition-colors"
      }
    >
      <Github size={compact ? 14 : 16} />
      Code
    </a>
  </div>
);

const FeaturedProject = ({ project, index }) => {
  const flipped = index % 2 === 1;
  return (
    <motion.article
      {...reveal}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
    >
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title} live demo`}
        className={`group relative lg:col-span-7 block rounded-2xl border border-border bg-card shadow-sm overflow-hidden ${
          flipped ? "lg:order-2" : ""
        }`}
      >
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-secondary/60">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <span className="ml-3 text-xs text-muted-foreground truncate">
            {project.demoUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        </div>
        <div className="aspect-video overflow-hidden bg-secondary">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            onError={handleImgError}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 top-10 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 pointer-events-none" />
      </a>

      <div className={`lg:col-span-5 text-left ${flipped ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl font-bold text-primary/25 dark:text-primary/35 leading-none tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
            <Sparkles size={12} />
            {project.kicker}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-5">{project.description}</p>

        <ul className="space-y-2 mb-6">
          {project.features.slice(0, 4).map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 text-sm">
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md border border-border bg-secondary/50 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <LinkButtons project={project} />
      </div>
    </motion.article>
  );
};

const MoreProjectCard = ({ project, index }) => (
  <motion.article
    {...reveal}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="group flex flex-col rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden shadow-sm hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
  >
    <div className="aspect-video overflow-hidden bg-secondary border-b border-border">
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
        onError={handleImgError}
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <div className="p-5 flex-1 flex flex-col text-left">
      <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-secondary text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto">
        <LinkButtons project={project} compact />
      </div>
    </div>
  </motion.article>
);

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Products I've built end to end — from the model call or the database schema
          to the interface people actually use.
        </p>

        <div className="space-y-20 md:space-y-28">
          {featured.map((project, i) => (
            <FeaturedProject key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="mt-24">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl font-semibold whitespace-nowrap">More things I've built</h3>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {more.map((project, i) => (
              <MoreProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="https://github.com/MdAyanBadar"
            target="_blank"
            rel="noreferrer"
            className="cosmic-button inline-flex items-center gap-2"
          >
            <Github size={18} />
            More on GitHub
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
