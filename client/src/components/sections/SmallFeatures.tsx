import { 
  Map, 
  Zap, 
  Smartphone, 
  Box, 
  Search, 
  Navigation 
} from "lucide-react";
  import { Marquee } from "@/components/ui/marquee"; // Mind the file path

const features = [
  {
    icon: Navigation,
    title: "Instant Navigation",
    description: "Find the shortest path to any classroom.",
  },
  {
    icon: Zap,
    title: "Real-time Data",
    description: "Live occupancy status for study areas.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Seamless experience on all devices.",
  },
  {
    icon: Box,
    title: "3D Interaction",
    description: "Immersive 3D campus models.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Locate faculty offices instantly.",
  },
  {
    icon: Map,
    title: "Floor Plans",
    description: "Detailed layouts for every floor.",
  },
];

export function SmallFeatures() {
  return (
    <section className="py-8 border-y border-border bg-muted/20 overflow-hidden">
      <div className="container-fluid px-0"> {/* Full width with container-fluid */}
        
        <Marquee pauseOnHover repeat={4} className="[--duration:40s]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mx-4 p-4 rounded-xl border border-transparent hover:border-primary/20 hover:bg-background/50 transition-all cursor-default min-w-[300px]"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
                <feature.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-outfit font-semibold text-foreground text-sm mb-0.5">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-xs">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </Marquee>

      </div>
    </section>
  );
}