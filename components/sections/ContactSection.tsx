"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Mail,
  MapPin,
  Download,
  ArrowRight,
} from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { getSocialIcon } from "@/components/ui/SocialIcons";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type FormState = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "",
    },
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setFormState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          (json as { error?: string }).error ??
            "Failed to send message. Please try again or reach out directly.",
        );
      }

      setFormState("success");
      reset();
    } catch (err) {
      setFormState("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email directly.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-bg-base relative"
      aria-label="Contact and Inquiries"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C6A76A]" />
            <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
              06 / GET IN TOUCH
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            Start a Conversation
          </h2>
          <p className="mt-2 text-text-secondary max-w-xl text-sm sm:text-base leading-relaxed">
            Interested in working together or have an opportunity to discuss? Send a message
            or reach out directly.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            {formState === "success" ? (
              <div
                className="p-8 sm:p-10 rounded-2xl border border-border-default/80 bg-bg-surface text-center space-y-4"
                role="status"
              >
                <div className="w-12 h-12 rounded-full bg-[#C6A76A]/10 text-[#C6A76A] mx-auto flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Message Sent</h3>
                <p className="text-sm text-text-secondary max-w-md mx-auto">
                  Thank you for reaching out. Your message has been sent to my inbox, and I&apos;ll get back to you shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setFormState("idle")}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C6A76A] hover:underline"
                  >
                    <span>Send another message</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Contact form"
                className="p-6 sm:p-8 rounded-2xl border border-border-default/80 bg-bg-surface space-y-5"
              >
                {/* Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs uppercase tracking-wider text-text-secondary"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                    placeholder="Your name"
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-bg-base text-text-primary placeholder:text-text-tertiary text-sm transition-colors focus:outline-none focus:border-[#C6A76A]",
                      errors.name ? "border-rose-500/80" : "border-border-default",
                    )}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="text-xs text-rose-400 flex items-center gap-1 font-mono pt-0.5"
                      role="alert"
                    >
                      <AlertCircle size={12} />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs uppercase tracking-wider text-text-secondary"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                    placeholder="you@domain.com"
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-bg-base text-text-primary placeholder:text-text-tertiary text-sm transition-colors focus:outline-none focus:border-[#C6A76A]",
                      errors.email ? "border-rose-500/80" : "border-border-default",
                    )}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-xs text-rose-400 flex items-center gap-1 font-mono pt-0.5"
                      role="alert"
                    >
                      <AlertCircle size={12} />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs uppercase tracking-wider text-text-secondary"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message")}
                    placeholder="Tell me about your project or opportunity..."
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-bg-base text-text-primary placeholder:text-text-tertiary text-sm transition-colors focus:outline-none focus:border-[#C6A76A] resize-none",
                      errors.message ? "border-rose-500/80" : "border-border-default",
                    )}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="text-xs text-rose-400 flex items-center gap-1 font-mono pt-0.5"
                      role="alert"
                    >
                      <AlertCircle size={12} />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                  {...register("honeypot")}
                />

                {/* Error Banner */}
                {formState === "error" && (
                  <div
                    className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-950/20 text-xs text-rose-300 flex items-start gap-2"
                    role="alert"
                  >
                    <AlertCircle size={14} className="shrink-0 mt-0.5 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#C6A76A] text-[#0B0B0D] font-medium text-sm hover:bg-[#D4B87D] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {formState === "loading" ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-[#0B0B0D]/30 border-t-[#0B0B0D] animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info Card */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 sm:p-8 rounded-2xl border border-border-default/80 bg-bg-surface space-y-6">
              {/* Email with 1-click copy */}
              <div className="space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-wider text-text-tertiary block">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-2 p-3 rounded-xl border border-border-subtle bg-bg-base">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="font-mono text-xs sm:text-sm text-text-primary hover:text-[#C6A76A] truncate transition-colors"
                  >
                    {PROFILE.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="p-1.5 rounded-lg text-text-tertiary hover:text-[#C6A76A] transition-colors shrink-0 cursor-pointer"
                  >
                    {copied ? (
                      <Check size={14} className="text-[#C6A76A]" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>

              {/* Location & Status */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 text-text-secondary">
                  <div className="w-8 h-8 rounded-lg border border-border-subtle bg-bg-base flex items-center justify-center shrink-0 text-text-tertiary">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">Location</div>
                    <div className="text-text-tertiary font-mono">{PROFILE.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-text-secondary">
                  <div className="w-8 h-8 rounded-lg border border-border-subtle bg-bg-base flex items-center justify-center shrink-0 text-[#C6A76A]">
                    <Mail size={14} />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">Availability</div>
                    <div className="text-text-tertiary font-mono">Open to Roles &amp; Projects</div>
                  </div>
                </div>
              </div>

              {/* Resume Download */}
              <div className="pt-1">
                <a
                  href={PROFILE.resumePath}
                  download="Ketan_Goyal_Resume.pdf"
                  className="flex items-center justify-between p-3 rounded-xl border border-border-subtle bg-bg-base hover:border-[#C6A76A]/50 transition-colors text-xs font-mono text-text-primary group"
                >
                  <span className="flex items-center gap-2">
                    <Download size={13} className="text-[#C6A76A]" />
                    <span>Ketan_Goyal_Resume.pdf</span>
                  </span>
                  <span className="text-text-tertiary group-hover:text-[#C6A76A] transition-colors">
                    Download
                  </span>
                </a>
              </div>

              {/* Social profiles row */}
              <div className="pt-2 border-t border-border-subtle/50">
                <span className="font-mono text-xs uppercase tracking-wider text-text-tertiary block mb-3">
                  Connect
                </span>
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Ketan's ${s.name}`}
                      className="w-9 h-9 rounded-xl border border-border-subtle bg-bg-base text-text-secondary hover:text-[#C6A76A] hover:border-[#C6A76A]/40 flex items-center justify-center transition-colors"
                    >
                      {getSocialIcon(s.name, "w-4 h-4")}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}