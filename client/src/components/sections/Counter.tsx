"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";
import { Users, MapPin, School, Layers } from "lucide-react";

// Statistics data
const stats = [
  { 
    value: 6500, 
    suffix: "+", 
    label: "Active Students", 
    icon: Users,
    description: "Using the app daily"
  },
  { 
    value: 120, 
    suffix: "+", 
    label: "Classrooms Mapped", 
    icon: School,
    description: "Across 4 blocks"
  },
  { 
    value: 45000, 
    suffix: "m²", 
    label: "Digital Twin Area", 
    icon: Layers,
    description: "High fidelity 3D models"
  },
  { 
    value: 98, 
    suffix: "%", 
    label: "Navigation Accuracy", 
    icon: MapPin,
    description: "Pin-point precision"
  },
];

// Custom hook-style component for counting animation
function CounterItem({ item }: { item: typeof stats[0] }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      const increment = item.value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= item.value) {
          setCount(item.value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, item.value]);

  return (
    <div ref={ref} className="text-center group p-6 rounded-2xl hover:bg-primary-foreground/10 transition-colors duration-300">
      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <item.icon className="w-6 h-6 text-white" />
      </div>
      
      <div className="flex items-baseline justify-center gap-1 mb-2">
        <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          {count}
        </span>
        <span className="text-2xl font-semibold text-white/80">
          {item.suffix}
        </span>
      </div>
      
      <div className="text-lg font-medium text-white mb-1">
        {item.label}
      </div>
      <div className="text-sm text-white/60">
        {item.description}
      </div>
    </div>
  );
}

export function Counter() {
  return (
    <section className="py-16 lg:py-16 bg-primary text-primary-foreground relative overflow-hidden">
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* NOTE: Removed 'divide-x divide-white/10' to clean separators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            // NOTE: Removed border-based separators between items
            <div key={stat.label}>
               <CounterItem item={stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}