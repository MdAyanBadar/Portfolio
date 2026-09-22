import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiGnubash,
  SiBootstrap,
  SiSass,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiRedux,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiLinux,
  SiVercel,
  SiRender,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiSqlite,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiHuggingface,
  SiStreamlit,
  SiOpenai,
  SiGooglegemini,
  SiLangchain,
  SiTemporal,
} from "react-icons/si";
import {
  Bot,
  Brain,
  Code2,
  Cpu,
  Database,
  FlaskConical,
  Layers,
  Network,
  PenLine,
  Puzzle,
  ScanText,
  Search,
  Server,
  Sparkles,
  Wrench,
  Boxes,
  Building2,
  BarChart3,
} from "lucide-react";

const aiSkills = [
  { name: "LLMs", icon: <Brain className="text-primary" />, desc: "Production features with structured outputs, evaluation, and guardrails." },
  { name: "Agentic AI", icon: <Bot className="text-primary" />, desc: "Multi-step agents that call tools and hand off to humans when needed." },
  { name: "LangGraph", icon: <SiLangchain className="text-emerald-500" />, desc: "Stateful agent graphs with human-in-the-loop checkpoints." },
  { name: "Temporal", icon: <SiTemporal className="text-foreground" />, desc: "Durable workflows behind my agents — retries, timeouts, 99%+ reliability." },
  { name: "RAG", icon: <Search className="text-primary" />, desc: "Hybrid search and reranking; cut one pipeline from 290s to ~25s." },
  { name: "VLMs & OCR", icon: <ScanText className="text-primary" />, desc: "Structured extraction from scanned and unstructured documents." },
  { name: "Prompt Engineering", icon: <PenLine className="text-primary" />, desc: "Prompts and schemas that keep model behaviour predictable." },
  { name: "OpenAI & Gemini", icon: <span className="flex gap-1"><SiOpenai className="text-foreground" /><SiGooglegemini className="text-blue-500" /></span>, desc: "Generation, extraction, evaluation, and tool calling." },
];

const groups = [
  {
    title: "Languages",
    subtitle: "What I write every day",
    icon: Code2,
    className: "lg:col-start-3 lg:row-start-1",
    skills: [
      { name: "Python", icon: <SiPython className="text-yellow-500" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
      { name: "SQL", icon: <Database className="text-sky-600" /> },
      { name: "Bash", icon: <SiGnubash className="text-foreground" /> },
      { name: "HTML5", icon: <SiHtml5 className="text-orange-500" /> },
      { name: "CSS3", icon: <SiCss3 className="text-blue-600" /> },
    ],
  },
  {
    title: "Tools & Cloud",
    subtitle: "Shipping and collaborating",
    icon: Wrench,
    className: "lg:col-start-3 lg:row-start-2",
    skills: [
      { name: "Git", icon: <SiGit className="text-red-500" /> },
      { name: "GitHub", icon: <SiGithub className="text-foreground" /> },
      { name: "Docker", icon: <SiDocker className="text-blue-500" /> },
      { name: "Linux", icon: <SiLinux className="text-yellow-600" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-500" /> },
      { name: "Vercel", icon: <SiVercel className="text-foreground" /> },
      { name: "Render", icon: <SiRender className="text-foreground" /> },
    ],
  },
  {
    title: "Backend & Web",
    subtitle: "APIs and the interfaces on top",
    icon: Server,
    skills: [
      { name: "FastAPI", icon: <SiFastapi className="text-teal-500" /> },
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "Express.js", icon: <SiExpress className="text-foreground" /> },
      { name: "REST APIs", icon: <Network className="text-primary" /> },
      { name: "React.js", icon: <SiReact className="text-cyan-400" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-foreground" /> },
      { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: "Vite", icon: <SiVite className="text-purple-500" /> },
      { name: "Sass", icon: <SiSass className="text-pink-500" /> },
      { name: "Bootstrap", icon: <SiBootstrap className="text-purple-600" /> },
    ],
  },
  {
    title: "ML & Data",
    subtitle: "Models and the data behind them",
    icon: FlaskConical,
    skills: [
      { name: "scikit-learn", icon: <SiScikitlearn className="text-orange-400" /> },
      { name: "Pandas", icon: <SiPandas className="text-indigo-500" /> },
      { name: "NumPy", icon: <SiNumpy className="text-blue-400" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-red-500" /> },
      { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500" /> },
      { name: "Hugging Face", icon: <SiHuggingface className="text-yellow-500" /> },
      { name: "Streamlit", icon: <SiStreamlit className="text-red-500" /> },
    ],
  },
  {
    title: "Databases",
    subtitle: "Where the data lives",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-700 dark:text-blue-400" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      { name: "MySQL", icon: <SiMysql className="text-sky-700 dark:text-sky-400" /> },
      { name: "SQLite", icon: <SiSqlite className="text-sky-600" /> },
    ],
  },
  {
    title: "Core CS",
    subtitle: "Fundamentals I lean on",
    icon: Cpu,
    className: "md:col-span-2 lg:col-span-3",
    skills: [
      { name: "Data Structures", icon: <Puzzle className="text-primary" /> },
      { name: "Algorithms", icon: <BarChart3 className="text-primary" /> },
      { name: "System Design", icon: <Building2 className="text-primary" /> },
      { name: "OOP", icon: <Boxes className="text-primary" /> },
      { name: "API Design", icon: <Network className="text-primary" /> },
      { name: "Microservices", icon: <Layers className="text-primary" /> },
      { name: "Operating Systems", icon: <Cpu className="text-primary" /> },
      { name: "Agile / Scrum", icon: <Sparkles className="text-primary" /> },
    ],
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
};

const CardHeader = ({ icon: Icon, title, subtitle, count }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="p-2.5 rounded-xl bg-primary/10">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div className="text-left flex-1 min-w-0">
      <h3 className="font-semibold text-lg leading-tight">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
    <span className="text-xs font-medium text-muted-foreground tabular-nums">{count}</span>
  </div>
);

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            {...reveal}
            transition={{ duration: 0.5 }}
            className="relative md:col-span-2 lg:row-span-2 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 md:p-8 shadow-sm overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-primary text-primary-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-2xl">AI Engineering</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary">
                  Primary focus
                </span>
              </div>
              <p className="text-muted-foreground text-left mb-6 max-w-xl">
                What I use at BlueSprings to put LLMs into production, and keep them reliable once they're there.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aiSkills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.04 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-background/60 backdrop-blur-sm text-left transition-colors hover:border-primary/50"
                  >
                    <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl [&_svg]:h-5 [&_svg]:w-5">
                      {skill.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold leading-tight">{skill.name}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{skill.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {groups.map((group, gi) => (
            <motion.div
              key={group.title}
              {...reveal}
              transition={{ duration: 0.5, delay: 0.05 * gi }}
              className={cn(
                "rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 shadow-sm transition-colors hover:border-primary/30",
                group.className
              )}
            >
              <CardHeader
                icon={group.icon}
                title={group.title}
                subtitle={group.subtitle}
                count={group.skills.length}
              />
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-secondary/50 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-primary/10 [&_svg]:h-4 [&_svg]:w-4"
                  >
                    {skill.icon}
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
