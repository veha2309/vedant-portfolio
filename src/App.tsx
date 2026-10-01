import { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import { contact } from "./data/project";
import RouteEffects from "./components/RouteEffects";
import ExternalLinkPrompt from "./components/ExternalLinkPrompt";
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
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
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
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
          Let’s build
          <br />
          what’s next.
        </h2>
        <p>
          Contact me about engineering roles and technical collaborations.
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
