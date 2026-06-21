import { useLenis } from "./lib/useLenis";
import FlowField from "./components/FlowField";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Marquee from "./sections/Marquee";
import About from "./sections/About";
import Trajectory from "./sections/Trajectory";
import Services from "./sections/Services";
import Vision from "./sections/Vision";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

export default function App() {
  useLenis();

  return (
    <>
      <FlowField />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <About />
        <Trajectory />
        <Services />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
