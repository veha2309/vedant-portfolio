import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, contact } from "./data/project";
import { experience } from "./data/experience";
import { skills } from "./data/skills";
import RouteEffects from "./components/RouteEffects";
import ExternalLinkPrompt from "./components/ExternalLinkPrompt";
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
gsap.registerPlugin(ScrollTrigger);
function Home() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".hero-copy > *", {
          y: 18,
          opacity: 0,
          duration: 0.6,
          stagger: 0.07,
          clearProps: "all",
        });
        gsap.utils
          .toArray<HTMLElement>("[data-reveal]")
          .forEach((element) =>
            gsap.from(element, {
              y: 24,
              duration: 0.65,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            }),
          );
        const desktop = gsap.matchMedia();
        desktop.add("(min-width: 1024px)", () => {
          gsap.to(".hero-aside .orbit-mark", {
            rotation: 70,
            y: 35,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          });
          gsap.to(".hero h1", {
            y: 55,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          });
          gsap.utils
            .toArray<HTMLElement>(".project-image img")
            .forEach((image) =>
              gsap.fromTo(
                image,
                { scale: 1.04, yPercent: -2 },
                {
                  scale: 1,
                  yPercent: 2,
                  ease: "none",
                  scrollTrigger: {
                    trigger: image.closest(".project"),
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.7,
                  },
                },
              ),
            );
        });
        return () => desktop.revert();
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <main id="main" ref={root} tabIndex={-1}>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">SOFTWARE ENGINEER · NEW DELHI, INDIA</p>
          <h1>
            Vedant
            <br />
            <span>Shukla.</span>
          </h1>
          <p className="intro">
            Thoughtful code.
            <br />
            Useful things.
          </p>
          <p className="description">
            I build web and mobile applications that make complex things feel
            simple. Curious about the interface. Careful about what powers it.
          </p>
          <div className="actions">
            <Link className="button" to="/#work">
              View projects <span>↘</span>
            </Link>
            <Link className="text-link" to="/#contact">
              Contact me ↗
            </Link>
          </div>
        </div>
        <aside className="hero-aside">
          <span className="orbit-mark" aria-hidden="true">
            ✳
          </span>
          <span className="hero-side-label">
            A PERSONAL COLLECTION
            <br />
            OF CODE & CURIOSITY
          </span>
          <p>
            WEB & MOBILE
            <br />
            ENGINEERING
          </p>
          <span>React / TypeScript / Flutter</span>
          <a href="#work" className="scroll-note">
            A few things I’ve built ↓
          </a>
        </aside>
      </section>
      <section id="work">
        <div className="section-heading work-heading" data-reveal>
          <div>
            <p className="eyebrow">01 / SELECTED WORK</p>
            <h2>
              Projects with
              <br />
              <em>a purpose.</em>
            </h2>
          </div>
          <p>
            From everyday finances to assistive technology.
            <br />
            Explore the decisions behind the interfaces.
          </p>
        </div>
        <div className="projects">
          {projects.map((project) => (
            <Link
              className={`project tone-${project.tone}`}
              to={`/projects/${project.slug}`}
              key={project.slug}
              data-reveal
            >
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width={project.imageWidth ?? 1000}
                  height={project.imageHeight ?? 700}
                  loading="lazy"
                  decoding="async"
                />
                <span>{project.imageCaption ?? "PRODUCT ILLUSTRATION"}</span>
              </div>
              <div className="project-label">
                <span>
                  {project.number} / {project.category}
                </span>
                <span aria-hidden="true">↗</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.tagline}</p>
              <div className="tags">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section id="skills" className="skills">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">02 / TOOLKIT</p>
            <h2>Across the stack.</h2>
          </div>
          <p>
            The tools I use to connect clear interfaces
            <br />
            with practical engineering.
          </p>
        </div>
        <div className="skills-grid">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} data-reveal>
              <h3>{category}</h3>
              <p>{items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="experience">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">03 / EXPERIENCE & EDUCATION</p>
            <h2>Learning by doing.</h2>
          </div>
        </div>
        <div className="experience">
          {experience.map((job) => (
            <article key={job.company} data-reveal>
              <div>
                <h3>{job.role}</h3>
                <p>{job.company}</p>
                <span>{job.period}</span>
              </div>
              <ul>
                {job.responsibilities.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </article>
          ))}
          <article data-reveal>
            <div>
              <h3>BTech, Computer Science & Engineering</h3>
              <p>Dr. Akhilesh Das Gupta ITM</p>
              <span>CGPA 7.8</span>
            </div>
            <p>
              A foundation in computer science, explored through hands-on web
              and mobile projects.
            </p>
          </article>
        </div>
      </section>
      <section id="about" className="about">
        <div className="portrait" data-reveal>
          <img
            src="/images/vedant-portrait.webp"
            width="900"
            height="1598"
            alt="Vedant Shukla"
            loading="lazy"
            decoding="async"
          />
          <span>THE PERSON BEHIND THE CODE</span>
        </div>
        <div data-reveal>
          <p className="eyebrow">04 / A LITTLE ABOUT ME</p>
          <h2>
            An engineer’s mind.
            <br />
            <em>A maker’s instinct.</em>
          </h2>
          <p className="intro">I like making complex things feel simple.</p>
          <p>
            I’m a software engineer working across web and mobile. My work
            brings together clear interfaces, connected systems, and the small
            details that make a product feel considered.
          </p>
          <p>
            From personal finance and market data to assistive technology, I’m
            drawn to products with a useful purpose. I bring that same curiosity
            to teams and independent collaborations.
          </p>
          <p className="studio-link">
            Looking for a website or a freelance collaboration?{" "}
            <a
              href="https://interportfolio.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Explore Vedant Digital Studio ↗
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
function NotFound() {
  return (
    <main id="main" className="missing" tabIndex={-1}>
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>
        A wrong turn.
        <br />
        An easy way back.
      </h1>
      <Link className="button" to="/">
        Back to selected work ↗
      </Link>
    </main>
  );
}
export default function App() {
  const location = useLocation();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header>
        <Link className="wordmark" to="/" aria-label="Vedant Shukla — home">
          vedant<span>.</span>
        </Link>
        <nav aria-label="Main navigation">
          {[
            ["Work", "work"],
            ["Experience", "experience"],
            ["About", "about"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <Link
              key={id}
              to={`/#${id}`}
              aria-current={
                location.pathname === "/" && location.hash === `#${id}`
                  ? "location"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <Suspense
        fallback={
          <main id="main" className="missing" aria-busy="true">
            <p role="status">Opening the project…</p>
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <RouteEffects />
      </Suspense>
      <footer id="contact">
        <p className="eyebrow">LET’S CONNECT</p>
        <h2>
          A good team.
          <br />
          <em>An interesting challenge.</em>
        </h2>
        <p>
          I’m open to engineering opportunities and thoughtful collaborations.
        </p>
        <a className="contact-email" href={`mailto:${contact.email}`}>
          {contact.email} ↗
        </a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Vedant Shukla</span>
          <div>
            <a href={contact.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <Link to="/#top">Back to top ↑</Link>
          </div>
        </div>
      </footer>
      <ExternalLinkPrompt />
    </>
  );
}
