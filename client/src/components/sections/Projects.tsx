import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";

// Kategorileri kampüs alanlarına göre güncelledik
const categories = ["All", "Faculties", "Social Clubs", "Labs", "Administrative"];

// Projeler yerine Kampüs Mekanları
const locations = [
  {
    title: "Faculty of Arts and Sciences",
    category: "Faculties",
    description: "Doğuş University’s Faculty of Arts and Sciences has been providing education since 1997 and offers comprehensive, high-quality undergraduate programs in Communication Sciences, English Language and Literature, English Translation and Interpreting, Psychology, Sociology, and Turkish Language and Literature..",
    image: "/showcase/faculties/fenedebiyat.png"
  },
  {
    title: "Basketball Club",
    category: "Social Clubs",
    description: "Doğuş University’s Men’s Basketball Team won the 2023–2024 season championship in the TÜSF UNILIG Men’s 1st League. The university has also represented Türkiye in 3x3 basketball at events such as the EUSA European Championship in Porto.",
    image: "/showcase/socialclubs/basketball.jpg"
  },
  {
    title: "Chemistry Lab",
    category: "Labs",
    description: "In the first-year Chemistry courses of the Faculty of Engineering, students carry out basic analysis and reaction experiments in groups alongside the theoretical content. In addition, many experiments are simulated in the Virtual Chemistry Lab, where students also work on calculations and graphing.",
    image: "/showcase/labs/kimyalab.jpg"
  },
  {
    title: "Faculty of Economics and Administrative Sciences",
    category: "Faculties",
    description: "Our faculty offers programs in Economics, Business Administration, Political Science, International Relations, International Trade and Business, and Management Information Systems. We aim to support student success through experienced faculty, an up-to-date curriculum, and strong communication between students, academics, and administration.",
    image: "/showcase/faculties/ekonomi.jpg"
  },
  {
    title: "CAD/CAM Lab",
    category: "Labs",
    description: "In the CAD/CAM Lab, students transfer their computer-based designs into the system and turn them into real production. With an integrated production line and robotic unit, an “unmanned manufacturing system” is implemented.",
    image: "/showcase/labs/autocad.jpg"
  },

  {
    title: "Dans Club",
    category: "Social Clubs",
    description: "During the semester, the club organizes introductory classes and training sessions and takes part in interuniversity dance festivals with stage performances. It also brings together dance groups from different universities on campus through events such as the Doğuş University Dance Festival.",
    image: "/showcase/socialclubs/dansclub.jpg"
  },
  {
    title: "Computer Lab",
    category: "Labs",
    description: "In Doğuş University’s computer laboratories, which are available to all students, all the necessary software to support a wide range of work is installed. Across the campus, there are 12 computer labs in different locations, all with internet access.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Sailing Club",
    category: "Social Clubs",
    description: "DoUSailing (Doğuş University Sailing Team) won multiple trophies in 2020 by taking first place in the IRC 3 and IRC 4 categories at the Presidential International Yacht Race. In 2023, the team reached the podium at the Sporboats Trophies, won first place among universities at the Deniz Kızı Republic Sailing Cup, and also earned the “Rising Star” award at the Uni Sailing Cup while placing in interuniversity class races.",
    image: "/showcase/socialclubs/sailing.jpg"
  },
  {
    title: "Mechanical Engineering Lab",
    category: "Labs",
    description: "Mechanical Engineering in particular, and the Faculty of Engineering in general, use these laboratories, which are equipped with basic electronics and sensor training sets, a universal tensile–compression testing machine, and devices such as a microscope and a hardness tester. They support experiments in basic electronic measurements, signal-processing circuits, and materials mechanics, including tensile–compression and 3/4-point bending tests.",
    image: "/showcase/labs/makinelab.jpg"
  },
  {
    title: "Theatre Club",
    category: "Social Clubs",
    description: "Doğuş University’s Theatre Club (Doğuştan Oyuncular) runs stage activities throughout the semester through rehearsals and workshops. By staging plays from time to time and bringing different groups together on campus through events such as theatre festivals, it encourages students’ active participation in theatre.",
    image: "/showcase/socialclubs/theatre.jpg"
  },
  {
    title: "Engineering Faculty",
    category: "Faculties",
    description: "Doğuş University’s Faculty of Engineering offers programs in Computer Engineering (English), Electrical and Electronics Engineering (Turkish), Industrial Engineering (Turkish/English), Civil Engineering (Turkish), Mechanical Engineering (Turkish/English), and Software Engineering (Turkish). The faculty provides education through qualified academic staff who focus on continuous improvement through scientific work. Its curricula are accredited by MÜDEK (Association for Evaluation and Accreditation of Engineering Programs). Thanks to this, the faculty delivers a strong education recognized in both industry and academia.",
    image: "/showcase/faculties/muhendislik.jpg"
  },
  {
    title: "Microprocessor Lab",
    category: "Labs",
    description: "The laboratory used by students of the Faculty of Engineering is one of the most important hands-on learning environments, especially for the Computer Engineering and Information Systems Engineering programs. Equipped with Motorola and Intel training kits, the labs enable microprocessor education across a broad range of topics.",
    image: "/showcase/labs/microprosses.jpg"
  },
  {
    title: "Swimming Club",
    category: "Social Clubs",
    description: "Doğuş University’s Swimming Team competes in interuniversity events organized by the Turkish University Sports Federation, such as the Turkish Swimming Championship. One of the team’s notable achievements is placing 4th in the men’s 400-meter event at the competitions held in İzmir on May 17–20, 2022. The team also continued to represent the university by participating in interuniversity swimming competitions held in Ankara in 2023.",
    image: "/showcase/socialclubs/swimming.jpg"
  },
  {
    title: "Student Affairs Office",
    category: "Administrative",
    description: "The main office for all student registrations, transcripts, and paperwork.",
    image: "/showcase/administrative/oisleri.png"
  },
  {
    title: "International Office",
    category: "Administrative",
    description: "The European Union Coordination Office is an academic unit established within Doğuş University to conduct interdisciplinary research on European-related topics, carry out academic studies by developing various international projects, and build the university’s European Union infrastructure.",
    image: "/showcase/administrative/erasmus.jpg"
  },
  {
    title: "Career Center",
    category: "Administrative",
    description: "Doğuş University’s Career Center/Alumni Office brings students together with companies through events such as Career Day and supports them in learning about job and internship opportunities and applying for them.",
    image: "/showcase/administrative/career.gif"
  },
  {
    title: "IT Support",
    category: "Administrative",
    description: "IT Support Center aims to ensure that the digital systems used by students and staff run smoothly. It provides assistance with technical issues such as email/student accounts, Wi-Fi access, software availability, and password problems, and manages the troubleshooting and resolution process when needed.",
    image: "/showcase/administrative/ITsupport.jpg"
  },
  {
    title: "Table Tennis Club",
    category: "Social Clubs",
    description: "Doğuş University’s Table Tennis Club / DOU Table Tennis Team continues its training using on-campus facilities such as the Table Tennis Workshop, and represents the university in interuniversity matches as well as internal tournaments.",
    image: "/showcase/socialclubs/masatenisi.webp"
  },
  {
    title: "Faculty of Law",
    category: "Faculties",
    description: "Doğuş University Faculty of Law Journal includes peer-reviewed student articles in each issue to encourage academic writing. It also aims to strengthen ties with alumni by dedicating one annual issue to their academic work.",
    image: "/showcase/faculties/hukuk.jpg"
  },

  {
    title: "Animation Lab",
    category: "Labs",
    description: "It is mainly used for courses in the Visual Communication Design program. The lab includes a light table specifically for animation work. It is also designed to meet students’ general computer and internet needs beyond animation projects.",
    image: "/showcase/labs/animasyon.png"
  },

  {
    title: "Faculty of Art and Design",
    category: "Faculties",
    description: "The Faculty of Art and Design admits students to the departments of Graphic Design, Visual Communication Design, Interior Architecture, Industrial Design, Textile and Fashion Design, Gastronomy and Culinary Arts, Acting, and Digital Game Design.",
    image: "/showcase/faculties/sanattasarım.jpg"
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
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
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