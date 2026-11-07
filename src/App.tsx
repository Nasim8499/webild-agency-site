import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

function FadeBlur({ children, delay = 0, y = 10 }: { children: ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[980px] bg-[#f5f5f7] px-[13px] py-[6px] text-[12px] font-[500] tracking-[0.01em] text-[#6e6e73] border border-black/[0.04]">
      {children}
    </span>
  );
}

function PrimaryBtn({ children, href = "#", small = false, type }: { children: ReactNode; href?: string; small?: boolean; type?: "button" | "submit" }) {
  const cls = cn(
    "inline-flex items-center justify-center gap-[6px] rounded-[980px] bg-[#0071e3] text-white font-[500] transition-colors duration-200 hover:bg-[#0077ed] active:bg-[#006edb]",
    small ? "h-[34px] px-[15px] text-[13px]" : "h-[46px] px-[24px] text-[16px]"
  );
  if (type) {
    return (
      <button type={type} className={cls}>
        {children}
      </button>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

function SecondaryBtn({ children, href = "#", small = false }: { children: ReactNode; href?: string; small?: boolean }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-[6px] rounded-[980px] bg-white text-[#0071e3] border border-[#0071e3]/35 font-[500] transition-colors duration-200 hover:bg-[#f5f5f7]",
        small ? "h-[34px] px-[15px] text-[13px]" : "h-[46px] px-[24px] text-[16px]"
      )}
    >
      {children}
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <nav
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "bg-[rgba(251,251,253,0.86)] backdrop-blur-xl backdrop-saturate-180 border-black/[0.09] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            : "bg-[rgba(251,251,253,0.72)] backdrop-blur-xl border-transparent"
        )}
      >
        <div className="mx-auto flex h-[48px] max-w-[1024px] items-center justify-between px-[20px]">
          <a href="#" className="flex items-center gap-[8px]">
            <span className="grid h-[22px] w-[22px] place-items-center rounded-[6px] bg-[#1d1d1f] text-[12px] font-[700] text-white">N</span>
            <span className="text-[15px] font-[600] tracking-[-0.01em] text-[#1d1d1f]">NSpace</span>
            <span className="text-[9px] text-[#86868b]">®</span>
          </a>

          <div className="hidden items-center gap-[26px] md:flex">
            <a href="#services" className="text-[12px] text-[#1d1d1f]/80 transition hover:text-[#1d1d1f]">Services</a>
            <div className="group relative">
              <button className="flex items-center gap-[4px] text-[12px] text-[#1d1d1f]/80 transition hover:text-[#1d1d1f]">
                Work
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full w-[180px] -translate-x-1/2 pt-[10px] opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="rounded-[12px] border border-black/[0.07] bg-white p-[6px] shadow-[0_12px_34px_rgba(0,0,0,0.12)]">
                  {["Case Studies", "Playground", "Brand Work"].map((s) => (
                    <a key={s} href="#work" className="block rounded-[8px] px-[10px] py-[7px] text-[12.5px] text-[#1d1d1f]/85 hover:bg-[#f5f5f7]">{s}</a>
                  ))}
                </div>
              </div>
            </div>
            <a href="#team" className="text-[12px] text-[#1d1d1f]/80 transition hover:text-[#1d1d1f]">Team</a>
            <a href="#contact" className="text-[12px] text-[#1d1d1f]/80 transition hover:text-[#1d1d1f]">Contact</a>
          </div>

          <div className="flex items-center gap-[8px]">
            <a
              href="#contact"
              className="hidden h-[28px] items-center rounded-[980px] bg-[#0071e3] px-[13px] text-[12px] font-[500] text-white transition hover:bg-[#0077ed] sm:inline-flex"
            >
              Start Project
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
              className="grid h-[44px] w-[44px] place-items-center md:hidden"
            >
              <div className="flex w-[18px] flex-col gap-[4px]">
                <div className={cn("h-[1.5px] w-full rounded bg-[#1d1d1f] transition-transform", open && "translate-y-[5.5px] rotate-45")} />
                <div className={cn("h-[1.5px] w-full rounded bg-[#1d1d1f] transition-opacity", open && "opacity-0")} />
                <div className={cn("h-[1.5px] w-full rounded bg-[#1d1d1f] transition-transform", open && "-translate-y-[5.5px] -rotate-45")} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="border-b border-black/[0.08] bg-[rgba(251,251,253,0.96)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col px-[20px] py-[16px]">
              {["Services", "Work", "Team", "Contact"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center border-b border-black/[0.06] text-[17px] text-[#1d1d1f] last:border-0"
                >
                  {l}
                </a>
              ))}
              <div className="pt-[14px]">
                <a href="#contact" onClick={() => setOpen(false)} className="flex h-[44px] items-center justify-center rounded-[980px] bg-[#0071e3] text-[15px] font-[500] text-white">
                  Start Project
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MarqueeColumn({ items, reverse = false }: { items: typeof heroLeft; reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className="flex-1">
      <div className={cn("flex flex-col gap-[14px]", reverse ? "animate-marquee-vertical-reverse" : "animate-marquee-vertical")}>
        {list.map((it, i) => (
          <div
            key={`${it.id}-${i}`}
            className="overflow-hidden rounded-[16px] border border-black/[0.06] bg-white shadow-[0_2px_14px_rgba(0,0,0,0.05)]"
          >
            <img src={it.src} alt={it.alt} loading="lazy" className="block h-[150px] w-full object-cover sm:h-[176px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" aria-label="Hero section" className="relative scroll-mt-[60px] overflow-hidden pt-[104px] pb-[56px] md:pt-[132px] md:pb-[76px]">
      <div className="pointer-events-none absolute inset-0 bg-aurora" />
      <div className="relative mx-auto w-[var(--width-content-width)]">
        <div className="grid items-center gap-[44px] lg:grid-cols-2 lg:gap-[60px]">
          <div>
            <FadeBlur>
              <Pill>Award-Winning Agency</Pill>
            </FadeBlur>
            <FadeBlur delay={0.06}>
              <h1 className="mt-[16px] text-[44px] font-[600] leading-[1.03] tracking-[-0.028em] text-[#1d1d1f] sm:text-[56px] lg:text-[66px]">
                We Build<br />Digital<br />Experiences
              </h1>
            </FadeBlur>
            <FadeBlur delay={0.13} y={14}>
              <p className="mt-[18px] max-w-[480px] text-[17px] leading-[1.47] text-[#6e6e73] sm:text-[19px]">
                Transform your brand with cutting-edge web design and development. We craft stunning websites that convert visitors into customers.
              </p>
            </FadeBlur>
            <FadeBlur delay={0.21}>
              <div className="mt-[28px] flex flex-wrap items-center gap-[12px]">
                <PrimaryBtn href="#contact">Start Project</PrimaryBtn>
                <SecondaryBtn href="#work">View Work</SecondaryBtn>
              </div>
            </FadeBlur>
            <FadeBlur delay={0.32}>
              <div className="mt-[34px] flex items-center gap-[14px]">
                <div className="flex">
                  {[
                    "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-1.webp",
                    "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-2.webp",
                    "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-3.webp",
                    "https://randomuser.me/api/portraits/men/32.jpg",
                  ].map((u, i) => (
                    <img key={i} src={u} alt="" className="h-[32px] w-[32px] rounded-full border-2 border-white object-cover -ml-[9px] first:ml-0 shadow-[0_1px_3px_rgba(0,0,0,0.12)]" />
                  ))}
                </div>
                <div className="text-[12.5px] leading-[1.45] text-[#6e6e73]">
                  Trusted by 120+ founders<br />4.9/5 avg. rating
                </div>
              </div>
            </FadeBlur>
          </div>

          <div className="relative">
            <div className="mask-fade-y-medium flex h-[420px] gap-[14px] overflow-hidden sm:h-[480px]">
              <MarqueeColumn items={heroLeft} />
              <MarqueeColumn items={heroRight} reverse />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ tag, title, desc, align = "center" }: { tag: string; title: ReactNode; desc: string; align?: "center" | "left" }) {
  return (
    <div className={cn("max-w-[720px]", align === "center" ? "mx-auto text-center" : "text-left")}>
      <FadeBlur>
        <Pill>{tag}</Pill>
      </FadeBlur>
      <FadeBlur delay={0.06}>
        <h2 className="mt-[14px] text-[32px] font-[600] leading-[1.08] tracking-[-0.022em] text-[#1d1d1f] sm:text-[40px] md:text-[46px]">
          {title}
        </h2>
      </FadeBlur>
      <FadeBlur delay={0.12}>
        <p className="mt-[12px] text-[16px] leading-[1.5] text-[#6e6e73] sm:text-[17px]">{desc}</p>
      </FadeBlur>
    </div>
  );
}

function BarChart() {
  const bars = [42, 58, 47, 72, 64, 88, 76];
  return (
    <div className="flex h-[150px] items-end justify-between gap-[10px] rounded-[14px] bg-[#f5f5f7] p-[16px]">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 6 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-[5px] bg-[#0071e3]"
          style={{ opacity: 0.45 + i * 0.07 }}
        />
      ))}
    </div>
  );
}

function OrbitIcons() {
  const items = ["SEO", "CRO", "UX", "ADS", "CDN", "A/B"];
  return (
    <div className="grid grid-cols-3 gap-[10px]">
      {items.map((t) => (
        <div key={t} className="grid h-[62px] place-items-center rounded-[12px] bg-[#f5f5f7] text-[12px] font-[500] text-[#1d1d1f]/75">
          {t}
        </div>
      ))}
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="band scroll-mt-[60px] py-[64px] md:py-[96px]">
      <div className="mx-auto w-[var(--width-content-width)]">
        <SectionHeader
          tag="Services"
          title={<>Services That<br /> Drive Results</>}
          desc="We offer a full suite of digital services to help your brand stand out online."
        />

        <div className="mt-[40px] grid gap-[16px] md:mt-[52px] md:grid-cols-2">
          <FadeBlur>
            <div className="card flex h-full flex-col justify-between rounded-[18px] p-[26px] md:p-[32px]">
              <div>
                <h3 className="text-[24px] font-[600] tracking-[-0.018em] text-[#1d1d1f]">Web Development</h3>
                <p className="mt-[8px] max-w-[420px] text-[15px] leading-[1.55] text-[#6e6e73]">
                  Custom-built websites that are fast, responsive, and designed to convert.
                </p>
              </div>
              <div className="mt-[26px] space-y-[2px]">
                {[
                  { label: "Discovery & Strategy", detail: "Day 1-3" },
                  { label: "Design & Prototype", detail: "Day 4-7" },
                  { label: "Development & Launch", detail: "Day 8-14" },
                ].map((s, i) => (
                  <div key={s.label} className="flex items-center gap-[14px] rounded-[10px] bg-[#f5f5f7] px-[14px] py-[13px]">
                    <div className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#0071e3] text-[11px] font-[600] text-white">{i + 1}</div>
                    <div className="flex-1 text-[14px] font-[500] text-[#1d1d1f]">{s.label}</div>
                    <div className="text-[12.5px] text-[#86868b]">{s.detail}</div>
                  </div>
                ))}
              </div>
              <div className="mt-[16px] flex items-center justify-end">
                <span className="inline-flex items-center gap-[7px] rounded-[980px] bg-[#e8f5e9] px-[12px] py-[6px] text-[12px] font-[500] text-[#1d7a3c]">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#34c759]" /> Live
                </span>
              </div>
            </div>
          </FadeBlur>

          <FadeBlur delay={0.08}>
            <div className="card flex h-full flex-col justify-between rounded-[18px] p-[26px] md:p-[32px]">
              <div>
                <h3 className="text-[24px] font-[600] tracking-[-0.018em] text-[#1d1d1f]">SEO Optimization</h3>
                <p className="mt-[8px] max-w-[420px] text-[15px] leading-[1.55] text-[#6e6e73]">
                  We optimize your website to rank higher on search engines and drive organic traffic.
                </p>
              </div>
              <div className="mt-[26px]">
                <BarChart />
              </div>
            </div>
          </FadeBlur>

          <FadeBlur delay={0.14}>
            <div className="card col-span-full rounded-[18px] p-[26px] md:p-[32px]">
              <div className="grid items-center gap-[24px] md:grid-cols-[1.2fr_1fr]">
                <div>
                  <h3 className="text-[24px] font-[600] tracking-[-0.018em] text-[#1d1d1f]">Branding</h3>
                  <p className="mt-[8px] max-w-[460px] text-[15px] leading-[1.55] text-[#6e6e73]">
                    Build a memorable brand identity that resonates with your audience.
                  </p>
                  <div className="mt-[18px]">
                    <SecondaryBtn small href="#contact">Brand audit</SecondaryBtn>
                  </div>
                </div>
                <OrbitIcons />
              </div>
            </div>
          </FadeBlur>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-[60px] py-[64px] md:py-[96px]">
      <div className="mx-auto w-[var(--width-content-width)]">
        <div className="flex flex-col gap-[10px] md:flex-row md:items-end md:justify-between">
          <SectionHeader align="left" tag="Work" title="Work We’re Proud Of" desc="A selection of projects we’ve crafted for clients across industries." />
        </div>

        <div className="no-scrollbar mt-[34px] flex snap-x snap-mandatory gap-[16px] overflow-x-auto pb-[6px] md:mt-[44px]">
          {workItems.map((w, i) => (
            <FadeBlur key={w.title} delay={i * 0.06}>
              <div className="card group w-[84vw] snap-start overflow-hidden rounded-[18px] sm:w-[420px] lg:w-[440px]">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f5f5f7]">
                  <img src={w.img} alt={w.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
                </div>
                <div className="flex items-center justify-between gap-[12px] p-[18px]">
                  <div>
                    <div className="text-[13px] text-[#86868b]">{w.cat}</div>
                    <div className="mt-[2px] text-[19px] font-[600] tracking-[-0.015em] text-[#1d1d1f]">{w.title}</div>
                  </div>
                  <div className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border border-black/[0.08] text-[#0071e3] transition group-hover:bg-[#f5f5f7]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </div>
                </div>
              </div>
            </FadeBlur>
          ))}
        </div>

        <div className="mt-[22px] flex items-center justify-center gap-[7px]">
          {[0, 1, 2].map((i) => (
            <div key={i} className={cn("h-[7px] rounded-full transition-all", i === 0 ? "w-[26px] bg-[#1d1d1f]" : "w-[7px] bg-[#d2d2d7]")} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromiseSection() {
  const items = [
    { icon: "◱", title: "Responsive Design", desc: "Pixel-perfect websites that look stunning on every screen size and device." },
    { icon: "◷", title: "Fast Turnaround", desc: "From concept to launch in record time without sacrificing quality." },
    { icon: "⛨", title: "Secure Hosting", desc: "Enterprise-grade security and 99.9% uptime for your website." },
  ];
  return (
    <section id="promise" className="band scroll-mt-[60px] py-[64px] md:py-[96px]">
      <div className="mx-auto w-[var(--width-content-width)]">
        <SectionHeader tag="Why NSpace" title="Why Brands Choose NSpace" desc="We deliver results that speak for themselves." />
        <div className="mt-[36px] grid gap-[16px] md:mt-[48px] md:grid-cols-3">
          {items.map((it, i) => (
            <FadeBlur key={it.title} delay={i * 0.06}>
              <div className="card h-full rounded-[18px] p-[26px]">
                <div className="grid h-[42px] w-[42px] place-items-center rounded-[12px] bg-[#f5f5f7] text-[18px] text-[#0071e3]">{it.icon}</div>
                <h3 className="mt-[16px] text-[19px] font-[600] tracking-[-0.015em] text-[#1d1d1f]">{it.title}</h3>
                <p className="mt-[8px] text-[14.5px] leading-[1.55] text-[#6e6e73]">{it.desc}</p>
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
    <section id="testimonials" className="py-[64px] md:py-[92px]">
      <div className="mx-auto w-[var(--width-content-width)]">
        <div className="mx-auto max-w-[880px] text-center">
          <div className="text-[15px] tracking-[3px] text-[#1d1d1f]">★★★★★</div>
          <FadeBlur delay={0.05}>
            <p className="mt-[18px] text-[26px] font-[600] leading-[1.3] tracking-[-0.02em] text-[#1d1d1f] text-balance sm:text-[32px] md:text-[38px]">
              “They rebuilt our storefront and gave us a{" "}
              <span className="text-[#0071e3]">stunning website</span>
              {" "}that finally converts.”
            </p>
          </FadeBlur>
          <p className="mt-[16px] text-[14px] text-[#6e6e73]">— Maria Santos, CEO at Luxuria Travel</p>
          <div className="mt-[26px] flex items-center justify-center gap-[10px]">
            <div className="flex">
              {[
                "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-1.webp",
                "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-2.webp",
                "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-3.webp",
              ].map((u, i) => (
                <img key={i} src={u} alt="" className="h-[34px] w-[34px] rounded-full border-2 border-white object-cover -ml-[9px] first:ml-0" />
              ))}
            </div>
            <span className="text-[12.5px] text-[#6e6e73]">+ 118 happy clients</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="band py-[64px] md:py-[96px]">
      <div className="mx-auto w-[var(--width-content-width)]">
        <SectionHeader tag="Outcomes" title="Ship beautiful. Ship fast." desc="Engineering culture baked into design. Measured outcomes from day one." />
        <div className="mt-[36px] grid gap-[16px] md:mt-[48px] md:grid-cols-3">
          {metrics.map((m, i) => (
            <FadeBlur key={m.title} delay={i * 0.06}>
              <div className="card flex h-full flex-col rounded-[18px] p-[26px] md:p-[30px]">
                <div className="text-[48px] font-[600] leading-none tracking-[-0.03em] text-[#1d1d1f] md:text-[56px]">{m.value}</div>
                <div className="mt-[8px] text-[16px] font-[500] text-[#1d1d1f]">{m.title}</div>
                <div className="mt-[20px] space-y-[12px] border-t border-black/[0.07] pt-[18px]">
                  {m.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-[10px] text-[13.5px] text-[#6e6e73]">
                      <span className="mt-[1px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[#0071e3]">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4"><path d="M20 6L9 17l-5-5" /></svg>
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
  return (
    <section id="team" className="scroll-mt-[60px] py-[64px] md:py-[96px]">
      <div className="mx-auto w-[var(--width-content-width)]">
        <div className="flex flex-col gap-[10px] md:flex-row md:items-end md:justify-between">
          <div className="max-w-[620px]">
            <Pill>Team</Pill>
            <h2 className="mt-[14px] text-[32px] font-[600] leading-[1.08] tracking-[-0.022em] text-[#1d1d1f] sm:text-[40px] md:text-[46px]">
              Operators, not vendors.
            </h2>
            <p className="mt-[12px] max-w-[520px] text-[15.5px] leading-[1.55] text-[#6e6e73]">
              A tight senior squad. Designers who code. Engineers who care about pixels. No junior rotations.
            </p>
          </div>
          <a href="#contact" className="text-[15px] font-[500] text-[#0066cc] hover:underline">Meet us</a>
        </div>

        <div className="mt-[34px] grid grid-cols-2 gap-[14px] md:mt-[44px] lg:grid-cols-4 lg:gap-[18px]">
          {team.map((m, i) => (
            <FadeBlur key={m.name} delay={i * 0.05}>
              <div className="card overflow-hidden rounded-[18px]">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f7]">
                  <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-[14px]">
                  <div className="text-[16px] font-[600] tracking-[-0.01em] text-[#1d1d1f]">{m.name}</div>
                  <div className="text-[13px] text-[#86868b]">{m.role}</div>
                  <div className="mt-[10px] flex items-center justify-between">
                    <span className="text-[11.5px] text-[#86868b]">{m.focus}</span>
                    <span className="inline-flex items-center gap-[5px] rounded-[980px] bg-[#f5f5f7] px-[8px] py-[3px] text-[10.5px] font-[500] text-[#1d7a3c]">
                      <span className="h-[5px] w-[5px] rounded-full bg-[#34c759]" /> Available
                    </span>
                  </div>
                </div>
              </div>
            </FadeBlur>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="band py-[64px] md:py-[92px]">
      <div className="mx-auto grid w-[var(--width-content-width)] gap-[32px] lg:grid-cols-12 lg:gap-[44px]">
        <div className="lg:col-span-5">
          <Pill>FAQ</Pill>
          <h2 className="mt-[14px] text-[32px] font-[600] leading-[1.08] tracking-[-0.022em] text-[#1d1d1f] sm:text-[38px] md:text-[44px]">
            Questions,<br />straight answers.
          </h2>
          <p className="mt-[14px] max-w-[420px] text-[15px] leading-[1.55] text-[#6e6e73]">
            Transparent pricing, clear timelines, and senior hands on every project. If it’s not here, just ask.
          </p>
          <a href="#contact" className="mt-[18px] inline-block text-[15px] font-[500] text-[#0066cc] hover:underline">Start a project</a>
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-[10px]">
            {faqs.map((f, i) => {
              const open = openIdx === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-[14px] border border-black/[0.07] bg-white">
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="flex min-h-[56px] w-full items-center justify-between gap-[16px] px-[18px] py-[16px] text-left"
                    aria-expanded={open}
                  >
                    <span className="text-[16px] font-[500] tracking-[-0.01em] text-[#1d1d1f]">{f.q}</span>
                    <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[#f5f5f7] text-[#0071e3] transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "none" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="m6 9 6 6 6-6" /></svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-black/[0.06] px-[18px] pb-[18px] pt-[14px] text-[14.5px] leading-[1.6] text-[#6e6e73]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="scroll-mt-[60px] bg-white py-[64px] md:py-[96px]">
      <div className="mx-auto w-[var(--width-content-width)]">
        <div className="card overflow-hidden rounded-[22px] p-[26px] md:p-[44px]">
          <div className="grid items-center gap-[32px] lg:grid-cols-12 lg:gap-[44px]">
            <div className="lg:col-span-7">
              <Pill>Start a project</Pill>
              <h2 className="mt-[14px] text-[30px] font-[600] leading-[1.08] tracking-[-0.022em] text-[#1d1d1f] sm:text-[38px] md:text-[44px]">
                Tell us what you’re building.
              </h2>
              <p className="mt-[12px] max-w-[520px] text-[15.5px] leading-[1.55] text-[#6e6e73]">
                We’ll reply in 6 hours with scope, timeline, and a lean proposal. Sprint starts next Monday.
              </p>

              <form
                className="mt-[24px] grid max-w-[610px] gap-[10px] sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const body = `Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\n\n${fd.get("brief")}`;
                  window.location.href = `mailto:hello@nspace.studio?subject=${encodeURIComponent("New project brief")}&body=${encodeURIComponent(body)}`;
                  setSent(true);
                }}
              >
                <input name="name" required placeholder="Your name" className="ios-input h-[48px] px-[14px] text-[15px] placeholder:text-[15px]" />
                <input name="email" type="email" required placeholder="Email" className="ios-input h-[48px] px-[14px] text-[15px] placeholder:text-[15px]" />
                <textarea name="brief" required placeholder="Project in 1–2 sentences…" className="ios-input h-[110px] resize-none px-[14px] pt-[12px] text-[15px] placeholder:text-[15px] sm:col-span-2" />
                <div className="flex flex-wrap items-center gap-[12px] pt-[4px] sm:col-span-2">
                  <PrimaryBtn type="submit">Send brief</PrimaryBtn>
                  <span className="text-[13px] text-[#86868b]">
                    or email <a href="mailto:hello@nspace.studio" className="text-[#0066cc] hover:underline">hello@nspace.studio</a>
                  </span>
                </div>
                {sent && (
                  <p className="text-[13px] text-[#1d7a3c] sm:col-span-2">
                    Your mail app should be open with the brief ready to send.
                  </p>
                )}
              </form>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-[10px]">
                {[
                  { k: "< 6h", v: "Avg response" },
                  { k: "14d", v: "Launch MVP" },
                  { k: "98+", v: "Lighthouse" },
                  { k: "120+", v: "Ships" },
                ].map((x) => (
                  <div key={x.k} className="rounded-[14px] border border-black/[0.06] bg-[#f5f5f7] p-[16px]">
                    <div className="text-[24px] font-[600] tracking-[-0.02em] text-[#1d1d1f]">{x.k}</div>
                    <div className="text-[12.5px] text-[#6e6e73]">{x.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-[10px] rounded-[14px] border border-black/[0.06] bg-[#f5f5f7] p-[16px] text-[13.5px] leading-[1.6] text-[#6e6e73]">
                “Fastest agency partner we’ve ever worked with. They shipped a better homepage in 9 days than 3 months of internal sprints.”
                <br />
                <span className="text-[#1d1d1f]">— CTO, Mailflow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { head: "Studio", links: ["Services", "Work", "Team", "Careers"] },
    { head: "Resource", links: ["Blog", "Playbook", "Changelog", "Brand"] },
    { head: "Social", links: ["Twitter", "LinkedIn", "Dribbble", "Instagram"] },
    { head: "Legal", links: ["Privacy", "Terms", "Cookies", "Security"] },
  ];
  return (
    <footer className="band overflow-hidden border-t border-black/[0.08] pb-[40px] pt-[46px]">
      <div className="mx-auto w-[var(--width-content-width)]">
        <div className="grid gap-[32px] md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-[8px]">
              <span className="grid h-[24px] w-[24px] place-items-center rounded-[6px] bg-[#1d1d1f] text-[12px] font-[700] text-white">N</span>
              <span className="text-[15px] font-[600] text-[#1d1d1f]">NSpace</span>
            </div>
            <p className="mt-[12px] max-w-[340px] text-[12.5px] leading-[1.6] text-[#6e6e73]">
              Award-winning digital agency crafting high-converting websites, brands, and product interfaces.
            </p>
            <div className="mt-[14px] text-[12px] text-[#86868b]">© {new Date().getFullYear()} NSpace Studio — San Francisco • Paris • Remote</div>
          </div>

          <div className="grid grid-cols-2 gap-[26px] md:col-span-7 sm:grid-cols-4">
            {cols.map((col) => (
              <div key={col.head}>
                <div className="mb-[10px] text-[11.5px] font-[600] text-[#1d1d1f]">{col.head}</div>
                <div className="space-y-[8px]">
                  {col.links.map((l) => (
                    <a key={l} href="#" className="block text-[12px] text-[#6e6e73] transition hover:text-[#1d1d1f]">{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[34px] flex flex-col items-center justify-between gap-[12px] border-t border-black/[0.08] pt-[18px] text-[12px] text-[#86868b] md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-[6px] text-center">
            Made with care • Global delivery • 🇺🇸 🇫🇷 🇯🇵
          </div>
          <div className="flex items-center gap-[18px]">
            <a href="mailto:hello@nspace.studio" className="hover:text-[#1d1d1f]">hello@nspace.studio</a>
            <span className="hidden sm:inline">ISO-27001 ready</span>
          </div>
        </div>

        <div className="pointer-events-none mt-[22px] select-none text-center text-[17vw] font-[600] leading-[0.85] tracking-[-0.045em] text-black/[0.035] md:text-[12vw]">
          NSPACE
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-white text-[#1d1d1f]">
      <Navbar />
      <main className="relative z-10">
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
  );
}
