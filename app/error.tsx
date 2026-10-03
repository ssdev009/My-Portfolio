"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappLink } from "@/data/site.config";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60svh] flex-col items-center justify-center py-24 text-center">
      <h1 className="!text-3xl sm:!text-4xl">Something went wrong</h1>
      <p className="mt-4 max-w-md text-muted">
        An unexpected error occurred. Please try again, or reach out directly.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset} size="lg">
          Try again
        </Button>
        <Button href={whatsappLink()} variant="secondary" size="lg">
          Message on WhatsApp
        </Button>
      </div>
    </Container>
  );
}
