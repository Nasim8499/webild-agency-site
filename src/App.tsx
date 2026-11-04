import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// --- data
const heroLeft = [
  { id: 1, src: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-1.webp", alt: "SaaS dashboard" },
  { id: 2, src: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-4.webp", alt: "Editorial" },
  { id: 3, src: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-6.webp", alt: "Product page" },
  { id: 4, src: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-7.webp", alt: "Mobile app" },
];
const heroRight = [
  { id: 5, src: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-2.webp", alt: "Analytics" },
  { id: 6, src: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-5.webp", alt: "Agency site" },
  { id: 7, src: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-3.webp", alt: "Portfolio" },
  { id: 8, src: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-8.webp", alt: "Commerce" },
];

const workItems = [
  {
    title: "Vitality Wellness",
    cat: "Health & wellbeing platform",
    img: "https://storage.googleapis.com/webild/default/templates/web-agency-2/projectnew1.webp",
  },
  {
    title: "Mailflow AI",
    cat: "AI-powered email marketing platform",
    img: "https://storage.googleapis.com/webild/default/templates/web-agency-2/projectnew2.webp",
  },
  {
    title: "Kinetic Studios",
    cat: "Motion graphics & visual effects",
    img: "https://storage.googleapis.com/webild/default/templates/web-agency-2/projectnew3.webp",
  },
];

const team = [
  {
    name: "Elena Voss",
    role: "Creative Director",
    focus: "Brand systems",
    img: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-1.webp",
  },
  {
    name: "Mika Chen",
    role: "Lead Engineer",
    focus: "Frontend perf",
    img: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-2.webp",
  },
  {
    name: "Jonah Reyes",
    role: "Product Designer",
    focus: "Interaction design",
    img: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-3.webp",
  },
  {
    name: "Ava Delgado",
    role: "Growth & SEO",
    focus: "Acquisition",
    img: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=600&auto=format&fit=crop",
  },
];

const metrics = [
  {
    value: "240%",
    title: "Avg. lift in conversion",
    bullets: ["Headless builds", "Core Web Vitals 98+", "Conversion-first UX"],
  },
  {
    value: "14d",
    title: "Ship to production",
    bullets: ["Strategy → design → build", "Weekly client demos", "Staging with analytics"],
  },
  {
    value: "98/100",
    title: "Lighthouse average",
    bullets: ["Edge rendering", "Image CDN", "Perf budgets enforced"],
  },
];

const faqs = [
  {
    q: "How fast can you launch?",
    a: "Typical marketing sites ship in 14–21 days. Complex apps in 6–8 weeks. We parallelize design + engineering.",
  },
  {
    q: "What tech stack do you use?",
    a: "Next.js / React, TypeScript, Tailwind, headless CMS, Vercel edge. Happy to fit your existing stack.",
  },
  {
    q: "Do you handle SEO & analytics?",
    a: "Yes. Technical SEO, content architecture, schema, GA4 / Plausible, server-side events, and experiments baked in.",
  },
  {
    q: "Can you take over an existing site?",
    a: "We do audits → incremental rebuilds → migrations with zero downtime. 12 teams trust us with legacy cleanup.",
  },
  {
    q: "What about post-launch?",
    a: "Care plans: uptime monitoring, content updates, CRO sprints, and monthly performance reviews.",
  },
];

// small helper
const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

function FadeBlur({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3.5 py-[7px] text-[13px] xl:text-[13.5px] tracking-[-0.01em] text-foreground/78 card rounded-full">
      {children}
    </div>
  );
}

function PrimaryBtn({ children, href = "#", small = false }: { children: React.ReactNode; href?: string; small?: boolean }) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full primary-button font-medium tracking-[-0.012em] transition-all duration-300",
        "hover:translate-y-[-1px] hover:shadow-[0_12px_40px_rgba(255,255,255,0.09)] active:translate-y-[0px]",
        small ? "px-[18px] h-[42px] text-[14px]" : "px-[22px] h-[48px] text-[15px] md:px-[26px] md:h-[52px] md:text-[15.5px]"
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-[3px]">
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}
function SecondaryBtn({ children, href = "#", small = false }: { children: React.ReactNode; href?: string; small?: boolean }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full secondary-button font-medium tracking-[-0.01em] border border-white/[0.09] hover:bg-[#242424] transition",
        small ? "px-[18px] h-[42px] text-[14px]" : "px-[22px] h-[48px] text-[15px] md:px-[26px] md:h-[52px] md:text-[15.5px]"
      )}
    >
      {children}
    </a>
  );
}

function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-aurora" />
      {/* aurora orbs */}
      <div className="absolute -top-40 left-[8%] w-[560px] h-[560px] rounded-full opacity-[.15] blur-[120px]"
        style={{ background: "radial-gradient(circle, #c9d6ff 0%, #99aaff 35%, transparent 70%)" }} />
      <div className="absolute top-[16%] right-[-8%] w-[520px] h-[520px] rounded-full opacity-[.1] blur-[110px]"
        style={{ background: "radial-gradient(circle, #ffd8ba 0%, #ffb88a 35%, transparent 70%)" }} />
      {/* light rays corner */}
      <svg className="absolute right-[-80px] top-[-30px] w-[880px] h-[780px] opacity-[0.22] hidden md:block" viewBox="0 0 880 780" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g style={{ transformOrigin: "100% 0%" }}>
          {Array.from({ length: 28 }).map((_, i) => (
            <line
              key={i}
              x1="880"
              y1="0"
              x2={-40 + (i * 28)}
              y2={760}
              stroke="white"
              strokeOpacity={0.20 - i * 0.005}
              strokeWidth="1.2"
              style={{ animation: "ray-pulse 3.8s ease-in-out infinite", animationDelay: `${i * 0.09}s` } as React.CSSProperties}
            />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 bg-grid-faint opacity-[.55]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.14) 0%, rgba(10,10,10,0) 24%, rgba(10,10,10,0) 72%, rgba(10,10,10,0.3) 100%)" }} />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 md:px-8 pt-[18px] md:pt-[26px]">
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .55, ease: [0.22,1,0.36,1] }}
        className={cn(
          "w-content-width flex items-center justify-between gap-6 px-[14px] md:px-[22px] h-[62px] md:h-[68px] rounded-[28px] transition-all duration-300",
          scrolled
            ? "backdrop-blur-xl bg-[rgba(16,16,16,0.78)] border border-white/[0.11] shadow-[0_10px_50px_rgba(0,0,0,0.55)]"
            : "backdrop-blur-[14px] bg-[rgba(18,18,18,0.52)] border border-white/[0.10]"
        )}
      >
        <a href="#" className="flex items-center gap-[11px] pl-1">
          <div className="w-[34px] h-[34px] rounded-[12px] bg-white text-[#0d0d0d] grid place-items-center font-[700] text-[15px] tracking-tight">W</div>
          <span className="text-[19px] font-[620] tracking-[-0.018em]">Webild</span>
          <span className="hidden sm:inline text-[11px] text-foreground/56 -ml-[3px] mt-[3px]">®</span>
        </a>

        <div className="hidden lg:flex items-center gap-[30px] text-[14.5px] text-foreground/78">
          <a href="#services" className="hover:text-white transition">Services</a>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-white transition">
              Work <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+16px)] opacity-0 scale-[.97] pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200">
              <div className="card rounded-[18px] py-[10px] w-[210px]">
                {["Case Studies","Playground","Brand Work"].map(s => (
                  <a key={s} className="block px-4 py-2.5 text-[13.8px] text-foreground/80 hover:text-white hover:bg-white/[0.035] rounded-[12px] mx-2 transition" href="#work">{s}</a>
                ))}
              </div>
            </div>
          </div>
          <a href="#team" className="hover:text-white transition">Team</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden md:inline-flex">
            <span className="px-[20px] h-[42px] rounded-full primary-button text-[14.2px] font-[550] grid place-items-center tracking-[-0.01em] hover:translate-y-[-1px] transition-all">
              Start Project
            </span>
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-[44px] h-[44px] rounded-full secondary-button border border-white/[0.09] grid place-items-center"
            aria-label="Menu"
          >
            <div className="space-y-[5px]">
              <div className="w-[18px] h-[1.8px] bg-white/85 rounded" />
              <div className="w-[18px] h-[1.8px] bg-white/85 rounded" />
              <div className="w-[18px] h-[1.8px] bg-white/85 rounded" />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden absolute top-[90px] w-[calc(100vw-32px)] max-w-[560px] card rounded-[22px] p-[14px]"
          >
            {["Services","Work","Team","Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setOpen(false)} className="block px-4 py-[13px] rounded-[14px] text-[15px] text-foreground/88 hover:bg-white/[0.045]">{l}</a>
            ))}
            <div className="px-4 pt-2 pb-1">
              <a href="#contact" onClick={()=>setOpen(false)} className="block text-center py-3 rounded-full primary-button font-[560]">Start Project</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MarqueeColumn({ items, reverse = false }: { items: typeof heroLeft; reverse?: boolean }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="flex-1 overflow-hidden mask-fade-y-medium rounded-[20px]">
      <div className={reverse ? "animate-marquee-vertical-reverse" : "animate-marquee-vertical"}>
        {loop.map((it, i) => (
          <div key={i + "-" + it.id} className="mb-[12px] xl:mb-[14px] 2xl:mb-[16px] card rounded-[20px] p-[8px] xl:p-[10px] 2xl:p-[12px] glow-ring">
            <div className="aspect-[4/5] rounded-[14px] overflow-hidden bg-[#121212] relative">
              <img
                src={it.src}
                alt={it.alt}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/[0.16] via-transparent to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" aria-label="Hero section" className="relative min-h-[860px] md:min-h-svh flex items-center pt-[120px] md:pt-0 pb-16 md:pb-0">
      <div className="w-content-width mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-6 lg:col-span-6">
          <FadeBlur>
            <Pill>Award-Winning Agency</Pill>
          </FadeBlur>
          <FadeBlur delay={0.06}>
            <h1 className="mt-[18px] text-[44px] sm:text-[56px] md:text-[clamp(3rem,4vw,4rem)] 2xl:text-[4.6rem] leading-[1.06] font-[630] tracking-[-0.024em] text-balance gradient-text">
              We Build<br />
              Digital<br />
              Experiences
            </h1>
          </FadeBlur>
          <FadeBlur delay={0.13} y={16}>
            <p className="mt-5 md:mt-7 max-w-[540px] text-[17px] md:text-[19px] leading-[1.55] text-foreground/70 text-balance">
              Transform your brand with cutting-edge web design and development.
              We craft stunning websites that convert visitors into customers.
            </p>
          </FadeBlur>
          <FadeBlur delay={0.21}>
            <div className="flex flex-wrap gap-3 mt-7 md:mt-8">
              <PrimaryBtn href="#contact">Start Project</PrimaryBtn>
              <SecondaryBtn href="#work">View Work</SecondaryBtn>
            </div>
          </FadeBlur>

          <FadeBlur delay={0.32}>
            <div className="flex items-center gap-5 mt-10 md:mt-12">
              <div className="flex -space-x-[10px]">
                {[
                  "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-1.webp",
                  "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-2.webp",
                  "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-3.webp",
                  "https://randomuser.me/api/portraits/men/32.jpg",
                ].map((u, i) => (
                  <img key={i} src={u} alt="" className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] rounded-full border-[2px] border-[#0a0a0a] object-cover" />
                ))}
              </div>
              <div className="text-[12.5px] md:text-[13.4px] leading-[1.35] text-foreground/66">
                Trusted by 120+ founders<br />4.9/5 avg. rating
              </div>
            </div>
          </FadeBlur>
        </div>

        <div className="md:col-span-6 lg:col-span-6">
          <div className="h-[520px] md:h-[74vh] max-h-[820px] flex gap-[12px] xl:gap-[14px] 2xl:gap-[18px]">
            <MarqueeColumn items={heroLeft} />
            <MarqueeColumn items={heroRight} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ tag, title, desc, align="center" }: { tag: string; title: React.ReactNode; desc: string; align?: "center"|"left" }) {
  return (
    <div className={cn("max-w-[860px]", align==="center" ? "mx-auto text-center" : "")}>
      <FadeBlur><div className={cn(align==="center" ? "mx-auto" : "", "mb-3 w-fit")}><Pill>{tag}</Pill></div></FadeBlur>
      <FadeBlur delay={0.07}>
        <h2 className="text-[34px] sm:text-[44px] md:text-[52px] lg:text-[58px] leading-[1.1] font-[630] tracking-[-0.022em] gradient-text text-balance">
          {title}
        </h2>
      </FadeBlur>
      <FadeBlur delay={0.14}>
        <p className="mt-[14px] md:mt-[18px] text-[16.5px] md:text-[18.5px] leading-[1.55] text-foreground/68 text-balance">
          {desc}
        </p>
      </FadeBlur>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-[88px] md:py-[124px]">
      <div className="w-content-width mx-auto">
        <SectionHeader
          tag="Services"
          title={<>Services That<br className="hidden md:block" /> Drive Results</>}
          desc="We offer a full suite of digital services to help your brand stand out online."
        />
        <div className="mt-[46px] md:mt-[62px] grid md:grid-cols-12 gap-[18px] md:gap-[22px]">
          {/* Web Dev – big left */}
          <FadeBlur className="md:col-span-7">
            <div className="card rounded-[26px] p-[26px] md:p-[34px] h-full min-h-[440px] flex flex-col justify-between relative overflow-hidden shimmer-border">
              <div>
                <h3 className="text-[26px] md:text-[30px] font-[620] tracking-[-0.018em]">Web Development</h3>
                <p className="mt-2 text-[15.5px] text-foreground/70 max-w-[420px]">Custom-built websites that are fast, responsive, and designed to convert.</p>
              </div>

              <div className="mt-10 md:mt-14 relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/[0.22] via-white/[0.11] to-transparent" />
                <div className="space-y-[20px] pl-[54px] relative">
                  {[
                    { label: "Discovery & Strategy", detail: "Day 1-3" },
                    { label: "Design & Prototype", detail: "Day 4-7" },
                    { label: "Development & Launch", detail: "Day 8-14" },
                  ].map((s) => (
                    <div key={s.label} className="relative">
                      <div className="absolute -left-[44px] top-[6px] w-[18px] h-[18px] rounded-full bg-[#161616] border border-white/[0.22] grid place-items-center">
                        <div className="w-[6px] h-[6px] rounded-full bg-white" />
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="text-[16.5px] font-[520]">{s.label}</div>
                        <div className="text-[12.8px] text-foreground/62">{s.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-[18px] pl-[54px]">
                  <span className="inline-flex items-center gap-[7px] text-[12.7px] px-[11px] py-[6px] rounded-full secondary-button border border-white/[0.08]">
                    <span className="w-[6px] h-[6px] bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.7)]" /> Live
                  </span>
                </div>
              </div>
            </div>
          </FadeBlur>

          {/* SEO */}
          <FadeBlur delay={0.08} className="md:col-span-5">
            <div className="card rounded-[26px] p-[26px] md:p-[30px] h-full min-h-[440px] flex flex-col justify-between overflow-hidden">
              <div>
                <h3 className="text-[23px] md:text-[26px] font-[620] tracking-[-0.015em]">SEO Optimization</h3>
                <p className="mt-2 text-[15px] text-foreground/69">We optimize your website to rank higher on search engines and drive organic traffic.</p>
              </div>
              {/* animated bars */}
              <div className="mt-8">
                <BarChart />
              </div>
            </div>
          </FadeBlur>

          {/* Branding full width / bottom */}
          <FadeBlur delay={0.14} className="md:col-span-12">
            <div className="card rounded-[26px] p-[26px] md:p-[34px] grid md:grid-cols-12 gap-8 items-center overflow-hidden">
              <div className="md:col-span-5">
                <h3 className="text-[26px] md:text-[30px] font-[620] tracking-[-0.018em]">Branding</h3>
                <p className="mt-[10px] text-[15.5px] text-foreground/71 max-w-[430px]">Build a memorable brand identity that resonates with your audience.</p>
                <div className="flex gap-3 mt-5">
                  <SecondaryBtn small href="#contact">Brand audit</SecondaryBtn>
                </div>
              </div>
              <div className="md:col-span-7">
                <OrbitIcons />
              </div>
            </div>
          </FadeBlur>
        </div>
      </div>
    </section>
  );
}

function BarChart() {
  const bars = [
    { h: 52, hl: 78 },
    { h: 70, hl: 95 },
    { h: 46, hl: 70 },
    { h: 82, hl: 100 },
    { h: 58, hl: 83 },
    { h: 40, hl: 60 },
    { h: 66, hl: 90 },
    { h: 74, hl: 88 },
  ];
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(3);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % bars.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="h-[190px] flex items-end gap-[14px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ maskImage: "linear-gradient(to top, black 40%, transparent)" }}
    >
      {bars.map((b, i) => (
        <div key={i} className="flex-1 rounded-[8px] bg-[#232323] relative overflow-hidden" style={{ height: `${hover ? b.hl : b.h}%`, transition: "height .55s cubic-bezier(.22,1,.36,1)" }}>
          <div className={cn("absolute inset-0 bg-white transition-opacity duration-500", active === i ? "opacity-100" : "opacity-0")} />
        </div>
      ))}
    </div>
  );
}

function OrbitIcons() {
  const icons = [
    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/></svg>,
    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>,
    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M2 12h20"/></svg>,
  ];
  return (
    <div className="relative h-[240px] md:h-[250px] flex items-center justify-center overflow-hidden"
      style={{ perspective: "1200px", maskImage: "radial-gradient(ellipse at center, black 55%, transparent 90%)" }}>
      <div className="absolute w-[170px] h-[170px] rounded-full border border-white/[0.07]" />
      <div className="absolute w-[250px] h-[250px] rounded-full border border-white/[0.055]" />
      <div className="absolute w-[330px] h-[330px] rounded-full border border-white/[0.038]" />
      <div
        className="relative"
        style={{ transform: "rotateY(18deg) rotateX(16deg) rotateZ(-16deg)" }}
      >
        <div className="w-[84px] h-[84px] rounded-full primary-button grid place-items-center shadow-[0_10px_40px_rgba(255,255,255,0.06)]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="1.7"><path d="M12 2l2.9 6.9L22 12l-7.1 3.1L12 22l-2.9-6.9L2 12l7.1-3.1L12 2z"/></svg>
        </div>
        {icons.map((Icon, i) => {
          const angle = (360 / icons.length) * i;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -ml-[20px] -mt-[20px]"
              style={{
                animation: "orbit 11s linear infinite",
                // @ts-ignore custom props
                "--initial-position": `${angle}deg`,
                "--translate-position": `134px`,
              } as React.CSSProperties}
            >
              <div className="w-[40px] h-[40px] rounded-[12px] card grid place-items-center">
                <Icon />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  return (
    <section id="work" className="relative py-[86px] md:py-[120px] border-t border-white/[0.065]">
      <div className="w-content-width mx-auto">
        <SectionHeader
          tag="Our Work"
          title="Work We're Proud Of"
          desc="A selection of projects we've crafted for clients across industries."
        />

        <div className="mt-[44px] md:mt-[60px] relative">
          <div
            ref={ref}
            className="flex gap-[18px] md:gap-[24px] overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
            onScroll={(e) => {
              const el = e.currentTarget;
              const idx = Math.round(el.scrollLeft / (el.firstElementChild?.clientWidth || 1 + 24));
              setActive(Math.max(0, Math.min(idx, workItems.length-1)));
            }}
          >
            {workItems.map((w) => (
              <div
                key={w.title}
                className="snap-start shrink-0 w-[86vw] sm:w-[520px] md:w-[560px] lg:w-[610px]"
              >
                <div className="card rounded-[26px] overflow-hidden group">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                    <img src={w.img} alt={w.title} className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.045]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/8 to-transparent" />
                    <a href="#" className="absolute right-4 top-4 w-[44px] h-[44px] rounded-full bg-white/96 text-[#111] grid place-items-center hover:scale-105 transition">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                    </a>
                    <div className="absolute left-[20px] bottom-[18px] right-[20px]">
                      <div className="text-[12.8px] text-white/78">{w.cat}</div>
                      <div className="text-[22px] md:text-[26px] font-[600] tracking-[-0.016em] text-white">{w.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-[10px] mt-6">
            {workItems.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = ref.current;
                  if (!el) return;
                  const card = el.querySelector<HTMLElement>("div > div");
                  const w = card ? card.offsetWidth + 24 : 560;
                  el.scrollTo({ left: i * w, behavior: "smooth" });
                }}
                className={cn(
                  "h-[7px] rounded-full transition-all",
                  active === i ? "w-[34px] bg-white" : "w-[7px] bg-white/26"
                )}
                aria-label={`Go to slide ${i+1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PromiseSection() {
  const feats = [
    { icon: "◱", title: "Responsive Design", desc: "Pixel-perfect websites that look stunning on every screen size and device." },
    { icon: "↗", title: "Fast Turnaround", desc: "From concept to launch in record time without sacrificing quality." },
    { icon: "◆", title: "Secure Hosting", desc: "Enterprise-grade security and 99.9% uptime for your website." },
  ];
  return (
    <section id="promise" className="relative py-[84px] md:py-[118px]">
      <div className="w-content-width mx-auto">
        <SectionHeader tag="Our Promise" title="Why Brands Choose Webild" desc="We deliver results that speak for themselves." />
        <div className="mt-[48px] md:mt-[66px] grid md:grid-cols-3 gap-[18px] md:gap-[22px]">
          {feats.map((f, i) => (
            <FadeBlur key={f.title} delay={i * 0.07}>
              <div className="relative card rounded-[24px] p-[26px] md:p-[30px] h-full glow-ring group hover:translate-y-[-3px] transition-transform duration-300">
                <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(480px 180px at 50% -20%, rgba(255,255,255,0.055), transparent 70%)" }} />
                <div className="w-[46px] h-[46px] rounded-[14px] secondary-button border border-white/[0.09] grid place-items-center text-[17px]">{f.icon}</div>
                <div className="mt-[18px] text-[20px] md:text-[22px] font-[610] tracking-[-0.015em]">{f.title}</div>
                <div className="mt-[10px] text-[14.8px] leading-[1.6] text-foreground/70">{f.desc}</div>
              </div>
            </FadeBlur>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section id="testimonials" className="py-[70px] md:py-[96px] border-y border-white/[0.065] bg-[rgba(255,255,255,0.012)]">
      <div className="w-content-width mx-auto">
        <div className="max-w-[980px] mx-auto text-center card rounded-[28px] px-[24px] md:px-[56px] py-[46px] md:py-[64px] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full opacity-[0.09] blur-[80px]" style={{ background: "radial-gradient(circle, #fff, transparent 70%)" }} />
          <FadeBlur>
            <div className="text-amber-300 text-[16px] tracking-wider">★★★★★</div>
            <blockquote className="mt-[20px] text-[24px] md:text-[30px] lg:text-[34px] leading-[1.38] font-[520] tracking-[-0.017em] text-balance">
              “Webild completely transformed our online presence. The team delivered a <em className="font-serif italic text-white">stunning website</em> that exceeded our expectations and doubled our conversion rate.”
            </blockquote>
            <div className="mt-[18px] text-[14.6px] text-foreground/73">— Maria Santos, CEO at Luxuria Travel</div>
          </FadeBlur>
          <FadeBlur delay={0.14}>
            <div className="mt-[30px] flex items-center justify-center gap-[10px] flex-wrap">
              {[
                "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-1.webp",
                "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-2.webp",
                "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-3.webp",
                "https://randomuser.me/api/portraits/men/32.jpg",
                "https://randomuser.me/api/portraits/women/44.jpg",
              ].map((src, i) => (
                <img key={i} src={src} className="w-[44px] h-[44px] rounded-full border-[2px] border-[#161616] object-cover -ml-0 first:ml-0" alt="" />
              ))}
              <div className="ml-2 text-[12.7px] text-foreground/66">+ 118 happy clients</div>
            </div>
          </FadeBlur>
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="py-[88px] md:py-[118px]">
      <div className="w-content-width mx-auto">
        <SectionHeader
          tag="Results"
          title="Ship beautiful. Ship fast."
          desc="Engineering culture baked into design. Measured outcomes from day one."
        />
        <div className="grid md:grid-cols-3 gap-[18px] md:gap-[22px] mt-[48px] md:mt-[62px]">
          {metrics.map((m, i) => (
            <FadeBlur key={m.value} delay={i*0.06}>
              <div className="card rounded-[26px] p-[28px] md:p-[32px] h-full flex flex-col">
                <div className="text-[56px] md:text-[64px] font-[640] tracking-[-0.032em] leading-[0.95] gradient-text">{m.value}</div>
                <div className="mt-[6px] text-[17px] font-[540] tracking-[-0.01em]">{m.title}</div>
                <div className="border-t border-white/[0.075] mt-[22px] pt-[20px] space-y-[13px]">
                  {m.bullets.map(b => (
                    <div key={b} className="flex items-start gap-3 text-[14.2px] text-foreground/78">
                      <span className="mt-[3px] w-[20px] h-[20px] rounded-[7px] primary-button grid place-items-center text-[#111] shrink-0">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                      </span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </FadeBlur>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y1 = useTransform(scrollYProgress, [0,1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0,1], [80, -10]);
  return (
    <section id="team" ref={ref} className="py-[84px] md:py-[118px] border-t border-white/[0.065]">
      <div className="w-content-width mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-[620px]">
            <FadeBlur><Pill>Team</Pill></FadeBlur>
            <FadeBlur delay={0.08}>
              <h2 className="mt-3 text-[34px] md:text-[50px] leading-[1.08] font-[630] tracking-[-0.022em] gradient-text">Operators, not vendors.</h2>
            </FadeBlur>
            <FadeBlur delay={0.14}>
              <p className="mt-3 text-[16.6px] text-foreground/70 max-w-[520px]">A tight senior squad. Designers who code. Engineers who care about pixels. No junior rotations.</p>
            </FadeBlur>
          </div>
          <FadeBlur delay={0.1}>
            <SecondaryBtn href="#contact">Meet us</SecondaryBtn>
          </FadeBlur>
        </div>

        <div className="mt-[44px] md:mt-[56px] grid sm:grid-cols-2 lg:grid-cols-4 gap-[16px] md:gap-[20px]">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              style={{ y: i % 2 === 0 ? y1 : y2 }}
            >
              <FadeBlur delay={i*0.05}>
                <div className="card rounded-[24px] overflow-hidden group">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover transition duration-[700ms] group-hover:scale-[1.055]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/15 to-transparent" />
                    <div className="absolute left-4 bottom-4 right-4">
                      <div className="text-[17.5px] font-[610] tracking-[-0.012em] text-white">{t.name}</div>
                      <div className="text-[13.4px] text-white/80">{t.role}</div>
                    </div>
                  </div>
                  <div className="px-[16px] py-[13px] text-[12.8px] text-foreground/66 flex items-center justify-between">
                    <span>{t.focus}</span>
                    <span className="text-[11px] px-2 py-[4px] rounded-full secondary-button border border-white/[0.08]">Available</span>
                  </div>
                </div>
              </FadeBlur>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-[82px] md:py-[112px] border-t border-white/[0.065]">
      <div className="w-content-width mx-auto grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <FadeBlur><Pill>FAQ</Pill></FadeBlur>
          <FadeBlur delay={0.08}>
            <h2 className="mt-3 text-[34px] md:text-[46px] leading-[1.1] font-[630] tracking-[-0.022em] gradient-text">Questions,<br/>straight answers.</h2>
          </FadeBlur>
          <FadeBlur delay={0.15}>
            <p className="mt-4 text-[15.7px] text-foreground/70 max-w-[420px]">Transparent pricing, clear timelines, and senior hands on every project. If it’s not here, just ask.</p>
          </FadeBlur>
        </div>
        <div className="lg:col-span-7">
          <div className="space-y-[12px]">
            {faqs.map((f, i) => (
              <div key={f.q} className="card rounded-[18px] overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full text-left px-[20px] md:px-[24px] py-[18px] md:py-[20px] flex items-center justify-between gap-6"
                >
                  <span className="text-[16.8px] md:text-[17.8px] font-[540] tracking-[-0.012em]">{f.q}</span>
                  <span className={cn("w-[30px] h-[30px] rounded-full secondary-button grid place-items-center transition-transform flex-shrink-0 border border-white/[0.09]", open===i && "rotate-45")}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: .34, ease: [0.22,1,0.36,1] }}
                    >
                      <div className="px-[20px] md:px-[24px] pb-[20px] text-[14.8px] leading-[1.65] text-foreground/73 border-t border-white/[0.065]">
                        <div className="pt-[14px]">{f.a}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-[88px] md:py-[122px] border-t border-white/[0.065]">
      <div className="w-content-width mx-auto">
        <div className="card rounded-[30px] p-[28px] md:p-[52px] relative overflow-hidden glow-ring">
          <div className="absolute -right-24 -top-24 w-[360px] h-[360px] rounded-full opacity-[0.085] blur-[90px]" style={{ background: "radial-gradient(circle, #fff, transparent 70%)" }} />
          <div className="grid lg:grid-cols-12 gap-10 items-center relative">
            <div className="lg:col-span-7">
              <FadeBlur><Pill>Start a project</Pill></FadeBlur>
              <FadeBlur delay={0.08}>
                <h2 className="mt-3 text-[34px] md:text-[48px] leading-[1.08] font-[620] tracking-[-0.022em] gradient-text">
                  Tell us what you’re building.
                </h2>
              </FadeBlur>
              <FadeBlur delay={0.14}>
                <p className="mt-4 text-[16.8px] text-foreground/72 max-w-[520px]">We’ll reply in 6 hours with scope, timeline, and a lean proposal. Sprint starts next Monday.</p>
              </FadeBlur>

              <div className="mt-8 grid sm:grid-cols-2 gap-3 max-w-[610px]">
                <input placeholder="Your name" className="h-[52px] px-[16px] rounded-[14px] bg-[#121212] border border-white/[0.085] outline-none focus:border-white/[0.22] text-[14.7px] placeholder:text-foreground/45" />
                <input placeholder="Email" type="email" className="h-[52px] px-[16px] rounded-[14px] bg-[#121212] border border-white/[0.085] outline-none focus:border-white/[0.22] text-[14.7px] placeholder:text-foreground/45" />
                <textarea placeholder="Project in 1–2 sentences…" className="sm:col-span-2 h-[118px] px-[16px] pt-[14px] rounded-[14px] bg-[#121212] border border-white/[0.085] outline-none focus:border-white/[0.22] text-[14.7px] placeholder:text-foreground/45 resize-none" />
                <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-1">
                  <PrimaryBtn>Send brief</PrimaryBtn>
                  <span className="text-[13.2px] text-foreground/60">or email hello@webild.studio</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "< 6h", v: "Avg response" },
                  { k: "14d", v: "Launch MVP" },
                  { k: "98+", v: "Lighthouse" },
                  { k: "120+", v: "Ships" },
                ].map(x => (
                  <div key={x.k} className="rounded-[18px] bg-[#111114] border border-white/[0.066] p-[18px]">
                    <div className="text-[27px] font-[640] tracking-[-0.018em]">{x.k}</div>
                    <div className="text-[12.8px] text-foreground/66">{x.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-[18px] bg-[#111114] border border-white/[0.066] p-[18px] text-[13.7px] text-foreground/72 leading-relaxed">
                “Fastest agency partner we’ve ever worked with. They shipped a better homepage in 9 days than 3 months of internal sprints.”<br/>
                <span className="text-foreground/85">— CTO, Mailflow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.075] pt-[66px] pb-[42px] overflow-hidden">
      <div className="w-content-width mx-auto grid md:grid-cols-12 gap-10 text-[14.3px]">
        <div className="md:col-span-5">
          <div className="flex items-center gap-[10px]">
            <div className="w-[34px] h-[34px] rounded-[11px] bg-white text-[#0d0d0d] grid place-items-center font-[700]">W</div>
            <span className="text-[18px] font-[600] tracking-[-0.016em]">Webild</span>
          </div>
          <p className="mt-[14px] max-w-[360px] text-foreground/66 leading-[1.6]">Award-winning digital agency crafting high-converting websites, brands, and product interfaces.</p>
          <div className="mt-5 text-[12.8px] text-foreground/52">© {new Date().getFullYear()} Webild Studio — San Francisco • Paris • Remote</div>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { head: "Studio", links: ["Services","Work","Team","Careers"] },
            { head: "Resource", links: ["Blog","Playbook","Changelog","Brand"] },
            { head: "Social", links: ["Twitter","LinkedIn","Dribbble","Instagram"] },
            { head: "Legal", links: ["Privacy","Terms","Cookies","Security"] },
          ].map(col => (
            <div key={col.head}>
              <div className="text-[12px] uppercase tracking-wider text-foreground/46 mb-3">{col.head}</div>
              <div className="space-y-[9px] text-foreground/74">
                {col.links.map(l => <a key={l} href="#" className="block hover:text-white transition">{l}</a>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-content-width mx-auto mt-[52px] pt-[24px] border-t border-white/[0.065] flex flex-col md:flex-row items-center justify-between gap-4 text-[12.7px] text-foreground/52">
        <div>Made with care • Global delivery • 🇺🇸 🇫🇷 🇯🇵</div>
        <div className="flex items-center gap-5">
          <span>hello@webild.studio</span>
          <span className="hidden sm:inline">•</span>
          <span>ISO-27001 ready</span>
        </div>
      </div>
      {/* big ghost word */}
      <div className="pointer-events-none select-none text-center text-[18vw] md:text-[13vw] font-[660] tracking-[-0.045em] leading-[0.86] text-white/[0.023] mt-[26px]">WEBILD</div>
    </footer>
  );
}

export default function App() {
  // smooth anchor scroll
  useEffect(() => {
    const l = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    };
    document.addEventListener("click", l);
    return () => document.removeEventListener("click", l);
  }, []);

  return (
    <div className="relative bg-background text-foreground min-h-screen">
      <SiteBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Work />
          <PromiseSection />
          <Testimonial />
          <MetricsSection />
          <TeamSection />
          <FaqSection />
          <Contact />
        </main>
        <Footer />
      </div>

      <style>{`
      @keyframes orbit {
        0% { transform: rotate(var(--initial-position,0deg)) translateX(var(--translate-position,134px)) rotate(calc(-1 * var(--initial-position,0deg))); }
        100% { transform: rotate(calc(var(--initial-position,0deg) + 360deg)) translateX(var(--translate-position,134px)) rotate(calc(-1 * (var(--initial-position,0deg) + 360deg))); }
      }
      `}</style>
    </div>
  );
}