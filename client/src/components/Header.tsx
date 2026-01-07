import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Lock, GraduationCap, Globe, BookOpen } from "lucide-react";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

// Navigation Menu Imports
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Alert Dialog Imports
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "Portals",
    path: "#",
    children: [
      { name: "University Website", path: "https://www.dogus.edu.tr/", description: "Official website of Dogus University." },
      { name: "OBS", path: "https://obs.dogus.edu.tr/", description: "Student Information System." },
      { name: "DouOnline", path: "https://douonline.dogus.edu.tr/", description: "Distance learning platform." },
    ],
  },
  {
    name: "Features",
    path: "#",
    children: [
      { name: "Interactive 3D Navigation", path: "/#interactive-3d-navigation", isLocked: true },
          { name: "Live Availability", path: "/#live-availability", isLocked: true }, // Name updated
      { name: "Personalized Schedule", path: "/#personalized-schedule", isLocked: true },
      { name: "Smart Study Notes", path: "/#smart-study-notes", isLocked: true },
    ],
  },
  { name: "Contact", path: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileOpenDropdown(null);
  }, [location]);

  const cleanTriggerStyle = "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-auto p-0 text-base font-normal shadow-none";

  // Smooth scroll handler for Contact
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/40"
          : "bg-background/100"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Removed logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <span className="font-outfit font-bold text-xl text-foreground tracking-tight">DOU360</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 ml-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-8">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className={cleanTriggerStyle}>
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          {/* PORTALS layout */}
                          {item.name === "Portals" ? (
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                              <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                  <Link
                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-muted/80 transition-colors"
                                    to="https://www.dogus.edu.tr/"
                                  >
                                    <GraduationCap className="h-8 w-8 mb-4 text-primary" />
                                    <div className="mb-2 text-lg font-medium">
                                      University Website
                                    </div>
                                    <p className="text-sm leading-tight text-muted-foreground">
                                      Access the official Dogus University portal for announcements and news.
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                              
                              <ListItem href="https://obs.dogus.edu.tr/" title="OBS" icon={<Globe className="w-4 h-4 text-muted-foreground" />}>
                                Student Information System.
                              </ListItem>
                              <ListItem href="https://douonline.dogus.edu.tr/" title="DouOnline" icon={<BookOpen className="w-4 h-4 text-muted-foreground" />}>
                                Distance learning platform.
                              </ListItem>
                            </ul>
                          ) : (
                            /* FEATURES layout (locked items shown here) */
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]">
                              {item.children.map((child) => (
                                <ListItem
                                  key={child.name}
                                  title={child.name}
                                  href={child.path}
                                  isLocked={(child as any).isLocked}
                                >
                                  {(child as any).description || "Access this feature."}
                                </ListItem>
                              ))}
                            </ul>
                          )}
                        </NavigationMenuContent>
                      </>
                    ) : item.name === "Contact" ? (
                      <a
                        href="#contact"
                        onClick={handleContactClick}
                        className={cn(navigationMenuTriggerStyle(), cleanTriggerStyle)}
                        style={{ cursor: "pointer" }}
                      >
                        <NavigationMenuLink asChild>
                          <span>{item.name}</span>
                        </NavigationMenuLink>
                      </a>
                    ) : (
                      <Link to={item.path}>
                        <NavigationMenuLink 
                          className={cn(navigationMenuTriggerStyle(), cleanTriggerStyle)}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <AnimatedThemeToggler className="p-2 rounded-lg hover:bg-accent transition-colors" />

            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/signin"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary sm px-5 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                Sign Up
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-5 fade-in duration-200">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() =>
                          setMobileOpenDropdown(mobileOpenDropdown === item.name ? null : item.name)
                        }
                        className="flex items-center justify-between w-full px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileOpenDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileOpenDropdown === item.name && (
                        <div className="pl-4 pr-2 pb-2 flex flex-col gap-1 bg-accent/30 rounded-b-md mx-2">
                          {item.children.map((child) => (
                            /* MOBILE lock logic */
                            (child as any).isLocked ? (
                                <LockedFeatureDialog key={child.name} featureName={child.name}>
                                    <button className="flex items-center justify-between w-full py-2 px-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                                        {child.name}
                                        <Lock className="w-3 h-3 opacity-50" />
                                    </button>
                                </LockedFeatureDialog>
                            ) : (
                                <Link
                                key={child.name}
                                to={child.path}
                                className="flex items-center justify-between py-2 px-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                {child.name}
                                </Link>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ) : item.name === "Contact" ? (
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        setTimeout(() => {
                          const section = document.getElementById("contact");
                          if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                          }
                        }, 100);
                      }}
                      className="block px-4 py-3 font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                      style={{ cursor: "pointer" }}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className="block px-4 py-3 font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2 px-2">
                <Link
                  to="/signin"
                  className="w-full py-2 text-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link to="/signup" className="w-full py-2 rounded-md bg-primary text-primary-foreground text-center font-medium">
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// ------------------------------------------------------------------
// COMPONENTS
// ------------------------------------------------------------------

// 1. Reusable Alert Dialog Wrapper (reduces code repetition)
const LockedFeatureDialog = ({ children, featureName }: { children: React.ReactNode, featureName: string }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" />
                        Login Required
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You need to sign in to access <strong>{featureName}</strong>. 
                        <br />
                        Join DOU360 to explore the campus in 3D, find empty classrooms, and manage your schedule.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Link to="/signin">Sign In</Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

// 2. Desktop ListItem (Updated with Lock Logic)
const ListItem = ({ className, title, children, href, isLocked, icon, ...props }: any) => {
    const content = (
        <div className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group cursor-pointer",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
             {icon && <span className="mr-1">{icon}</span>}
             {title}
             {isLocked && <Lock className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5 opacity-80">
            {children}
          </p>
        </div>
    );

      // If locked, render the Alert Dialog; otherwise render the Link
    if (isLocked) {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <LockedFeatureDialog featureName={title}>
                        {content}
                    </LockedFeatureDialog>
                </NavigationMenuLink>
            </li>
        );
    }

    return (
        <li>
            <NavigationMenuLink asChild>
                <Link to={href} className="block">
                    {content}
                </Link>
            </NavigationMenuLink>
        </li>
    );
};