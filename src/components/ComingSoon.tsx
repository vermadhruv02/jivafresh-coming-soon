"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import credits from "@/lib/photoCredits.json";

const MENU = ["Dal Makhani", "Rajma Masala", "Chole Masala", "Veg Khichdi", "Poha", "Upma", "Veg Pulao", "Sambar Mix", "Tadka Dal"];

const RING = [
  { key: "dal-makhani", name: "Dal Makhani" },
  { key: "rajma-masala", name: "Rajma Masala" },
  { key: "chole-masala", name: "Chole Masala" },
  { key: "veg-khichdi", name: "Veg Khichdi" },
  { key: "poha", name: "Poha" },
  { key: "upma", name: "Upma" },
  { key: "veg-pulao", name: "Veg Pulao" },
  { key: "tadka-dal", name: "Tadka Dal" },
];
const TOTAL = RING.length + 1; // ring photos + centre photo

export function ComingSoon() {
  const [loaded, setLoaded] = useState(0);
  const [minDone, setMinDone] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const stage = useRef<HTMLElement>(null);
  const onLoad = () => setLoaded((n) => n + 1);

  // Hide the loader once every photo is in, but never flash it and never hang on a slow network.
  useEffect(() => {
    const min = setTimeout(() => setMinDone(true), 900);
    const max = setTimeout(() => setTimedOut(true), 6000);
    return () => {
      clearTimeout(min);
      clearTimeout(max);
    };
  }, []);
  const ready = (minDone && loaded >= TOTAL) || timedOut;

  const pct = ready ? 100 : Math.round((Math.min(loaded, TOTAL) / TOTAL) * 100);

  // Pointer tilt via CSS variables, so moving the mouse never re-renders React.
  const onMove = (e: React.PointerEvent) => {
    const s = stage.current?.style;
    s?.setProperty("--mx", String((e.clientX / innerWidth) * 2 - 1));
    s?.setProperty("--my", String((e.clientY / innerHeight) * 2 - 1));
  };

  return (
    <>
      <noscript>
        <style>{"#loader{display:none}main .rise{animation-play-state:running}"}</style>
      </noscript>
      <div
        id="loader"
        role="status"
        aria-live="polite"
        className={`fixed inset-0 z-50 grid place-items-center bg-steam transition-[opacity,visibility] duration-700 ${ready ? "invisible opacity-0" : ""}`}
      >
        <div className="flex flex-col items-center">
          <div aria-hidden className="flex h-10 items-end gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="steam-line h-8 w-1.5 rounded-full bg-ink/20" style={{ animationDelay: `${i * 0.35}s` }} />
            ))}
          </div>
          <div aria-hidden className="relative mt-1 h-14 w-28 overflow-hidden rounded-b-full border-4 border-t-0 border-rajma">
            <div className="absolute inset-x-0 bottom-0 bg-haldi transition-[height] duration-500" style={{ height: `${Math.max(pct, 8)}%` }} />
          </div>
          <p className="type-dry mt-6 text-4xl text-rajma">JivaFresh</p>
          <p className="mt-1 text-sm font-medium text-ink-60">
            {ready ? "Ready" : `Garam ho raha hai ${pct}%`}
          </p>
        </div>
      </div>

      <main ref={stage} onPointerMove={onMove} data-ready={ready || undefined} className="grain relative flex min-h-svh flex-col overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="blob absolute -top-40 -left-32 size-[34rem] rounded-full bg-haldi/25 blur-3xl" />
          <div className="blob absolute -right-40 bottom-0 size-[38rem] rounded-full bg-paani/60 blur-3xl [animation-delay:-9s]" />
        </div>

        <header className="rise flex items-center justify-between px-5 pt-5 md:px-10 md:pt-8">
          <p className="type-dry text-2xl tracking-tight text-rajma md:text-3xl">JivaFresh</p>
          <p className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            <span className="relative flex size-2">
              <span className="ping-soft absolute inline-flex size-full rounded-full bg-tadka" />
              <span className="relative inline-flex size-2 rounded-full bg-tadka" />
            </span>
            Coming soon
          </p>
        </header>

        <section className="mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-4 px-5 pt-8 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:gap-8 lg:pt-0">
          <div className="relative z-10 max-w-xl">
            <p className="rise text-sm font-semibold tracking-[0.18em] text-moong uppercase [animation-delay:100ms]">
              jivafresh.com is cooking
            </p>
            <h1 className="rise mt-3 text-[clamp(4.25rem,2rem+9vw,9.5rem)] leading-[0.85] tracking-tight [animation-delay:200ms]">
              <span className="type-dry block">Coming</span>
              <span className={`${ready ? "type-wet" : "type-dry"} block whitespace-nowrap text-rajma [transition-delay:900ms]`}>soon.</span>
            </h1>
            <p className="rise type-wet mt-5 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-tight [animation-delay:300ms]">
              Garam paani daalo, ghar ka swaad.
            </p>
            <p className="rise mt-5 max-w-[46ch] text-lg text-ink-60 [animation-delay:400ms]">
              Ready-to-eat dehydrated Indian meals are on their way. Dal makhani, rajma, chole, khichdi, poha and more. Add hot water,
              wait a few minutes, eat. No added preservatives.
            </p>
          </div>

          <div aria-hidden className="rise stage relative h-[min(60svh,520px)] min-h-[360px] [animation-delay:300ms] lg:h-[min(80svh,760px)]">
            <div className="tilt absolute inset-0">
              <div className="centre absolute top-1/2 left-1/2 overflow-hidden rounded-full border-[6px] border-white shadow-[0_30px_60px_-20px_rgb(90_27_43/0.45)]">
                <Image src="/photos/hero-wet.jpg" alt="" fill priority sizes="320px" className="object-cover" onLoad={onLoad} />
              </div>
              <div className="orbit absolute inset-0">
                {RING.map((p, i) => (
                  <figure
                    key={p.key}
                    className="card absolute top-1/2 left-1/2 overflow-hidden rounded-[22px] bg-rajma shadow-[0_20px_40px_-16px_rgb(30_42_38/0.5)]"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <Image src={`/photos/${p.key}.jpg`} alt="" fill loading="eager" sizes="200px" className="object-cover" onLoad={onLoad} />
                    <figcaption className="type-dry absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-3 pt-8 pb-3 text-lg leading-none text-steam md:text-xl">
                      {p.name}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-6 border-t border-ink/10">
          <div aria-hidden className="overflow-hidden py-4">
            <div className="marquee flex w-max gap-8">
              {[...MENU, ...MENU].map((m, i) => (
                <span key={i} className="type-dry flex items-center gap-8 text-2xl whitespace-nowrap text-ink/80 md:text-3xl">
                  {m}
                  <span className="size-2 rounded-full bg-haldi" />
                </span>
              ))}
            </div>
          </div>
          <p className="sr-only">On the menu: {MENU.join(", ")}.</p>
          <div className="flex flex-col items-center gap-2 px-5 pb-5 text-center text-sm text-ink-60 md:px-10">
            <p>© {new Date().getFullYear()} JivaFresh · jivafresh.com</p>
            <details className="max-w-2xl">
              <summary className="cursor-pointer underline-offset-4 hover:underline">Photo credits</summary>
              <ul className="mt-2 space-y-1 text-xs">
                {credits.map((c) => (
                  <li key={c.key}>
                    <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                      {c.author}
                    </a>
                    , {c.license}, via Wikimedia Commons
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </footer>
      </main>
    </>
  );
}
