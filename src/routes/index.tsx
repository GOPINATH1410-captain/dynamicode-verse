import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import CountUp from "react-countup";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ArrowRight,
  ExternalLink,
  Send,
  Sun,
  Moon,
  ArrowUp,
  Code2,
  Cpu,
  Database,
  Cloud,
  Brain,
  Smartphone,
  Globe,
  Award,
  GraduationCap,
  Briefcase,
  Sparkles,
  Users,
  Clock,
  MessageSquare,
  Lightbulb,
  Rocket,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import portraitAsset from "@/assets/gopinath-portrait.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gopinath C | Full Stack Developer Portfolio" },
      {
        name: "description",
        content:
          "Full Stack Developer • Java Programmer • React Developer • AI Enthusiast. Explore projects, internships, certifications, and skills.",
      },
      { property: "og:title", content: "Gopinath C | Full Stack Developer Portfolio" },
      {
        property: "og:description",
        content:
          "Portfolio of Gopinath C — Full Stack Developer building scalable, AI-powered web apps.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: PortfolioPage,
});

/* ---------------- Data ---------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

const SKILLS = {
  Programming: [
    { name: "Java", level: 90 },
    { name: "Python", level: 80 },
  ],
  Frontend: [
    { name: "HTML", level: 95 },
    { name: "CSS", level: 90 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
  ],
  Backend: [{ name: "Node.js", level: 80 }],
  Database: [
    { name: "MySQL", level: 85 },
    { name: "MongoDB", level: 75 },
  ],
};

const TOOLS = ["Git", "GitHub", "REST API", "Responsive Design", "JWT", "Deployment"];

const PROJECTS = [
  {
    title: "Automated Exam Hall Seating Arrangement",
    subtitle: "Deep Learning-Based Facial Recognition",
    description:
      "Intelligent web app that automates student identity verification and seating allocation using deep-learning facial recognition — enhancing exam security while reducing manual work.",
    tech: ["React", "Node", "Python", "OpenCV", "Face Recognition", "MySQL"],
    live: "https://examseatarrangement.vercel.app/",
    github: "https://github.com/",
    gradient: "from-blue-500 via-cyan-500 to-emerald-500",
    tag: "AI · Full Stack",
  },
  {
    title: "Smart Campus Placement Intelligence System",
    subtitle: "Role-based Placement Portal",
    description:
      "Intelligent placement portal where students register, upload resumes and apply for jobs, while recruiters manage drives — powered by secure role-based authentication.",
    tech: ["React", "Node", "Express", "MySQL", "JWT"],
    live: "https://z7wvsotvvq4yu.mocha.app",
    github: "https://github.com/",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    tag: "Full Stack",
  },
];

const INTERNSHIPS = [
  {
    company: "Ether Info Tech",
    role: "Full Stack Development Intern",
    date: "June 2025",
    points: ["Frontend & Backend engineering", "React · Node.js", "End-to-end deployment"],
  },
  {
    company: "CoderOne",
    role: "Web Development Intern",
    date: "June 2025",
    points: ["MySQL database design", "CRUD operations", "Real-world project delivery"],
  },
];

const CERTS = [
  { org: "Cisco Networking Academy", title: "HTML, CSS & JavaScript", icon: Globe },
  { org: "NPTEL", title: "Internet of Things", icon: Cpu },
  { org: "NPTEL", title: "Cloud Computing", icon: Cloud },
  { org: "MongoDB", title: "Introduction to MongoDB", icon: Database },
  { org: "MongoDB", title: "AI · Vector Search", icon: Brain },
  { org: "Infosys Springboard", title: "Artificial Intelligence", icon: Sparkles },
  { org: "Infosys Springboard", title: "React.js", icon: Code2 },
];

const STATS = [
  { label: "Projects", value: 10, suffix: "+" },
  { label: "Certificates", value: 15, suffix: "+" },
  { label: "Internships", value: 2, suffix: "" },
  { label: "Technologies", value: 12, suffix: "+" },
  { label: "CGPA", value: 8.84, decimals: 2, suffix: "" },
];

const INTERESTS = [
  { title: "Full Stack Development", icon: Code2 },
  { title: "Artificial Intelligence", icon: Brain },
  { title: "Machine Learning", icon: Sparkles },
  { title: "Web Development", icon: Globe },
  { title: "Mobile App Development", icon: Smartphone },
  { title: "Cloud Computing", icon: Cloud },
];

const STRENGTHS = [
  { title: "Quick Learner", icon: Rocket },
  { title: "Problem Solver", icon: Lightbulb },
  { title: "Team Player", icon: Users },
  { title: "Adaptability", icon: Sparkles },
  { title: "Time Management", icon: Clock },
  { title: "Communication", icon: MessageSquare },
];

const EDUCATION = [
  {
    period: "2023 – Present",
    title: "B.E. Electronics & Communication Engineering",
    place: "K.S.R Institute for Engineering and Technology",
    score: "CGPA 8.84",
  },
  { period: "2022 – 2023", title: "HSC", place: "Higher Secondary", score: "75.5%" },
  { period: "2020 – 2021", title: "SSLC", place: "Secondary School", score: "99%" },
];

/* ---------------- Hooks ---------------- */

function useSectionSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ---------------- Small building blocks ---------------- */

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        {eyebrow}
      </div>
      <h2 className="mt-5 text-4xl font-bold sm:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}

function GradientCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`gradient-border-inner ${className}`}>
      <div className="gradient-border h-full w-full">{children}</div>
    </div>
  );
}

/* ---------------- Loader ---------------- */
function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              className="mx-auto h-14 w-14 rounded-full border-2 border-transparent border-t-primary border-r-secondary"
            />
            <p className="mt-6 font-display text-sm tracking-[0.4em] text-muted-foreground">LOADING</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Cursor + Progress bar ---------------- */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const on = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(37,99,235,0.10), transparent 40%)`,
      }}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left bg-gradient-to-r from-primary via-secondary to-accent"
    />
  );
}

/* ---------------- Navbar ---------------- */
function Navbar() {
  const active = useSectionSpy(NAV.map((n) => n.id));
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    setDark(!isLight);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextDark = !dark;
    setDark(nextDark);
    if (nextDark) {
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-1/2 top-4 z-[80] w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2"
    >
      <div className="glass flex items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
        <button onClick={() => scrollTo("home")} className="font-display text-sm font-bold tracking-wider">
          <span className="text-gradient">GOPINATH</span>
          <span className="text-foreground">.C</span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/20 ring-1 ring-primary/40"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/50 text-foreground transition-transform hover:scale-110"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="hidden rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:scale-105 hover:glow-primary md:inline-flex"
          >
            Hire Me
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/50 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mt-2 overflow-hidden rounded-2xl p-2 lg:hidden"
          >
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm hover:bg-card"
              >
                {n.label}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const socials = [
    { icon: Github, href: "https://github.com/", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:gopinathc187@gmail.com", label: "Email" },
  ];

  return (
    <section id="home" className="relative flex min-h-dvh items-center overflow-hidden pt-28">
      {/* animated bg */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.15] animate-grid-pan"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.25) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
        <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-primary/40 blur-[120px] animate-blob" />
        <div className="absolute right-[-10%] top-[30%] h-[420px] w-[420px] rounded-full bg-secondary/30 blur-[120px] animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-[-15%] left-[30%] h-[420px] w-[420px] rounded-full bg-accent/30 blur-[120px] animate-blob" style={{ animationDelay: "6s" }} />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-accent font-medium">Open for internships & full-time roles</span>
          </div>

          <h1 className="font-display text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient">Gopinath C</span>
          </h1>

          <div className="mt-4 flex items-center gap-3 font-display text-2xl font-semibold text-muted-foreground sm:text-3xl">
            <span className="inline-block h-[2px] w-8 bg-primary" />
            <div className="text-foreground">
              <Typewriter
                options={{
                  strings: ["Full Stack Developer", "React Developer", "Java Developer", "AI Enthusiast"],
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  deleteSpeed: 30,
                }}
              />
            </div>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I'm a passionate Electronics &amp; Communication Engineering student with a strong interest in
            <span className="text-foreground"> Full Stack Development</span>,
            <span className="text-foreground"> Artificial Intelligence</span>, and
            <span className="text-foreground"> Software Engineering</span> — building scalable web
            applications that solve real-world problems.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:glow-primary"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold transition-all hover:border-primary/60 hover:text-primary"
            >
              View Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
            >
              Hire Me
            </button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="group grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative animate-float">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary via-secondary to-accent opacity-40 blur-2xl" />
            <div className="gradient-border-inner">
              <div className="gradient-border overflow-hidden rounded-2xl">
                <img
                  src={portraitAsset.url}
                  alt="Gopinath C portrait"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
            {/* floating chips */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="glass absolute -left-6 top-10 rounded-2xl px-4 py-3 text-xs shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                <span className="font-semibold">React · Node · Java</span>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="glass absolute -right-4 bottom-10 rounded-2xl px-4 py-3 text-xs shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-accent" />
                <div>
                  <div className="font-semibold">CGPA 8.84</div>
                  <div className="text-muted-foreground">B.E. ECE</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  const edu = [
    { label: "SSLC", value: "99%" },
    { label: "HSC", value: "75.5%" },
    { label: "B.E ECE", value: "8.84" },
  ];
  return (
    <section id="about" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="About Me" title="Passion meets engineering" />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-muted-foreground"
          >
            <p className="text-lg">
              <span className="font-display text-2xl font-semibold text-foreground">Hello! </span>
              I'm Gopinath C, currently pursuing <span className="text-foreground">B.E. Electronics &amp;
              Communication Engineering</span> at K.S.R Institute for Engineering and Technology with a
              CGPA of <span className="text-foreground">8.84</span>.
            </p>
            <p>
              Although my academic background is Electronics, I have developed a strong passion for{" "}
              <span className="text-foreground">Software Development</span>, Web Technologies,{" "}
              <span className="text-foreground">Artificial Intelligence</span>, and Problem Solving.
            </p>
            <p>
              I continuously sharpen my skills through hands-on projects, internships, certifications,
              and daily coding practice — always chasing the next thing to build.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: "Focus", v: "Full Stack" },
                { k: "Base", v: "Tamil Nadu" },
                { k: "Degree", v: "B.E. ECE" },
                { k: "Status", v: "Available" },
              ].map((it) => (
                <div key={it.k} className="rounded-xl border border-border bg-card/60 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{it.k}</div>
                  <div className="mt-1 text-sm font-semibold">{it.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
              <GraduationCap className="h-5 w-5 text-primary" /> Academic Journey
            </h3>
            <div className="relative space-y-6 pl-6">
              <span className="absolute left-1.5 top-1 bottom-1 w-px bg-gradient-to-b from-primary via-secondary to-accent" />
              {edu.map((e, i) => (
                <motion.div
                  key={e.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative"
                >
                  <span className="absolute -left-[22px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" />
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-base font-semibold">{e.label}</span>
                    <span className="text-gradient font-display text-lg font-bold">{e.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */
function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Skills" title="What I work with" subtitle="A modern toolkit for building fast, delightful software." />

        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(SKILLS).map(([category, list], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass rounded-2xl p-6"
            >
              <div className="mb-5 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <h3 className="font-display text-lg font-semibold">{category}</h3>
              </div>
              <div className="space-y-4">
                {list.map((s, idx) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} delay={idx * 0.08} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 glass rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <h3 className="font-display text-lg font-semibold">Tools &amp; Practices</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */
function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setT({ rx: -y * 8, ry: x * 8 });
      }}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
      className="transition-transform duration-200 will-change-transform"
    >
      {children}
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState<"All" | "Full Stack" | "AI">("All");
  const filtered = useMemo(
    () => PROJECTS.filter((p) => filter === "All" || p.tag.includes(filter)),
    [filter]
  );
  return (
    <section id="projects" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Projects" title="Selected Work" subtitle="Real projects, shipped and deployed." />

        <div className="mb-8 flex justify-center gap-2">
          {(["All", "Full Stack", "AI"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <TiltCard>
                <div className="gradient-border-inner h-full">
                  <div className="gradient-border h-full overflow-hidden">
                    <div className={`h-40 w-full bg-gradient-to-br ${p.gradient} relative`}>
                      <div className="absolute inset-0 opacity-25" style={{
                        backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                      }} />
                      <div className="absolute bottom-3 left-4 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
                        {p.tag}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                      <p className="mt-1 text-sm text-secondary">{p.subtitle}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex gap-3">
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                        >
                          Live Demo <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-primary/60 hover:text-primary"
                        >
                          GitHub <Github className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Experience + Stats ---------------- */
function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Experience" title="Internships" />
        <div className="relative mx-auto max-w-3xl">
          <span className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-accent md:left-1/2" />
          {INTERNSHIPS.map((it, i) => (
            <motion.div
              key={it.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`relative mb-8 md:grid md:grid-cols-2 md:gap-10 ${
                i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
              }`}
            >
              <span className="absolute left-4 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-primary/20 md:left-1/2" />
              <div className={`ml-10 md:ml-0 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5" /> {it.date}
                  </div>
                  <h3 className="mt-1 font-display text-xl font-semibold">{it.company}</h3>
                  <p className="text-sm text-secondary">{it.role}</p>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {it.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                <CountUp end={s.value} duration={2.2} decimals={s.decimals ?? 0} enableScrollSpy scrollSpyOnce />
                {s.suffix}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Certifications ---------------- */
function Certifications() {
  return (
    <section id="certifications" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Certifications" title="Continuous Learning" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c, i) => (
            <motion.div
              key={c.title + c.org}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group glass flex items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-primary/30 transition-transform group-hover:scale-110">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs uppercase tracking-widest text-muted-foreground">{c.org}</div>
                <div className="mt-0.5 font-display text-base font-semibold">{c.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Interests + Strengths ---------------- */
function InterestsStrengths() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Focus" title="Interests & Strengths" />
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-5 flex items-center gap-2 font-display text-sm uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-4 w-4 text-secondary" /> Areas of Interest
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {INTERESTS.map((i, idx) => (
                <motion.div
                  key={i.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="group glass flex items-center gap-3 rounded-xl p-4 transition-all hover:border-primary/60"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary transition-transform group-hover:rotate-6">
                    <i.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{i.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-5 flex items-center gap-2 font-display text-sm uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" /> Strengths
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {STRENGTHS.map((i, idx) => (
                <motion.div
                  key={i.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="group glass flex items-center gap-3 rounded-xl p-4 transition-all hover:border-accent/60"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent transition-transform group-hover:rotate-6">
                    <i.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{i.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Education Timeline ---------------- */
function EducationSection() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="Education" title="Academic Path" />
        <div className="relative pl-8">
          <span className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-accent" />
          {EDUCATION.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative mb-8"
            >
              <span className="absolute -left-[26px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" />
              <div className="glass rounded-2xl p-5">
                <div className="text-xs uppercase tracking-widest text-secondary">{e.period}</div>
                <h3 className="mt-1 font-display text-lg font-semibold">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.place}</p>
                <div className="mt-2 inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                  {e.score}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // EmailJS wiring placeholder — opens mail client with prefilled content
    const body = `Name: ${form.name}%0AEmail: ${form.email}%0A%0A${encodeURIComponent(form.message)}`;
    window.location.href = `mailto:gopinathc187@gmail.com?subject=${encodeURIComponent(
      form.subject || "Portfolio inquiry"
    )}&body=${body}`;
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3500);
  };

  const info = [
    { icon: Mail, label: "Email", value: "gopinathc187@gmail.com", href: "mailto:gopinathc187@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 6374310737", href: "tel:+916374310737" },
    { icon: MapPin, label: "Location", value: "Karimangalam, Dharmapuri, Tamil Nadu" },
  ];

  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Contact" title="Let's build something" subtitle="Have a role, project, or idea? Drop me a message." />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {info.map((it) => (
              <a
                key={it.label}
                href={it.href}
                className="glass flex items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <it.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.label}</div>
                  <div className="mt-0.5 break-words text-sm font-medium">{it.value}</div>
                </div>
              </a>
            ))}
            <div className="glass rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Elsewhere</div>
              <div className="mt-3 flex gap-3">
                {[
                  { icon: Linkedin, href: "https://linkedin.com/" },
                  { icon: Github, href: "https://github.com/" },
                  { icon: Mail, href: "mailto:gopinathc187@gmail.com" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={submit}
            className="glass rounded-2xl p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <input
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="mt-4 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <textarea
              required
              placeholder="Message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-4 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:glow-primary"
            >
              <Send className="h-4 w-4" />
              {status === "sent" ? "Opened mail client…" : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <div className="font-display text-xl font-bold">
            <span className="text-gradient">GOPINATH</span>.C
          </div>
          <p className="mt-1 max-w-md text-sm italic text-muted-foreground">
            "Building innovative software solutions with passion and continuous learning."
          </p>
        </div>
        <div className="flex items-center gap-3">
          {[
            { icon: Linkedin, href: "https://linkedin.com/" },
            { icon: Github, href: "https://github.com/" },
            { icon: Mail, href: "mailto:gopinathc187@gmail.com" },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-between text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Gopinath C. All rights reserved.</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-1.5 hover:text-foreground"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
function PortfolioPage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <Loader done={loaded} />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <InterestsStrengths />
        <EducationSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
