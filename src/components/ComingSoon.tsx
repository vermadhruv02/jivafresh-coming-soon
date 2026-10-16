"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import credits from "@/lib/photoCredits.json";

// No dish names anywhere until the product range is final.
const TICKER = ["Ghar ka swaad", "100% Jain", "Bina pyaaz-lehsun", "Bina kandmool", "Bas garam paani", "Maa ke haath jaisa", "Menu pak raha hai"];

const PROMISES = ["No onion", "No garlic", "No root vegetables", "100% vegetarian"];

const INSTAGRAM = "https://www.instagram.com/jivafreshofficial/";

// Photo cards alternate with promise cards. Every photo here was checked: no onion, garlic or root veg in frame.
const RING = [
  { photo: "hero-wet" },
  { text: "Bina pyaaz", tone: "bg-haldi text-rajma" },
  { photo: "rajma-masala" },
  { text: "Bina lehsun", tone: "bg-moong text-steam" },
  { photo: "chole-masala" },
  { text: "Bina kandmool", tone: "bg-tadka text-steam" },
  { photo: "veg-khichdi" },
  { text: "Bas garam paani", tone: "bg-paani text-rajma" },
];
const TOTAL = RING.filter((c) => c.photo).length;

const STEPS = [
  { title: "Khol do", body: "Tear open the pack." },
  { title: "Paani daalo", body: "Pour in hot water and give it a stir." },
  { title: "Ruko, phir khao", body: "Cover for a few minutes. Khana taiyaar hai." },
];

function InstagramIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function VegMark() {
  return (
    <span aria-hidden className="inline-grid size-4 shrink-0 place-items-center rounded-[3px] border-2 border-moong bg-white">
      <span className="size-1.5 rounded-full bg-moong" />
    </span>
  );
}

export function ComingSoon() {
  const [loaded, setLoaded] = useState(0);
  const [minDone, setMinDone] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const stage = useRef<HTMLElement>(null);
  // A failed image counts too, so one broken photo never holds the loader until the timeout.
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
            {ready ? "Khana taiyaar hai" : `Garam ho raha hai ${pct}%`}
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
            <p className="rise flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-moong uppercase [animation-delay:100ms]">
              <VegMark />
              100% Jain · Ready-to-eat
            </p>
            <h1 className="rise mt-3 text-[clamp(4.25rem,2rem+9vw,9.5rem)] leading-[0.85] tracking-tight [animation-delay:200ms]">
              <span className="type-dry block">Coming</span>
              <span className={`${ready ? "type-wet" : "type-dry"} block whitespace-nowrap text-rajma [transition-delay:900ms]`}>soon.</span>
            </h1>
            <p className="rise type-wet mt-5 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-tight [animation-delay:300ms]">
              Bas garam paani daalo, aur ghar jaisa khana taiyaar.
            </p>
            <p className="rise mt-5 max-w-[46ch] text-lg text-ink-60 [animation-delay:400ms]">
              JivaFresh is bringing ready-to-eat Jain meals that taste like they came from your own kitchen. Every recipe is cooked
              without onion, garlic or root vegetables, then gently dried to keep the flavour in. Add hot water, wait a few minutes,
              and sit down to a proper home meal.
            </p>
            <ul className="rise mt-6 flex flex-wrap gap-2 [animation-delay:500ms]">
              {PROMISES.map((p) => (
                <li key={p} className="rounded-full border border-moong/25 bg-white/70 px-3.5 py-1 text-sm font-semibold text-moong backdrop-blur">
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="rise mt-8 inline-flex items-center gap-2 rounded-full bg-rajma px-5 py-3 font-semibold text-steam transition-colors [animation-delay:600ms] hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rajma"
            >
              <InstagramIcon />
              Follow @jivafreshofficial<span className="hidden sm:inline"> for launch news</span>
            </a>
          </div>

          <div aria-hidden className="rise stage relative h-[min(60svh,520px)] min-h-[360px] [animation-delay:300ms] lg:h-[min(80svh,760px)]">
            <div className="tilt absolute inset-0">
              <div className="centre absolute top-1/2 left-1/2 grid place-items-center rounded-full border-[6px] border-white bg-rajma text-center text-steam shadow-[0_30px_60px_-20px_rgb(90_27_43/0.45)]">
                <div className="absolute inset-3 rounded-full border-2 border-dashed border-steam/25" />
                <div>
                  <p className="text-[length:calc(var(--c)*0.065)] font-semibold tracking-[0.2em] text-haldi uppercase">100% Jain</p>
                  <p className="type-dry mt-1 text-[length:calc(var(--c)*0.17)] leading-none">JivaFresh</p>
                  <p className="type-wet mt-2 text-[length:calc(var(--c)*0.075)] leading-tight">Ghar ka swaad</p>
                </div>
              </div>
              <div className="orbit absolute inset-0">
                {RING.map((c, i) =>
                  c.photo ? (
                    <figure
                      key={c.photo}
                      className="card absolute top-1/2 left-1/2 overflow-hidden rounded-[22px] bg-rajma shadow-[0_20px_40px_-16px_rgb(30_42_38/0.5)]"
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <Image
                        src={`/photos/${c.photo}.jpg`}
                        alt=""
                        fill
                        loading="eager"
                        sizes="200px"
                        className="object-cover"
                        onLoad={onLoad}
                        onError={onLoad}
                      />
                    </figure>
                  ) : (
                    <div
                      key={c.text}
                      className={`card absolute top-1/2 left-1/2 flex items-end rounded-[22px] p-4 backface-hidden shadow-[0_20px_40px_-16px_rgb(30_42_38/0.5)] ${c.tone}`}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <p className="type-dry text-3xl leading-[0.9] md:text-4xl">{c.text}</p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="how" className="mx-auto w-full max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-moong uppercase">Ghar se door, ghar ka khana</p>
              <h2 id="how" className="type-dry mt-3 text-[clamp(2.5rem,1.5rem+4vw,4.5rem)] leading-[0.9] text-rajma">
                Teen step. Ek ghar jaisa khana.
              </h2>
              <p className="mt-4 max-w-[44ch] text-lg text-ink-60">
                For yatra, hostel, office lunch, a new city or a late night at work. Whenever you miss maa ke haath ka khana, JivaFresh
                fits in your bag.
              </p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className="rounded-[22px] border border-ink/10 bg-white/70 p-6 backdrop-blur">
                  <p aria-hidden className="type-dry text-5xl leading-none text-haldi">0{i + 1}</p>
                  <p className="type-wet mt-4 text-2xl leading-tight text-rajma">{s.title}</p>
                  <p className="mt-1 text-ink-60">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <footer className="border-t border-ink/10">
          <div aria-hidden className="overflow-hidden py-4">
            <div className="marquee flex w-max gap-8">
              {[...TICKER, ...TICKER].map((m, i) => (
                <span key={i} className="type-dry flex items-center gap-8 text-2xl whitespace-nowrap text-ink/80 md:text-3xl">
                  {m}
                  <span className="size-2 rounded-full bg-haldi" />
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 px-5 pb-5 text-center text-sm text-ink-60 md:px-10">
            <p>
              © {new Date().getFullYear()} JivaFresh · Launching soon at jivafresh.com ·{" "}
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                Instagram
              </a>
            </p>
            <details className="max-w-2xl">
              <summary className="cursor-pointer underline-offset-4 hover:underline">Photo credits</summary>
              <p className="mt-2 text-xs">Serving suggestions only.</p>
              <ul className="mt-1 space-y-1 text-xs">
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
