import { useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";
import { youtubeId, type WorkItem } from "@/data/work";

function send(iframe: HTMLIFrameElement | null, func: string) {
  iframe?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
}

export function VideoCard({ item, onOpen }: { item: WorkItem; onOpen: (item: WorkItem) => void }) {
  const id = youtubeId(item.url);
  const [hover, setHover] = useState(false);
  const [muted, setMuted] = useState(true);
  const frame = useRef<HTMLIFrameElement>(null);

  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1`;

  return (
    <article
      data-cursor="Play"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setMuted(true); }}
      onClick={() => onOpen(item)}
      className={`group relative overflow-hidden rounded-2xl border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow ${item.vertical ? "aspect-[9/16]" : "aspect-video"}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {hover && (
        <iframe
          ref={frame}
          src={src}
          title={item.title}
          allow="autoplay; encrypted-media"
          className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${item.vertical ? "h-full w-[316%]" : "h-[135%] w-[135%]"}`}
        />
      )}
      <div className="absolute inset-0 bg-fade" />

      <button
        aria-label={muted ? "Turn sound on" : "Mute"}
        onClick={(e) => {
          e.stopPropagation();
          if (!hover) { setHover(true); return; }
          send(frame.current, muted ? "unMute" : "mute");
          setMuted(!muted);
        }}
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-overlay/70 text-foreground backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      {!hover && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
            <Play className="h-5 w-5 fill-current" />
          </span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{item.category}</p>
        <h3 className="mt-1 text-lg font-bold leading-tight">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.client}</p>
      </div>
    </article>
  );
}

export function VideoModal({ item, onClose }: { item: WorkItem | null; onClose: () => void }) {
  if (!item) return null;
  const id = youtubeId(item.url);
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-overlay/90 p-4 backdrop-blur-md animate-in fade-in"
    >
      <button onClick={onClose} className="absolute right-6 top-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary">
        Close ✕
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`overflow-hidden rounded-2xl border shadow-glow animate-in zoom-in-95 ${item.vertical ? "aspect-[9/16] h-[85vh]" : "aspect-video w-full max-w-5xl"}`}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={item.title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
