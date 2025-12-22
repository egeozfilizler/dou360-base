import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* PERFORMANS DÜZELTMESİ:
        1. transform-gpu: İşlemi CPU'dan alıp GPU'ya verir.
        2. will-change-transform: Tarayıcıya bu elementin değişebileceğini, hazırlıklı olmasını söyler.
        3. Backface-visibility-hidden (gizli trick): Bazen titremeyi önler.
      */}

      <div className="container-custom">
        {/* ... componentin geri kalanı aynı ... */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 animate-fade-in">
              🚀 Welcome to Base Template
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Build Your Next
              <span className="gradient-text"> Startup </span>
              with Ease
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              A modern, beautiful, and responsive template designed to help you launch your startup quickly. Built with React, Tailwind CSS, and TypeScript.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/signup" className="btn-primary w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <button className="btn-secondary w-full sm:w-auto">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">2K+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Projects Done</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative bg-gradient-to-br from-primary/20 to-purple-400/20 rounded-2xl p-8 lg:p-12">
              {/* Placeholder for hero image */}
              <div className="aspect-square bg-card rounded-xl shadow-2xl flex items-center justify-center border border-border">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-10 h-10 bg-primary rounded-lg" />
                  </div>
                  <h3 className="font-outfit font-semibold text-xl text-foreground mb-2">Dashboard Preview</h3>
                  <p className="text-muted-foreground text-sm">Your hero image or illustration goes here</p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-xl shadow-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">📊</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-card border border-border rounded-xl shadow-lg flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}