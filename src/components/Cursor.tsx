import { useEffect, useRef, useState } from "react";

/** Camera-viewfinder cursor: a dot plus framing corners that lag behind and lock onto interactive elements. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "link" | "play">("idle");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, fx = x, fy = y, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, input, textarea, select");
      if (t?.dataset["cursor"]) { setMode("play"); setLabel(t.dataset["cursor"]); }
      else if (t) { setMode("link"); setLabel(""); }
      else { setMode("idle"); setLabel(""); }
    };
    const loop = () => {
      fx += (x - fx) * 0.16; fy += (y - fy) * 0.16;
      if (frame.current) frame.current.style.transform = `translate(${fx}px, ${fy}px)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  const size = mode === "play" ? 96 : mode === "link" ? 56 : 34;

  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[100]">
        <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-all duration-200 ${mode === "play" ? "h-0 w-0" : "h-1.5 w-1.5"}`} />
      </div>
      <div ref={frame} className="pointer-events-none fixed left-0 top-0 z-[99]">
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-300 ease-out"
          style={{ width: size, height: size }}
        >
          {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "left-0 bottom-0 border-l-2 border-b-2", "right-0 bottom-0 border-r-2 border-b-2"].map((c) => (
            <span key={c} className={`absolute h-3 w-3 border-primary ${c}`} />
          ))}
          {mode === "play" && (
            <span className="absolute inset-2 flex items-center justify-center rounded-full bg-primary text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
              {label}
            </span>
          )}
          {mode !== "play" && (
            <span className="absolute -right-3 -top-3 h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
          )}
        </div>
      </div>
    </>
  );
}
