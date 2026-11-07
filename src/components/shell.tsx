import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Briefcase, Check, ChevronDown, Code2, Download, Home,
  LayoutGrid, LineChart, Mail, Moon, Palette, ShieldCheck, Smartphone, Star, Sun, Users, X, Zap,
} from "lucide-react";

export const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

const ICONS = {
  Code2, LineChart, Palette, Smartphone, Zap, ShieldCheck, Star, Check, ArrowRight, ArrowUpRight, ChevronDown,
};

export function Icon({ name, size = 20, className, strokeWidth = 2 }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  const Cmp = (ICONS as Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>>)[name] ?? LayoutGrid;
  return <Cmp size={size} className={className} strokeWidth={strokeWidth} />;
}

export const spring = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.9 };
export const softSpring = { type: "spring" as const, stiffness: 260, damping: 30 };

export function SectionHeader({ eyebrow, title, desc, align = "left" }: { eyebrow: string; title: string; desc?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("mb-4", align === "center" && "text-center")}>
      <p className="caption t-label-2 uppercase" style={{ letterSpacing: "0.08em" }}>{eyebrow}</p>
      <h2 className="large-title mt-1.5">{title}</h2>
      {desc && <p className={cn("subhead t-label-2 mt-2", align === "center" && "mx-auto")} style={{ maxWidth: 460 }}>{desc}</p>}
    </div>
  );
}

export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.34)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />
          <div className="absolute inset-x-0 bottom-0 md:inset-0 md:grid md:place-items-center md:p-6 pointer-events-none">
            <motion.div
              className="pointer-events-auto w-full md:max-w-[560px] overflow-hidden"
              style={{
                background: "var(--bg-elevated)",
                borderRadius: "26px 26px 0 0",
                maxHeight: "88dvh",
                boxShadow: "var(--shadow-sheet)",
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
              initial={reduce ? { opacity: 0 } : { y: "100%" }}
              animate={reduce ? { opacity: 1 } : { y: 0 }}
              exit={reduce ? { opacity: 0 } : { y: "100%" }}
              transition={spring}
              drag={reduce ? false : "y"}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, info) => { if (info.offset.y > 90 || info.velocity.y > 550) onClose(); }}
            >
              <div className="md:hidden pt-2.5 pb-1 flex justify-center">
                <span style={{ width: 38, height: 5, borderRadius: 3, background: "var(--fill-2)" }} />
              </div>
              <div className="flex items-center justify-between px-5 pt-3 pb-3">
                <h3 className="title-3">{title}</h3>
                <button onClick={onClose} aria-label="Close" className="tap-44 grid place-items-center rounded-full press" style={{ background: "var(--fill)", width: 32, height: 32 }}>
                  <X size={16} strokeWidth={2.6} />
                </button>
              </div>
              <div className="overflow-y-auto px-5 pb-6" style={{ maxHeight: "78dvh", borderRadius: "26px 26px 0 0" }}>
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  React.useEffect(() => {
    const saved = localStorage.getItem("nspace-theme");
    const initial = saved === "dark" ? "dark" : saved === "light" ? "light" : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("nspace-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="tap-44 grid place-items-center rounded-full press" style={{ background: "var(--fill)", width: 36, height: 36 }}>
      {theme === "dark" ? <Sun size={17} strokeWidth={2.2} /> : <Moon size={17} strokeWidth={2.2} />}
    </button>
  );
}

export const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "services", label: "Services", icon: LayoutGrid },
  { id: "team", label: "Team", icon: Users },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

export function TabBar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <nav
      className="md:hidden fixed inset-x-0 bottom-0 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <div className="mx-2 mb-2 rounded-[24px] overflow-hidden" style={{ background: "var(--glass-strong)", backdropFilter: "blur(28px) saturate(180%)", WebkitBackdropFilter: "blur(28px) saturate(180%)", border: "0.5px solid var(--sep)", boxShadow: "0 10px 30px -14px rgba(0,0,0,0.4)" }}>
        <div className="grid grid-cols-5">
          {tabs.map((t) => {
            const isActive = active === t.id;
            const IconCmp = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => onSelect(t.id)}
                className="relative flex flex-col items-center justify-center gap-1 py-2 press"
                style={{ minHeight: 52 }}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    transition={spring}
                    style={{ position: "absolute", inset: "4px 6px", borderRadius: 16, background: "rgba(0,122,255,0.12)" }}
                  />
                )}
                <IconCmp size={21} strokeWidth={isActive ? 2.5 : 2} style={{ color: isActive ? "var(--blue)" : "var(--label-2)", position: "relative" }} />
                <span className="caption" style={{ color: isActive ? "var(--blue)" : "var(--label-2)", fontWeight: isActive ? 600 : 500, position: "relative" }}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export function InstallBanner({ onInstall, canInstall }: { onInstall: () => void; canInstall: boolean }) {
  const [iosHint, setIosHint] = React.useState(false);
  const isIos = typeof navigator !== "undefined" && /iphone|ipad|ipod/i.test(navigator.userAgent);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, ...softSpring }}
        className="card-glass specular relative mx-4 mt-3 mb-1 flex items-center gap-3 px-4 py-3 md:hidden"
      >
        <span className="grid place-items-center shrink-0" style={{ width: 38, height: 38, borderRadius: 11, background: "var(--label)", color: "var(--bg)" }}>
          <Download size={18} strokeWidth={2.4} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="footnote" style={{ fontWeight: 600 }}>Install NSpace</p>
          <p className="caption t-label-2">Add to your home screen, runs full screen.</p>
        </div>
        <button
          onClick={() => (canInstall ? onInstall() : setIosHint(true))}
          className="chip tap-44"
          style={{ background: "rgba(0,122,255,0.14)", color: "var(--blue)", fontWeight: 700 }}
        >
          Get
        </button>
      </motion.div>

      <Sheet open={iosHint} onClose={() => setIosHint(false)} title="Add to Home Screen">
        <p className="subhead t-label-2">
          {isIos ? "On iPhone or iPad:" : "On your phone:"}
        </p>
        <ol className="mt-3 space-y-3">
          {(isIos
            ? ["Tap the Share button in Safari.", "Scroll down and choose Add to Home Screen.", "Tap Add. NSpace then opens full screen like an app."]
            : ["Open this page in Safari or Chrome.", "Use the browser menu and choose Install app.", "Confirm to add it to your home screen."]
          ).map((s, i) => (
            <li key={s} className="flex gap-3 items-start">
              <span className="grid place-items-center shrink-0 caption" style={{ width: 24, height: 24, borderRadius: 12, background: "var(--fill)", fontWeight: 700 }}>{i + 1}</span>
              <span className="subhead">{s}</span>
            </li>
          ))}
        </ol>
      </Sheet>
    </>
  );
}
