import { Link } from "react-router-dom";
import { ArrowRight, Play, MapPin, Navigation, Search, Users, Building2, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-20 pb-20 lg:pt-40 lg:pb-40 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium mb-6 animate-fade-in hover:bg-primary/15 transition-colors cursor-default">
              <MapPin className="w-4 h-4" />
              Official Campus Navigator
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Navigate Campus in <br className="hidden lg:block" />
            Real-time 3D at
            {/* pb-4 ekledik: Harf kuyruklarının (ğ, ş, y) kesilmesini önler */}
            <a href="https://www.dogus.edu.tr"><span className="gradient-text block mt-2 pb-4 hover:opacity-80 transition-opacity duration-300"> Doğuş University </span></a>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Stop getting lost on campus. Find empty classrooms instantly, locate faculty offices, and manage your schedule with DOU360's immersive interactive map.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/signup" className="btn-primary w-full sm:w-auto shadow-lg shadow-primary/20">
                Start Exploring
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <button className="btn-secondary w-full sm:w-auto hover:shadow-lg hover:shadow-secondary/20 transition-shadow">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Users className="w-4 h-4 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground">12K+</div>
                </div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground">500+</div>
                </div>
                <div className="text-sm text-muted-foreground">Classrooms</div>
              </div>
              <div>
                 <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground">100%</div>
                </div>
                <div className="text-sm text-muted-foreground">Compatible Data</div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT (Visual / 3D Placeholder) */}
          <div className="relative animate-fade-in lg:h-[600px] flex items-center" style={{ animationDelay: "0.2s" }}>
            <div className="relative w-full bg-gradient-to-br from-muted to-background border border-border rounded-3xl p-2 shadow-2xl transform lg:rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              
              {/* Fake Browser Header for Aesthetic */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-muted/50 rounded-t-3xl border-b border-border flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                <div className="ml-4 px-3 py-1 bg-background/50 rounded-md text-[10px] text-muted-foreground font-mono">
                  dou360.dogus.edu.tr/map
                </div>
              </div>

              {/* Main Content Area (Placeholder for 3D) */}
              <div className="mt-12 aspect-[4/3] lg:aspect-auto lg:h-[450px] bg-card/50 rounded-xl overflow-hidden relative group">
                {/* Grid Pattern Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <Navigation className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-outfit font-semibold text-xl text-foreground mb-2">Interactive 3D Map</h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                        This area will render the WebGL/Three.js campus model.
                    </p>
                </div>

                {/* Floating UI Elements (Simulation) */}
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm border border-border p-2 rounded-lg shadow-sm">
                    <Search className="w-4 h-4 text-muted-foreground" />
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm border border-border p-3 rounded-lg shadow-sm flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold">B1-74</div>
                        <div className="text-[10px] text-muted-foreground">Available Now</div>
                    </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}