import * as React from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check, Star } from "lucide-react";
import {
  brand, faqs, metrics, projects, promiseItems, quote, services, snapshot, team,
} from "./data";
import { Icon, InstallBanner, SectionHeader, Sheet, TabBar, ThemeToggle, cn, softSpring, spring } from "./components/shell";

type BeforeInstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const NAV_OFFSET = 96;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function NavBar({ onInstall, canInstall }: { onInstall: () => void; canInstall: boolean }) {
  const [compact, setCompact] = React.useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 40], [0, 1]);

  React.useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 safe-top">
      <div className="glass-strong" style={{ borderBottom: "0.5px solid var(--sep)" }}>
        <div className="shell flex items-center justify-between" style={{ height: 52 }}>
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToId("home"); }} className="flex items-center gap-2.5 press tap-44">
            <span className="grid place-items-center" style={{ width: 30, height: 30, borderRadius: 9, background: "var(--label)", color: "var(--bg)", fontWeight: 800, fontSize: 16, letterSpacing: "-0.03em" }}>
              {brand.mark}
            </span>
            <motion.span className="headline" style={{ opacity }}>{brand.name}</motion.span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {["work", "services", "promise", "team", "faq"].map((id) => (
              <button key={id} onClick={() => scrollToId(id)} className="press footnote" style={{ padding: "8px 12px", borderRadius: 10, color: "var(--label-2)", fontWeight: 500, textTransform: "capitalize" }}>
                {id}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!canInstall && (
              <button onClick={onInstall} className="hidden md:inline-flex btn-primary press" style={{ height: 36, fontSize: 14, paddingInline: 16 }}>
                Start a project
              </button>
            )}
            <button onClick={() => scrollToId("contact")} className="md:hidden btn-primary press" style={{ height: 34, fontSize: 14, paddingInline: 14 }}>
              Contact
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {compact && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden" style={{ height: 0 }} />
        )}
      </AnimatePresence>
    </header>
  );
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={14} strokeWidth={0} style={{ fill: "var(--orange)" }} />
      ))}
    </div>
  );
}

function PressCard({ children, className, onClick, label }: { children: React.ReactNode; className?: string; onClick?: () => void; label?: string }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.968 }}
      transition={spring}
      className={cn("card-glass specular relative text-left w-full overflow-hidden press", className)}
      aria-label={label}
    >
      {children}
    </motion.button>
  );
}

