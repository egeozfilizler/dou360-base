import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, MessageSquare } from "lucide-react";

const testimonials = [
  {
    name: "Alper Yılmaz",
    role: "Computer Engineering, 1st Year",
    content: "I used to get lost looking for the B-Block labs all the time during my first weeks. DOU360 literally saved me during the midterms! The turn-by-turn navigation is a lifesaver.",
    rating: 5,
    avatar: "A"
  },
  {
    name: "Selin Kaya",
    role: "Architecture, 3rd Year",
    content: "Checking if the library is full before leaving the studio is a game changer. I don't have to walk all the way to the main building for nothing anymore. Love the live occupancy feature!",
    rating: 5,
    avatar: "S"
  },
  {
    name: "Dr. Murat Demir",
    role: "Visiting Professor",
    content: "As a guest lecturer, finding the seminar hall in such a large campus was always a challenge. The 3D visualization is very impressive and makes navigation effortless.",
    rating: 5,
    avatar: "M"
  },
  {
    name: "Zeynep Arslan",
    role: "Social Club President",
    content: "We used the Event Radar to promote our Hackathon. The visibility we got from the map pinned location was amazing. It's great to see a student project solving real problems.",
    rating: 5,
    avatar: "Z"
  }
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  
  // Touch gesture state
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; // swipe more than 50px to the left
    const isRightSwipe = distance < -50; // swipe more than 50px to the right

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
    // Reset touch state
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-muted/20 border-y border-border relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-50">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Community Feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by the <br />
            <span className="text-primary">Campus Community</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Don't just take our word for it. Here is what students and faculty members are saying about their DOU360 experience.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div
            // Touch events added
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            // cursor-grab provides a grab affordance on desktop
            className="relative bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl animate-fade-in touch-pan-y cursor-grab active:cursor-grabbing"
          >
            
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 opacity-10 pointer-events-none">
               <Quote className="w-24 h-24 text-primary rotate-180 fill-current" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-8">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
                </div>

                {/* Content */}
                <p className="text-xl md:text-2xl font-medium text-foreground mb-10 leading-relaxed italic select-none">
                "{testimonials[current].content}"
                </p>

                {/* Author Info */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="text-2xl font-bold text-white">
                        {testimonials[current].avatar}
                        </span>
                    </div>
                    <div>
                        <div className="font-outfit font-bold text-lg text-foreground">
                        {testimonials[current].name}
                        </div>
                        <div className="text-primary font-medium text-sm">
                        {testimonials[current].role}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile swipe hint */}
            <div className="md:hidden absolute bottom-4 left-0 w-full text-center text-xs text-muted-foreground/50 animate-pulse pointer-events-none select-none">
              Swipe to navigate
            </div>

            {/* Navigation Buttons */}
            {/* Hidden on mobile via 'hidden md:flex' */}
            <div className="hidden md:flex items-center justify-between w-full absolute top-1/2 left-0 -translate-y-1/2 px-4 md:px-0 md:-ml-16 md:w-[calc(100%+8rem)] pointer-events-none">
              <button
                onClick={prev}
                className="pointer-events-auto w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={next}
                className="pointer-events-auto w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Indicators / Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index ? "bg-primary w-8" : "bg-muted-foreground/30 w-2 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}