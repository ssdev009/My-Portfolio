export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  country: string;
}

/**
 * Add REAL client testimonials here. While this list is empty the whole
 * Testimonials section is hidden automatically (no fake quotes on a live site).
 *
 * Example:
 * { quote: "Great work and fast delivery.", name: "Client Name", role: "Founder, Store Name", country: "UK" },
 */
export const testimonials: Testimonial[] = [];
