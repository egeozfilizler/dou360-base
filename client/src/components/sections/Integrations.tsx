import { PinContainer } from "@/components/ui/3d-pin";
import { 
  Database, 
  BookOpen, 
  Utensils, 
  Bus, 
  Calendar, 
  Bell 
} from "lucide-react";

const integrations = [
  { 
    name: "Student Info System", 
    icon: Database, 
    description: "Syncs Class Schedule",
    status: "Active",
    href: "https://obs.dogus.edu.tr/"
  },
  { 
    name: "Library Database", 
    icon: BookOpen, 
    description: "Live Occupancy Data",
    status: "Soon"
  },
  { 
    name: "Dining Services", 
    icon: Utensils, 
    description: "Daily Menu Feed",
    status: "Soon"
  },
  { 
    name: "Shuttle Tracking", 
    icon: Bus, 
    description: "Real-time GPS",
    status: "Soon"
  },
  { 
    name: "Event Calendar", 
    icon: Calendar, 
    description: "Social Activities",
    status: "Soon"
  },
  { 
    name: "Push Notifications", 
    icon: Bell, 
    description: "Instant Alerts",
    status: "Soon"
  },
];

export function Integrations() {
  return (
    <section className="py-20 border-b border-border overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Seamlessly Connected
          </p>
          <h2 className="text-3xl font-bold mb-4">
            Integrated Campus Ecosystem
          </h2>
          <p className="text-muted-foreground">
            DOU360 works in harmony with existing university systems to provide you with real-time, accurate data.
          </p>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {integrations.map((item, index) => (
            // DÜZELTME: Her hücre için sabit yükseklik (h-48) ve tam merkezleme (flex center)
            <div 
                key={item.name} 
                className="flex items-center justify-center h-48 relative" 
            >
            
            {/* --- ACTIVE CARD (3D PIN) --- */}
            {item.status === "Active" ? (
                 <PinContainer 
                    title="OBS Entry" 
                    href={item.href}
                    // PinContainer'ın kendisine de boyut verdik ki absolute içinde kaybolmasın
                    className="w-full h-full flex items-center justify-center"
                    containerClassName="w-36 h-32 flex items-center justify-center" 
                 >
                    {/* İç Kart Tasarımı: Diğerleriyle AYNI boyut (w-36 h-32) ve stil */}
                    <div className="flex flex-col items-center justify-center p-4 w-36 h-32 bg-card border border-primary/40 rounded-2xl shadow-[0_0_20px_-5px_rgba(var(--primary-rgb),0.3)]">
                        <div className="w-10 h-10 mb-2 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-pulse">
                            <item.icon className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xs text-foreground text-center leading-tight mb-1">
                            {item.name}
                        </span>
                        <span className="text-[9px] font-semibold text-primary uppercase tracking-wider">
                            Live Sync
                        </span>
                    </div>
                 </PinContainer>
            ) : (
              
              /* --- STANDARD CARDS (SOON) --- */
              <div
                className="group relative flex flex-col items-center justify-center p-4 w-36 h-32 bg-muted/30 border border-transparent rounded-2xl transition-all duration-300 animate-fade-in cursor-default opacity-70 hover:opacity-100 hover:bg-card hover:border-primary/20 hover:shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Badge */}
                <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 bg-background border border-border text-muted-foreground rounded-full shadow-sm">
                  SOON
                </span>

                <div className="w-10 h-10 mb-2 bg-background rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 text-muted-foreground group-hover:text-primary group-hover:scale-110">
                  <item.icon className="w-5 h-5" />
                </div>
                
                <span className="font-medium text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                  {item.name}
                </span>
              </div>
            )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}