import { useRef } from "react";
import { useCaseMotion } from "../hooks/useCaseMotion";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/project";
export default function CaseStudy() {
  const { slug } = useParams();
  const root=useRef<HTMLElement>(null);
  useCaseMotion(root,slug);
  const project = projects.find((item) => item.slug === slug);
  if (!project)
    return (
      <main id="main" className="missing" tabIndex={-1}>
        <h1>Project not found.</h1>
        <Link className="button" to="/#work">
          Back to projects
        </Link>
      </main>
    );
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <main ref={root} id="main" className={`case case-${project.slug}`} tabIndex={-1}>
      <Link className="text-link" to="/#work">
        ← Selected work
      </Link>
      <p className="eyebrow">
        {project.number} / {project.category}
      </p>
      <h1>{project.title}</h1>
      <p className="case-lead">{project.tagline}</p>
      <div className="actions">
        {project.github && (
          <a
            className="button"
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            {project.githubLabel ?? "View source"} ↗
          </a>
        )}
        {project.live && (
          <a
            className="text-link"
            href={project.live}
            target="_blank"
            rel="noreferrer"
          >
            {project.liveLabel ?? "Live demo"} ↗
          </a>
        )}
        {project.download && (
          <a
            className="text-link"
            href={project.download}
            target="_blank"
            rel="noreferrer"
          >
            Download app ↗
          </a>
        )}
      </div>
      <nav className="case-index" aria-label="Case study sections"><a href="#case-overview">Overview ↓</a><a href="#case-decisions">Engineering decisions ↓</a><a href="#case-capabilities">Capabilities ↓</a><a href="#case-technology">Technology ↓</a></nav>
      <figure className={`case-image tone-${project.tone}`}>
        <img
          className="case-object"
          src={`/images/gallery/${project.slug}-object.svg`}
          alt={project.imageAlt}
          width={projects.indexOf(project)<2 ? 852 : project.slug==="mahila-mitr" ? 370 : 420}
          height={projects.indexOf(project)<2 ? 524 : project.slug==="mahila-mitr" ? 808 : 700}
          decoding="async"
        />
        <figcaption>
          {project.imageCaption ??
            "Product illustration — a visual explanation, not an application screenshot."}
        </figcaption>
      </figure>
      <section id="case-overview" className="case-section">
        <h2>Overview</h2>
        <p>{project.overview}</p>
      </section>
      <section id="case-decisions" className="case-section">
        <h2>Engineering decisions</h2>
        <div>
          {project.decisions.map((item,index) => (
            <article className="case-decision" key={item.title}><span className="case-decision-number" aria-hidden="true">0{index+1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="case-capabilities" className="case-section">
        <h2>Supported capabilities</h2>
        <ul>
          {project.capabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section id="case-technology" className="case-section">
        <h2>Technology</h2>
        <div className="tags">
          {project.tech.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      {project.companion && (
        <section className="companion">
          <h2>{project.companion.title}</h2>
          <p>{project.companion.description}</p>
          <img
            src={project.companion.image}
            alt={project.companion.title + " illustration"}
            width="1000"
            height="700"
            loading="lazy"
          />
          <p className="eyebrow">PRODUCT ILLUSTRATION</p>
        </section>
      )}
      <Link className="next-project" to={`/projects/${next.slug}`}>
        <span className="eyebrow">NEXT PROJECT</span>
        <h2>{next.title} ↗</h2>
      </Link>
    </main>
  );
}
