import { CursorSpotlight } from "./components/CursorSpotlight";
import { Hero } from "./components/Hero";
import { PhaseTimeline } from "./components/PhaseTimeline";
import { WeeklyLoad } from "./components/WeeklyLoad";
import { CrossBuild } from "./components/CrossBuild";
import { Colophon } from "./components/Colophon";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <CursorSpotlight />
      <main>
        <Hero />
        <PhaseTimeline />
        <WeeklyLoad />
        <CrossBuild />
        <Colophon />
        <Footer />
      </main>
    </>
  );
}
