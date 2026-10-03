"use client";

import { useState } from "react";
import { CalendarCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site.config";
import { cn } from "@/lib/utils";

/** "Book a free call" card with an optional inline calendar (Cal.com / Calendly). */
export function BookingEmbed() {
  const [open, setOpen] = useState(false);
  // No real calendar link set yet: offer WhatsApp scheduling instead of a dead link
  const hasBooking = !!siteConfig.bookingUrl && !siteConfig.bookingUrl.includes("your-link");
  const callLink = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to book a free 30-minute call about my project."
  )}`;

  return (
    <div className="gradient-border rounded-2xl bg-surface p-6 sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span className="rounded-xl border border-line bg-surface2 p-3 text-cyan">
            <CalendarCheck size={26} aria-hidden="true" />
          </span>
          <div>
            <h3 className="!text-2xl">Prefer a call? Book a free 30-minute chat.</h3>
            <p className="mt-2 max-w-xl text-muted">
              {hasBooking ? "Pick any slot that suits you. Times are shown in your own time zone." : "Message me on WhatsApp and we will agree a time that suits your time zone."}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {hasBooking ? (
            <>
              <Button href={siteConfig.bookingUrl}>Pick a time</Button>
              <Button
                variant="secondary"
                aria-expanded={open}
                aria-controls="booking-frame"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? "Hide calendar" : "Open calendar here"}
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={cn("transition-transform", open && "rotate-180")}
                />
              </Button>
            </>
          ) : (
            <Button href={callLink}>
              <MessageCircle size={18} aria-hidden="true" />
              Book on WhatsApp
            </Button>
          )}
        </div>
      </div>

      {hasBooking && open && (
        <div id="booking-frame" className="mt-8 overflow-hidden rounded-xl border border-line bg-white">
          <iframe
            src={siteConfig.bookingUrl}
            title={`Book a call with ${siteConfig.owner}`}
            loading="lazy"
            className="h-[680px] w-full"
          />
        </div>
      )}
    </div>
  );
}
