import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";

// Kategorileri kampüs alanlarına göre güncelledik
const categories = ["All", "Academic", "Social", "Labs", "Administrative"];

// Projeler yerine Kampüs Mekanları
const locations = [
  {
    title: "Main Library",
    category: "Social",
    description: "A 3-story modern library with silent study zones and group work areas.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Computer Engineering Labs",
    category: "Labs",
    description: "High-performance computer labs located in Block B, 4th Floor.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Student Center & Cafeteria",
    category: "Social",
    description: "The heart of campus life. Dining hall, coffee shops, and student clubs.",
    image: "https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Engineering Faculty",
    category: "Academic",
    description: "Home to software and industrial engineering departments and lecture halls.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Student Affairs Office",
    category: "Administrative",
    description: "The main office for all student registrations, transcripts, and paperwork.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Amphitheater",
    category: "Academic",
    description: "Large capacity lecture hall for seminars, conferences, and main courses.",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop"
  },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredLocations =
    activeCategory === "All"
      ? locations
      : locations.filter((loc) => loc.category === activeCategory);

  return (
    <section id="showcase" className="py-20 lg:py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium mb-6">
            <ExternalLink className="w-4 h-4" />
            Explore the Campus
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Every Corner, <br />
            <span className="text-primary">Digitally Twinned</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Take a sneak peek at the detailed 3D models available in DOU360. From labs to social areas, we covered it all.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 animate-fade-in">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLocations.map((location, index) => (
            <div
              key={location.title}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Section */}
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={location.image} 
                  alt={location.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay & Icon */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 bg-background/90 backdrop-blur rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <span className="text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-1 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  {location.category}
                </span>
                <h3 className="font-outfit font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {location.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {location.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}