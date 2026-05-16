import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/923340811200"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full pl-4 pr-5 py-3 text-white font-semibold text-sm shadow-glow bg-whatsapp hover:scale-105 transition-transform"
      style={{ background: "var(--whatsapp)" }}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
        <span className="absolute inset-0 rounded-full animate-ping bg-white/20" />
        <MessageCircle className="h-5 w-5" />
      </span>
      WhatsApp
    </a>
  );
}
