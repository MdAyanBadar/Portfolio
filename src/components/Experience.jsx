import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { CalendarDays, MapPin, ShieldCheck, ChevronRight } from "lucide-react";
import { experiences } from "../constants/index.js";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const parse = (ym) => {
  const [y, m] = ym.split("-").map(Number);
  return { y, m };
};

const formatMonth = (ym) => {
  const { y, m } = parse(ym);
  return `${MONTHS[m - 1]} ${y}`;
};

const duration = (start, end) => {
  const s = parse(start);
  const now = new Date();
  const e = end ? parse(end) : { y: now.getFullYear(), m: now.getMonth() + 1 };
  const months = Math.max(1, (e.y - s.y) * 12 + (e.m - s.m) + 1);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ");
};

const Highlight = ({ h, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay: 0.05 * i }}
    className="p-4 rounded-xl border border-border bg-background/60 text-left transition-colors hover:border-primary/40"
  >
    <div className="flex items-baseline gap-2 mb-2 min-h-8">
      {h.metric ? (
        <>
          <span className="text-2xl font-bold text-primary whitespace-nowrap">{h.metric}</span>
          <span className="text-xs text-muted-foreground">{h.metricLabel}</span>
        </>
      ) : (
        <ShieldCheck className="h-7 w-7 text-primary self-center" />
      )}
    </div>
    <h4 className="font-semibold mb-1">{h.title}</h4>
    <p className="text-sm text-muted-foreground leading-relaxed">{h.text}</p>
  </motion.div>
);

// Matches the 60% line where the progress tip sits, so a dot lights as the tip reaches it.
const TIP_LINE = 0.6;

const RoleCard = ({ job }) => {
  const current = !job.end;
  const dotRef = useRef(null);
  const [reached, setReached] = useState(false);
  const { scrollY } = useScroll();

  const check = () => {
    const r = dotRef.current?.getBoundingClientRect();
    if (r) setReached(r.top + r.height / 2 <= window.innerHeight * TIP_LINE);
  };
  useMotionValueEvent(scrollY, "change", check);
  useEffect(check, []);

  const lit = current || reached;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 md:pl-14"
    >
      <span
        ref={dotRef}
        className={`absolute left-0 top-7 z-10 h-5 w-5 rounded-full border-2 transition-all duration-500 ${
          lit
            ? "bg-primary border-primary scale-110 shadow-[0_0_0_6px_hsl(var(--primary)/0.2),0_0_16px_hsl(var(--primary)/0.6)]"
            : "bg-card border-primary/60"
        }`}
      />

      <div
        className={`rounded-2xl border bg-card/80 backdrop-blur-sm shadow-sm p-5 sm:p-6 md:p-8 transition-colors duration-500 ${
          lit ? "border-primary/30" : "border-border"
        }`}
      >
        <header className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 text-left">
          <div
            className={`h-14 w-14 shrink-0 rounded-xl flex items-center justify-center text-lg font-bold transition-colors duration-500 ${
              lit
                ? "bg-gradient-to-br from-primary to-primary/60 text-primary-foreground"
                : "bg-primary/10 text-primary"
            }`}
          >
            {job.initials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl md:text-2xl font-bold">{job.role}</h3>
              {current && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                  Current
                </span>
              )}
            </div>
            <p className="text-primary font-medium mt-0.5">{job.company}</p>
          </div>

          <div className="flex flex-wrap md:flex-col md:items-end gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatMonth(job.start)} – {job.end ? formatMonth(job.end) : "Present"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {job.location} · {duration(job.start, job.end)}
            </span>
          </div>
        </header>

        <p className="mt-5 text-left text-muted-foreground leading-relaxed max-w-3xl">{job.summary}</p>

        {job.highlights.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {job.highlights.map((h, i) => (
              <Highlight key={h.title} h={h} i={i} />
            ))}
          </div>
        )}

        {job.also.length > 0 && (
          <ul className="mt-6 space-y-2 text-left">
            {job.also.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 pt-5 border-t border-border flex flex-wrap gap-2">
          {job.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md border border-border bg-secondary/50 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

function Experience() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 60%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const tipTop = useTransform(progress, (v) => `${v * 100}%`);
  const tipOpacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0.6]);

  return (
    <section id="experience" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My Work <span className="text-primary">Experience</span>
        </h2>

        <div className="relative">
          <div ref={trackRef} className="absolute left-[9px] top-8 bottom-8 w-px bg-border">
            <motion.div
              style={{ scaleY: progress }}
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-primary/40 via-primary to-primary shadow-[0_0_8px_hsl(var(--primary)/0.8)]"
            />
            <motion.div
              style={{ top: tipTop, opacity: tipOpacity }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary shadow-[0_0_12px_4px_hsl(var(--primary)/0.7)]"
            />
          </div>
          <div className="space-y-10">
            {experiences.map((job) => (
              <RoleCard key={`${job.company}-${job.start}`} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
