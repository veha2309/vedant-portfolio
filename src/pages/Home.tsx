import { useRef } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/project";
import { experience } from "../data/experience";
import { skills } from "../data/skills";
import { usePortfolioMotion } from "../hooks/usePortfolioMotion";
const chapterNotes = [
  { title: "Make the numbers useful.", detail: "Local-first state. Connected accounts. A clear financial overview." },
  { title: "Bring a moving market into focus.", detail: "Watchlists, holdings and market movement in one workspace." },
  { title: "Reconsider it for the hand.", detail: "A mobile experience designed around touch and focused information." },
  { title: "Build for a different perspective.", detail: "Assistive camera interactions with accessibility at the centre." },
  { title: "Keep connection personal.", detail: "Mobile-first, with private chatting and a supporting web admin panel." },
];
export default function Home() {
  const root = useRef<HTMLElement>(null);
  usePortfolioMotion(root);
  return (
    <main ref={root} id="main" tabIndex={-1} className="story-home">
      <div className="portfolio-film">
        <div className="film-track">
          <section id="top" className="story-opening film-panel" aria-labelledby="hero-title">
            <p className="eyebrow opening-label">VEDANT SHUKLA — SOFTWARE ENGINEER / NEW DELHI</p>
            <svg className="opening-sculpture" viewBox="0 0 600 600" aria-hidden="true"><path d="M50 85C180 40 75 530 285 515S425 5 555 100" /></svg>
            <div className="hero-copy">
              <h1 id="hero-title" aria-label="Vedant Shukla"><span>{Array.from("Vedant").map((letter,index)=><span className="name-letter" key={index}>{letter}</span>)}</span><span>{Array.from("Shukla.").map((letter,index)=><span className="name-letter" key={index}>{letter}</span>)}</span></h1>
            </div>
            <div className="opening-art" aria-hidden="true"><img className="opening-browser" fetchPriority="high" src="/images/gallery/financeflow-object.svg" alt="" width="852" height="524" /><img className="opening-phone" src="/images/gallery/mahila-mitr-object.svg" alt="" width="370" height="808" /><span>SELECTED PRODUCT ILLUSTRATIONS</span></div>
            <div className="opening-discipline" aria-hidden="true">WEB +<br />MOBILE</div>
            <div className="opening-note">
              <span className="opening-index">CODE, WITH A POINT OF VIEW.</span>
              <p>I turn complex problems into<br />interfaces people can use.</p>
            </div>
            <div className="opening-bottom">
              <Link className="text-link" to="/#work">View projects <span>↗</span></Link>
              <Link className="text-link" to="/#contact">Contact me ↗</Link>
            </div>
            <div className="opening-scroll" aria-hidden="true">SCROLL TO EXPLORE <span>→</span></div>
            <span className="opening-orbit" aria-hidden="true">*</span>
          </section>
          <section id="work" className="projects" aria-labelledby="work-title">
            <h2 id="work-title" className="film-section-title">Selected engineering projects</h2>
            {projects.map((project, index) => (
              <Link id={`chapter-${project.slug}`} className={`project story-project film-panel chapter-${index}`} to={`/projects/${project.slug}`} key={project.slug}>
                <div className="chapter-top"><span className="eyebrow">{project.number} / {project.category}</span><span className="chapter-open">Explore case study ↗</span></div>
                <div className="chapter-scene">
                  <div className="chapter-intro"><h3>{project.title}</h3></div>
                  <div className="chapter-aura" aria-hidden="true" />
                  <div className="chapter-echo" aria-hidden="true"><img src={project.companion?.image ?? `/images/gallery/${project.slug}-object.svg`} alt="" width={project.companion ? 1440 : index<2 ? 852 : 420} height={project.companion ? 1000 : index<2 ? 524 : 700} loading="lazy" /></div>
                  <div className="chapter-image">
                    <img src={`/images/gallery/${project.slug}-object.svg`} alt={project.imageAlt} width={index<2 ? 852 : index===4 ? 370 : 420} height={index<2 ? 524 : index===4 ? 808 : 700} loading="lazy" decoding="async" />
                    <span>{project.imageCaption ?? "PRODUCT ILLUSTRATION"}</span>
                  </div>
                  <div className="chapter-decision">
                    <span className="eyebrow">{index < 2 ? "ON THE WEB" : "IN YOUR HAND"}</span>
                    <h4>{chapterNotes[index].title}</h4>
                    <p>{chapterNotes[index].detail}</p>
                    <div className="tags">{project.tech.slice(0,3).map(tech => <span key={tech}>{tech}</span>)}</div>
                  </div>
                  <div className="chapter-capabilities"><span className="eyebrow">BUILT TO</span>{project.capabilities.slice(0,3).map(capability=><span key={capability}>{capability}</span>)}</div>
                  <span className="chapter-watermark" aria-hidden="true">{project.number}</span>
                </div>
              </Link>
            ))}
          </section>
        </div>
        <div className="film-index">
          <span className="film-position" aria-hidden="true">SELECTED WORK / 01—05</span>
          <nav className="story-jumps" aria-label="Project chapters">{projects.map(project => <a key={project.slug} href={`#chapter-${project.slug}`}><span>{project.number}</span>{project.title}</a>)}</nav>
          <div className="film-progress" aria-hidden="true"><span /></div>
        </div>
      </div>
      <section id="skills" className="story-toolkit">
        <div className="toolkit-title">
          <p className="eyebrow">02 / TECHNICAL SKILLS</p>
          <h2>
            <span className="toolkit-line">Interfaces.</span>
            <span className="toolkit-line">Systems.</span>
            <span className="toolkit-line">Possibilities.</span>
          </h2>
          <p>
            The technologies I use across interfaces, APIs and mobile applications.
          </p>
        </div>
        <div className="toolkit-map">
          {Object.entries(skills).map(([category, items], index) => (
            <article key={category} className="toolkit-node">
              <span className="eyebrow">
                0{index + 1} / {category}
              </span>
              <h3>{category}</h3>
              <p>{items.map(item=><span className="skill-word" key={item}>{item}</span>)}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="experience" className="story-experience">
        <div className="experience-title">
          <p className="eyebrow">03 / EXPERIENCE & EDUCATION</p>
          <h2>
            Where I’ve worked.
            <br />
            What I’ve learned.
          </h2>
        </div>
        <div className="experience-path">
          <span className="path-line" aria-hidden="true" />
          {experience.map((job, index) => (
            <article className="experience-stop" key={job.company}>
              <span className="path-marker">0{index + 1}</span>
              <p className="eyebrow">{job.period}</p>
              <h3>{job.role}</h3>
              <p className="job-company">{job.company}</p>
              <ul>
                {job.responsibilities.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </article>
          ))}
          <article className="experience-stop">
            <span className="path-marker">04</span>
            <p className="eyebrow">THE FOUNDATION</p>
            <h3>BTech, Computer Science & Engineering</h3>
            <p className="job-company">Dr. Akhilesh Das Gupta ITM · CGPA 7.8</p>
          </article>
        </div>
      </section>
      <section id="about" className="story-about">
        <div className="about-title">
          <p className="eyebrow">04 / ABOUT VEDANT</p>
          <h2>
            Behind
            <br />
            the code.
          </h2>
        </div>
        <div className="portrait"><span className="portrait-mark" aria-hidden="true">VS /</span>
          <img
            src="/images/vedant-portrait.webp"
            width="900"
            height="1598"
            alt="Vedant Shukla"
            loading="lazy"
            decoding="async"
          />
          <span>VEDANT SHUKLA / NEW DELHI</span>
        </div>
        <div className="personal-note">
          <span className="eyebrow">A NOTE FROM ME</span>
          <p className="intro">Web, mobile, and the details in between.</p>
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
            For websites and freelance collaborations,{" "}
            <a
              href="https://my-portfolio-jade-rho-86.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              explore Vedant Digital Studio ↗
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