function Hero({ onInstall, canInstall }: { onInstall: () => void; canInstall: boolean }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, reduce ? 0 : -28]);
  const scale = useTransform(scrollY, [0, 300], [1, reduce ? 1 : 0.97]);

  return (
    <section id="home" style={{ paddingTop: 76 }}>
      <div className="hero-fade">
        <div className="shell pt-6 pb-2">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={softSpring}>
            <span className="chip">Award-winning agency</span>
            <h1 className="large-title mt-3" style={{ fontSize: "clamp(34px, 9vw, 44px)" }}>
              We build<br />digital experiences.
            </h1>
            <p className="body-text t-label-2 mt-3" style={{ maxWidth: 460 }}>
              Websites, brands and product interfaces. We craft sites that convert visitors into customers, then measure everything.
            </p>
            <div className="mt-5 flex gap-2.5">
              <button onClick={() => scrollToId("contact")} className="btn-primary press flex-1 md:flex-none">
                Start Project
              </button>
              <button onClick={() => scrollToId("work")} className="btn-secondary press flex-1 md:flex-none">
                View Work
              </button>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {team.slice(0, 4).map((m) => (
                  <img key={m.name} src={m.img} alt="" width={28} height={28} style={{ width: 28, height: 28, borderRadius: 999, objectFit: "cover", border: "2px solid var(--bg)" }} loading="lazy" />
                ))}
              </div>
              <div>
                <p className="caption" style={{ fontWeight: 600 }}>Trusted by 120+ founders</p>
                <div className="flex items-center gap-1.5">
                  <Stars />
                  <span className="caption t-label-2">4.9/5 avg.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <InstallBanner onInstall={onInstall} canInstall={canInstall} />

      <motion.div style={{ y, scale }} className="shell mt-4">
        <div className="grid-2 lg:!grid-cols-2">
          {projects.slice(0, 2).map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.07, ...softSpring }}>
              <div className="card overflow-hidden">
                <img src={p.img} alt={p.title} style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover" }} loading="lazy" />
                <div className="p-3">
                  <p className="footnote" style={{ fontWeight: 600 }}>{p.title}</p>
                  <p className="caption t-label-2 mt-0.5">{p.cat}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Snapshot() {
  return (
    <section className="shell mt-7">
      <div className="grid-2">
        {snapshot.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, ...softSpring }}>
            <div className="card p-3.5">
              <p className="title-2" style={{ fontVariantNumeric: "tabular-nums" }}>{s.value}</p>
              <p className="caption t-label-2 mt-0.5">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  const [open, setOpen] = React.useState<string | null>(null);
  const active = services.find((s) => s.id === open) ?? null;

  return (
    <section id="services" className="shell mt-9" style={{ scrollMarginTop: 90 }}>
      <SectionHeader eyebrow="Services" title="What we do" desc="Full stack studio work, senior hands only." />
      <div className="grid-2">
        {services.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, ...softSpring }} className={cn(i === services.length - 1 && services.length % 2 === 1 && "col-span-2 lg:col-span-1")}>
            <PressCard onClick={() => setOpen(s.id)} label={s.title} className="p-3.5 h-full">
              <span className="grid place-items-center" style={{ width: 38, height: 38, borderRadius: 11, background: `${s.tint}1f`, color: s.tint }}>
                <Icon name={s.icon} size={19} />
              </span>
              <p className="headline mt-2.5">{s.title}</p>
              <p className="caption t-label-2 mt-1" style={{ lineHeight: 1.45 }}>{s.short}</p>
              <span className="footnote t-blue mt-2 inline-flex items-center gap-1" style={{ fontWeight: 600 }}>
                Details <Icon name="ArrowRight" size={13} strokeWidth={2.4} />
              </span>
            </PressCard>
          </motion.div>
        ))}
      </div>

      <Sheet open={!!active} onClose={() => setOpen(null)} title={active?.title ?? ""}>
        {active && (
          <div>
            <span className="grid place-items-center" style={{ width: 44, height: 44, borderRadius: 13, background: `${active.tint}1f`, color: active.tint }}>
              <Icon name={active.icon} size={22} />
            </span>
            <p className="subhead t-label-2 mt-3">{active.short}</p>
            {active.detail.map((d) => (
              <p key={d} className="body-text mt-3" style={{ lineHeight: 1.5 }}>{d}</p>
            ))}
            <div className="card mt-4 p-3.5" style={{ background: "var(--bg)" }}>
              <p className="caption t-label-2 uppercase" style={{ letterSpacing: "0.07em" }}>What you get</p>
              <ul className="mt-2 space-y-2">
                {active.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <Check size={15} strokeWidth={2.6} style={{ color: "var(--green)", marginTop: 2 }} />
                    <span className="subhead">{d}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "0.5px solid var(--sep)" }}>
                <span className="footnote t-label-2">Typical timeline</span>
                <span className="footnote" style={{ fontWeight: 600 }}>{active.timeline}</span>
              </div>
            </div>
            <button onClick={() => { setOpen(null); setTimeout(() => scrollToId("contact"), 220); }} className="btn-primary press w-full mt-4">Start a project</button>
          </div>
        )}
      </Sheet>
    </section>
  );
}

