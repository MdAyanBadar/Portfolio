import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Download,
  FileSearch,
  GraduationCap,
  MapPin,
  Users,
  Workflow,
  BrainCircuit,
  Mail,
} from "lucide-react";

const focusAreas = [
  {
    icon: Workflow,
    title: "Agentic AI workflows",
    desc: "Human-in-the-loop agents on Temporal and LangGraph that retry, wait for approvals, and hold 99%+ reliability.",
  },
  {
    icon: FileSearch,
    title: "RAG & document intelligence",
    desc: "Hybrid search with reranking, plus OCR and VLM extraction for messy real-world documents.",
  },
  {
    icon: BrainCircuit,
    title: "End-to-end AI products",
    desc: "FastAPI and Node backends, React frontends, and the RBAC and audit logging that make AI safe to ship.",
  },
];

const impact = [
  { value: "80%", label: "less manual support work" },
  { value: "137s → 2s", label: "RAG reranking time" },
  { value: "75%", label: "fewer failed workflow runs" },
  { value: "466+", label: "enterprise GitHub contributions" },
];

const journey = [
  { year: "2021", title: "Started B.Tech in CSE", place: "Swami Vivekananda University, Kolkata" },
  { year: "2024", title: "Frontend & Backend Intern", place: "TheQA, Kolkata" },
  { year: "2025", title: "Graduated · CGPA 7.8/10", place: "B.Tech, Computer Science & Engineering" },
  { year: "2026", title: "AI Engineer", place: "BlueSprings Innovations, Hyderabad", current: true },
];

const certifications = [
  { name: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn Learning" },
  { name: "Machine Learning Foundations", issuer: "LinkedIn Learning" },
  { name: "AI Foundations: Thinking Machines", issuer: "LinkedIn Learning" },
  { name: "Dynamic Web Applications", issuer: "NxtWave CCBP 4.0" },
];

const card = "rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-sm";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative bg-background text-foreground">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Profile */}
          <motion.div
            {...reveal()}
            className={`${card} lg:col-span-4 relative overflow-hidden p-6 md:p-8 text-left flex flex-col`}
          >
            <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-lg mb-5">
                AB
              </div>
              <h3 className="text-2xl font-bold leading-tight">MD Ayan Badar</h3>
              <p className="text-primary font-medium mt-1">AI Engineer</p>

              <div className="mt-5 space-y-2.5 text-sm">
                <div className="flex items-center gap-2.5">
                  <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>BlueSprings Innovations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>Hyderabad, India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>B.Tech CSE, 2025</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>Mentors and onboards new interns</span>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-auto lg:pt-8 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="/projects/Ayan_Badar_Resume_Simplified.pdf"
                download="MD_Ayan_Badar_Resume.pdf"
                className="cosmic-button inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
            </div>
          </motion.div>

          {/* Story + focus */}
          <motion.div {...reveal(0.08)} className={`${card} lg:col-span-8 p-6 md:p-8 text-left`}>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
              I turn LLMs into software that holds up in production.
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At BlueSprings Innovations I build AI features for international clients —
                support automation, document processing pipelines, and retrieval systems
                that have to work every time, not just in a demo.
              </p>
              <p>
                Most of my work sits where models meet engineering: making a RAG pipeline
                ten times faster, wrapping an agent in durable workflows so a crash never
                loses a case, or adding the access control and audit trail a compliance
                team needs.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {focusAreas.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-4 rounded-xl border border-border bg-background/60 transition-colors hover:border-primary/40"
                >
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-1">{title}</h4>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Impact */}
          <motion.div {...reveal(0.1)} className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {impact.map(({ value, label }) => (
              <div key={label} className={`${card} p-5 text-center`}>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary whitespace-nowrap">
                  {value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Journey */}
          <motion.div {...reveal(0.1)} className={`${card} lg:col-span-7 p-6 md:p-8 text-left`}>
            <h3 className="text-lg font-semibold mb-6">The journey so far</h3>
            <ol className="relative border-l border-border ml-2 space-y-6">
              {journey.map((step) => (
                <li key={step.year} className="pl-6 relative">
                  <span
                    className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 ${
                      step.current
                        ? "bg-primary border-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.2)]"
                        : "bg-card border-primary/50"
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-sm font-semibold text-primary tabular-nums">{step.year}</span>
                    <span className="font-semibold">{step.title}</span>
                    {step.current && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        Now
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{step.place}</p>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Certifications */}
          <motion.div {...reveal(0.15)} className={`${card} lg:col-span-5 p-6 md:p-8 text-left`}>
            <h3 className="text-lg font-semibold mb-6">Certifications</h3>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium leading-snug">{c.name}</div>
                    <div className="text-sm text-muted-foreground">{c.issuer}</div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
