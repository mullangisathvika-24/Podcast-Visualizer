"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

type SharePlatform = "Pinterest" | "Twitter" | "LinkedIn" | "WhatsApp";

export interface SharePopupProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  url: string;
  disabledPlatforms?: SharePlatform[];
}

const BRAND: Record<SharePlatform, { bg: string; fg: string; hoverBg: string }> = {
  Pinterest: {
    bg: "#E60023",
    fg: "#FFFFFF",
    hoverBg: "#ff1b3a",
  },
  Twitter: {
    bg: "#1D9BF0",
    fg: "#FFFFFF",
    hoverBg: "#35a9ff",
  },
  LinkedIn: {
    bg: "#0A66C2",
    fg: "#FFFFFF",
    hoverBg: "#0b76e0",
  },
  WhatsApp: {
    bg: "#25D366",
    fg: "#FFFFFF",
    hoverBg: "#33e07a",
  },
};

function buildShareLinks({ title, text, url }: { title?: string; text?: string; url: string }) {
  const resolvedTitle = title ?? "";
  const resolvedText = text ?? "";
  const combined = [resolvedTitle, resolvedText].filter(Boolean).join(" - ");

  return {
    Pinterest: `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(combined)}`,
    Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(combined)}&url=${encodeURIComponent(url)}`,
    LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    WhatsApp: `https://api.whatsapp.com/send?text=${encodeURIComponent((combined ? combined + " " : "") + url)}`,
  } satisfies Record<SharePlatform, string>;
}

function PlatformIcon({ platform }: { platform: SharePlatform }) {
  // Keeping simple inline SVGs for zero-dependency rendering.
  switch (platform) {
    case "Pinterest":
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.02 2 11.06c0 3.6 2.28 6.7 5.58 8.02-.08-.7-.15-1.76.03-2.52.17-.68 1.11-4.33 1.11-4.33s-.28-.58-.28-1.44c0-1.35.78-2.36 1.75-2.36.82 0 1.21.6 1.21 1.32 0 .8-.5 2-0.76 3.11-.22.95.46 1.73 1.37 1.73 1.64 0 2.9-1.73 2.9-4.23 0-2.21-1.6-3.76-3.89-3.76-2.64 0-4.19 1.99-4.19 4.04 0 .83.32 1.72.72 2.2.08.1.09.2.07.3-.08.34-.25 1.07-.28 1.2-.05.22-.18.3-.41.18-1.52-.7-2.47-2.92-2.47-4.7 0-3.82 2.77-7.02 7.6-7.02 3.98 0 7.07 2.84 7.07 6.62 0 3.95-2.49 7.13-6 7.13-1.18 0-2.29-.61-2.67-1.33l-.73 2.77c-.26 1.01-.97 2.28-1.44 3.05.06.02.11.03.17.04 0 0 .02 0 .02 0C17.52 22 22 17.98 22 12.94 22 7.9 17.523 2 12 2Z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.9-2.7 1.1C17.9 4.4 16.8 4 15.6 4c-2.2 0-3.8 2.1-3.3 4.2C9 8 6.3 6.6 4.4 4.6c-1 1.7-.5 3.9 1.1 5-.6 0-1.2-.2-1.7-.5 0 1.8 1.3 3.4 3.1 3.7-.5.1-1 .1-1.6 0 .4 1.5 1.9 2.6 3.7 2.6C10 18.6 7 19.3 4 19.1c2 1.3 4.4 2 7 2 8.4 0 13-7.2 13-13.5 0-.2 0-.4 0-.6.8-.6 1.4-1.3 2-2.1Z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 6.5a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4ZM4.5 21.5h4V8.5h-4v13ZM10.5 8.5h3.8v1.8h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6v7.2h-4v-6.4c0-1.5 0-3.5-2.1-3.5s-2.4 1.7-2.4 3.4v6.5h-4V8.5Z" />
        </svg>
      );
    case "WhatsApp":
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.5 3.5A11 11 0 0 0 3.2 17.1L2 22l5.1-1.1A11 11 0 0 0 20.5 3.5ZM12 20.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-2.9.6.7-2.8-.2-.3a8.2 8.2 0 1 1 7.2 4.8Zm4.3-5.8c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1s-.6.7-.7.8-.3.1-.5 0a6.8 6.8 0 0 1-2-1.3c-.8-.7-1.4-1.6-1.5-1.9-.1-.3 0-.4.1-.5l.4-.5c.1-.1.1-.2.2-.3 0-.1 0-.2 0-.3s-.5-1.2-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4c-.1 0-.3.1-.5.3-.2.2-.8.8-.8 2a3.6 3.6 0 0 0 1 2.5c.7.9 1.6 1.8 3.1 2.5 1.4.7 2.6.9 3.4.8.8-.1 1.2-.6 1.4-1.1.2-.5.2-1 .2-1.1 0-.1-.1-.2-.3-.3Z" />
        </svg>
      );
  }
}

export const SharePopup: React.FC<SharePopupProps> = ({
  open,
  onClose,
  title,
  text,
  url,
  disabledPlatforms = [],
}) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const platforms = useMemo<SharePlatform[]>(() => ["Pinterest", "Twitter", "LinkedIn", "WhatsApp"], []);
  const links = useMemo(() => buildShareLinks({ title, text, url }), [title, text, url]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
  }, [open]);

  const isDisabled = (p: SharePlatform) => disabledPlatforms.includes(p);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={!open}
        >
          {/* Overlay */}
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close share popup"
          />

          {/* Modal */}
          <div className="relative h-full w-full flex items-center justify-center px-4 sm:px-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Share this"
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-full max-w-md"
            >
              <div className="rounded-2xl bg-white text-slate-900 shadow-[0_20px_70px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <h3 className="font-extrabold text-base sm:text-lg">Share this</h3>

                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={onClose}
                    className="btn btn-icon rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200"
                    aria-label="Close"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Platform grid */}
                <div className="px-5 pb-5">
                  <div className="grid grid-cols-4 gap-3">
                    {platforms.map((p) => {
                      const b = BRAND[p];
                      const disabled = isDisabled(p);

                      return (
                        <a
                          key={p}
                          href={disabled ? undefined : links[p]}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={p}
                          onClick={(e) => {
                            if (disabled) {
                              e.preventDefault();
                              e.stopPropagation();
                            }
                          }}
                          className={`group inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all border ${
                            disabled
                              ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed pointer-events-none"
                              : "border-transparent text-white shadow-sm"
                          }`}
                          style={disabled ? undefined : { backgroundColor: b.bg }}
                        >

                          <span className="sr-only">{p}</span>
                          <PlatformIcon platform={p} />
                        </a>
                      );
                    })}
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    Tip: you can disable any platform via <code>disabledPlatforms</code>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};