"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField, inputClass } from "@/components/ui/FormField";
import { services } from "@/data/services";
import { siteConfig, whatsappLink, mailtoLink } from "@/data/site.config";
import { trackEvent } from "@/lib/analytics";
import {
  budgetOptions,
  contactSchema,
  engagementOptions,
  type ContactFormValues,
} from "@/lib/validators";

type Status = "idle" | "submitting" | "success" | "error";

const DEFAULTS: ContactFormValues = {
  name: "",
  email: "",
  storeUrl: "",
  service: "",
  engagement: "unsure",
  budget: "Not sure yet",
  message: "",
  website: "",
};

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: DEFAULTS,
  });

  // Pre-select service / engagement from links like /?service=seo#contact
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const plan = params.get("plan");
    if (service && services.some((s) => s.id === service)) setValue("service", service);
    if (plan && engagementOptions.some((e) => e.value === plan)) setValue("engagement", plan);
  }, [setValue]);

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, elapsed: Date.now() - startedAt.current }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok) {
        trackEvent("Contact Form Submit", { service: values.service || "none" });
        setStatus("success");
        reset(DEFAULTS);
        return;
      }

      // Show server-side field errors next to the inputs when present
      const fieldErrors = data?.fieldErrors as Record<string, string[]> | undefined;
      if (fieldErrors) {
        for (const [field, messages] of Object.entries(fieldErrors)) {
          if (messages?.[0]) {
            setError(field as keyof ContactFormValues, { message: messages[0] });
          }
        }
      }
      trackEvent("Contact Form Error", { status: res.status });
      setServerError(data?.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="gradient-border flex h-full flex-col items-center justify-center rounded-2xl bg-surface p-10 text-center"
      >
        <CheckCircle2 size={56} className="text-success drop-shadow-[0_0_14px_rgb(var(--c-success)/0.6)]" aria-hidden="true" />
        <h3 className="mt-6 !text-2xl">Message sent!</h3>
        <p className="mt-3 max-w-sm text-muted">
          Thanks for reaching out. I&apos;ll reply {siteConfig.responseTime} (working hours:{" "}
          {siteConfig.workingHours}).
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={whatsappLink()} variant="secondary">
            <MessageCircle size={18} aria-hidden="true" />
            Also message on WhatsApp
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              startedAt.current = Date.now();
              setStatus("idle");
            }}
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative space-y-5 rounded-2xl border border-line bg-surface p-5 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="cf-name" label="Your name" error={errors.name?.message}>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            className={inputClass}
            {...register("name")}
          />
        </FormField>
        <FormField id="cf-email" label="Email" error={errors.email?.message}>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            placeholder="jane@brand.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            className={inputClass}
            {...register("email")}
          />
        </FormField>
      </div>

      <FormField id="cf-store" label="Store or website" optional error={errors.storeUrl?.message}>
        <input
          id="cf-store"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="mystore.com"
          aria-invalid={!!errors.storeUrl}
          aria-describedby={errors.storeUrl ? "cf-store-error" : undefined}
          className={inputClass}
          {...register("storeUrl")}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="cf-service" label="Service needed" optional error={errors.service?.message}>
          <select id="cf-service" className={inputClass} {...register("service")}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
            <option value="other">Other / not sure yet</option>
          </select>
        </FormField>
        <FormField id="cf-engagement" label="How would you like to work?" optional>
          <select id="cf-engagement" className={inputClass} {...register("engagement")}>
            {engagementOptions.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField id="cf-budget" label="Estimated budget (USD)" optional>
        <select id="cf-budget" className={inputClass} {...register("budget")}>
          {budgetOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="cf-message" label="Tell me about your project" error={errors.message?.message}>
        <textarea
          id="cf-message"
          rows={5}
          placeholder="What are you building? Goals, timeline, and anything else that helps."
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className={`${inputClass} resize-y`}
          {...register("message")}
        />
      </FormField>

      {/* Honeypot: hidden from people, tempting for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input id="cf-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div aria-live="polite">
        {status === "error" && serverError && (
          <div role="alert" className="rounded-xl border border-danger/50 bg-danger/10 p-4 text-sm text-danger">
            {serverError}{" "}
            <a href={whatsappLink()} className="underline" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{" "}
            or{" "}
            <a href={mailtoLink()} className="underline">
              email
            </a>{" "}
            works too.
          </div>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 size={20} className="animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            Send message
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted">
        I reply {siteConfig.responseTime}. Your details are only used to respond to you.
      </p>
    </form>
  );
}
