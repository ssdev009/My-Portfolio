"use client";

import { useEffect, useState } from "react";
import { Clock, Globe2 } from "lucide-react";
import { siteConfig } from "@/data/site.config";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Current weekday (0-6) and fractional hour in the studio's time zone. */
function studioNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: siteConfig.timezone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return {
    day: WEEKDAYS.indexOf(get("weekday")),
    hour: Number(get("hour")) + Number(get("minute")) / 60,
  };
}

/** Today's working window converted into the visitor's own time zone. */
function localWindow(now: Date) {
  const { utcOffsetHours, hours } = siteConfig;
  const shifted = new Date(now.getTime() + utcOffsetHours * 3_600_000);
  const y = shifted.getUTCFullYear();
  const m = shifted.getUTCMonth();
  const d = shifted.getUTCDate();
  const fmt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
  const start = Date.UTC(y, m, d, hours.start - utcOffsetHours);
  const end = Date.UTC(y, m, d, hours.end - utcOffsetHours);
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

export function AvailabilityCard() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const studio = now ? studioNow(now) : null;
  const online = studio
    ? siteConfig.hours.days.includes(studio.day) &&
      studio.hour >= siteConfig.hours.start &&
      studio.hour < siteConfig.hours.end
    : false;

  const studioTime = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: siteConfig.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }).format(now)
    : "--:--:--";

  const visitorTime = now
    ? new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(now)
    : "--:--";
  const visitorZone = now ? Intl.DateTimeFormat().resolvedOptions().timeZone : "";

  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
          <Clock size={14} aria-hidden="true" />
          Local time · {siteConfig.timezoneLabel}
        </p>
        {now && (
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs",
              online ? "border-success/50 text-success" : "border-magenta/50 text-magenta"
            )}
          >
            <span className={cn("h-2 w-2 rounded-full", online ? "bg-success" : "bg-magenta")} />
            {online ? "Online now" : "Offline now"}
          </span>
        )}
      </div>

      <p
        className="mt-4 font-mono text-4xl font-semibold tabular-nums text-cyan text-glow-cyan sm:text-5xl"
        aria-label={now ? `Studio time ${studioTime}` : "Loading studio time"}
      >
        {studioTime}
      </p>

      <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <dt className="text-muted">Working hours</dt>
          <dd className="text-right">{siteConfig.workingHours}</dd>
        </div>
        {now && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <dt className="inline-flex items-center gap-1.5 text-muted">
                <Globe2 size={14} aria-hidden="true" />
                Your time{visitorZone ? ` (${visitorZone})` : ""}
              </dt>
              <dd className="text-right">{visitorTime}</dd>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <dt className="text-muted">Hours in your time</dt>
              <dd className="text-right">{localWindow(now)}</dd>
            </div>
          </>
        )}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <dt className="text-muted">Typical reply</dt>
          <dd className="text-right">{siteConfig.responseTime}</dd>
        </div>
      </dl>
    </div>
  );
}
