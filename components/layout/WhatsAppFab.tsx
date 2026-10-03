import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site.config";

/** Floating WhatsApp shortcut, visible on every screen size. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success text-bg shadow-[0_0_24px_rgb(var(--c-success)/0.55)] transition-transform hover:scale-110 bottom-[max(1.25rem,env(safe-area-inset-bottom))]"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-success/40" />
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
