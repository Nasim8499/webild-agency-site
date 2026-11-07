export const brand = {
  name: "NSpace",
  mark: "N",
  tagline: "We build digital experiences.",
  email: "hello@nspace.studio",
  domain: "nspace.studio",
};

export type Project = {
  id: string;
  title: string;
  cat: string;
  img: string;
  year: string;
  client: string;
  body: string[];
  results: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    id: "vitality",
    title: "Vitality Wellness",
    cat: "Health & wellbeing platform",
    img: "https://storage.googleapis.com/webild/default/templates/web-agency-2/projectnew1.webp",
    year: "2025",
    client: "Vitality Group",
    body: [
      "A wellbeing platform serving 40,000 members needed a product surface that felt calm rather than clinical. We rebuilt the onboarding as a guided conversation instead of a form wall.",
      "The design system moved to a soft, layered card model with motion that explains state changes. Every screen answers one question before it asks for anything.",
    ],
    results: ["+240% conversion on trial signup", "Onboarding drop-off cut from 61% to 18%", "98 Lighthouse performance"],
    stack: ["Next.js", "TypeScript", "Tailwind", "Headless CMS"],
  },
  {
    id: "mailflow",
    title: "Mailflow AI",
    cat: "AI-powered email marketing platform",
    img: "https://storage.googleapis.com/webild/default/templates/web-agency-2/projectnew2.webp",
    year: "2025",
    client: "Mailflow",
    body: [
      "Six disconnected tools collapsed into one campaign workspace. We designed the composer around the send button, so every step reads as a single decision.",
      "The AI assistant is quietly present: it suggests, never blocks. Editors keep full control with an inline diff for every generated line.",
    ],
    results: ["3.4x faster campaign assembly", "41% fewer support tickets", "Shipped in 6 weeks"],
    stack: ["React", "Node", "Postgres", "OpenAI"],
  },
  {
    id: "kinetic",
    title: "Kinetic Studios",
    cat: "Motion graphics & visual effects",
    img: "https://storage.googleapis.com/webild/default/templates/web-agency-2/projectnew3.webp",
    year: "2024",
    client: "Kinetic",
    body: [
      "A motion studio needs a portfolio that moves like its reel without loading like one. We built a scroll-linked film wall that streams frames as it needs them.",
      "Case studies open as full-bleed passages with the credits pinned, so clients can scan work and producers can read specs on the same page.",
    ],
    results: ["68% longer session time", "Awarded awwwards honourable mention", "Under 1.2s first paint"],
    stack: ["React", "Motion", "CDN video"],
  },
];

export type Service = {
  id: string;
  title: string;
  short: string;
  icon: string;
  tint: string;
  detail: string[];
  deliverables: string[];
  timeline: string;
};

export const services: Service[] = [
  {
    id: "web",
    title: "Web Development",
    short: "Custom-built websites that are fast, responsive, and designed to convert.",
    icon: "Code2",
    tint: "#007AFF",
    detail: [
      "We build the whole surface: marketing pages, product apps, dashboards and checkout flows. One stack, one design system, no handoff gap between design and engineering.",
      "Everything is measured against a performance budget before launch. If a page cannot hit its numbers, it does not ship.",
    ],
    deliverables: ["Design system in code", "Headless CMS", "Analytics and events", "Staging and preview URLs"],
    timeline: "14-21 days",
  },
  {
    id: "seo",
    title: "SEO Optimization",
    short: "We optimize your website to rank higher on search engines and drive organic traffic.",
    icon: "LineChart",
    tint: "#34C759",
    detail: [
      "Technical SEO first: crawlability, structure, schema, canonical logic and Core Web Vitals. Then content architecture that matches how people actually search.",
      "You get a keyword map tied to funnel stage, not a spreadsheet of vanity terms.",
    ],
    deliverables: ["Technical audit", "Schema markup", "Content architecture", "GA4 and event tracking"],
    timeline: "2-4 weeks",
  },
  {
    id: "brand",
    title: "Branding",
    short: "Build a memorable brand identity that resonates with your audience.",
    icon: "Palette",
    tint: "#AF52DE",
    detail: [
      "Identity work that survives contact with production: type scale, colour system, motion rules, component language. A brand book your team can actually apply.",
      "Includes a brand audit of where you sit today and where the market has moved.",
    ],
    deliverables: ["Logo and marks", "Type and colour system", "Motion guidelines", "Brand audit deck"],
    timeline: "3-5 weeks",
  },
];