function WorkSection() {
  const [open, setOpen] = React.useState<string | null>(null);
  const active = projects.find((p) => p.id === open) ?? null;

  return (
    <section id="work" className="shell mt-9" style={{ scrollMarginTop: 90 }}>
      <SectionHeader eyebrow="Selected work" title="Projects we're proud of" desc="Three recent builds, with the numbers behind them." />
      <div className="grid-2">
        {projects.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, ...softSpring }} className={cn(i === projects.length - 1 && projects.length % 2 === 1 && "col-span-2 lg:col-span-1")}>
            <PressCard onClick={() => setOpen(p.id)} label={p.title} className="overflow-hidden h-full">
              <div className="relative">
                <img src={p.img} alt={p.title} style={{ width: "100%", aspectRatio: i === projects.length - 1 && projects.length % 2 === 1 ? "16 / 9" : "4 / 3", objectFit: "cover" }} loading="lazy" />
                <span className="absolute top-2 right-2 grid place-items-center" style={{ width: 28, height: 28, borderRadius: 999, background: "rgba(255,255,255,0.9)", color: "#111" }}>
                  <Icon name="ArrowUpRight" size={14} strokeWidth={2.6} />
                </span>
              </div>
              <div className="p-3">
                <p className="footnote" style={{ fontWeight: 600 }}>{p.title}</p>
                <p className="caption t-label-2 mt-0.5">{p.cat}</p>
              </div>
            </PressCard>
          </motion.div>
        ))}
      </div>

      <Sheet open={!!active} onClose={() => setOpen(null)} title={active?.title ?? ""}>
        {active && (
          <div>
            <img src={active.img} alt={active.title} style={{ width: "100%", borderRadius: 16, aspectRatio: "16/10", objectFit: "cover" }} loading="lazy" />
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="chip">{active.year}</span>
              {active.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
            <p className="footnote t-label-2 mt-3">{active.cat} · {active.client}</p>
            {active.body.map((b) => <p key={b} className="body-text mt-3" style={{ lineHeight: 1.5 }}>{b}</p>)}
            <div className="card mt-4 p-3.5" style={{ background: "var(--bg)" }}>
              <p className="caption t-label-2 uppercase" style={{ letterSpacing: "0.07em" }}>Results</p>
              <ul className="mt-2 space-y-2">
                {active.results.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <Check size={15} strokeWidth={2.6} style={{ color: "var(--green)", marginTop: 2 }} />
                    <span className="subhead">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Sheet>
    </section>
  );
}

function PromiseSection() {
  return (
    <section id="promise" className="shell mt-9" style={{ scrollMarginTop: 90 }}>
      <SectionHeader eyebrow="Why brands choose NSpace" title="Built to hold up" desc="We deliver results that speak for themselves." />
      <div className="grid-2">
        {promiseItems.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, ...softSpring }} className={cn(i === promiseItems.length - 1 && "col-span-2 lg:col-span-1")}>
            <div className="card p-3.5 h-full">
              <span className="grid place-items-center" style={{ width: 36, height: 36, borderRadius: 10, background: "var(--fill)", color: "var(--label)" }}>
                <Icon name={p.icon} size={18} />
              </span>
              <p className="headline mt-2.5">{p.title}</p>
              <p className="caption t-label-2 mt-1" style={{ lineHeight: 1.45 }}>{p.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="shell mt-9">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={softSpring} className="card-glass specular p-5">
        <Stars n={quote.stars} />
        <p className="title-3 mt-3" style={{ lineHeight: 1.35 }}>
          “{quote.text}”
        </p>
        <div className="flex items-center gap-2.5 mt-4">
          <img src={team[3].img} alt="" width={34} height={34} style={{ width: 34, height: 34, borderRadius: 999, objectFit: "cover" }} loading="lazy" />
          <div>
            <p className="footnote" style={{ fontWeight: 600 }}>{quote.author}</p>
            <p className="caption t-label-2">{quote.role}</p>
          </div>
          <span className="ml-auto caption t-label-2">{quote.extra}</span>
        </div>
      </motion.div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="shell mt-9">
      <SectionHeader eyebrow="Outcomes" title="The numbers" />
      <div className="grid-2">
        {metrics.map((m, i) => (
          <motion.div key={m.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, ...softSpring }} className={cn(i === metrics.length - 1 && "col-span-2 lg:col-span-1")}>
            <div className="card p-4 h-full">
              <p className="title-2" style={{ fontSize: 28, fontVariantNumeric: "tabular-nums" }}>{m.value}</p>
              <p className="footnote mt-0.5" style={{ fontWeight: 600 }}>{m.title}</p>
              <ul className="mt-2.5 space-y-1.5">
                {m.bullets.map((b) => (
                  <li key={b} className="caption t-label-2 flex items-start gap-1.5">
                    <span style={{ width: 5, height: 5, borderRadius: 3, background: "var(--blue)", marginTop: 6, flexShrink: 0 }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TeamSection() {
  const [open, setOpen] = React.useState<string | null>(null);
  const active = team.find((m) => m.name === open) ?? null;

  return (
    <section id="team" className="shell mt-9" style={{ scrollMarginTop: 90 }}>
      <SectionHeader eyebrow="Team" title="Operators, not vendors" desc="A tight senior squad. Designers who code, engineers who care about pixels." />
      <div className="grid-2">
        {team.map((m, i) => (
          <motion.div key={m.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, ...softSpring }}>
            <PressCard onClick={() => setOpen(m.name)} label={`${m.name}, ${m.role}`} className="overflow-hidden h-full">
              <div className="relative">
                <img src={m.img} alt={m.name} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }} loading="lazy" />
                <span className="absolute top-2 left-2 chip" style={{ height: 22, background: "rgba(255,255,255,0.92)", color: "#1d1d1f", fontWeight: 600, fontSize: 10 }}>
                  <span style={{ width: 5, height: 5, borderRadius: 3, background: "var(--green)" }} /> Available
                </span>
              </div>
              <div className="p-3">
                <p className="footnote" style={{ fontWeight: 600 }}>{m.name}</p>
                <p className="caption t-label-2 mt-0.5">{m.role}</p>
              </div>
            </PressCard>
          </motion.div>
        ))}
      </div>

      <Sheet open={!!active} onClose={() => setOpen(null)} title={active?.name ?? ""}>
        {active && (
          <div>
            <img src={active.img} alt={active.name} style={{ width: "100%", borderRadius: 18, aspectRatio: "4/3", objectFit: "cover" }} loading="lazy" />
            <p className="title-3 mt-3">{active.role}</p>
            <p className="caption t-label-2">{active.focus}</p>
            <p className="body-text mt-3" style={{ lineHeight: 1.5 }}>{active.bio}</p>
            <button onClick={() => { setOpen(null); setTimeout(() => scrollToId("contact"), 220); }} className="btn-secondary press w-full mt-4">Work with the team</button>
          </div>
        )}
      </Sheet>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section id="faq" className="shell mt-9" style={{ scrollMarginTop: 90 }}>
      <SectionHeader eyebrow="FAQ" title="Questions, answered" desc="If yours isn't here, just ask." />
      <div className="card overflow-hidden">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="divider-inset">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3.5 press text-left"
                aria-expanded={isOpen}
              >
                <span className="footnote flex-1" style={{ fontWeight: 600 }}>{f.q}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={spring} style={{ color: "var(--label-3)", display: "grid", placeItems: "center" }}>
                  <Icon name="ChevronDown" size={16} strokeWidth={2.6} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="subhead t-label-2 px-4 pb-4" style={{ lineHeight: 1.45 }}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const valid = form.name.trim().length > 1 && /.+@.+\..+/.test(form.email) && form.message.trim().length > 5;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const subject = encodeURIComponent(`New project enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n---\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="shell mt-9" style={{ scrollMarginTop: 90 }}>
      <SectionHeader eyebrow="Contact" title="Start a project" desc="We reply within 6 hours with scope, timeline and a lean proposal." />
      <div className="card-glass specular p-4">
        {sent ? (
          <div className="text-center py-6">
            <span className="grid place-items-center mx-auto" style={{ width: 52, height: 52, borderRadius: 999, background: "rgba(52,199,89,0.16)", color: "var(--green)" }}>
              <Check size={26} strokeWidth={3} />
            </span>
            <p className="title-3 mt-3">Brief ready to send</p>
            <p className="subhead t-label-2 mt-1">Your email app opened with the details filled in. Hit send and we take it from there.</p>
            <button onClick={() => setSent(false)} className="btn-secondary press mt-4">Send another</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label htmlFor="c-name" className="caption t-label-2" style={{ fontWeight: 600 }}>Your name</label>
              <input id="c-name" className="ios-input mt-1" placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="c-email" className="caption t-label-2" style={{ fontWeight: 600 }}>Email</label>
              <input id="c-email" type="email" className="ios-input mt-1" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="c-msg" className="caption t-label-2" style={{ fontWeight: 600 }}>Project brief</label>
              <textarea id="c-msg" rows={4} className="ios-input mt-1" placeholder="Project in 1-2 sentences. What are you building?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            <button type="submit" disabled={!valid} className="btn-primary press w-full" style={{ opacity: valid ? 1 : 0.45 }}>
              Send brief
            </button>
            <p className="caption t-label-3 text-center">
              Or email <a href={`mailto:${brand.email}`} style={{ color: "var(--blue)", fontWeight: 600 }}>{brand.email}</a>
            </p>
          </form>
        )}
      </div>

      <div className="card mt-3 overflow-hidden">
        <div className="divider-inset flex items-center justify-between px-4 py-3" onClick={() => scrollToId("faq")}>
          <span className="subhead">Response time</span>
          <span className="subhead t-label-2">Within 6 hours</span>
        </div>
        <div className="divider-inset flex items-center justify-between px-4 py-3">
          <span className="subhead">Availability</span>
          <span className="subhead" style={{ color: "var(--green)", fontWeight: 600 }}>2 slots this month</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="subhead">Email</span>
          <a href={`mailto:${brand.email}`} className="subhead" style={{ color: "var(--blue)" }}>{brand.email}</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-10" style={{ paddingBottom: "calc(84px + env(safe-area-inset-bottom))" }}>
      <div className="shell">
        <div className="card p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center" style={{ width: 30, height: 30, borderRadius: 9, background: "var(--label)", color: "var(--bg)", fontWeight: 800, fontSize: 16 }}>{brand.mark}</span>
            <div>
              <p className="footnote" style={{ fontWeight: 700 }}>{brand.name}</p>
              <p className="caption t-label-2">Award-winning digital agency</p>
            </div>
          </div>
          <p className="caption t-label-2 mt-3" style={{ lineHeight: 1.5 }}>
            Crafting high-converting websites, brands and product interfaces. Made with care, delivered globally.
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
            {[
              ["Services", "services"], ["Work", "work"], ["Team", "team"], ["FAQ", "faq"],
              ["Contact", "contact"], ["Privacy", "privacy"], ["Terms", "terms"], ["Careers", "contact"],
            ].map(([label, id]) => (
              <button key={label} onClick={() => scrollToId(id)} className="caption t-label-2 text-left press" style={{ paddingBlock: 6 }}>{label}</button>
            ))}
          </div>
          <div className="sep-line my-3" />
          <div className="flex items-center justify-between">
            <p className="caption t-label-3">© 2026 NSpace Studio</p>
            <p className="caption t-label-3">ISO-27001 ready</p>
          </div>
        </div>
        <p className="caption t-label-3 text-center mt-3" style={{ letterSpacing: "0.22em", fontWeight: 700, opacity: 0.5 }}>NSPACE</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = React.useState("home");
  const [installEvent, setInstallEvent] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = React.useState(false);

  React.useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  React.useEffect(() => {
    const sections = ["home", "work", "services", "team", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveTab(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.2, 0.5] }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const install = async () => {
    if (!installEvent) { scrollToId("contact"); return; }
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
    setCanInstall(false);
  };

  return (
    <div className="min-h-dvh">
      <NavBar onInstall={install} canInstall={canInstall} />
      <main>
        <Hero onInstall={install} canInstall={canInstall} />
        <Snapshot />
        <ServicesSection />
        <WorkSection />
        <PromiseSection />
        <TestimonialSection />
        <MetricsSection />
        <TeamSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <TabBar active={activeTab} onSelect={(id) => { scrollToId(id); setActiveTab(id); }} />
    </div>
  );
}
