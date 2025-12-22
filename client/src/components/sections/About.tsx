import { Check, Play } from "lucide-react";

const benefits = [
  "Modern and clean design",
  "Fully responsive layout",
  "Built with best practices",
  "Easy customization",
  "Regular updates",
  "Premium support",
];

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image/Video Section */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-400/20 rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-card flex items-center justify-center border border-border rounded-2xl">
                <button className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </button>
              </div>
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              We Provide the Best Solutions for Your Business
            </h2>
            <p className="text-muted-foreground mb-8">
              With years of experience and a passion for excellence, we deliver solutions that drive real results. Our team combines creativity with technical expertise to help your business thrive in the digital age.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}