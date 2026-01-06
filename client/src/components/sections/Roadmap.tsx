import { Check, Rocket, Star, Zap, Calendar } from "lucide-react";
import { AutoScroll } from "@/components/ui/auto-scroll";

// Paketler yerine "Geliştirme Aşama"larını (Milestones) yazıyoruz
const phases = [
  {
    name: "Phase 1: Foundation",
    status: "Completed",
    date: "Q4 2025",
    description: "Establishing the core infrastructure and 3D visualization of the campus.",
    icon: Zap,
    features: [
      "High-fidelity 3D Campus Model",
      "Basic Routing & Navigation",
      "Classroom Search Engine",
      "Responsive Web Interface",
      "Core Backend Architecture",
    ],
    highlight: false,
  },
  {
    name: "Phase 2: Interaction",
    status: "In Progress",
    date: "Q1 2026",
    description: "Adding real-time data layers and social features to the map.",
    icon: Rocket, // Şu anki odak noktamız
    features: [
      "Live Occupancy Data (IoT)",
      "User Accounts & Saved Routes",
      "Event Radar Integration",
      "Friend Locator (Optional)",
      "Mobile App Beta Launch",
    ],
    highlight: true, // Ortadaki kartı öne çıkaralım (Current Focus)
  },
  {
    name: "Phase 3: Intelligence",
    status: "Planned",
    date: "Q2 2026",
    description: "Implementing AI-driven assistance and advanced AR capabilities.",
    icon: Star,
    features: [
      "AI Navigation Assistant",
      "AR Wayfinding (Camera View)",
      "Personalized Class Schedule",
      "Voice Command Support",
      "Multi-Campus Support",
    ],
    highlight: false,
  },
];

// Teknoloji listesi güncellendi
const technologies = [
  { name: 'JavaScript', url: 'https://cdn.simpleicons.org/javascript/F7DF1E'},
  { name: 'TypeScript', url: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'React', url: 'https://cdn.simpleicons.org/react/61DAFB' },
  // DÜZELTME: Siyah renk kodu verildi ve invert özelliği açıldı
  { name: 'Next.js', url: 'https://cdn.simpleicons.org/nextdotjs/000000', invert: true }, 
  { name: 'TailwindCSS', url: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  // DÜZELTME: Siyah renk kodu verildi ve invert özelliği açıldı
  { name: 'Three.js', url: 'https://cdn.simpleicons.org/threedotjs/000000', invert: true }, 
  { name: 'WebGL', url: 'https://cdn.simpleicons.org/webgl/990000', invert: true},
  { name: 'Node.js', url: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Docker', url: 'https://cdn.simpleicons.org/docker/2496ED' },
  // DÜZELTME: Siyah renk kodu verildi ve invert özelliği açıldı
  { name: 'GitHub', url: 'https://cdn.simpleicons.org/github/181717', invert: true }, 
  { name: 'Figma', url: 'https://cdn.simpleicons.org/figma/F24E1E' },
  { name: 'Vite', url: 'https://cdn.simpleicons.org/vite/646CFF' },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />
            Project Timeline
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Journey & <br />
            <span className="text-primary">Future Vision</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DOU360 is an evolving platform. Check out what we've built so far and what's coming next for the Doğuş University campus.
          </p>
        </div>

        {/* Roadmap Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {phases.map((phase, index) => (
            <div
              key={phase.name}
              className={`relative bg-card border rounded-2xl p-8 flex flex-col animate-fade-in transition-all duration-300 ${
                phase.highlight
                  ? "border-primary shadow-lg scale-105 z-10" // Highlight (Phase 2)
                  : "border-border hover:border-primary/50" // Diğerleri
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Status Badge */}
              <div className="absolute top-0 right-0 p-6">
                 <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                    phase.status === "Completed" ? "bg-green-500/10 text-green-500" :
                    phase.status === "In Progress" ? "bg-primary/10 text-primary animate-pulse" :
                    "bg-muted text-muted-foreground"
                 }`}>
                    {phase.status}
                 </span>
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  phase.highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
              }`}>
                <phase.icon className="w-7 h-7" />
              </div>

              <h3 className="font-outfit font-bold text-2xl text-foreground mb-2">
                {phase.name}
              </h3>
              <div className="text-sm font-medium text-primary mb-4 flex items-center gap-2">
                 Target: {phase.date}
              </div>
              
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                {phase.description}
              </p>

              {/* Features List */}
              <ul className="space-y-4 mb-8 flex-1">
                {phase.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        phase.highlight ? "bg-primary/20" : "bg-muted"
                    }`}>
                      <Check className={`w-3 h-3 ${phase.highlight ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- AUTO SCROLL (TEKNOLOJİLER) --- */}
        <div className="border-t border-border pt-12">
            <div className="text-center mb-10">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                    Powered by Modern Technologies
                </span>
            </div>

            <div className="w-full relative">
                {/* Scroll Container */}
                <AutoScroll gap={60} duration={40} className="[&>div]:pr-[60px]">
                    {technologies.map((tech) => (
                        <div key={tech.name} className="flex flex-col items-center justify-center gap-3 group px-4">
                             {/* İkon Kutusu */}
                             <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center shadow-sm group-hover:border-primary/50 transition-all duration-300">
                                <img
                                    src={tech.url}
                                    alt={tech.name}
                                    // DÜZELTME: tech.invert varsa dark:invert class'ı ekleniyor.
                                    // Böylece Light modda Siyah, Dark modda Beyaz görünüyorlar.
                                    className={`h-8 w-8 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ${tech.invert ? "dark:invert" : ""}`}
                                    loading="lazy"
                                />
                             </div>
                             {/* İsim */}
                             <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                {tech.name}
                             </span>
                        </div>
                    ))}
                </AutoScroll>
            </div>
        </div>

      </div>
    </section>
  );
}