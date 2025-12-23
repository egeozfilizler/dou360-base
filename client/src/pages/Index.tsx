import { Layout } from "@/components/Layout";
import { Hero } from "@/components/sections/Hero";
import { SmallFeatures } from "@/components/sections/SmallFeatures";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Services } from "@/components/sections/Services";
import { Roadmap } from "@/components/sections/Roadmap";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Counter } from "@/components/sections/Counter";
import { Integrations } from "@/components/sections/Integrations";
import { Contact } from "@/components/sections/Contact";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <SmallFeatures />
      <About />
      <Services />
      <Team />
      <Projects />
      <Roadmap />
      <Testimonials />
      <Counter />
      <Integrations />
      <Contact />
    </Layout>
  );
};

export default Index;