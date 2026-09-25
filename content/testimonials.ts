export interface Testimonial {
  id: string;
  quote: string;
  by: string;
  category?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "The ceremony flyover still gives our guests chills when we rewatch it.",
    by: "M. & L.",
    category: "Lake Geneva Wedding",
  },
  {
    id: "t2",
    quote: "Sent us the property walkthrough same week — it sold within days of listing.",
    by: "R. Keller",
    category: "Real Estate Agent",
  },
  {
    id: "t3",
    quote: "Flew lines through the shoot I wouldn't have trusted anyone else with.",
    by: "A. Voss",
    category: "Brand Shoot",
  },
];
