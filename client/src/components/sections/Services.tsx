'use client';

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Map, 
  Users, 
  Search, 
  CalendarDays, 
  GraduationCap, 
  Smartphone,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Smart Navigation",
    description: "Get turn-by-turn directions to any classroom, lab, or office with the shortest path algorithm.",
  },
  {
    icon: Users,
    title: "Live Occupancy",
    description: "Check real-time crowd data for the library and cafeteria before you go. Save your time.",
  },
  {
    icon: Search,
    title: "Faculty Locator",
    description: "Instantly find professors' offices and check their available visiting hours.",
  },
  {
    icon: GraduationCap,
    title: "Exam Venue Finder",
    description: "Stress-free exam weeks. Find your exam halls quickly with visual 3D guidance.",
  },
  {
    icon: CalendarDays,
    title: "Event Radar",
    description: "Discover seminars, club meetings, and social events happening on campus right now.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Access the full 3D experience seamlessly from your phone, tablet, or laptop.",
  },
];

// Tekil Kart Bileşeni (FocusCards Mantığıyla Optimize Edildi)
const FeatureCard = React.memo(
  ({
    feature,
    index,
    hovered,
    setHovered,
  }: {
    feature: typeof features[0];
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative bg-card border border-border p-8 rounded-2xl transition-all duration-300 ease-out cursor-default",
        // FOCUS EFFECT MANTIĞI BURADA:
        // Eğer bir şeye odaklanılmışsa (hovered !== null) ve bu kart o değilse (hovered !== index):
        // Bulanıklaştır (blur-sm), küçült (scale-[0.98]) ve soluklaştır (opacity-50).
        hovered !== null && hovered !== index 
          ? "blur-sm scale-[0.98] opacity-50 grayscale-[0.5]" 
          : "shadow-sm hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1 opacity-100 scale-100"
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300",
        hovered === index ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
      )}>
        <feature.icon className="w-7 h-7" />
      </div>
      
      <h3 className={cn(
        "font-outfit font-bold text-xl mb-3 transition-colors duration-300",
        hovered === index ? "text-primary" : "text-foreground"
      )}>
        {feature.title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </div>
  )
);

FeatureCard.displayName = "FeatureCard";

export function Services() {
  // Hangi kartın üzerinde olduğumuzu tutan state
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="features" className="py-20 lg:py-12 relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium mb-6">
             <Sparkles className="w-4 h-4" />
             Everything You Need
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            More Than Just a Map
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DOU360 is designed to be your personal campus assistant, combining navigation with real-time academic life management.
          </p>
        </div>

        {/* Features Grid - FocusCards Logic Applied */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </div>
      </div>
    </section>
  );
}