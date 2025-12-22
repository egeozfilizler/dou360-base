import { useState } from "react";
import { ExternalLink } from "lucide-react";

const categories = ["All", "Web Design", "Development", "Marketing", "Branding"];

const projects = [
  {
    title: "E-commerce Platform",
    category: "Development",
    description: "A modern e-commerce solution with seamless checkout experience.",
  },
  {
    title: "Brand Identity",
    category: "Branding",
    description: "Complete brand identity design for a tech startup.",
  },
  {
    title: "Marketing Campaign",
    category: "Marketing",
    description: "Successful digital marketing campaign with 300% ROI.",
  },
  {
    title: "Corporate Website",
    category: "Web Design",
    description: "Clean and professional website for a consulting firm.",
  },
  {
    title: "Mobile App UI",
    category: "Web Design",
    description: "Intuitive mobile application interface design.",
  },
  {
    title: "SaaS Dashboard",
    category: "Development",
    description: "Feature-rich dashboard for a SaaS analytics platform.",
  },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground">
            Explore our recent work and see how we've helped businesses achieve their goals.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className="group bg-card border border-border rounded-2xl overflow-hidden card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-400/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-card/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-6 h-6 text-foreground" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-outfit font-semibold text-lg text-foreground mt-2 mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}