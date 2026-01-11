import { Link } from "react-router-dom";
import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  Github
} from "lucide-react";

const footerLinks = {
  platform: [
    { name: "Home", path: "/#hero" },
    { name: "Features", path: "/#features" },
    { name: "Roadmap", path: "/#roadmap" },
    { name: "Team", path: "/#team" },
  ],
  university: [
    { name: "Student Info (OBS)", path: "https://obs.dogus.edu.tr/" },
    { name: "Main Library", path: "https://kutuphane.dogus.edu.tr/" },
    { name: "Dining Menu", path: "#" },
    { name: "Academic Calendar", path: "https://www.dogus.edu.tr/akademik-takvim" },
  ],
  legal: [
    { name: "Privacy Policy", path: "#" },
    { name: "Terms of Service", path: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com/dou360", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container-custom section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <span className="font-outfit font-bold text-2xl text-foreground tracking-tight">
                DOU360
              </span>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
              An open-source digital twin project developed by engineering students to revolutionize the campus experience at Doğuş University.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-outfit font-bold text-foreground mb-6">Platform</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* University Links */}
          <div>
            <h4 className="font-outfit font-bold text-foreground mb-6">University</h4>
            <ul className="space-y-4">
              {footerLinks.university.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-outfit font-bold text-foreground mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm group">
                <span className="leading-relaxed">
                  Dudullu Campus<br />
                  Sanayi Mah. Nato Yolu Cad.<br />
                  34775 Ümraniye / İstanbul
                </span>
              </li>
              <li>
                <a
                  href="mailto:info.dou360@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group"
                >
                  <span>info.dou360@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+904447997"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group"
                >
                  <span>444 7 997</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {currentYear} DOU360. Open Source Project.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
             <span>Designed & Developed by</span>
             <Link to="/#team" className="font-bold text-foreground hover:text-primary transition-colors">
                Doğuş University Engineering Students
             </Link>
          </div>

          <div className="flex items-center gap-6 hidden md:flex">
            {footerLinks.legal.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}