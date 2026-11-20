import { useState, useSyncExternalStore } from "react";
import type { ProjectDemo } from "../data/project";

const query = "(prefers-reduced-motion: reduce)";
function subscribe(listener: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
const getSnapshot = () => window.matchMedia(query).matches;

function Demo({ demo }: { demo: ProjectDemo }) {
  const reducedMotion = useSyncExternalStore(subscribe, getSnapshot, () => true);
  const [play, setPlay] = useState<boolean | null>(null);
  const playing = play ?? !reducedMotion;
  return (
    <figure className="project-demo">
      <div className="project-demo-heading">
        <h3>{demo.title}</h3>
        <button type="button" onClick={() => setPlay(!playing)} aria-label={`${playing ? "Pause" : "Play"} ${demo.title}`}>
          <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span> {playing ? "Pause" : "Play"}
        </button>
      </div>
      <img src={playing ? demo.src : demo.poster} alt={demo.description} width={demo.width} height={demo.height} loading="lazy" decoding="async" />
      <figcaption>{demo.description}</figcaption>
    </figure>
  );
}

export default function ProjectDemos({ demos }: { demos: ProjectDemo[] }) {
  return (
    <section id="case-demos" className="project-demos" aria-labelledby="demo-title">
      <div className="project-demos-intro">
        <p className="eyebrow">FROM THE FLUTTER GALLERY</p>
        <h2 id="demo-title">See it in motion.</h2>
        <p>Actual component captures from the v0.3.0 release. Use the controls to pause or replay each demo.</p>
      </div>
      {demos.map(demo => <Demo key={demo.src} demo={demo} />)}
    </section>
  );
}
