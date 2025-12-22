import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "John Smith",
    role: "CEO at TechCorp",
    content: "Working with this team has been an absolute pleasure. They delivered beyond our expectations and helped us achieve our digital transformation goals.",
    rating: 5,
  },
  {
    name: "Lisa Anderson",
    role: "Marketing Director",
    content: "The attention to detail and commitment to quality is outstanding. Our website traffic increased by 200% after the redesign.",
    rating: 5,
  },
  {
    name: "David Wilson",
    role: "Startup Founder",
    content: "They understood our vision from day one and turned it into reality. The team's expertise and professionalism are unmatched.",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12">
            {/* Quote */}
            <div className="text-6xl text-primary/20 absolute top-4 left-6">"</div>
            
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>

            {/* Content */}
            <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
              {testimonials[current].content}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-purple-400/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {testimonials[current].name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-outfit font-semibold text-foreground">
                  {testimonials[current].name}
                </div>
                <div className="text-muted-foreground text-sm">
                  {testimonials[current].role}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-2 absolute bottom-8 right-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  current === index ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}