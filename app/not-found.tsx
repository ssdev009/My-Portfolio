import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <Container className="flex min-h-[60svh] flex-col items-center justify-center py-24 text-center">
      <p className="gradient-text font-heading text-8xl font-bold">404</p>
      <h1 className="mt-4 !text-3xl sm:!text-4xl">This page does not exist</h1>
      <p className="mt-4 max-w-md text-muted">The link may be broken or the page may have moved.</p>
      <Button href="/" size="lg" className="mt-8">
        Back to home
      </Button>
    </Container>
  );
}
