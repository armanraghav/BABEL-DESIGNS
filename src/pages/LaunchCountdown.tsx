import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE_ISO = "2027-01-01T00:00:00Z";
const TARGET_TIMESTAMP = new Date(TARGET_DATE_ISO).getTime();
const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const PARTICLES = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  top: Math.round(Math.random() * 100),
  left: Math.round(Math.random() * 100),
  delay: Number((Math.random() * 2.4).toFixed(2)),
  duration: Number((3.4 + Math.random() * 2.8).toFixed(2)),
}));

type TimeLeft = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getTimeLeft = (): TimeLeft => {
  const now = Date.now();
  const totalMs = Math.max(TARGET_TIMESTAMP - now, 0);
  const days = Math.floor(totalMs / MILLISECONDS_IN_DAY);
  const hours = Math.floor((totalMs % MILLISECONDS_IN_DAY) / (1000 * 60 * 60));
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

  return { totalMs, days, hours, minutes, seconds };
};

const pad = (value: number) => value.toString().padStart(2, "0");

const CountdownCell = ({ label, value }: { label: string; value: string }) => (
  <div className="relative overflow-hidden border border-foreground/25 bg-background/70 px-4 py-4 sm:px-7 sm:py-6">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-40" />
    <p className="font-mono text-3xl text-foreground sm:text-5xl">{value}</p>
    <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:text-xs">{label}</p>
  </div>
);

const LaunchCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const radialProgress = useMemo(() => {
    if (timeLeft.totalMs <= 0) return 100;
    const totalDays = Math.max(Math.ceil((TARGET_TIMESTAMP - new Date("2026-01-01T00:00:00Z").getTime()) / MILLISECONDS_IN_DAY), 1);
    const remainingDays = Math.ceil(timeLeft.totalMs / MILLISECONDS_IN_DAY);
    const elapsed = Math.min(Math.max(totalDays - remainingDays, 0), totalDays);
    return Math.round((elapsed / totalDays) * 100);
  }, [timeLeft.totalMs]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_20%,hsl(var(--secondary))_0%,transparent_38%),radial-gradient(circle_at_86%_13%,hsl(var(--accent)/0.7)_0%,transparent_34%),linear-gradient(145deg,hsl(var(--background))_0%,hsl(var(--muted))_58%,hsl(var(--background))_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        {PARTICLES.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute h-1 w-1 rounded-full bg-foreground/35"
            style={{ top: `${particle.top}%`, left: `${particle.left}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.25, 0.85, 0.25], scale: [1, 1.5, 1] }}
            transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container-editorial relative z-10 flex min-h-screen items-center px-4 py-10 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full border border-foreground/20 bg-background/65 p-6 shadow-[0_25px_80px_-45px_hsl(var(--foreground)/0.55)] backdrop-blur-sm sm:p-10 lg:p-14"
        >
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.32em] text-muted-foreground">Private Preview Lock</p>
              <h1 className="font-sans text-4xl font-medium uppercase leading-none tracking-[0.12em] text-foreground sm:text-5xl md:text-7xl">
                BABEL DESIGNS
              </h1>
              <p className="mt-4 max-w-2xl font-sans text-sm uppercase tracking-[0.22em] text-muted-foreground sm:text-base sm:tracking-[0.3em]">
                Website relaunch sequence in progress
              </p>
            </div>
            <div className="border border-foreground/20 bg-background/60 px-4 py-3">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Target Launch</p>
              <p className="mt-1 font-sans text-xl uppercase tracking-[0.12em] text-foreground sm:text-2xl">January 1, 2027</p>
              <p className="font-mono text-[11px] text-muted-foreground">00:00 UTC</p>
            </div>
          </div>

          <div className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            <CountdownCell label="Days" value={pad(timeLeft.days)} />
            <CountdownCell label="Hours" value={pad(timeLeft.hours)} />
            <CountdownCell label="Minutes" value={pad(timeLeft.minutes)} />
            <CountdownCell label="Seconds" value={pad(timeLeft.seconds)} />
          </div>

          <div className="grid grid-cols-1 gap-6 border border-foreground/20 bg-background/55 p-5 md:grid-cols-[auto_1fr] md:items-center md:p-6">
            <div
              className="mx-auto h-24 w-24 rounded-full border border-foreground/20 p-[6px]"
              style={{
                background: `conic-gradient(hsl(var(--foreground) / 0.75) ${radialProgress}%, transparent ${radialProgress}% 100%)`,
              }}
            >
              <div className="grid h-full w-full place-items-center rounded-full bg-background/95">
                <span className="font-mono text-sm text-foreground">{radialProgress}%</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground">Progress Marker</p>
              <p className="mt-2 font-sans text-2xl font-light text-foreground sm:text-3xl">The collection experience is temporarily hidden.</p>
              <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground">
                We are refining materials, motion, and narrative. Until launch, every route is intentionally redirected to this countdown page.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LaunchCountdown;
