import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { HatGlasses } from "lucide-react"

export function Team() {
  const teamMembers = [
    {
      name: "Ege Özfilizler",
      designation: "Team Lead & Full Stack Developer",
      quote:
        "Leading the vision of DOU360. Passionate about combining software engineering principles with real-world utility to solve campus navigation problems.",
      src: "/teampic/ege.jpeg",
      linkedin: "https://www.linkedin.com/in/ege-ozfilizler/"
    },
    {
      name: "Bora Toprak Yaşar",
      designation: "Backend Architect",
      quote:
        "Building the robust server-side architecture and managing real-time WebSocket connections that power the live occupancy features.",
      src: "/teampic/bora.jpeg",
      linkedin: "https://www.linkedin.com/in/boratoprakyasar/"
    },
    {
      name: "Emel Deniz Ayvaz",
      designation: "UI/UX Designer",
      quote:
        "Crafting the user journey. My focus is on making the complex 3D interface feel intuitive, accessible, and beautiful for every student.",
      src: "/teampic/deniz.jpeg",
      linkedin: "https://www.linkedin.com/in/emel-deniz-ayvaz/"

    },
    {
      name: "Doruk Buğra Öztürk",
      designation: "3D Artist & Developer",
      quote:
        "Modeling the digital twin of our campus. Responsible for the optimization and visual fidelity of the 3D assets in the browser.",
      src: "/teampic/doruk.jpeg",
      linkedin: "https://www.linkedin.com/in/doruk-buğra-öztürk-a4680317a/"

    },
    {
      name: "Rukiye Ebrar Bayram",
      designation: "Frontend Developer",
      quote:
        "Bringing designs to life with React. Ensuring smooth animations and a responsive experience across all mobile and desktop devices.",
      src: "/teampic/ebrarB.jpeg",
      linkedin: "https://www.linkedin.com/in/ebrar-bayram-4b2728259/"
    },
  ];

  return (
    // DÜZENLEME: 'bg-muted/20' ve 'border-y' eklendi.
    // SmallFeatures ile aynı stil dilini kullanıyor.
    <section id="team" className="py-20 lg:py-18 bg-muted/20 border-y border-border">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium mb-6">
            <HatGlasses className="h-4 w-4" />
            Meet the Creators
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Built by Students, <br />
            <span className="text-primary">For Students</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DOU360 is a passion project developed by a dedicated team of engineering students to revolutionize campus life.
          </p>
        </div>

        {/* Animated Testimonials Component */}
        <AnimatedTestimonials testimonials={teamMembers} autoplay={true} />

      </div>
    </section>
  );
}