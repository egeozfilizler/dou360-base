import { Clock, Users, Shield } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance to ensure your success at any time.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "A committed team of experts working exclusively for your goals.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security to protect your data and operations.",
  },
];

export function SmallFeatures() {
  return (
    <section className="py-12 border-y border-border bg-muted/30">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-outfit font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}