export type Member = { name: string; role: string; focus: string; img: string; bio: string };

export const team: Member[] = [
  {
    name: "Elena Voss",
    role: "Creative Director",
    focus: "Brand systems",
    img: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-1.webp",
    bio: "Fifteen years across brand and product, most recently leading identity systems for a listed fintech. Runs the studio's design critique.",
  },
  {
    name: "Mika Chen",
    role: "Lead Engineer",
    focus: "Frontend perf",
    img: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-2.webp",
    bio: "Frontend architecture and performance. Keeps every build inside a 90KB JS budget and every animation at 60fps on a three-year-old phone.",
  },
  {
    name: "Jonah Reyes",
    role: "Product Designer",
    focus: "Interaction design",
    img: "https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/team-3.webp",
    bio: "Prototypes in code before Figma. Specialises in flows that reduce the number of decisions a user has to make.",
  },
  {
    name: "Ava Delgado",
    role: "Growth & SEO",
    focus: "Acquisition",
    img: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=600&auto=format&fit=crop",
    bio: "Technical SEO and lifecycle growth. Has taken three B2B sites from zero to six-figure monthly organic sessions.",
  },
];

export const metrics = [
  { value: "240%", title: "Avg. lift in conversion", bullets: ["Headless builds", "Core Web Vitals 98+", "Conversion-first UX"] },
  { value: "14d", title: "Ship to production", bullets: ["Strategy, design, build", "Weekly client demos", "Staging with analytics"] },
  { value: "98/100", title: "Lighthouse average", bullets: ["Edge rendering", "Image CDN", "Perf budgets enforced"] },
];

export const promiseItems = [
  { icon: "Smartphone", title: "Responsive Design", body: "Pixel-perfect websites that look stunning on every screen size and device." },
  { icon: "Zap", title: "Fast Turnaround", body: "From concept to launch in record time without sacrificing quality." },
  { icon: "ShieldCheck", title: "Secure Hosting", body: "Enterprise-grade security and 99.9% uptime for your website." },
];

export const faqs = [
  { q: "How fast can you launch?", a: "Typical marketing sites ship in 14-21 days. Complex apps in 6-8 weeks. We parallelize design and engineering." },
  { q: "What tech stack do you use?", a: "Next.js / React, TypeScript, Tailwind, headless CMS, Vercel edge. Happy to fit your existing stack." },
  { q: "Do you handle SEO & analytics?", a: "Yes. Technical SEO, content architecture, schema, GA4 / Plausible, server-side events, and experiments baked in." },
  { q: "Can you take over an existing site?", a: "We do audits, incremental rebuilds and migrations with zero downtime. 12 teams trust us with legacy cleanup." },
  { q: "What about post-launch?", a: "Care plans: uptime monitoring, content updates, CRO sprints, and monthly performance reviews." },
];

export const snapshot = [
  { label: "Projects shipped", value: "120+" },
  { label: "Client rating", value: "4.9/5" },
  { label: "Avg. ship time", value: "14 days" },
  { label: "Studio since", value: "2016" },
];

export const quote = {
  stars: 5,
  text: "They rebuilt our marketing site in three weeks and it is genuinely the most stunning website we have shipped. Conversion doubled in the first month.",
  author: "Maria Santos",
  role: "CEO at Luxuria Travel",
  extra: "+ 118 happy clients",
  second: { text: "The only agency that shipped faster than we could review. Zero drama, everything measured.", author: "CTO, Mailflow" },
};
