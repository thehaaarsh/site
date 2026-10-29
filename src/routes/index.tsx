import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Cursor } from "@/components/Cursor";
import { VideoCard, VideoModal } from "@/components/VideoCard";
import { categories, work, type Category, type WorkItem } from "@/data/work";

// Contact form submissions are emailed to this address via FormSubmit (no server needed).
// The first submission triggers a one-time activation email to this inbox.
const CONTACT_EMAIL = "hello@signaturestudio.com";
// Temporary WhatsApp number — replace 919999999999 with your real number (country code, no +).
const WHATSAPP = "https://wa.me/918630148127?text=" + encodeURIComponent("Hi Signature Studio, I'd like to schedule a meeting.");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Signature Studio — Content & Editing That Grabs Attention" },
      { name: "description", content: "Creative content agency crafting UGC, commercial ads, reels, AI content, motion graphics, real estate films and startup campaigns." },
      { property: "og:title", content: "Signature Studio — Creative Content Agency" },
      { property: "og:description", content: "Scroll-stopping content and premium editing for brands that want to be seen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

const nav = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
  ["Contact", "#contact"],
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 30);
    addEventListener("scroll", f);
    return () => removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b bg-background/80 backdrop-blur-xl" : ""}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#top" aria-label="Signature Studio home">
          <img src="/brand/logo-horizontal.webp" alt="Signature Studio" className="h-10 w-auto md:h-12" />
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          {nav.map(([l, h]) => (
            <a key={h} href={h} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-105 sm:inline-flex">
            Book a Call <ArrowUpRight className="h-4 w-4" />
          </a>
          <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t bg-background px-6 py-6 md:hidden">
          {nav.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl font-bold">{l}</a>
          ))}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="mt-4 inline-flex rounded-full bg-gradient-primary px-6 py-3 font-bold text-primary-foreground">Book a Call</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="pointer-events-none absolute -right-40 top-10 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[140px]" />
      <img src="/brand/mark.png" alt="" aria-hidden className="pointer-events-none absolute right-[6%] top-1/2 hidden w-[26vw] max-w-[380px] -translate-y-1/2 opacity-90 animate-float lg:block" />
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <p className="reveal mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" /> Rec · Creative Content Studio
        </p>
        <h1 className="reveal text-[13vw] font-extrabold leading-[0.88] md:text-[8.5vw] lg:text-[7.5rem]">
          Content that<br />
          <span className="text-gradient">stops the scroll.</span>
        </h1>
        <p className="reveal mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
          We script, shoot and edit attention-grabbing content — from UGC and reels to cinematic ads — cut with the rhythm that keeps people watching.
        </p>
        <div className="reveal mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 font-bold text-primary-foreground shadow-glow transition hover:scale-105">
            Start Your Project <ArrowUpRight className="h-5 w-5" />
          </a>
          <a href="#work" className="inline-flex items-center gap-2 rounded-full border px-8 py-4 font-bold transition hover:border-primary hover:text-primary">
            See Our Work
          </a>
        </div>
        <div className="reveal mt-20 grid max-w-3xl grid-cols-3 overflow-hidden rounded-2xl border bg-card/40 backdrop-blur">
          {([["500+", "Videos edited"], ["120M+", "Organic views"], ["80+", "Brands & founders"]] as const).map(([n, l], i) => (
            <div key={l} className={`group relative px-5 py-6 transition hover:bg-primary/5 md:px-8 ${i > 0 ? "border-l" : ""}`}>
              <span className="absolute left-0 top-0 h-0.5 w-0 bg-gradient-primary transition-all duration-500 group-hover:w-full" />
              <p className="font-display text-3xl font-bold md:text-4xl">{n.replace(/[+M]+$/, "")}<span className="text-primary">{n.match(/[+M]+$/)?.[0]}</span></p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...categories, ...categories];
  return (
    <div className="overflow-hidden border-y bg-card py-6">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {items.map((c, i) => (
          <span key={i} className={`font-display text-3xl font-bold md:text-5xl ${i % 2 ? "text-outline" : ""}`}>
            {c} <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Work() {
  const [active, setActive] = useState<Category | "All">("All");
  const [open, setOpen] = useState<WorkItem | null>(null);
  const list = useMemo(() => (active === "All" ? work : work.filter((w) => w.category === active)), [active]);
  const horizontal = list.filter((w) => !w.vertical);
  const vertical = list.filter((w) => w.vertical);

  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-28">
      <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Selected Work</p>
          <h2 className="mt-3 text-5xl font-extrabold md:text-7xl">The reel.</h2>
        </div>
        <p className="max-w-sm text-muted-foreground">Hover to preview. Tap the speaker for sound, or click to watch full screen.</p>
      </div>
      <div className="reveal mt-10 flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${active === c ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:border-primary hover:text-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>
      {horizontal.length > 0 && (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {horizontal.map((w, i) => <VideoCard key={w.title + i} item={w} onOpen={setOpen} />)}
        </div>
      )}
      {vertical.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {vertical.map((w, i) => <VideoCard key={w.title + i} item={w} onOpen={setOpen} />)}
        </div>
      )}
      <VideoModal item={open} onClose={() => setOpen(null)} />
    </section>
  );
}

const services = [
  ["UGC Videos", "Authentic creator-style content that builds trust and converts."],
  ["Commercial Ads", "Cinematic brand films and performance ads that sell."],
  ["Social Media & Reels", "Hook-first short-form edits engineered for the algorithm."],
  ["AI Content", "AI-generated visuals, avatars and worlds — impossible made easy."],
  ["Motion Graphics", "Explainers, kinetic type and logo animations with polish."],
  ["Real Estate", "Property tours and drone films that make listings move fast."],
  ["Startup Campaigns", "Launch films and pitch stories that get founders noticed."],
  ["Personal Branding", "We turn founders into recognisable voices with content people follow."],
  ["Performance Marketing", "Ad creatives, testing and paid strategy built to lower your cost per sale."],
];

function Services() {
  return (
    <section id="services" className="border-t bg-card/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="reveal text-sm font-semibold uppercase tracking-[0.25em] text-primary">What we do</p>
        <h2 className="reveal mt-3 max-w-3xl text-5xl font-extrabold md:text-6xl">Quality content. <span className="text-outline">Editing that hooks.</span></h2>
        <p className="reveal mt-5 max-w-2xl text-muted-foreground">Editing is our signature, but we go further: personal branding, performance marketing and growth content that helps founders and brands get seen, trusted and chosen.</p>
        <div className="mt-14 divide-y border-y">
          {services.map(([t, d], i) => (
            <a key={t} href="#work" className="reveal group flex items-center gap-6 py-7 transition-all hover:px-4">
              <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
              <h3 className="flex-1 text-2xl font-bold transition group-hover:text-primary md:text-4xl">{t}</h3>
              <p className="hidden max-w-sm text-muted-foreground md:block">{d}</p>
              <ArrowUpRight className="h-6 w-6 text-muted-foreground transition group-hover:rotate-45 group-hover:text-primary" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["Concept", "We find the hook — research, scripting and storyboard."],
    ["Capture", "Shoot, source creators or generate with AI."],
    ["Cut", "Pacing, sound design, color and captions that keep eyes glued."],
    ["Launch", "Platform-ready exports, variations and fast revisions."],
  ];
  return (
    <section id="process" className="mx-auto max-w-7xl px-6 py-28">
      <h2 className="reveal text-5xl font-extrabold md:text-6xl">How we <span className="text-gradient">roll.</span></h2>
      <div className="mt-14 grid gap-6 md:grid-cols-4">
        {steps.map(([t, d], i) => (
          <div key={t} className="reveal rounded-2xl border bg-card p-7 transition hover:-translate-y-1 hover:border-primary/60" style={{ transitionDelay: `${i * 80}ms` }}>
            <p className="font-display text-5xl font-extrabold text-outline">0{i + 1}</p>
            <h3 className="mt-6 text-2xl font-bold">{t}</h3>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  const field = "w-full rounded-xl border bg-background px-4 py-3.5 outline-none transition focus:border-primary";
  return (
    <section id="contact" className="relative overflow-hidden border-t py-28">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2">
        <div className="reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Let's talk</p>
          <h2 className="mt-3 text-5xl font-extrabold leading-[0.95] md:text-7xl">Got a brand?<br /><span className="text-gradient">Let's make it loud.</span></h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">Tell us about your project and we'll get back with ideas.</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-8 inline-block font-display text-2xl font-bold underline decoration-primary underline-offset-8">{CONTACT_EMAIL}</a>
        </div>
        <form onSubmit={submit} className="reveal space-y-4 rounded-3xl border bg-card p-8">
          <input type="hidden" name="_subject" value="New project enquiry — Signature Studio" />
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input required name="name" placeholder="Your name" maxLength={100} className={field} />
            <input required type="email" name="email" placeholder="Email" maxLength={200} className={field} />
          </div>
          <input name="company" placeholder="Brand / company" maxLength={100} className={field} />
          <select name="service" defaultValue="" required className={field}>
            <option value="" disabled>What do you need?</option>
            {["Video Editing & Content", "Commercial Ads", "AI Content", "Personal Branding", "Performance Marketing", "Founder / Startup Growth"].map((c) => <option key={c}>{c}</option>)}
            <option>Something else</option>
          </select>
          <textarea required name="message" rows={5} placeholder="Tell us about your project" maxLength={2000} className={field} />
          <button disabled={status === "sending"} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-4 font-bold text-primary-foreground shadow-glow transition hover:scale-[1.02] disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Send Message"} <ArrowUpRight className="h-5 w-5" />
          </button>
          {status === "sent" && <p className="text-center text-sm text-primary">Thanks! We'll be in touch shortly.</p>}
          {status === "error" && <p className="text-center text-sm text-destructive">Something went wrong. Please email us directly.</p>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-primary/30 bg-primary/10 transition group-hover:shadow-glow">
            <img src="/brand/mark.png" alt="" className="h-7 w-7 object-contain" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-extrabold tracking-tight">Signature <span className="text-primary">Studio</span></span>
            <span className="block text-xs uppercase tracking-[0.25em] text-muted-foreground">Content that converts</span>
          </span>
        </a>
        <div className="flex gap-6 text-sm text-muted-foreground">
          {["Instagram", "YouTube", "LinkedIn"].map((s) => <a key={s} href="#" className="hover:text-primary">{s}</a>)}
        </div>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Signature Studio</p>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <div className="grain min-h-screen">
      <Cursor />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
